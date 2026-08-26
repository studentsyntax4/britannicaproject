#!/usr/bin/env python3
"""
Admin Backend API Test Suite for Crackers and Checkers Store
Tests all admin endpoints with comprehensive validation
"""

import requests
import json
import sys
from typing import Dict, Any, List

# Base URL from frontend/.env
BASE_URL = "https://brand-webstore.preview.emergentagent.com/api"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Wemmbu"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def print_test(name: str, passed: bool, details: str = ""):
    status = f"{Colors.GREEN}✅ PASS{Colors.RESET}" if passed else f"{Colors.RED}❌ FAIL{Colors.RESET}"
    print(f"{status} - {name}")
    if details:
        print(f"    {details}")
    return passed

def test_admin_login_valid():
    """Test 1: POST /api/admin/login with correct credentials should return token"""
    print(f"\n{Colors.BLUE}Test 1: POST /api/admin/login (valid credentials){Colors.RESET}")
    try:
        login_data = {
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        }
        
        response = requests.post(f"{BASE_URL}/admin/login", json=login_data, timeout=10)
        
        if response.status_code != 200:
            return print_test("Admin login (valid)", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        data = response.json()
        
        if "token" not in data:
            return print_test("Admin login (valid)", False, f"Response missing 'token' field. Got: {data}")
        
        # Store token for subsequent tests
        global admin_token
        admin_token = data["token"]
        
        return print_test("Admin login (valid)", True, f"Login successful, token received")
    
    except Exception as e:
        return print_test("Admin login (valid)", False, f"Exception: {str(e)}")

def test_admin_login_invalid():
    """Test 2: POST /api/admin/login with wrong password should return 401"""
    print(f"\n{Colors.BLUE}Test 2: POST /api/admin/login (invalid password){Colors.RESET}")
    try:
        login_data = {
            "username": ADMIN_USERNAME,
            "password": "wrongpassword"
        }
        
        response = requests.post(f"{BASE_URL}/admin/login", json=login_data, timeout=10)
        
        if response.status_code != 401:
            return print_test("Admin login (invalid)", False, f"Expected status 401, got {response.status_code}")
        
        return print_test("Admin login (invalid)", True, "Correctly rejected invalid credentials with 401")
    
    except Exception as e:
        return print_test("Admin login (invalid)", False, f"Exception: {str(e)}")

def test_admin_stats_no_auth():
    """Test 3a: GET /api/admin/stats without Authorization header should return 401"""
    print(f"\n{Colors.BLUE}Test 3a: GET /api/admin/stats (no auth header){Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/admin/stats", timeout=10)
        
        if response.status_code != 401:
            return print_test("Admin stats (no auth)", False, f"Expected status 401, got {response.status_code}")
        
        return print_test("Admin stats (no auth)", True, "Correctly rejected request without auth header")
    
    except Exception as e:
        return print_test("Admin stats (no auth)", False, f"Exception: {str(e)}")

def test_admin_stats_invalid_token():
    """Test 3b: GET /api/admin/stats with invalid token should return 401"""
    print(f"\n{Colors.BLUE}Test 3b: GET /api/admin/stats (invalid token){Colors.RESET}")
    try:
        headers = {"Authorization": "Bearer invalid_token_xyz"}
        response = requests.get(f"{BASE_URL}/admin/stats", headers=headers, timeout=10)
        
        if response.status_code != 401:
            return print_test("Admin stats (invalid token)", False, f"Expected status 401, got {response.status_code}")
        
        return print_test("Admin stats (invalid token)", True, "Correctly rejected invalid token")
    
    except Exception as e:
        return print_test("Admin stats (invalid token)", False, f"Exception: {str(e)}")

def test_create_order_for_stats():
    """Test 4: Create an order so stats/orders have data"""
    print(f"\n{Colors.BLUE}Test 4: POST /api/orders (create order for stats){Colors.RESET}")
    try:
        order_data = {
            "customer": {
                "name": "Priya Sharma",
                "email": "priya@example.com",
                "phone": "9123456789",
                "address": "45 Garden Street",
                "city": "Delhi",
                "pin": "110001"
            },
            "items": [
                {
                    "id": "p1",
                    "name": "Classic Chocolate",
                    "price": 120,
                    "qty": 3
                },
                {
                    "id": "p2",
                    "name": "Butter Cookies",
                    "price": 80,
                    "qty": 2
                }
            ],
            "subtotal": 520,
            "shipping": 50
        }
        
        response = requests.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        
        if response.status_code != 200:
            return print_test("Create order for stats", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        order = response.json()
        
        # Store order_number for later tests
        global created_order_number
        created_order_number = order.get('order_number')
        
        return print_test("Create order for stats", True, f"Order created: {created_order_number}, total={order.get('total')}")
    
    except Exception as e:
        return print_test("Create order for stats", False, f"Exception: {str(e)}")

def test_admin_stats_valid():
    """Test 5: GET /api/admin/stats with valid token should return stats"""
    print(f"\n{Colors.BLUE}Test 5: GET /api/admin/stats (valid token){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin stats (valid)", False, "No admin token from login test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/admin/stats", headers=headers, timeout=10)
        
        if response.status_code != 200:
            return print_test("Admin stats (valid)", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        stats = response.json()
        
        # Validate required keys
        required_keys = ["total_orders", "total_revenue", "delivered", "pending", "products_count", "bestsellers", "revenue_by_day"]
        missing_keys = [k for k in required_keys if k not in stats]
        if missing_keys:
            return print_test("Admin stats (valid)", False, f"Missing keys: {missing_keys}")
        
        # Validate types
        if not isinstance(stats["bestsellers"], list):
            return print_test("Admin stats (valid)", False, f"bestsellers should be array, got {type(stats['bestsellers'])}")
        
        if not isinstance(stats["revenue_by_day"], list):
            return print_test("Admin stats (valid)", False, f"revenue_by_day should be array, got {type(stats['revenue_by_day'])}")
        
        details = f"total_orders={stats['total_orders']}, total_revenue={stats['total_revenue']}, products_count={stats['products_count']}"
        return print_test("Admin stats (valid)", True, details)
    
    except Exception as e:
        return print_test("Admin stats (valid)", False, f"Exception: {str(e)}")

def test_admin_orders_list():
    """Test 6: GET /api/admin/orders with valid token should return orders sorted newest first"""
    print(f"\n{Colors.BLUE}Test 6: GET /api/admin/orders (list orders){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin orders list", False, "No admin token from login test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/admin/orders", headers=headers, timeout=10)
        
        if response.status_code != 200:
            return print_test("Admin orders list", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        orders = response.json()
        
        if not isinstance(orders, list):
            return print_test("Admin orders list", False, f"Expected array, got {type(orders)}")
        
        # Check if our created order is present
        if 'created_order_number' in globals():
            order_numbers = [o.get('order_number') for o in orders]
            if created_order_number not in order_numbers:
                return print_test("Admin orders list", False, f"Created order {created_order_number} not found in list")
        
        # Verify sorting (newest first) - check if created_at is in descending order
        if len(orders) > 1:
            for i in range(len(orders) - 1):
                if orders[i].get('created_at', '') < orders[i+1].get('created_at', ''):
                    return print_test("Admin orders list", False, "Orders not sorted newest first")
        
        return print_test("Admin orders list", True, f"Retrieved {len(orders)} orders, sorted correctly")
    
    except Exception as e:
        return print_test("Admin orders list", False, f"Exception: {str(e)}")

def test_admin_update_order_valid():
    """Test 7a: PATCH /api/admin/orders/{order_number} with valid status should update"""
    print(f"\n{Colors.BLUE}Test 7a: PATCH /api/admin/orders/{{order_number}} (valid status){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin update order (valid)", False, "No admin token from login test")
        
        if 'created_order_number' not in globals():
            return print_test("Admin update order (valid)", False, "No order_number from create order test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        update_data = {"status": "packed"}
        
        response = requests.patch(
            f"{BASE_URL}/admin/orders/{created_order_number}",
            json=update_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 200:
            return print_test("Admin update order (valid)", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        order = response.json()
        
        if order.get('status') != 'packed':
            return print_test("Admin update order (valid)", False, f"Expected status='packed', got '{order.get('status')}'")
        
        return print_test("Admin update order (valid)", True, f"Order {created_order_number} status updated to 'packed'")
    
    except Exception as e:
        return print_test("Admin update order (valid)", False, f"Exception: {str(e)}")

def test_admin_update_order_invalid_status():
    """Test 7b: PATCH /api/admin/orders/{order_number} with invalid status should return 400"""
    print(f"\n{Colors.BLUE}Test 7b: PATCH /api/admin/orders/{{order_number}} (invalid status){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin update order (invalid status)", False, "No admin token from login test")
        
        if 'created_order_number' not in globals():
            return print_test("Admin update order (invalid status)", False, "No order_number from create order test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        update_data = {"status": "bogus"}
        
        response = requests.patch(
            f"{BASE_URL}/admin/orders/{created_order_number}",
            json=update_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 400:
            return print_test("Admin update order (invalid status)", False, f"Expected status 400, got {response.status_code}")
        
        return print_test("Admin update order (invalid status)", True, "Correctly rejected invalid status with 400")
    
    except Exception as e:
        return print_test("Admin update order (invalid status)", False, f"Exception: {str(e)}")

def test_admin_update_order_not_found():
    """Test 7c: PATCH /api/admin/orders/{unknown_order} should return 404"""
    print(f"\n{Colors.BLUE}Test 7c: PATCH /api/admin/orders/CNC000000 (not found){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin update order (not found)", False, "No admin token from login test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        update_data = {"status": "packed"}
        
        response = requests.patch(
            f"{BASE_URL}/admin/orders/CNC000000",
            json=update_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 404:
            return print_test("Admin update order (not found)", False, f"Expected status 404, got {response.status_code}")
        
        return print_test("Admin update order (not found)", True, "Correctly returned 404 for unknown order")
    
    except Exception as e:
        return print_test("Admin update order (not found)", False, f"Exception: {str(e)}")

def test_admin_create_product():
    """Test 8: POST /api/admin/products should create a new product"""
    print(f"\n{Colors.BLUE}Test 8: POST /api/admin/products (create product){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin create product", False, "No admin token from login test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        product_data = {
            "name": "Test Treat",
            "category": "chocolates",
            "price": 99,
            "img": "https://example.com/x.jpg",
            "desc": "test",
            "tag": "New"
        }
        
        response = requests.post(
            f"{BASE_URL}/admin/products",
            json=product_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 200:
            return print_test("Admin create product", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        product = response.json()
        
        if "id" not in product:
            return print_test("Admin create product", False, f"Response missing 'id' field. Got: {product}")
        
        if product.get('name') != 'Test Treat':
            return print_test("Admin create product", False, f"Expected name='Test Treat', got '{product.get('name')}'")
        
        if product.get('price') != 99:
            return print_test("Admin create product", False, f"Expected price=99, got {product.get('price')}")
        
        # Store product ID for next tests
        global created_product_id
        created_product_id = product["id"]
        
        return print_test("Admin create product", True, f"Product created with id={created_product_id}")
    
    except Exception as e:
        return print_test("Admin create product", False, f"Exception: {str(e)}")

def test_admin_update_product_valid():
    """Test 9a: PUT /api/admin/products/{id} should update product"""
    print(f"\n{Colors.BLUE}Test 9a: PUT /api/admin/products/{{id}} (update price){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin update product (valid)", False, "No admin token from login test")
        
        if 'created_product_id' not in globals():
            return print_test("Admin update product (valid)", False, "No product_id from create product test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        product_data = {
            "name": "Test Treat",
            "category": "chocolates",
            "price": 149,  # Updated price
            "img": "https://example.com/x.jpg",
            "desc": "test",
            "tag": "New"
        }
        
        response = requests.put(
            f"{BASE_URL}/admin/products/{created_product_id}",
            json=product_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 200:
            return print_test("Admin update product (valid)", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        product = response.json()
        
        if product.get('price') != 149:
            return print_test("Admin update product (valid)", False, f"Expected price=149, got {product.get('price')}")
        
        return print_test("Admin update product (valid)", True, f"Product {created_product_id} price updated to 149")
    
    except Exception as e:
        return print_test("Admin update product (valid)", False, f"Exception: {str(e)}")

def test_admin_update_product_not_found():
    """Test 9b: PUT /api/admin/products/{unknown_id} should return 404"""
    print(f"\n{Colors.BLUE}Test 9b: PUT /api/admin/products/unknown_id (not found){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin update product (not found)", False, "No admin token from login test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        product_data = {
            "name": "Test",
            "category": "chocolates",
            "price": 100,
            "img": "https://example.com/x.jpg",
            "desc": "test"
        }
        
        response = requests.put(
            f"{BASE_URL}/admin/products/unknown_id_xyz",
            json=product_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 404:
            return print_test("Admin update product (not found)", False, f"Expected status 404, got {response.status_code}")
        
        return print_test("Admin update product (not found)", True, "Correctly returned 404 for unknown product")
    
    except Exception as e:
        return print_test("Admin update product (not found)", False, f"Exception: {str(e)}")

def test_admin_delete_product_valid():
    """Test 10a: DELETE /api/admin/products/{id} should delete product"""
    print(f"\n{Colors.BLUE}Test 10a: DELETE /api/admin/products/{{id}} (valid){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin delete product (valid)", False, "No admin token from login test")
        
        if 'created_product_id' not in globals():
            return print_test("Admin delete product (valid)", False, "No product_id from create product test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        response = requests.delete(
            f"{BASE_URL}/admin/products/{created_product_id}",
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 200:
            return print_test("Admin delete product (valid)", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        return print_test("Admin delete product (valid)", True, f"Product {created_product_id} deleted successfully")
    
    except Exception as e:
        return print_test("Admin delete product (valid)", False, f"Exception: {str(e)}")

def test_admin_delete_product_not_found():
    """Test 10b: DELETE /api/admin/products/{unknown_id} should return 404"""
    print(f"\n{Colors.BLUE}Test 10b: DELETE /api/admin/products/unknown_id (not found){Colors.RESET}")
    try:
        if 'admin_token' not in globals():
            return print_test("Admin delete product (not found)", False, "No admin token from login test")
        
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        response = requests.delete(
            f"{BASE_URL}/admin/products/unknown_id_xyz",
            headers=headers,
            timeout=10
        )
        
        if response.status_code != 404:
            return print_test("Admin delete product (not found)", False, f"Expected status 404, got {response.status_code}")
        
        return print_test("Admin delete product (not found)", True, "Correctly returned 404 for unknown product")
    
    except Exception as e:
        return print_test("Admin delete product (not found)", False, f"Exception: {str(e)}")

def main():
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.RESET}")
    print(f"{Colors.YELLOW}Admin Backend API Test Suite - Crackers and Checkers Store{Colors.RESET}")
    print(f"{Colors.YELLOW}Base URL: {BASE_URL}{Colors.RESET}")
    print(f"{Colors.YELLOW}Admin User: {ADMIN_USERNAME}{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.RESET}")
    
    results = []
    
    # Run all tests in sequence
    results.append(test_admin_login_valid())
    results.append(test_admin_login_invalid())
    results.append(test_admin_stats_no_auth())
    results.append(test_admin_stats_invalid_token())
    results.append(test_create_order_for_stats())
    results.append(test_admin_stats_valid())
    results.append(test_admin_orders_list())
    results.append(test_admin_update_order_valid())
    results.append(test_admin_update_order_invalid_status())
    results.append(test_admin_update_order_not_found())
    results.append(test_admin_create_product())
    results.append(test_admin_update_product_valid())
    results.append(test_admin_update_product_not_found())
    results.append(test_admin_delete_product_valid())
    results.append(test_admin_delete_product_not_found())
    
    # Summary
    passed = sum(results)
    total = len(results)
    
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.RESET}")
    print(f"{Colors.YELLOW}Test Summary{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.RESET}")
    print(f"Total Tests: {total}")
    print(f"{Colors.GREEN}Passed: {passed}{Colors.RESET}")
    print(f"{Colors.RED}Failed: {total - passed}{Colors.RESET}")
    
    if passed == total:
        print(f"\n{Colors.GREEN}🎉 All admin tests passed!{Colors.RESET}\n")
        sys.exit(0)
    else:
        print(f"\n{Colors.RED}❌ Some tests failed{Colors.RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
