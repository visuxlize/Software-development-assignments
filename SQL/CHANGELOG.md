# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-15

### Added
- Initial database schema with four tables (Products, Customers, Orders, OrderDetails)
- Sample data for all tables
- Five analytical SQL queries demonstrating various SQL concepts
- Entity Relationship Diagram (ERD)
- Comprehensive README with installation instructions
- Setup script for automated database initialization
- Detailed query documentation
- Database design documentation
- .gitignore file for repository cleanliness
- Contributing guidelines

### Database Schema
- **Products table**: Stores coffee product information
- **Customers table**: Stores customer contact details
- **Orders table**: Tracks customer orders
- **OrderDetails table**: Junction table for order-product relationships

### SQL Queries
1. Products costing less than $9
2. Inventory statistics (AVG, MIN, MAX)
3. Count of orders before October 1, 2024
4. Customers who ordered specific product
5. Customers with no orders

### Documentation
- README.md with full project overview
- docs/queries.md with detailed query explanations
- docs/database-design.md with schema documentation
- CONTRIBUTING.md with contribution guidelines
- Setup script with automated installation

### Features
- Foreign key constraints for referential integrity
- Normalized database design (3NF)
- Sample data for testing and demonstration
- Query results screenshots
- Comprehensive documentation

## [Unreleased]

### Planned Features
- Additional analytical queries
- Database views for common reports
- Stored procedures for data operations
- Triggers for business logic
- Performance optimization with indexes
- Extended schema with categories and order status
- User authentication and permissions
- Backup and recovery procedures
- Migration scripts for schema updates

### Potential Enhancements
- Web-based interface for database interaction
- API endpoints for external integrations
- Reporting dashboard
- Data visualization
- Automated testing suite
- Performance benchmarking
- Security enhancements
- Multi-language support

---

## Version History

### Version 1.0.0 (November 2024)
- Initial release as CEIS236 final project
- Core database functionality
- Complete documentation
- Educational SQL examples

---

**Note:** This changelog will be updated as the project evolves. Check back for new features and improvements!
