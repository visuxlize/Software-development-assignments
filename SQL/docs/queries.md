# Database Queries Documentation

This document provides detailed explanations of the analytical queries used in the Coffee Shop Database System.

## Query Descriptions

### Query 1: Products Costing Less Than $9

**Purpose:** Identify affordable products for budget-conscious customers or promotional campaigns.

**SQL:**
```sql
SELECT * 
FROM products 
WHERE prodPrice < 9.00;
```

**Explanation:**
- Uses a simple WHERE clause with a comparison operator
- Returns all columns for products priced below $9.00
- Useful for inventory management and pricing strategies

**Expected Results:**
- Morning Majesty ($8.99)
- Sunrise Bliss ($8.99)
- Glory Brew ($7.99)

---

### Query 2: Inventory Statistics

**Purpose:** Provide management with key inventory metrics for stock control and ordering decisions.

**SQL:**
```sql
SELECT 
    AVG(prodInv) AS avg_inventory,
    MIN(prodInv) AS min_inventory,
    MAX(prodInv) AS max_inventory
FROM products;
```

**Explanation:**
- Uses aggregate functions (AVG, MIN, MAX)
- Provides statistical overview of inventory levels
- Helps identify products that may need reordering
- Assists in understanding inventory distribution

**Metrics Calculated:**
- Average inventory across all products
- Lowest inventory level (potential stock-out risk)
- Highest inventory level (potential overstock)

---

### Query 3: Orders Before October 1, 2024

**Purpose:** Count orders placed before a specific date for reporting and analysis.

**SQL:**
```sql
SELECT COUNT(*) AS orders_before_october
FROM orders
WHERE orderDate < '2024-10-01';
```

**Explanation:**
- Uses COUNT aggregate function to total rows
- Filters by date using comparison operator
- Useful for quarterly or periodic reporting
- Can be modified to analyze different time periods

**Business Applications:**
- Monthly sales reporting
- Quarterly performance analysis
- Historical trend analysis

---

### Query 4: Customers Who Ordered Product P1

**Purpose:** Identify customers who have purchased a specific product for targeted marketing.

**SQL:**
```sql
SELECT DISTINCT c.custLastName
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
WHERE od.prodID = 'P1';
```

**Explanation:**
- Demonstrates multi-table JOIN operations
- Uses INNER JOIN to connect three related tables
- DISTINCT keyword eliminates duplicate customer names
- Filters results to a specific product (P1 - Morning Majesty)

**Join Sequence:**
1. customers → orders (via custID)
2. orders → orderDetails (via orderID)
3. Filter by prodID in orderDetails

**Marketing Applications:**
- Customer segmentation
- Product preference analysis
- Targeted email campaigns
- Cross-selling opportunities

---

### Query 5: Customers With No Orders

**Purpose:** Identify inactive customers for retention campaigns or database cleanup.

**SQL:**
```sql
SELECT c.custID, c.custFirstName, c.custLastName
FROM customers c
LEFT JOIN orders o ON c.custID = o.custID
WHERE o.orderID IS NULL;
```

**Explanation:**
- Uses LEFT JOIN to include all customers, even without orders
- WHERE clause filters for NULL values in orders table
- Identifies customers in database who have never purchased
- Critical for customer relationship management

**LEFT JOIN Behavior:**
- Keeps all rows from customers table (left table)
- Matches with orders where possible
- Returns NULL for order columns when no match exists
- WHERE o.orderID IS NULL captures the unmatched rows

**Business Applications:**
- Customer re-engagement campaigns
- Database hygiene (remove inactive accounts)
- Conversion rate analysis (registered vs. purchasing customers)
- Marketing effectiveness evaluation

---

## Query Performance Considerations

### Indexing Strategy

For optimal performance, consider these indexes:

```sql
-- Primary keys are automatically indexed
-- Additional indexes for foreign keys
CREATE INDEX idx_orders_custid ON orders(custID);
CREATE INDEX idx_orderdetails_orderid ON orderDetails(orderID);
CREATE INDEX idx_orderdetails_prodid ON orderDetails(prodID);

-- Index for date-based queries
CREATE INDEX idx_orders_date ON orders(orderDate);

-- Index for price-based queries
CREATE INDEX idx_products_price ON products(prodPrice);
```

### Query Optimization Tips

1. **Use EXPLAIN** to analyze query execution plans
2. **Avoid SELECT *** in production; specify needed columns
3. **Use appropriate data types** to minimize storage and improve performance
4. **Normalize data** to reduce redundancy (already implemented)
5. **Monitor slow queries** and optimize as needed

## Advanced Query Extensions

### Query 1 Extension: Price Range Analysis
```sql
SELECT 
    CASE 
        WHEN prodPrice < 8.00 THEN 'Budget'
        WHEN prodPrice BETWEEN 8.00 AND 9.00 THEN 'Standard'
        ELSE 'Premium'
    END AS price_category,
    COUNT(*) AS product_count,
    AVG(prodPrice) AS avg_price
FROM products
GROUP BY price_category;
```

### Query 4 Extension: Product Popularity
```sql
SELECT 
    p.prodName,
    COUNT(DISTINCT o.custID) AS unique_customers,
    SUM(od.quantity) AS total_quantity_sold
FROM products p
INNER JOIN orderDetails od ON p.prodID = od.prodID
INNER JOIN orders o ON od.orderID = o.orderID
GROUP BY p.prodID, p.prodName
ORDER BY unique_customers DESC;
```

### Query 5 Extension: Customer Activity Analysis
```sql
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
ORDER BY order_count DESC, total_spent DESC;
```

---

## Conclusion

These queries demonstrate fundamental SQL concepts including:
- SELECT statements with WHERE clauses
- Aggregate functions (COUNT, AVG, MIN, MAX)
- INNER JOIN and LEFT JOIN operations
- Filtering with comparison operators and NULL checks
- Date-based filtering
- Multi-table relationships

Each query serves a specific business purpose and can be extended or modified to meet evolving analytical needs.
