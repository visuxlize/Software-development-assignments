-- =============================================
-- Coffee Shop Database - Analysis Queries
-- Course: CEIS236 - Database Systems
-- Author: Andres Marte
-- Date: November 2024
-- =============================================

-- =============================================
-- Query 1: Products costing less than $9
-- =============================================
-- Returns all products with a price below $9.00
SELECT * 
FROM products 
WHERE prodPrice < 9.00;

-- =============================================
-- Query 2: Inventory Statistics
-- =============================================
-- Calculates average, minimum, and maximum inventory levels
SELECT 
    AVG(prodInv) AS avg_inventory,
    MIN(prodInv) AS min_inventory,
    MAX(prodInv) AS max_inventory
FROM products;

-- =============================================
-- Query 3: Orders before October 1, 2024
-- =============================================
-- Counts the number of orders placed before October 1, 2024
SELECT COUNT(*) AS orders_before_october
FROM orders
WHERE orderDate < '2024-10-01';

-- =============================================
-- Query 4: Customers who ordered Product P1
-- =============================================
-- Returns last names of customers who have ordered product P1 (Morning Majesty)
SELECT DISTINCT c.custLastName
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
WHERE od.prodID = 'P1';

-- =============================================
-- Query 5: Customers with no orders
-- =============================================
-- Identifies customers who have not placed any orders
SELECT c.custID, c.custFirstName, c.custLastName
FROM customers c
LEFT JOIN orders o ON c.custID = o.custID
WHERE o.orderID IS NULL;
