-- =============================================
-- Coffee Shop Database Schema
-- Course: CEIS236 - Database Systems
-- Author: Andres Marte
-- Date: November 2024
-- =============================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS orderDetails;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;

-- =============================================
-- Products Table
-- =============================================
-- Stores information about coffee products
CREATE TABLE products(
    prodID CHAR(2) NOT NULL,
    prodName VARCHAR(25) NOT NULL,
    prodDesc VARCHAR(50) NOT NULL,
    prodPrice DECIMAL(5,2) NOT NULL,
    prodInv INT NOT NULL,
    PRIMARY KEY(prodID)
);

-- =============================================
-- Customers Table
-- =============================================
-- Stores customer information
CREATE TABLE customers(
    custID CHAR(2) NOT NULL,
    custFirstName VARCHAR(25) NOT NULL,
    custLastName VARCHAR(25) NOT NULL,
    custEmail VARCHAR(50) NOT NULL,
    custPhone VARCHAR(15) NOT NULL,
    PRIMARY KEY(custID)
);

-- =============================================
-- Orders Table
-- =============================================
-- Stores order header information
CREATE TABLE orders(
    orderID CHAR(4) NOT NULL,
    orderDate DATE NOT NULL,
    custID CHAR(2) NOT NULL,
    PRIMARY KEY(orderID),
    FOREIGN KEY (custID) REFERENCES customers(custID)
);

-- =============================================
-- OrderDetails Table
-- =============================================
-- Stores line items for each order (many-to-many relationship)
CREATE TABLE orderDetails(
    orderID CHAR(4) NOT NULL,
    prodID CHAR(2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (orderID, prodID),
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (prodID) REFERENCES products(prodID)
);
