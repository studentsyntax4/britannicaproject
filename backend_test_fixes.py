#!/usr/bin/env python3
"""
Test script for verifying two code-quality fixes:
FIX 1: Order number now uses secrets module instead of random
FIX 2: admin_stats() refactored into helper functions
"""

import requests
import re
import json
from typing import List, Dict

# Backend URL from frontend/.env
BASE_URL = "https://brand-webstore.preview.emergentagent.com/api"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Wemmbu"

# Test results tracking
test_results = []

def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    test_results.append({
        "test": test_name,
        "passed": passed,
        "details": details
    })
    print(f"{status}: {test_name}")
    if details:
        print(f"   Details: {details}")

def print_summary():
    """Print test summary"""
    passed = sum(1 for r in test_results if r["passed"])
    total = len(test_results)
    print(f"\n{'='*80}")
    print(f"TEST SUMMARY: {passed}/{total} tests passed")
    print(f"{'='*80}")
    
    if passed < total:
        print("\nFailed tests:")
        for r in test_results:
            if not r["passed"]:
                print(f"  ❌ {r['test']}")
                if r["details"]:
                    print(f"     {r['details']}")

# ============================================================================
# FIX 1: Order number uses secrets module (CNC + 6 digits)
# ============================================================================

def test_fix1_order_number_pattern():
    """Test 1: POST /api/orders creates order with correct order_number pattern"""
    print("\n" + "="*80)
    print("FIX 1: Testing order number generation with secrets module")
    print("="*80)
    
    payload = {
        "customer": {
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@example.com",
            "phone": "9876543210",
            "address": "123 MG Road",
            "city": "Mumbai",
            "pin": "400001"
        },
        "items": [
            {
                "id": "p1",
                "name": "Classic Tarri Poha",
                "price": 90,
                "qty": 2
            }
        ],
        "subtotal": 180,
        "shipping": 0
    }
    
    try:
        response = requests.post(f"{BASE_URL}/orders", json=payload, timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Test 1: Order creation with valid data",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return None
        
        order = response.json()
        order_number = order.get("order_number", "")
        
        # Verify order_number matches pattern CNC###### (exactly 6 digits)
        pattern = r'^CNC\d{6}$'
        matches = re.match(pattern, order_number)
        
        if not matches:
            log_test(
                "Test 1: Order number pattern CNC######",
                False,
                f"Order number '{order_number}' does not match pattern ^CNC\\d{{6}}$"
            )
            return None
        
        # Verify other fields
        checks = [
            (order.get("payment_method") == "cod", "payment_method should be 'cod'"),
            (order.get("status") == "confirmed", "status should be 'confirmed'"),
            (order.get("total") == 180, "total should be 180"),
            (len(order.get("items", [])) == 1, "should have 1 item"),
        ]
        
        failed_checks = [msg for passed, msg in checks if not passed]
        
        if failed_checks:
            log_test(
                "Test 1: Order creation with valid data",
                False,
                f"Order number pattern correct but other fields failed: {', '.join(failed_checks)}"
            )
            return None
        
        log_test(
            "Test 1: Order creation with valid data",
            True,
            f"Order created with order_number={order_number}, payment_method=cod, status=confirmed, total=180"
        )
        return order_number
        
    except Exception as e:
        log_test("Test 1: Order creation with valid data", False, f"Exception: {str(e)}")
        return None

def test_fix1_multiple_orders_uniqueness():
    """Test 2: Create 3-5 orders and verify uniqueness and pattern"""
    print("\nTest 2: Creating multiple orders to verify uniqueness...")
    
    order_numbers = []
    
    for i in range(5):
        payload = {
            "customer": {
                "name": f"Customer {i+1}",
                "email": f"customer{i+1}@example.com",
                "phone": f"98765432{i:02d}",
                "address": f"{i+1} Street",
                "city": "Pune",
                "pin": "411001"
            },
            "items": [
                {
                    "id": "p1",
                    "name": "Classic Tarri Poha",
                    "price": 90,
                    "qty": 2
                }
            ],
            "subtotal": 180,
            "shipping": 0
        }
        
        try:
            response = requests.post(f"{BASE_URL}/orders", json=payload, timeout=10)
            
            if response.status_code != 200:
                log_test(
                    f"Test 2: Create order {i+1}/5",
                    False,
                    f"Expected 200, got {response.status_code}"
                )
                continue
            
            order = response.json()
            order_number = order.get("order_number", "")
            order_numbers.append(order_number)
            
            # Verify pattern
            pattern = r'^CNC\d{6}$'
            if not re.match(pattern, order_number):
                log_test(
                    f"Test 2: Order {i+1}/5 pattern check",
                    False,
                    f"Order number '{order_number}' does not match pattern"
                )
            
        except Exception as e:
            log_test(f"Test 2: Create order {i+1}/5", False, f"Exception: {str(e)}")
    
    # Check uniqueness
    unique_count = len(set(order_numbers))
    total_count = len(order_numbers)
    
    if unique_count == total_count and total_count == 5:
        log_test(
            "Test 2: Order number uniqueness",
            True,
            f"Created 5 orders with unique order numbers: {', '.join(order_numbers)}"
        )
        return order_numbers
    else:
        log_test(
            "Test 2: Order number uniqueness",
            False,
            f"Expected 5 unique order numbers, got {unique_count} unique out of {total_count} total. Numbers: {order_numbers}"
        )
        return order_numbers

def test_fix1_get_order_valid(order_number: str):
    """Test 3: GET /api/orders/{order_number} for valid order"""
    print(f"\nTest 3: Retrieving order {order_number}...")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/{order_number}", timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Test 3: GET valid order",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return
        
        order = response.json()
        
        if order.get("order_number") == order_number:
            log_test(
                "Test 3: GET valid order",
                True,
                f"Successfully retrieved order {order_number}"
            )
        else:
            log_test(
                "Test 3: GET valid order",
                False,
                f"Retrieved order has different order_number: {order.get('order_number')}"
            )
    
    except Exception as e:
        log_test("Test 3: GET valid order", False, f"Exception: {str(e)}")

def test_fix1_get_order_invalid():
    """Test 4: GET /api/orders/CNC000000 (unknown) should return 404"""
    print("\nTest 4: Retrieving unknown order CNC000000...")
    
    try:
        response = requests.get(f"{BASE_URL}/orders/CNC000000", timeout=10)
        
        if response.status_code == 404:
            log_test(
                "Test 4: GET unknown order returns 404",
                True,
                "Correctly returned 404 for unknown order"
            )
        else:
            log_test(
                "Test 4: GET unknown order returns 404",
                False,
                f"Expected 404, got {response.status_code}"
            )
    
    except Exception as e:
        log_test("Test 4: GET unknown order returns 404", False, f"Exception: {str(e)}")

def test_fix1_empty_items():
    """Test 5: POST /api/orders with empty items should return 400"""
    print("\nTest 5: Creating order with empty items...")
    
    payload = {
        "customer": {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "9876543210",
            "address": "Test Address",
            "city": "Test City",
            "pin": "123456"
        },
        "items": [],
        "subtotal": 0,
        "shipping": 0
    }
    
    try:
        response = requests.post(f"{BASE_URL}/orders", json=payload, timeout=10)
        
        if response.status_code == 400:
            log_test(
                "Test 5: POST with empty items returns 400",
                True,
                "Correctly returned 400 for empty cart"
            )
        else:
            log_test(
                "Test 5: POST with empty items returns 400",
                False,
                f"Expected 400, got {response.status_code}. Response: {response.text}"
            )
    
    except Exception as e:
        log_test("Test 5: POST with empty items returns 400", False, f"Exception: {str(e)}")

# ============================================================================
# FIX 2: admin_stats() refactored into helper functions
# ============================================================================

def test_fix2_admin_login():
    """Test 6: POST /api/admin/login with correct credentials"""
    print("\n" + "="*80)
    print("FIX 2: Testing admin_stats() refactored helper functions")
    print("="*80)
    
    payload = {
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    }
    
    try:
        response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Test 6: Admin login with correct credentials",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return None
        
        data = response.json()
        token = data.get("token")
        
        if not token:
            log_test(
                "Test 6: Admin login with correct credentials",
                False,
                "Response missing 'token' field"
            )
            return None
        
        log_test(
            "Test 6: Admin login with correct credentials",
            True,
            f"Successfully logged in, received token"
        )
        return token
    
    except Exception as e:
        log_test("Test 6: Admin login with correct credentials", False, f"Exception: {str(e)}")
        return None

def test_fix2_stats_without_token():
    """Test 7: GET /api/admin/stats without token should return 401"""
    print("\nTest 7: Accessing stats without token...")
    
    try:
        response = requests.get(f"{BASE_URL}/admin/stats", timeout=10)
        
        if response.status_code == 401:
            log_test(
                "Test 7: GET /api/admin/stats without token returns 401",
                True,
                "Correctly returned 401 for unauthenticated request"
            )
        else:
            log_test(
                "Test 7: GET /api/admin/stats without token returns 401",
                False,
                f"Expected 401, got {response.status_code}"
            )
    
    except Exception as e:
        log_test("Test 7: GET /api/admin/stats without token returns 401", False, f"Exception: {str(e)}")

def test_fix2_stats_with_token(token: str, created_orders: List[str]):
    """Test 8: GET /api/admin/stats with token returns correct structure"""
    print("\nTest 8: Accessing stats with valid token...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        response = requests.get(f"{BASE_URL}/admin/stats", headers=headers, timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Test 8: GET /api/admin/stats with token returns 200",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return None
        
        stats = response.json()
        
        # Verify required keys
        required_keys = [
            "total_orders",
            "total_revenue",
            "delivered",
            "pending",
            "products_count",
            "bestsellers",
            "revenue_by_day"
        ]
        
        missing_keys = [key for key in required_keys if key not in stats]
        
        if missing_keys:
            log_test(
                "Test 8: Stats response structure",
                False,
                f"Missing required keys: {', '.join(missing_keys)}"
            )
            return None
        
        # Verify data types
        type_checks = [
            (isinstance(stats["total_orders"], int), "total_orders should be int"),
            (isinstance(stats["total_revenue"], (int, float)), "total_revenue should be number"),
            (isinstance(stats["delivered"], int), "delivered should be int"),
            (isinstance(stats["pending"], int), "pending should be int"),
            (isinstance(stats["products_count"], int), "products_count should be int"),
            (isinstance(stats["bestsellers"], list), "bestsellers should be array"),
            (isinstance(stats["revenue_by_day"], list), "revenue_by_day should be array"),
        ]
        
        failed_checks = [msg for passed, msg in type_checks if not passed]
        
        if failed_checks:
            log_test(
                "Test 8: Stats response structure",
                False,
                f"Type checks failed: {', '.join(failed_checks)}"
            )
            return None
        
        # Verify products_count is 14 (as per rebrand)
        if stats["products_count"] != 14:
            log_test(
                "Test 8: Stats products_count",
                False,
                f"Expected products_count=14, got {stats['products_count']}"
            )
        else:
            log_test(
                "Test 8: Stats products_count",
                True,
                "products_count=14 (correct)"
            )
        
        # Verify bestsellers structure (max 5, sorted desc by qty)
        bestsellers = stats["bestsellers"]
        if len(bestsellers) > 5:
            log_test(
                "Test 8: Bestsellers max 5 items",
                False,
                f"Expected max 5 bestsellers, got {len(bestsellers)}"
            )
        else:
            log_test(
                "Test 8: Bestsellers max 5 items",
                True,
                f"Bestsellers count: {len(bestsellers)}"
            )
        
        # Verify bestsellers have name and qty
        if bestsellers:
            first_bestseller = bestsellers[0]
            if "name" in first_bestseller and "qty" in first_bestseller:
                log_test(
                    "Test 8: Bestsellers structure {name, qty}",
                    True,
                    f"First bestseller: {first_bestseller}"
                )
            else:
                log_test(
                    "Test 8: Bestsellers structure {name, qty}",
                    False,
                    f"Bestseller missing name or qty: {first_bestseller}"
                )
        
        # Verify revenue_by_day structure (max 7, sorted asc by date)
        revenue_by_day = stats["revenue_by_day"]
        if len(revenue_by_day) > 7:
            log_test(
                "Test 8: Revenue by day max 7 items",
                False,
                f"Expected max 7 days, got {len(revenue_by_day)}"
            )
        else:
            log_test(
                "Test 8: Revenue by day max 7 items",
                True,
                f"Revenue by day count: {len(revenue_by_day)}"
            )
        
        # Verify revenue_by_day has date and revenue
        if revenue_by_day:
            first_day = revenue_by_day[0]
            if "date" in first_day and "revenue" in first_day:
                log_test(
                    "Test 8: Revenue by day structure {date, revenue}",
                    True,
                    f"First day: {first_day}"
                )
            else:
                log_test(
                    "Test 8: Revenue by day structure {date, revenue}",
                    False,
                    f"Day entry missing date or revenue: {first_day}"
                )
        
        log_test(
            "Test 8: GET /api/admin/stats with token",
            True,
            f"Stats retrieved successfully with all required keys"
        )
        
        return stats
    
    except Exception as e:
        log_test("Test 8: GET /api/admin/stats with token", False, f"Exception: {str(e)}")
        return None

def test_fix2_aggregation_sanity(stats: Dict, created_orders: List[str]):
    """Test 9: Sanity check aggregation logic"""
    print("\nTest 9: Verifying aggregation logic...")
    
    if not stats:
        log_test(
            "Test 9: Aggregation sanity check",
            False,
            "No stats data available"
        )
        return
    
    # We created 6 orders (1 in test 1, 5 in test 2), all with Classic Tarri Poha qty 2
    # So bestsellers should include Classic Tarri Poha with qty >= 12
    bestsellers = stats.get("bestsellers", [])
    
    tarri_poha_found = False
    tarri_poha_qty = 0
    
    for item in bestsellers:
        if item.get("name") == "Classic Tarri Poha":
            tarri_poha_found = True
            tarri_poha_qty = item.get("qty", 0)
            break
    
    if not tarri_poha_found:
        log_test(
            "Test 9: Bestsellers includes Classic Tarri Poha",
            False,
            f"Classic Tarri Poha not found in bestsellers: {bestsellers}"
        )
    elif tarri_poha_qty < 12:
        log_test(
            "Test 9: Bestsellers Classic Tarri Poha qty",
            False,
            f"Expected qty >= 12 (we created 6 orders with qty 2 each), got {tarri_poha_qty}"
        )
    else:
        log_test(
            "Test 9: Bestsellers aggregation",
            True,
            f"Classic Tarri Poha found with qty={tarri_poha_qty} (expected >= 12)"
        )
    
    # Verify total_revenue includes our orders (6 orders * 180 = 1080)
    total_revenue = stats.get("total_revenue", 0)
    expected_min_revenue = 1080  # Our 6 orders
    
    if total_revenue >= expected_min_revenue:
        log_test(
            "Test 9: Total revenue aggregation",
            True,
            f"Total revenue={total_revenue} (expected >= {expected_min_revenue})"
        )
    else:
        log_test(
            "Test 9: Total revenue aggregation",
            False,
            f"Total revenue={total_revenue}, expected >= {expected_min_revenue}"
        )
    
    # Verify pending count reflects confirmed orders
    pending = stats.get("pending", 0)
    total_orders = stats.get("total_orders", 0)
    
    # All our created orders have status='confirmed', which is in PENDING_STATUSES
    if pending >= 6:
        log_test(
            "Test 9: Pending count aggregation",
            True,
            f"Pending={pending} (expected >= 6 confirmed orders we created)"
        )
    else:
        log_test(
            "Test 9: Pending count aggregation",
            False,
            f"Pending={pending}, expected >= 6 (our confirmed orders)"
        )

# ============================================================================
# Main test execution
# ============================================================================

def main():
    print("="*80)
    print("TESTING CODE-QUALITY FIXES FOR TARRI AND TREACLE BACKEND")
    print("="*80)
    print(f"Backend URL: {BASE_URL}")
    print(f"Admin credentials: {ADMIN_USERNAME} / {ADMIN_PASSWORD}")
    print()
    
    # FIX 1: Order number with secrets module
    order_number = test_fix1_order_number_pattern()
    created_orders = test_fix1_multiple_orders_uniqueness()
    
    if order_number:
        test_fix1_get_order_valid(order_number)
    
    test_fix1_get_order_invalid()
    test_fix1_empty_items()
    
    # FIX 2: admin_stats() refactored
    token = test_fix2_admin_login()
    test_fix2_stats_without_token()
    
    stats = None
    if token:
        stats = test_fix2_stats_with_token(token, created_orders)
    
    if stats and created_orders:
        test_fix2_aggregation_sanity(stats, created_orders)
    
    # Print summary
    print_summary()

if __name__ == "__main__":
    main()
