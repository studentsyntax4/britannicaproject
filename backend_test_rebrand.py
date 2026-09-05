#!/usr/bin/env python3
"""
Backend API Testing for Tarri and Treacle Rebrand
Tests the backend with NEW product data after rebranding
"""

import requests
import json

# Use external URL from frontend/.env
BASE_URL = "https://brand-webstore.preview.emergentagent.com/api"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "Wemmbu"

def test_1_get_all_products():
    """Test 1: GET /api/products → should return exactly 14 products"""
    print("\n" + "="*80)
    print("TEST 1: GET /api/products (should return 14 products)")
    print("="*80)
    
    response = requests.get(f"{BASE_URL}/products")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        print(f"Response: {response.text}")
        return False
    
    products = response.json()
    print(f"Total products returned: {len(products)}")
    
    if len(products) != 14:
        print(f"❌ FAILED: Expected exactly 14 products, got {len(products)}")
        return False
    
    # Check categories
    categories = {}
    for product in products:
        cat = product.get('category', 'unknown')
        categories[cat] = categories.get(cat, 0) + 1
    
    print(f"\nCategories found:")
    for cat, count in categories.items():
        print(f"  - {cat}: {count} products")
    
    # Verify expected categories
    expected_categories = {
        'tarri-poha': 4,
        'snacks': 6,
        'barfi': 4
    }
    
    for cat, expected_count in expected_categories.items():
        if cat not in categories:
            print(f"❌ FAILED: Category '{cat}' not found")
            return False
        if categories[cat] != expected_count:
            print(f"❌ FAILED: Category '{cat}' has {categories[cat]} products, expected {expected_count}")
            return False
    
    # Check for specific product names
    product_names = [p.get('name', '') for p in products]
    expected_names = ["Classic Tarri Poha", "Nagpur Sev Puri", "Classic Santra Burfi"]
    
    print(f"\nChecking for expected product names:")
    for name in expected_names:
        if name in product_names:
            print(f"  ✓ Found: {name}")
        else:
            print(f"  ❌ Missing: {name}")
            print(f"  Available names: {product_names}")
            return False
    
    print("✅ PASSED: All 14 products with correct categories and names")
    return True


def test_2_category_filters():
    """Test 2: Category filters for tarri-poha and barfi"""
    print("\n" + "="*80)
    print("TEST 2: Category Filters")
    print("="*80)
    
    # Test tarri-poha category
    print("\nTesting: GET /api/products?category=tarri-poha")
    response = requests.get(f"{BASE_URL}/products?category=tarri-poha")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        return False
    
    products = response.json()
    print(f"Products returned: {len(products)}")
    
    if len(products) != 4:
        print(f"❌ FAILED: Expected 4 tarri-poha products, got {len(products)}")
        return False
    
    # Verify all are tarri-poha
    for p in products:
        if p.get('category') != 'tarri-poha':
            print(f"❌ FAILED: Product {p.get('name')} has category {p.get('category')}, expected tarri-poha")
            return False
    
    print("✅ PASSED: tarri-poha filter returns 4 products")
    
    # Test barfi category
    print("\nTesting: GET /api/products?category=barfi")
    response = requests.get(f"{BASE_URL}/products?category=barfi")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        return False
    
    products = response.json()
    print(f"Products returned: {len(products)}")
    
    if len(products) != 4:
        print(f"❌ FAILED: Expected 4 barfi products, got {len(products)}")
        return False
    
    # Verify all are barfi
    for p in products:
        if p.get('category') != 'barfi':
            print(f"❌ FAILED: Product {p.get('name')} has category {p.get('category')}, expected barfi")
            return False
    
    print("✅ PASSED: barfi filter returns 4 products")
    return True


def test_3_single_product_retrieval():
    """Test 3: GET /api/products/p1 and 404 handling"""
    print("\n" + "="*80)
    print("TEST 3: Single Product Retrieval")
    print("="*80)
    
    # Test p1 - should be "Classic Tarri Poha" at price 90
    print("\nTesting: GET /api/products/p1")
    response = requests.get(f"{BASE_URL}/products/p1")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        print(f"Response: {response.text}")
        return False
    
    product = response.json()
    print(f"Product: {json.dumps(product, indent=2)}")
    
    if product.get('name') != "Classic Tarri Poha":
        print(f"❌ FAILED: Expected name 'Classic Tarri Poha', got '{product.get('name')}'")
        return False
    
    if product.get('price') != 90:
        print(f"❌ FAILED: Expected price 90, got {product.get('price')}")
        return False
    
    print("✅ PASSED: p1 is 'Classic Tarri Poha' at price 90")
    
    # Test 404 for non-existent product
    print("\nTesting: GET /api/products/nope (should return 404)")
    response = requests.get(f"{BASE_URL}/products/nope")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 404:
        print(f"❌ FAILED: Expected 404, got {response.status_code}")
        return False
    
    print("✅ PASSED: Non-existent product returns 404")
    return True


def test_4_create_cod_order():
    """Test 4: POST /api/orders with COD"""
    print("\n" + "="*80)
    print("TEST 4: Create COD Order")
    print("="*80)
    
    order_data = {
        "customer": {
            "name": "Rajesh Kumar",
            "email": "rajesh@example.com",
            "phone": "9876543210",
            "address": "123 MG Road, Nagpur, Maharashtra 440001"
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
        "shipping": 0,
        "payment_method": "cod"
    }
    
    print(f"\nPosting order: {json.dumps(order_data, indent=2)}")
    response = requests.post(f"{BASE_URL}/orders", json=order_data)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        print(f"Response: {response.text}")
        return False
    
    order = response.json()
    print(f"\nCreated order: {json.dumps(order, indent=2)}")
    
    # Verify order details
    if order.get('payment_method') != 'cod':
        print(f"❌ FAILED: Expected payment_method 'cod', got '{order.get('payment_method')}'")
        return False
    
    if order.get('status') != 'confirmed':
        print(f"❌ FAILED: Expected status 'confirmed', got '{order.get('status')}'")
        return False
    
    order_number = order.get('order_number', '')
    if not order_number.startswith('CNC'):
        print(f"❌ FAILED: Expected order_number to start with 'CNC', got '{order_number}'")
        return False
    
    if len(order_number) != 9:  # CNC + 6 digits
        print(f"❌ FAILED: Expected order_number format 'CNC######', got '{order_number}'")
        return False
    
    if order.get('total') != 180:
        print(f"❌ FAILED: Expected total 180, got {order.get('total')}")
        return False
    
    print(f"✅ PASSED: COD order created successfully with order_number {order_number}")
    return True


def test_5_admin_login_and_stats():
    """Test 5: Admin login and stats verification"""
    print("\n" + "="*80)
    print("TEST 5: Admin Login and Stats")
    print("="*80)
    
    # Test admin login
    print(f"\nTesting: POST /api/admin/login with {ADMIN_USERNAME}/{ADMIN_PASSWORD}")
    login_data = {
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    }
    
    response = requests.post(f"{BASE_URL}/admin/login", json=login_data)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        print(f"Response: {response.text}")
        return False
    
    auth_response = response.json()
    token = auth_response.get('token')
    
    if not token:
        print(f"❌ FAILED: No token in response")
        print(f"Response: {json.dumps(auth_response, indent=2)}")
        return False
    
    print(f"✅ Token received: {token[:20]}...")
    
    # Test stats with token
    print("\nTesting: GET /api/admin/stats with token")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/admin/stats", headers=headers)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"❌ FAILED: Expected 200, got {response.status_code}")
        print(f"Response: {response.text}")
        return False
    
    stats = response.json()
    print(f"\nStats: {json.dumps(stats, indent=2)}")
    
    products_count = stats.get('products_count')
    if products_count != 14:
        print(f"❌ FAILED: Expected products_count 14, got {products_count}")
        return False
    
    print("✅ PASSED: Admin stats shows products_count == 14")
    
    # Test without token (should return 401)
    print("\nTesting: GET /api/admin/stats without token (should return 401)")
    response = requests.get(f"{BASE_URL}/admin/stats")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 401:
        print(f"❌ FAILED: Expected 401, got {response.status_code}")
        return False
    
    print("✅ PASSED: Stats without token returns 401")
    return True


def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("TARRI AND TREACLE REBRAND - BACKEND API TESTING")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Credentials: {ADMIN_USERNAME} / {ADMIN_PASSWORD}")
    
    tests = [
        ("Test 1: GET /api/products (14 products)", test_1_get_all_products),
        ("Test 2: Category filters", test_2_category_filters),
        ("Test 3: Single product retrieval", test_3_single_product_retrieval),
        ("Test 4: Create COD order", test_4_create_cod_order),
        ("Test 5: Admin login and stats", test_5_admin_login_and_stats),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"\n❌ EXCEPTION in {test_name}: {str(e)}")
            import traceback
            traceback.print_exc()
            results.append((test_name, False))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED! Backend is working correctly with new Tarri and Treacle data.")
    else:
        print(f"\n⚠️  {total - passed} test(s) failed. Please review the failures above.")
    
    return passed == total


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
