# C# Course Project - Loan Tracker Application

This directory contains the CEIS209 Course Project (Modules 7-8) completed for the C# course, focusing on Exceptions and File Processing.

## Project Overview

The Loan Tracker Application is a console-based application that allows users to manage different types of loans (Installment and Balloon loans). The application demonstrates key C# concepts including:

- Object-Oriented Programming (OOP) principles
- Interface implementation
- Exception handling
- File I/O operations
- Data validation
- User input processing

## Features

- **Loan Management**: Add, view, and manage different types of loans
- **Loan Types**: Support for Installment Loans and Balloon Loans
- **Amortization Reports**: Generate detailed amortization schedules
- **File Operations**: Save and load loan data to/from text files
- **Exception Handling**: Comprehensive error handling for file operations and user input
- **Data Validation**: Input validation for loan amounts, interest rates, and terms

## Technologies Used

- **C#** - Primary programming language
- **.NET 8.0** - Framework version
- **Console Application** - User interface
- **File I/O** - StreamReader/StreamWriter for data persistence
- **Exception Handling** - Try-catch blocks for error management

## Project Structure

```
codingrooms-project (2)/
├── Program.cs              # Main application entry point and menu system
├── loan.cs                 # Base loan interface and abstract class
├── installmentLoan.cs      # Installment loan implementation
├── balloonLoan.cs          # Balloon loan implementation
├── lender.cs               # Lender class definition
├── loans.txt               # Sample data file
├── usercode.csproj         # Project configuration
└── usercode.sln            # Solution file
```

## Getting Started

1. **Prerequisites**: Ensure you have .NET 8.0 SDK installed
2. **Compilation**: Run `dotnet build` in the project directory
3. **Execution**: Run `dotnet run` to start the application
4. **Usage**: Follow the menu prompts to add loans, generate reports, and manage data

## Key Learning Objectives Demonstrated

- **Exception Handling**: Comprehensive try-catch blocks for file operations
- **File Processing**: Reading from and writing to text files with proper error handling
- **OOP Concepts**: Interface implementation, inheritance, and polymorphism
- **Data Validation**: Input validation and error checking
- **User Interface**: Console-based menu system with clear navigation

## Sample Usage

1. Select "Add Loan" to create a new loan
2. Choose between Installment or Balloon loan types
3. Enter lender and loan information
4. Generate amortization reports
5. Save/load loan data to/from files

This project showcases practical application of C# fundamentals in a real-world scenario.
