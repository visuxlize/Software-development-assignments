#!/bin/bash

# =============================================
# Coffee Shop Database Setup Script
# =============================================
# This script creates and populates the coffee shop database
# Usage: ./setup.sh [database_name] [username]
# =============================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
DB_NAME="${1:-coffee_shop}"
DB_USER="${2:-root}"

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Coffee Shop Database Setup${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}Error: MySQL is not installed or not in PATH${NC}"
    exit 1
fi

echo -e "${YELLOW}Database Name:${NC} $DB_NAME"
echo -e "${YELLOW}Username:${NC} $DB_USER"
echo ""

# Prompt for password
echo -e "${YELLOW}Enter MySQL password for user $DB_USER:${NC}"
read -s DB_PASS
echo ""

# Create database
echo -e "${GREEN}Step 1: Creating database...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database created successfully${NC}"
else
    echo -e "${RED}✗ Failed to create database${NC}"
    exit 1
fi

# Select database and create schema
echo -e "${GREEN}Step 2: Creating tables...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < sql/01_schema.sql 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Tables created successfully${NC}"
else
    echo -e "${RED}✗ Failed to create tables${NC}"
    exit 1
fi

# Insert sample data
echo -e "${GREEN}Step 3: Inserting sample data...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < sql/02_data.sql 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sample data inserted successfully${NC}"
else
    echo -e "${RED}✗ Failed to insert sample data${NC}"
    exit 1
fi

# Verify installation
echo ""
echo -e "${GREEN}Step 4: Verifying installation...${NC}"
TABLE_COUNT=$(mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "SHOW TABLES;" 2>/dev/null | wc -l)

if [ $TABLE_COUNT -eq 5 ]; then
    echo -e "${GREEN}✓ All 4 tables created successfully${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Expected 4 tables, found $((TABLE_COUNT - 1))${NC}"
fi

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "To run the analysis queries, use:"
echo -e "${YELLOW}mysql -u $DB_USER -p $DB_NAME < sql/03_queries.sql${NC}"
echo ""
echo -e "To connect to the database:"
echo -e "${YELLOW}mysql -u $DB_USER -p $DB_NAME${NC}"
