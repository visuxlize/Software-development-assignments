# Quick Reference Guide

## Table of Contents
- [Quick Start](#quick-start)
- [Common Queries](#common-queries)
- [Database Operations](#database-operations)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Setup Database
```bash
# Run the automated setup script
./setup.sh coffee_shop root

# Or manually
mysql -u root -p -e "CREATE DATABASE coffee_shop;"
mysql -u root -p coffee_shop < sql/01_schema.sql
mysql -u root -p coffee_shop < sql/02_data.sql
```

### Connect to Database
```bash
mysql -u root -p coffee_shop
```

### Verify Installation
```sql
SHOW TABLES;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM orders;
```

## Common Queries

### View All Data
```sql
-- View all products
SELECT * FROM products;

-- View all customers
SELECT * FROM customers;

-- View all orders
SELECT * FROM orders;

-- View all order details
SELECT * FROM orderDetails;
```

### Insert New Records
```sql
-- Add a new product
INSERT INTO products VALUES('P5', 'Midnight Roast', 'Extra dark roast', 10.99, 50);

-- Add a new customer
INSERT INTO customers VALUES('C6', 'Alice', 'Johnson', 'alice@example.com', '444-444-4444');

-- Add a new order
INSERT INTO orders VALUES('Ord5', '2024-11-15', 'C6');

-- Add order details
INSERT INTO orderDetails VALUES('Ord5', 'P5', 2);
```

### Update Records
```sql
-- Update product price
UPDATE products 
SET prodPrice = 9.49 
WHERE prodID = 'P1';

-- Update customer email
UPDATE customers 
SET custEmail = 'newemail@example.com' 
WHERE custID = 'C1';

-- Update inventory
UPDATE products 
SET prodInv = prodInv - 10 
WHERE prodID = 'P1';
```

### Delete Records
```sql
-- Delete order details first (foreign key constraint)
DELETE FROM orderDetails WHERE orderID = 'Ord5';

-- Then delete the order
DELETE FROM orders WHERE orderID = 'Ord5';

-- Delete a customer (only if no orders)
DELETE FROM customers WHERE custID = 'C6';
```

## Database Operations

### Backup Database
```bash
# Full backup
mysqldump -u root -p coffee_shop > backup.sql

# Backup with timestamp
mysqldump -u root -p coffee_shop > backup_$(date +%Y%m%d_%H%M%S).sql

# Compressed backup
mysqldump -u root -p coffee_shop | gzip > backup.sql.gz
```

### Restore Database
```bash
# Restore from backup
mysql -u root -p coffee_shop < backup.sql

# Restore compressed backup
gunzip < backup.sql.gz | mysql -u root -p coffee_shop
```

### Export Data to CSV
```sql
-- Export products to CSV
SELECT * FROM products
INTO OUTFILE '/tmp/products.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

### Import Data from CSV
```sql
-- Import products from CSV
LOAD DATA INFILE '/tmp/products.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

## Useful Queries

### Find Specific Information
```sql
-- Find products by price range
SELECT * FROM products 
WHERE prodPrice BETWEEN 8.00 AND 9.00;

-- Find customers by name
SELECT * FROM customers 
WHERE custLastName LIKE 'M%';

-- Find orders by date range
SELECT * FROM orders 
WHERE orderDate BETWEEN '2024-09-01' AND '2024-09-30';
```

### Join Queries
```sql
-- Customer orders with details
SELECT 
    c.custFirstName,
    c.custLastName,
    o.orderID,
    o.orderDate,
    p.prodName,
    od.quantity
FROM customers c
INNER JOIN orders o ON c.custID = o.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
ORDER BY o.orderDate DESC;

-- Order totals
SELECT 
    o.orderID,
    o.orderDate,
    c.custFirstName,
    c.custLastName,
    SUM(od.quantity * p.prodPrice) AS order_total
FROM orders o
INNER JOIN customers c ON o.custID = c.custID
INNER JOIN orderDetails od ON o.orderID = od.orderID
INNER JOIN products p ON od.prodID = p.prodID
GROUP BY o.orderID, o.orderDate, c.custFirstName, c.custLastName;
```

### Aggregation Queries
```sql
-- Count orders per customer
SELECT 
    c.custFirstName,
    c.custLastName,
    COUNT(o.orderID) AS order_count
FROM customers c
LEFT JOIN orders o ON c.custID = o.custID
GROUP BY c.custID, c.custFirstName, c.custLastName;

-- Total sales per product
SELECT 
    p.prodName,
    SUM(od.quantity) AS total_sold,
    SUM(od.quantity * p.prodPrice) AS revenue
FROM products p
LEFT JOIN orderDetails od ON p.prodID = od.prodID
GROUP BY p.prodID, p.prodName
ORDER BY revenue DESC;
```

## Troubleshooting

### Common Errors

**Error: Access denied**
```bash
# Check user permissions
SHOW GRANTS FOR 'username'@'localhost';

# Grant necessary permissions
GRANT ALL PRIVILEGES ON coffee_shop.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

**Error: Table doesn't exist**
```bash
# List all tables
SHOW TABLES;

# Check you're in the right database
SELECT DATABASE();

# Switch to correct database
USE coffee_shop;
```

**Error: Foreign key constraint fails**
```sql
-- Check foreign key constraints
SHOW CREATE TABLE orders;
SHOW CREATE TABLE orderDetails;

-- Temporarily disable foreign key checks (use with caution)
SET FOREIGN_KEY_CHECKS=0;
-- Your operations here
SET FOREIGN_KEY_CHECKS=1;
```

**Error: Duplicate entry**
```sql
-- Find existing record
SELECT * FROM products WHERE prodID = 'P1';

-- Use UPDATE instead of INSERT
UPDATE products SET prodPrice = 9.99 WHERE prodID = 'P1';

-- Or use INSERT ... ON DUPLICATE KEY UPDATE
INSERT INTO products VALUES('P1', 'Morning Majesty', 'Bold roast', 8.99, 224)
ON DUPLICATE KEY UPDATE prodPrice = 8.99;
```

### Performance Issues

**Slow queries**
```sql
-- Analyze query performance
EXPLAIN SELECT * FROM orders WHERE orderDate > '2024-09-01';

-- Check index usage
SHOW INDEX FROM orders;

-- Add index for frequently queried columns
CREATE INDEX idx_order_date ON orders(orderDate);
```

**Check database size**
```sql
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.TABLES 
WHERE table_schema = 'coffee_shop'
ORDER BY size_mb DESC;
```

### Reset Database

```bash
# Drop and recreate database
mysql -u root -p -e "DROP DATABASE IF EXISTS coffee_shop;"
mysql -u root -p -e "CREATE DATABASE coffee_shop;"
mysql -u root -p coffee_shop < sql/01_schema.sql
mysql -u root -p coffee_shop < sql/02_data.sql
```

## Maintenance Tasks

### Optimize Tables
```sql
-- Optimize all tables
OPTIMIZE TABLE products, customers, orders, orderDetails;
```

### Check Table Status
```sql
-- Check table status
SHOW TABLE STATUS FROM coffee_shop;
```

### Analyze Tables
```sql
-- Analyze tables for query optimization
ANALYZE TABLE products, customers, orders, orderDetails;
```

## Security Best Practices

### User Management
```sql
-- Create read-only user
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON coffee_shop.* TO 'readonly'@'localhost';

-- Create application user
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON coffee_shop.* TO 'app_user'@'localhost';

-- Remove user
DROP USER 'username'@'localhost';
```

### Change Password
```sql
ALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';
```

## Tips and Tricks

### Use Aliases
```sql
SELECT 
    p.prodName AS product,
    p.prodPrice AS price
FROM products p;
```

### Format Numbers
```sql
SELECT 
    prodName,
    CONCAT('$', FORMAT(prodPrice, 2)) AS formatted_price
FROM products;
```

### Date Functions
```sql
-- Current date
SELECT CURDATE();

-- Date formatting
SELECT DATE_FORMAT(orderDate, '%M %d, %Y') FROM orders;

-- Date arithmetic
SELECT orderDate, DATE_ADD(orderDate, INTERVAL 7 DAY) AS due_date FROM orders;
```

### String Functions
```sql
-- Concatenate strings
SELECT CONCAT(custFirstName, ' ', custLastName) AS full_name FROM customers;

-- Convert to uppercase/lowercase
SELECT UPPER(prodName), LOWER(prodDesc) FROM products;
```

---

For more detailed information, see:
- [README.md](README.md) - Project overview
- [docs/queries.md](docs/queries.md) - Query documentation
- [docs/database-design.md](docs/database-design.md) - Schema details
