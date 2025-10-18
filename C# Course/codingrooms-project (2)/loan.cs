
using System;
using LoanTracker;

//Create Interface for Loans

namespace LoanTracker
{
    public interface ILoan
    {
               // Interface Members
        Lender Lender { get; set; }
        string Purpose { get; set; }
        decimal Amount { get; set; }
        decimal InterestRate { get; set; }
        decimal Term { get; set; } // Term in months
        decimal Payment { get; }

        string Amortize();

        
    }
}