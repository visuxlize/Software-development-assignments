// CEIS209 Course Project
// Module 7-8
// Exceptions and File Processing
// Topics: Exceptions and File Processing
#nullable disable
#pragma warning disable
using System.Text.Json;
using System.IO;
using LoanTracker; // Ensure this namespace is included


// Define constants
const string userName = "Andres Marte"; // Replace with your name
const string userSession = "September 2025"; // Replace with the session month and year




// Declare Lists for storing loan information
List<ILoan> loans = new List<ILoan>();


// Call Main Menu function, passing list by reference
MainMenu(ref loans);

static void MainMenu(ref List<ILoan> loans)
{
    string menuInput="0";
    while (!menuInput.Equals("5"))
    {
        Console.Clear();
        Console.WriteLine("===| Main Menu |===");
        Console.WriteLine("1. Add Loan");
        Console.WriteLine("2. Amortization Report");
        Console.WriteLine("3. Save to File");
        Console.WriteLine("4. Load from File");
        Console.WriteLine("5. Exit");
        Console.Write("Select an option: ");

        menuInput = Console.ReadLine() ?? "5";
        switch (menuInput)
        {
            case "1":
                // Add Loan
                LoanAdd(ref loans);
                break;
            case "2":
                // Display loan details and amortization schedule
                LoanReport(ref loans);
                break;
            case "3":
                // Save to file
                LoanSave(ref loans);
                break;
            case "4":
                // Load from file
                LoanLoad(ref loans);
                break;
            case "5":
                Console.WriteLine("Exiting ...");
                return;

            default:
                Console.WriteLine("Invalid selection. Please try again.");
                Console.WriteLine("Press Enter to continue ...");
                Console.ReadLine();
                break;
        }
    }

}




// Save Loan Information to File Function
static void LoanSave(ref List<ILoan> loans)
{
    try
    {
        // No console clear or header - just save directly
        string filename = "loans.txt";

        // Use StreamWriter to write to file
        using (StreamWriter writer = new StreamWriter(filename))
        {
            foreach (ILoan loan in loans)
            {
                // Determine loan type and write it first
                string loanType = "";
                if (loan is InstallmentLoan)
                {
                    loanType = "Installment";
                }
                else if (loan is BalloonLoan)
                {
                    loanType = "Balloon";
                }

                // Write loan data in a delimited format (using pipe | as delimiter)
                writer.WriteLine($"{loanType}|{loan.Lender.Name}|{loan.Lender.Phone}|{loan.Lender.Email}|{loan.Purpose}|{loan.Amount}|{loan.InterestRate}|{loan.Term}");
            }
        }

        Console.WriteLine("Loan information saved to file.");
    }
    catch (UnauthorizedAccessException ex)
    {
        Console.WriteLine($"Error: Access denied. You don't have permission to write to this location.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    catch (DirectoryNotFoundException ex)
    {
        Console.WriteLine($"Error: The directory path was not found.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    catch (IOException ex)
    {
        Console.WriteLine($"Error: An I/O error occurred while saving the file.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: An unexpected error occurred while saving.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    finally
    {
        Console.WriteLine("Press Enter to continue ...");
        Console.ReadLine();
    }
}


// Load Loan Information from File Function
static void LoanLoad(ref List<ILoan> loans)
{
    try
    {
        Console.Clear();
        Console.WriteLine("=== Load Loans from File ===");
        Console.Write("Enter the filename to load (e.g., 'loans.txt'): ");
        string filename = Console.ReadLine() ?? "loans.txt";
        
        // If filename is empty or whitespace, use default
        if (string.IsNullOrWhiteSpace(filename))
        {
            filename = "loans.txt";
        }

        // Check if file exists
        if (!File.Exists(filename))
        {
            throw new FileNotFoundException($"The file '{filename}' was not found.");
        }

        // Clear existing loans before loading
        if (loans.Count > 0)
        {
            Console.Write("\nThis will replace current loans. Continue? (Y/N): ");
            string confirm = Console.ReadLine() ?? "N";
            if (!confirm.Equals("Y", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("Load operation cancelled.");
                Console.WriteLine("Press Enter to continue ...");
                Console.ReadLine();
                return;
            }
        }

        loans.Clear();
        int loadedCount = 0;

        // Use StreamReader to read from file
        using (StreamReader reader = new StreamReader(filename))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                // Split the line by delimiter
                string[] parts = line.Split('|');

                if (parts.Length < 8)
                {
                    Console.WriteLine($"Warning: Skipping invalid line (insufficient data).");
                    continue;
                }

                // Parse the loan type
                string loanType = parts[0];
                ILoan newLoan = null;

                // Create appropriate loan object based on type
                if (loanType.Equals("Installment"))
                {
                    newLoan = new InstallmentLoan();
                }
                else if (loanType.Equals("Balloon"))
                {
                    newLoan = new BalloonLoan();
                }
                else
                {
                    Console.WriteLine($"Warning: Unknown loan type '{loanType}'. Skipping this loan.");
                    continue;
                }

                // Create and populate lender information
                Lender lender = new Lender();
                lender.Name = parts[1];
                lender.Phone = parts[2];
                lender.Email = parts[3];
                newLoan.Lender = lender;

                // Populate loan information
                newLoan.Purpose = parts[4];
                newLoan.Amount = Convert.ToDecimal(parts[5]);
                newLoan.InterestRate = Convert.ToDecimal(parts[6]);
                newLoan.Term = Convert.ToDecimal(parts[7]);

                // Add loan to list
                loans.Add(newLoan);
                loadedCount++;
            }
        }

        Console.WriteLine($"\nSuccessfully loaded {loadedCount} loan(s) from '{filename}'.");
    }
    catch (FileNotFoundException ex)
    {
        Console.WriteLine($"\nError: {ex.Message}");
    }
    catch (UnauthorizedAccessException ex)
    {
        Console.WriteLine($"\nError: Access denied. You don't have permission to read this file.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    catch (FormatException ex)
    {
        Console.WriteLine($"\nError: The file contains invalid data format.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    catch (IOException ex)
    {
        Console.WriteLine($"\nError: An I/O error occurred while reading the file.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"\nError: An unexpected error occurred while loading.");
        Console.WriteLine($"Details: {ex.Message}");
    }
    finally
    {
        Console.WriteLine("\nPress Enter to continue ...");
        Console.ReadLine();
    }
}






static void LoanAdd(ref List<ILoan> loans)
{
    // Declare new loan variable
    ILoan newLoan = null;
    
    // Get Loan Type
    Console.Clear();

        Console.WriteLine("Loan Type ---");
        Console.WriteLine("1. Installment Loan");
        Console.WriteLine("2. Balloon Loan");
        Console.Write("Select a loan type: ");
        string input = Console.ReadLine() ?? "";
        
        // Declare variable for new loan based on user selection
        if (input.Equals("1"))
        {
            // Add Installment Loan
            newLoan = new InstallmentLoan();
        }
        else if (input.Equals("2"))
        {
            // Add Balloon Loan
            newLoan = new BalloonLoan();
         
        }
        else
        {
            Console.WriteLine("Invalid selection. Please try again.");
        }
    
    // Check if loan was created successfully
    if (newLoan == null)
    {
        Console.WriteLine("No valid loan type selected. Returning to main menu.");
        Console.WriteLine("Press Enter to continue ...");
        Console.ReadLine();
        return;
    }
    
    

    // Get Lender Information
    Console.Clear();
    Console.WriteLine("Lender Information ---");
    Console.Write("Please enter the name of the lender (Example \"ABC Bank\"): ");
    newLoan.Lender.Name = Console.ReadLine() ?? "";
    Console.Write("Please enter the phone number of the lender: ");
    newLoan.Lender.Phone = Console.ReadLine() ?? "";
    Console.Write("Please enter the email address of the lender: ");
    newLoan.Lender.Email = Console.ReadLine() ?? "";


    // Get Loan Information
    Console.Clear();
    Console.WriteLine("Loan Information ---");
    Console.Write("Please enter the purpose of the loan (Example \"Pickup Truck 1\"):");
    newLoan.Purpose = Console.ReadLine() ?? "";
    decimal loanAmount = -1;
    decimal loanInterestRate = -1;
    decimal loanTerm = -1;
    while (loanAmount < 0 ||loanAmount > 250000)
    {
        Console.Write("Please enter the loan amount (Example \"75000\"): ");
        loanAmount = Convert.ToDecimal(Console.ReadLine());
        if (loanAmount < 0 ||loanAmount > 250000)
        {
            Console.WriteLine("Invalid input. Please enter a value greater than zero and less than or equal to 250,000.");
        }

    }
    newLoan.Amount= loanAmount;

    while (loanInterestRate < 0 || loanInterestRate > 25)
    {
        Console.Write("Please enter the interest rate (Example: 5.25 for 5.25%):");
        loanInterestRate = Convert.ToDecimal(Console.ReadLine());
        if (loanInterestRate < 0 || loanInterestRate > 25)
        {
            Console.WriteLine("Invalid input. Please enter a value greater than zero and less than or equal to 25.");
        }

    }
    newLoan.InterestRate = loanInterestRate;

    while (loanTerm < 0 || loanTerm > 30)
    {
        Console.Write("Please enter the loan term in years:");
        loanTerm = Convert.ToDecimal(Console.ReadLine());
        if (loanTerm < 0 || loanTerm > 30)
        {
        Console.WriteLine("Invalid input. Please enter a value greater than zero and less than or equal to 30.");
        }
    }
    newLoan.Term = loanTerm;
        
    // Add loan to list
    loans.Add(newLoan);

    Console.WriteLine("Loan added successfully.");
    Console.WriteLine("Press Enter to continue ...");
    Console.ReadLine();

}

// Display Loan Report Function
static void LoanReport(ref List<ILoan> loans)
{
    try
    {
        Console.Clear();
        
        // Check if there are any loans
        if (loans.Count == 0)
        {
            Console.WriteLine("No loans available to display.");
            Console.WriteLine("Press Enter to continue ...");
            Console.ReadLine();
            return;
        }
        
        // List loans for user to select
        Console.WriteLine("=== Available Loans ===");
        for (int i = 0; i < loans.Count; i++)
        {
            Console.WriteLine((i + 1) + ". " + loans[i].Lender.Name + " - " + loans[i].Purpose + " - " + loans[i].Amount.ToString("C"));
        }
        
        // Get user selection with validation
        Console.Write("\nSelect a loan to display (1-" + loans.Count + "): ");
        string input = Console.ReadLine() ?? "0";
        
        // Try to parse the input
        if (!int.TryParse(input, out int selection))
        {
            Console.WriteLine("\nError: Please enter a valid number.");
            Console.WriteLine("Press Enter to continue ...");
            Console.ReadLine();
            return;
        }
        
        // Validate selection range
        if (selection < 1 || selection > loans.Count)
        {
            Console.WriteLine("\nError: Selection must be between 1 and " + loans.Count + ".");
            Console.WriteLine("Press Enter to continue ...");
            Console.ReadLine();
            return;
        }
        
        // Display loan details and amortization schedule
        Console.Clear();
        Console.WriteLine("=== Loan Report ===");
        Console.WriteLine("\nLoan Details ---");
        Console.WriteLine(loans[selection - 1].ToString());
        Console.WriteLine();
        Console.WriteLine("Amortization Schedule ---");
        Console.WriteLine(loans[selection - 1].Amortize());
        Console.WriteLine();
        Console.WriteLine("Press Enter to continue ...");
        Console.ReadLine();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"\nError: An unexpected error occurred.");
        Console.WriteLine($"Details: {ex.Message}");
        Console.WriteLine("Press Enter to continue ...");
        Console.ReadLine();
    }
}