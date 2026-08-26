#!/usr/bin/env python3
"""
Backend API Test Suite for Crackers and Checkers Store
Tests all product and order endpoints with comprehensive validation
"""

import requests
import json
import sys
from typing import Dict, Any, List

# Base URL from frontend/.env
BASE_URL = "https://brand-webstore.preview.emergentagent.com/api"

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

def test_get_all_products():
    """Test 1: GET /api/products should return exactly 35 seeded products"""
    print(f"\n{Colors.BLUE}Test 1: GET /api/products (all products){Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/products", timeout=10)
        
        if response.status_code != 200:
            return print_test("GET /api/products", False, f"Expected status 200, got {response.status_code}")
        
        products = response.json()
        
        if not isinstance(products, list):
            return print_test("GET /api/products", False, f"Expected list, got {type(products)}")
        
        if len(products) != 35:
            return print_test("GET /api/products", False, f"Expected 35 products, got {len(products)}")
        
        # Validate first product structure
        if products:
            p = products[0]
            required_fields = ['id', 'name', 'category', 'price', 'img', 'desc', 'rating', 'reviews']
            missing = [f for f in required_fields if f not in p]
            if missing:
                return print_test("GET /api/products", False, f"Missing fields in product: {missing}")
        
        return print_test("GET /api/products", True, f"Returned {len(products)} products with correct structure")
    
    except Exception as e:
        return print_test("GET /api/products", False, f"Exception: {str(e)}")

def test_filter_by_category_cakes():
    """Test 2: GET /api/products?category=cakes should return only cakes (expect 5)"""
    print(f"\n{Colors.BLUE}Test 2: GET /api/products?category=cakes{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/products", params={"category": "cakes"}, timeout=10)
        
        if response.status_code != 200:
            return print_test("Filter by category=cakes", False, f"Expected status 200, got {response.status_code}")
        
        products = response.json()
        
        if len(products) != 5:
            return print_test("Filter by category=cakes", False, f"Expected 5 cakes, got {len(products)}")
        
        # Verify all products are cakes
        non_cakes = [p['name'] for p in products if p.get('category') != 'cakes']
        if non_cakes:
            return print_test("Filter by category=cakes", False, f"Found non-cake products: {non_cakes}")
        
        return print_test("Filter by category=cakes", True, f"Returned {len(products)} cake products")
    
    except Exception as e:
        return print_test("Filter by category=cakes", False, f"Exception: {str(e)}")

def test_filter_by_category_chocolate_crackers():
    """Test 3: GET /api/products?category=chocolate-crackers should return 10 products"""
    print(f"\n{Colors.BLUE}Test 3: GET /api/products?category=chocolate-crackers{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/products", params={"category": "chocolate-crackers"}, timeout=10)
        
        if response.status_code != 200:
            return print_test("Filter by category=chocolate-crackers", False, f"Expected status 200, got {response.status_code}")
        
        products = response.json()
        
        if len(products) != 10:
            return print_test("Filter by category=chocolate-crackers", False, f"Expected 10 chocolate-crackers, got {len(products)}")
        
        # Verify all products are chocolate-crackers
        non_choc = [p['name'] for p in products if p.get('category') != 'chocolate-crackers']
        if non_choc:
            return print_test("Filter by category=chocolate-crackers", False, f"Found non-chocolate-cracker products: {non_choc}")
        
        return print_test("Filter by category=chocolate-crackers", True, f"Returned {len(products)} chocolate-cracker products")
    
    except Exception as e:
        return print_test("Filter by category=chocolate-crackers", False, f"Exception: {str(e)}")

def test_get_product_by_id():
    """Test 4: GET /api/products/p1 should return 'Classic Chocolate' product"""
    print(f"\n{Colors.BLUE}Test 4: GET /api/products/p1{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/products/p1", timeout=10)
        
        if response.status_code != 200:
            return print_test("GET /api/products/p1", False, f"Expected status 200, got {response.status_code}")
        
        product = response.json()
        
        if product.get('id') != 'p1':
            return print_test("GET /api/products/p1", False, f"Expected id='p1', got '{product.get('id')}'")
        
        if product.get('name') != 'Classic Chocolate':
            return print_test("GET /api/products/p1", False, f"Expected name='Classic Chocolate', got '{product.get('name')}'")
        
        return print_test("GET /api/products/p1", True, f"Returned product: {product.get('name')}")
    
    except Exception as e:
        return print_test("GET /api/products/p1", False, f"Exception: {str(e)}")

def test_get_nonexistent_product():
    """Test 5: GET /api/products/nonexistent should return 404"""
    print(f"\n{Colors.BLUE}Test 5: GET /api/products/nonexistent (404 test){Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/products/nonexistent", timeout=10)
        
        if response.status_code != 404:
            return print_test("GET /api/products/nonexistent", False, f"Expected status 404, got {response.status_code}")
        
        return print_test("GET /api/products/nonexistent", True, "Correctly returned 404")
    
    except Exception as e:
        return print_test("GET /api/products/nonexistent", False, f"Exception: {str(e)}")

def test_create_order_valid():
    """Test 6: POST /api/orders with valid data should create order with COD"""
    print(f"\n{Colors.BLUE}Test 6: POST /api/orders (valid order){Colors.RESET}")
    try:
        order_data = {
            "customer": {
                "name": "Asha Patel",
                "email": "asha@test.com",
                "phone": "9876543210",
                "address": "12 Sweet Lane",
                "city": "Pune",
                "pin": "411001"
            },
            "items": [
                {
                    "id": "p1",
                    "name": "Classic Chocolate",
                    "price": 120,
                    "qty": 2
                }
            ],
            "subtotal": 240,
            "shipping": 40
        }
        
        response = requests.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        
        if response.status_code != 200:
            return print_test("POST /api/orders (valid)", False, f"Expected status 200, got {response.status_code}. Response: {response.text}")
        
        order = response.json()
        
        # Validate payment_method
        if order.get('payment_method') != 'cod':
            return print_test("POST /api/orders (valid)", False, f"Expected payment_method='cod', got '{order.get('payment_method')}'")
        
        # Validate status
        if order.get('status') != 'confirmed':
            return print_test("POST /api/orders (valid)", False, f"Expected status='confirmed', got '{order.get('status')}'")
        
        # Validate order_number format
        order_number = order.get('order_number', '')
        if not order_number.startswith('CNC') or len(order_number) != 9:
            return print_test("POST /api/orders (valid)", False, f"Expected order_number format 'CNC######', got '{order_number}'")
        
        # Validate total
        expected_total = 280  # 240 + 40
        if order.get('total') != expected_total:
            return print_test("POST /api/orders (valid)", False, f"Expected total={expected_total}, got {order.get('total')}")
        
        # Store order_number for next test
        global created_order_number
        created_order_number = order_number
        
        return print_test("POST /api/orders (valid)", True, f"Order created: {order_number}, total={order.get('total')}")
    
    except Exception as e:
        return print_test("POST /api/orders (valid)", False, f"Exception: {str(e)}")

def test_create_order_empty_items():
    """Test 7: POST /api/orders with empty items should return 400"""
    print(f"\n{Colors.BLUE}Test 7: POST /api/orders (empty items - should fail){Colors.RESET}")
    try:
        order_data = {
            "customer": {
                "name": "Raj Kumar",
                "email": "raj@test.com",
                "phone": "9876543210",
                "address": "15 Main Street",
                "city": "Mumbai",
                "pin": "400001"
            },
            "items": [],
            "subtotal": 0,
            "shipping": 0
        }
        
        response = requests.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        
        if response.status_code != 400:
            return print_test("POST /api/orders (empty items)", False, f"Expected status 400, got {response.status_code}")
        
        return print_test("POST /api/orders (empty items)", True, "Correctly rejected empty cart with 400")
    
    except Exception as e:
        return print_test("POST /api/orders (empty items)", False, f"Exception: {str(e)}")

def test_get_order_by_number():
    """Test 8: GET /api/orders/{order_number} should return the created order"""
    print(f"\n{Colors.BLUE}Test 8: GET /api/orders/{{order_number}}{Colors.RESET}")
    try:
        if 'created_order_number' not in globals():
            return print_test("GET /api/orders/{order_number}", False, "No order_number from previous test")
        
        response = requests.get(f"{BASE_URL}/orders/{created_order_number}", timeout=10)
        
        if response.status_code != 200:
            return print_test("GET /api/orders/{order_number}", False, f"Expected status 200, got {response.status_code}")
        
        order = response.json()
        
        if order.get('order_number') != created_order_number:
            return print_test("GET /api/orders/{order_number}", False, f"Order number mismatch")
        
        if order.get('payment_method') != 'cod':
            return print_test("GET /api/orders/{order_number}", False, f"Expected payment_method='cod'")
        
        return print_test("GET /api/orders/{order_number}", True, f"Retrieved order: {created_order_number}")
    
    except Exception as e:
        return print_test("GET /api/orders/{order_number}", False, f"Exception: {str(e)}")

def test_get_nonexistent_order():
    """Test 9: GET /api/orders/CNC000000 should return 404"""
    print(f"\n{Colors.BLUE}Test 9: GET /api/orders/CNC000000 (404 test){Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/orders/CNC000000", timeout=10)
        
        if response.status_code != 404:
            return print_test("GET /api/orders/CNC000000", False, f"Expected status 404, got {response.status_code}")
        
        return print_test("GET /api/orders/CNC000000", True, "Correctly returned 404 for unknown order")
    
    except Exception as e:
        return print_test("GET /api/orders/CNC000000", False, f"Exception: {str(e)}")

def main():
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.RESET}")
    print(f"{Colors.YELLOW}Backend API Test Suite - Crackers and Checkers Store{Colors.RESET}")
    print(f"{Colors.YELLOW}Base URL: {BASE_URL}{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.RESET}")
    
    results = []
    
    # Run all tests
    results.append(test_get_all_products())
    results.append(test_filter_by_category_cakes())
    results.append(test_filter_by_category_chocolate_crackers())
    results.append(test_get_product_by_id())
    results.append(test_get_nonexistent_product())
    results.append(test_create_order_valid())
    results.append(test_create_order_empty_items())
    results.append(test_get_order_by_number())
    results.append(test_get_nonexistent_order())
    
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
        print(f"\n{Colors.GREEN}🎉 All tests passed!{Colors.RESET}\n")
        sys.exit(0)
    else:
        print(f"\n{Colors.RED}❌ Some tests failed{Colors.RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
