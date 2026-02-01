-- =============================================
-- Coffee Shop Database - Sample Data
-- Course: CEIS236 - Database Systems
-- Author: Andres Marte
-- Date: November 2024
-- =============================================

-- =============================================
-- Insert Products
-- =============================================
INSERT INTO products VALUES('P1', 'Morning Majesty', 'Bold roast', 8.99, 224);
INSERT INTO products VALUES('P2', 'Sunrise Bliss', 'Light roast', 8.99, 115);
INSERT INTO products VALUES('P3', 'Bold Brilliance', 'Rich and intense roast', 9.99, 85);
INSERT INTO products VALUES('P4', 'Glory Brew', 'House blend', 7.99, 312);

-- =============================================
-- Insert Customers
-- =============================================
INSERT INTO customers VALUES('C1', 'Andres', 'Marte', 'amarte7@my.devry.edu', '000-000-0000');
INSERT INTO customers VALUES('C2', 'Jane', 'Doe', 'jane@example.com', '999-999-9999');
INSERT INTO customers VALUES('C3', 'John', 'Smith', 'john@example.com', '111-111-1111');
INSERT INTO customers VALUES('C4', 'Erik', 'Cooper', 'erik@example.com', '222-222-2222');
INSERT INTO customers VALUES('C5', 'Arwen', 'Shire', 'arwen@example.com', '333-333-3333');

-- =============================================
-- Insert Orders
-- =============================================
INSERT INTO orders VALUES('Ord1', '2024-09-15', 'C1');
INSERT INTO orders VALUES('Ord2', '2024-09-17', 'C2');
INSERT INTO orders VALUES('Ord3', '2024-09-20', 'C4');
INSERT INTO orders VALUES('Ord4', '2024-10-02', 'C5');

-- =============================================
-- Insert Order Details
-- =============================================
INSERT INTO orderDetails VALUES('Ord1', 'P1', 3);
INSERT INTO orderDetails VALUES('Ord1', 'P2', 5);
INSERT INTO orderDetails VALUES('Ord2', 'P4', 50);
INSERT INTO orderDetails VALUES('Ord3', 'P1', 5);
INSERT INTO orderDetails VALUES('Ord3', 'P3', 10);
INSERT INTO orderDetails VALUES('Ord4', 'P1', 3);
INSERT INTO orderDetails VALUES('Ord4', 'P2', 7);
INSERT INTO orderDetails VALUES('Ord4', 'P4', 15);
