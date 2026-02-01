-- =============================================
-- Advanced SQL Examples
-- Coffee Shop Database
-- =============================================
-- These queries demonstrate more advanced SQL concepts
-- and can be used for further learning and analysis
-- =============================================

-- =============================================
-- VIEWS
-- =============================================

-- View: Customer Order Summary
-- Provides a summary of orders for each customer
CREATE OR REPLACE VIEW customer_order_summary AS
SELECT 
    c.custID,
    c.custFirstName,
    c.custLastName,
    c.custEmail,
    COUNT(o.orderID) AS total_orders,
    COALESCE(SUM(od.quantity * p.prodPrice), 0) AS total_spent,
    MAX(o.orderDate) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.custID = o.custID
LEFT JOIN orderDetails od ON o.orderID = od.orderID
LEFT JOIN products p ON od.prodID = p.prodID
GROUP BY c.custID, c.custFirstName, c.custLastName, c.custEmail;

-- View: Product Sales Report
-- Shows sales performance for each product
CREATE OR REPLACE VIEW product_sales_report AS
SELECT 
    p.prodID,
    p.prodName,
    p.prodPrice,
    p.prodInv AS current_inventory,
    COALESCE(SUM(od.quantity), 0) AS total_sold,
    COALESCE(SUM(od.quantity * p.prodPrice), 0) AS total_revenue,
    COUNT(DISTINCT od.orderID) AS times_ordered
FROM products p
LEFT JOIN orderDetails od ON p.prodID = od.prodID
GROUP BY p.prodID, p.prodName, p.prodPrice, p.prodInv;

-- =============================================
-- COMPLEX QUERIES
-- =============================================

-- Query: Top 3 customers by spending
SELECT 
    c.custFirstName,
    c.custLastName,
    SUM(od.quantity * p.prodPrice) AS total_spent
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY c.custID, c.custFirstName, c.custLastName
ORDER BY total_spent DESC
LIMIT 3;

-- Query: Monthly sales summary
SELECT 
    DATE_FORMAT(o.orderDate, '%Y-%m') AS month,
    COUNT(DISTINCT o.orderID) AS total_orders,
    SUM(od.quantity) AS total_items_sold,
    SUM(od.quantity * p.prodPrice) AS monthly_revenue
FROM orders o
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY DATE_FORMAT(o.orderDate, '%Y-%m')
ORDER BY month;

-- Query: Products that need reordering (inventory < 100)
SELECT 
    prodID,
    prodName,
    prodInv AS current_inventory,
    CASE 
        WHEN prodInv < 50 THEN 'Critical'
        WHEN prodInv < 100 THEN 'Low'
        ELSE 'Adequate'
    END AS stock_status
FROM products
WHERE prodInv < 100
ORDER BY prodInv ASC;

-- Query: Customer purchase patterns
SELECT 
    c.custID,
    c.custFirstName,
    c.custLastName,
    GROUP_CONCAT(DISTINCT p.prodName ORDER BY p.prodName SEPARATOR ', ') AS products_purchased,
    COUNT(DISTINCT p.prodID) AS unique_products,
    SUM(od.quantity) AS total_items
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY c.custID, c.custFirstName, c.custLastName
ORDER BY unique_products DESC, total_items DESC;

-- Query: Average order value
SELECT 
    AVG(order_total) AS avg_order_value,
    MIN(order_total) AS min_order_value,
    MAX(order_total) AS max_order_value
FROM (
    SELECT 
        o.orderID,
        SUM(od.quantity * p.prodPrice) AS order_total
    FROM orders o
    INNER JOIN orderDetails od ON o.orderID = od.orderID
    INNER JOIN products p ON od.prodID = p.prodID
    GROUP BY o.orderID
) AS order_totals;

-- =============================================
-- SUBQUERIES
-- =============================================

-- Query: Customers who spent more than average
SELECT 
    c.custID,
    c.custFirstName,
    c.custLastName,
    SUM(od.quantity * p.prodPrice) AS total_spent
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY c.custID, c.custFirstName, c.custLastName
HAVING total_spent > (
    SELECT AVG(customer_total)
    FROM (
        SELECT SUM(od2.quantity * p2.prodPrice) AS customer_total
        FROM customers c2
        INNER JOIN orders o2 ON c2.custID = o2.custID
        INNER JOIN orderDetails od2 ON o2.orderID = od2.orderID
        INNER JOIN products p2 ON od2.prodID = p2.prodID
        GROUP BY c2.custID
    ) AS customer_spending
);

-- Query: Products never ordered
SELECT p.prodID, p.prodName, p.prodPrice, p.prodInv
FROM products p
WHERE p.prodID NOT IN (
    SELECT DISTINCT prodID 
    FROM orderDetails
);

-- =============================================
-- WINDOW FUNCTIONS (MySQL 8.0+)
-- =============================================

-- Query: Rank customers by total spending
SELECT 
    c.custID,
    c.custFirstName,
    c.custLastName,
    SUM(od.quantity * p.prodPrice) AS total_spent,
    RANK() OVER (ORDER BY SUM(od.quantity * p.prodPrice) DESC) AS spending_rank,
    PERCENT_RANK() OVER (ORDER BY SUM(od.quantity * p.prodPrice) DESC) AS percentile
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY c.custID, c.custFirstName, c.custLastName;

-- Query: Running total of sales by date
SELECT 
    o.orderDate,
    SUM(od.quantity * p.prodPrice) AS daily_sales,
    SUM(SUM(od.quantity * p.prodPrice)) OVER (ORDER BY o.orderDate) AS running_total
FROM orders o
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY o.orderDate
ORDER BY o.orderDate;

-- =============================================
-- COMMON TABLE EXPRESSIONS (CTEs)
-- =============================================

-- Query: Customer segmentation using CTE
WITH customer_stats AS (
    SELECT 
        c.custID,
        c.custFirstName,
        c.custLastName,
        COUNT(o.orderID) AS order_count,
        COALESCE(SUM(od.quantity * p.prodPrice), 0) AS total_spent
    FROM customers c
    LEFT JOIN orders o ON c.custID = o.custID
    LEFT JOIN orderDetails od ON o.orderID = od.orderID
    LEFT JOIN products p ON od.prodID = p.prodID
    GROUP BY c.custID, c.custFirstName, c.custLastName
)
SELECT 
    custID,
    custFirstName,
    custLastName,
    order_count,
    total_spent,
    CASE 
        WHEN total_spent >= 100 THEN 'Premium'
        WHEN total_spent >= 50 THEN 'Standard'
        WHEN total_spent > 0 THEN 'Basic'
        ELSE 'Inactive'
    END AS customer_tier
FROM customer_stats
ORDER BY total_spent DESC;

-- =============================================
-- ANALYTICS QUERIES
-- =============================================

-- Query: Product popularity index
-- Combines number of orders and quantity sold
WITH product_metrics AS (
    SELECT 
        p.prodID,
        p.prodName,
        COUNT(DISTINCT od.orderID) AS order_frequency,
        SUM(od.quantity) AS total_quantity,
        SUM(od.quantity * p.prodPrice) AS revenue
    FROM products p
    LEFT JOIN orderDetails od ON p.prodID = od.prodID
    GROUP BY p.prodID, p.prodName
)
SELECT 
    prodID,
    prodName,
    order_frequency,
    total_quantity,
    revenue,
    (order_frequency * 0.5 + total_quantity * 0.3 + revenue * 0.2) AS popularity_score
FROM product_metrics
ORDER BY popularity_score DESC;

-- Query: Customer retention analysis
-- Shows when customers placed their orders
SELECT 
    c.custID,
    c.custFirstName,
    c.custLastName,
    COUNT(o.orderID) AS total_orders,
    MIN(o.orderDate) AS first_order,
    MAX(o.orderDate) AS last_order,
    DATEDIFF(MAX(o.orderDate), MIN(o.orderDate)) AS customer_lifetime_days
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
GROUP BY c.custID, c.custFirstName, c.custLastName
HAVING COUNT(o.orderID) > 1
ORDER BY customer_lifetime_days DESC;

-- =============================================
-- UTILITY QUERIES
-- =============================================

-- Query: Database statistics
SELECT 
    'Products' AS table_name, COUNT(*) AS record_count FROM products
UNION ALL
SELECT 'Customers', COUNT(*) FROM customers
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'OrderDetails', COUNT(*) FROM orderDetails;

-- Query: Data validation - Check for orphaned records
-- Should return no results if data integrity is maintained
SELECT 'Orphaned OrderDetails (no matching Order)' AS issue, COUNT(*) AS count
FROM orderDetails od
LEFT JOIN orders o ON od.orderID = o.orderID
WHERE o.orderID IS NULL
UNION ALL
SELECT 'Orphaned Orders (no matching Customer)', COUNT(*)
FROM orders o
LEFT JOIN customers c ON o.custID = c.custID
WHERE c.custID IS NULL;

-- =============================================
-- NOTES
-- =============================================
-- These advanced queries demonstrate:
-- 1. Views for reusable queries
-- 2. Complex JOINs and aggregations
-- 3. Subqueries and CTEs
-- 4. Window functions (MySQL 8.0+)
-- 5. Ranking and analytics
-- 6. Business intelligence queries
-- 7. Data validation queries
--
-- Use these as learning examples or building blocks
-- for more complex analysis of the coffee shop data.
-- =============================================
