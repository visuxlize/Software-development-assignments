# Database Design Documentation

## Overview

The Coffee Shop Database is a relational database system designed to manage products, customers, orders, and order details for a coffee shop business. This document outlines the design decisions, normalization process, and implementation details.

## Design Principles

### Normalization

The database follows **Third Normal Form (3NF)** to ensure:
- Data integrity
- Minimal redundancy
- Efficient storage
- Flexibility for future modifications

#### First Normal Form (1NF)
- All tables have a primary key
- All columns contain atomic values (no repeating groups)
- Each column contains only one value per row

#### Second Normal Form (2NF)
- Meets 1NF requirements
- All non-key attributes are fully dependent on the primary key
- No partial dependencies on composite keys

#### Third Normal Form (3NF)
- Meets 2NF requirements
- No transitive dependencies
- All non-key attributes depend only on the primary key

### Entity Relationship Model

The database implements a **many-to-many relationship** between Orders and Products through the OrderDetails junction table:

```
Customers (1) ----< Orders (M)
Orders (M) ----< OrderDetails >---- Products (M)
```

## Table Designs

### Products Table

**Purpose:** Stores coffee product information.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| prodID | CHAR(2) | PRIMARY KEY, NOT NULL | Unique product identifier |
| prodName | VARCHAR(25) | NOT NULL | Product name |
| prodDesc | VARCHAR(50) | NOT NULL | Product description |
| prodPrice | DECIMAL(5,2) | NOT NULL | Product price (up to $999.99) |
| prodInv | INT | NOT NULL | Current inventory count |

**Design Decisions:**
- `prodID` uses CHAR(2) for consistent, short identifiers (P1, P2, etc.)
- `prodPrice` uses DECIMAL(5,2) for precise monetary values (prevents floating-point errors)
- `prodInv` uses INT to store whole numbers of items

**Business Rules:**
- Product ID must be unique
- All fields are required (NOT NULL)
- Price must be positive (can be enforced with CHECK constraint)
- Inventory cannot be negative (can be enforced with CHECK constraint)

### Customers Table

**Purpose:** Stores customer contact and identification information.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| custID | CHAR(2) | PRIMARY KEY, NOT NULL | Unique customer identifier |
| custFirstName | VARCHAR(25) | NOT NULL | Customer first name |
| custLastName | VARCHAR(25) | NOT NULL | Customer last name |
| custEmail | VARCHAR(50) | NOT NULL | Customer email address |
| custPhone | VARCHAR(15) | NOT NULL | Customer phone number |

**Design Decisions:**
- `custID` uses CHAR(2) for consistent identifiers (C1, C2, etc.)
- `custEmail` uses VARCHAR(50) to accommodate various email lengths
- `custPhone` uses VARCHAR(15) to store formatted phone numbers with special characters

**Business Rules:**
- Customer ID must be unique
- Email should be unique (can add UNIQUE constraint)
- All contact information is required

**Potential Enhancements:**
- Add UNIQUE constraint on custEmail
- Add CHECK constraint for email format validation
- Separate phone into area code, exchange, and number for better formatting
- Add address fields (street, city, state, zip)

### Orders Table

**Purpose:** Stores order header information linking customers to their orders.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| orderID | CHAR(4) | PRIMARY KEY, NOT NULL | Unique order identifier |
| orderDate | DATE | NOT NULL | Date order was placed |
| custID | CHAR(2) | FOREIGN KEY, NOT NULL | Reference to customer |

**Design Decisions:**
- `orderID` uses CHAR(4) to allow more orders than CHAR(2)
- `orderDate` uses DATE type for temporal queries
- Foreign key relationship ensures referential integrity with Customers table

**Business Rules:**
- Order ID must be unique
- Each order must be associated with a valid customer
- Order date is required
- Order date should not be in the future (can be enforced with CHECK constraint)

**Relationships:**
- **One-to-Many** from Customers to Orders (one customer can have many orders)
- Foreign key constraint: `custID` references `customers(custID)`
- Cascading options:
  - ON DELETE: RESTRICT (prevent deletion of customer with orders)
  - ON UPDATE: CASCADE (update orderID if customer ID changes)

### OrderDetails Table

**Purpose:** Junction table implementing the many-to-many relationship between Orders and Products.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| orderID | CHAR(4) | PRIMARY KEY (composite), FOREIGN KEY, NOT NULL | Reference to order |
| prodID | CHAR(2) | PRIMARY KEY (composite), FOREIGN KEY, NOT NULL | Reference to product |
| quantity | INT | NOT NULL | Quantity of product ordered |

**Design Decisions:**
- **Composite primary key** (orderID, prodID) ensures unique order-product combinations
- Two foreign key relationships maintain referential integrity
- `quantity` uses INT for whole number quantities

**Business Rules:**
- Each order-product combination must be unique
- Both orderID and prodID must reference valid records
- Quantity must be positive (can be enforced with CHECK constraint)
- Same product cannot appear twice in the same order (enforced by composite key)

**Relationships:**
- **Many-to-One** to Orders (many order details belong to one order)
- **Many-to-One** to Products (many order details reference one product)
- Foreign key constraint 1: `orderID` references `orders(orderID)`
- Foreign key constraint 2: `prodID` references `products(prodID)`

## Data Integrity Constraints

### Primary Key Constraints
- Ensure uniqueness of records in each table
- Prevent NULL values in key columns
- Automatically create indexes for fast lookups

### Foreign Key Constraints
- Maintain referential integrity between related tables
- Prevent orphaned records
- Ensure data consistency

### NOT NULL Constraints
- Prevent missing critical data
- All fields in this database are required (NOT NULL)

### Recommended Additional Constraints

```sql
-- Products table constraints
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (prodPrice > 0);

ALTER TABLE products 
ADD CONSTRAINT chk_inventory CHECK (prodInv >= 0);

-- Customers table constraints
ALTER TABLE customers 
ADD CONSTRAINT uq_email UNIQUE (custEmail);

-- OrderDetails table constraints
ALTER TABLE orderDetails 
ADD CONSTRAINT chk_quantity CHECK (quantity > 0);

-- Orders table constraints
ALTER TABLE orders 
ADD CONSTRAINT chk_order_date CHECK (orderDate <= CURRENT_DATE);
```

## Indexing Strategy

### Automatic Indexes
Primary keys automatically create indexes:
- products(prodID)
- customers(custID)
- orders(orderID)
- orderDetails(orderID, prodID) - composite index

### Recommended Additional Indexes

```sql
-- Foreign key indexes for JOIN performance
CREATE INDEX idx_orders_custid ON orders(custID);
CREATE INDEX idx_orderdetails_orderid ON orderDetails(orderID);
CREATE INDEX idx_orderdetails_prodid ON orderDetails(prodID);

-- Query-specific indexes
CREATE INDEX idx_orders_date ON orders(orderDate);
CREATE INDEX idx_products_price ON products(prodPrice);
CREATE INDEX idx_customers_email ON customers(custEmail);
CREATE INDEX idx_customers_lastname ON customers(custLastName);
```

## Schema Evolution Considerations

### Scalability Enhancements

1. **Add product categories:**
```sql
CREATE TABLE categories(
    categoryID CHAR(2) PRIMARY KEY,
    categoryName VARCHAR(30) NOT NULL
);

ALTER TABLE products 
ADD COLUMN categoryID CHAR(2),
ADD FOREIGN KEY (categoryID) REFERENCES categories(categoryID);
```

2. **Add order status tracking:**
```sql
ALTER TABLE orders 
ADD COLUMN orderStatus VARCHAR(20) DEFAULT 'pending',
ADD COLUMN orderTotal DECIMAL(7,2);
```

3. **Add customer addresses:**
```sql
CREATE TABLE addresses(
    addressID INT AUTO_INCREMENT PRIMARY KEY,
    custID CHAR(2) NOT NULL,
    street VARCHAR(100),
    city VARCHAR(50),
    state CHAR(2),
    zipCode VARCHAR(10),
    FOREIGN KEY (custID) REFERENCES customers(custID)
);
```

4. **Add employee management:**
```sql
CREATE TABLE employees(
    empID INT AUTO_INCREMENT PRIMARY KEY,
    empFirstName VARCHAR(25) NOT NULL,
    empLastName VARCHAR(25) NOT NULL,
    empRole VARCHAR(20) NOT NULL
);

ALTER TABLE orders 
ADD COLUMN processedBy INT,
ADD FOREIGN KEY (processedBy) REFERENCES employees(empID);
```

## Performance Optimization

### Query Optimization
- Use EXPLAIN to analyze query execution plans
- Create appropriate indexes for frequently queried columns
- Avoid SELECT * in production queries
- Use JOINs instead of subqueries when possible

### Storage Optimization
- Use appropriate data types (CHAR vs VARCHAR)
- Normalize to reduce redundancy
- Archive old orders to separate tables if needed
- Implement table partitioning for large datasets

### Monitoring
- Track slow queries
- Monitor index usage
- Analyze query patterns
- Regular OPTIMIZE TABLE maintenance

## Backup and Recovery

### Backup Strategy
```bash
# Full database backup
mysqldump -u username -p coffee_shop > backup_$(date +%Y%m%d).sql

# Table-specific backup
mysqldump -u username -p coffee_shop orders > orders_backup.sql

# Backup with compression
mysqldump -u username -p coffee_shop | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Recovery
```bash
# Restore full database
mysql -u username -p coffee_shop < backup_20241115.sql

# Restore specific table
mysql -u username -p coffee_shop < orders_backup.sql
```

## Security Considerations

### User Permissions
```sql
-- Create read-only user for reporting
CREATE USER 'report_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT ON coffee_shop.* TO 'report_user'@'localhost';

-- Create application user with limited permissions
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON coffee_shop.* TO 'app_user'@'localhost';

-- DBA user with full permissions
GRANT ALL PRIVILEGES ON coffee_shop.* TO 'admin_user'@'localhost';
```

### Data Protection
- Encrypt sensitive data (customer emails, phone numbers)
- Use SSL/TLS for database connections
- Implement audit logging for data modifications
- Regular security audits and updates

## Conclusion

This database design provides a solid foundation for a coffee shop management system. The normalized structure ensures data integrity while maintaining flexibility for future enhancements. The schema follows industry best practices and can be scaled as business requirements evolve.
