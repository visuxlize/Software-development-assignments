# Contributing to Coffee Shop Database

Thank you for your interest in contributing to this educational database project!

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Guidelines

### SQL Code Style

- Use uppercase for SQL keywords (SELECT, FROM, WHERE, etc.)
- Use lowercase for table and column names
- Indent nested queries and clauses
- Add comments to explain complex queries
- Include semicolons at the end of statements

Example:
```sql
-- Good
SELECT c.custFirstName, c.custLastName
FROM customers c
WHERE c.custID IN (
    SELECT DISTINCT o.custID
    FROM orders o
    WHERE o.orderDate >= '2024-01-01'
);

-- Avoid
select custFirstName,custLastName from customers where custID in(select custID from orders where orderDate>='2024-01-01')
```

### Documentation

- Update README.md if adding new features
- Document new queries in docs/queries.md
- Add comments to complex SQL statements
- Update schema documentation if modifying tables

### Testing

Before submitting changes:
1. Test SQL scripts in a clean database
2. Verify all foreign key relationships work
3. Ensure queries return expected results
4. Check for syntax errors
5. Validate data types and constraints

### Commit Messages

Use clear, descriptive commit messages:

```
Good:
- "Add inventory tracking query"
- "Fix foreign key constraint in orders table"
- "Update README with new setup instructions"

Avoid:
- "Update"
- "Fix stuff"
- "Changes"
```

## Areas for Contribution

### Beginner-Friendly
- Add more sample data
- Improve documentation
- Fix typos
- Add code comments

### Intermediate
- Add new analytical queries
- Create database views
- Implement stored procedures
- Add data validation

### Advanced
- Performance optimization
- Database triggers
- Complex reporting queries
- Schema enhancements

## Suggested Enhancements

Here are some ideas for contributions:

1. **Add more queries:**
   - Top selling products
   - Customer lifetime value
   - Monthly sales trends
   - Product popularity analysis

2. **Extend the schema:**
   - Product categories
   - Order status tracking
   - Employee management
   - Customer addresses

3. **Create views:**
   - Customer order history
   - Product sales summary
   - Inventory status report

4. **Add stored procedures:**
   - Place new order
   - Update inventory
   - Customer registration
   - Order cancellation

5. **Implement triggers:**
   - Update inventory on order
   - Validate order quantities
   - Log data changes
   - Prevent negative inventory

6. **Performance improvements:**
   - Add appropriate indexes
   - Query optimization
   - Execution plan analysis

## Code Review Process

1. All changes require review before merging
2. Ensure code follows style guidelines
3. Verify tests pass
4. Update documentation as needed
5. Address reviewer feedback

## Questions or Issues?

- Open an issue on GitHub
- Include detailed description
- Provide sample code if relevant
- Tag appropriately (bug, enhancement, question)

## License

By contributing, you agree that your contributions will be used for educational purposes as part of coursework.

---

Thank you for helping improve this educational project!
