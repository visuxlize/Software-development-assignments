//Define InstallmentLoan Class
//For loans that have equal monthly payments that include both principal and interest.

using System;

namespace LoanTracker
{
    public class InstallmentLoan : ILoan
    {
        //Fields
        private Lender _lender;
        private string _purpose;
        private decimal _amount;
        private decimal _interestRate;
        private decimal _term;
        


        //Properties
        public Lender Lender
        {
            get { return _lender; }
            set { _lender = value; }
        }
        
        
        public string Purpose
        {
            get { return _purpose; }
            set { _purpose = value; }
        }

        public decimal Amount
        {
            get { return _amount; }
            set { _amount = value; }
        }

        public decimal InterestRate
        {
            get { return _interestRate; }
            set { _interestRate = value; }
        }

        public decimal MonthlyInterestRate
        {
            get { return _interestRate / 1200; }
        }

        public decimal Term
        {
            get { return _term; }
            set { _term = value; }
        }

        public decimal NumberOfPayments
        {
            get { return _term * 12; }
        }

        public decimal Payment
        {
            get {return _amount * (this.MonthlyInterestRate * (decimal)Math.Pow((double)(1 + this.MonthlyInterestRate), (double)this.NumberOfPayments)) / ((decimal)Math.Pow((double)(1 + this.MonthlyInterestRate), (double)this.NumberOfPayments) - 1);}
        }



        //Constructors
        public InstallmentLoan()
        {
            _lender = new Lender();
            _purpose = "";
            _amount = 0;
            _interestRate = 0;
            _term = 0;
        }

        public InstallmentLoan(Lender lender, string purpose,  decimal amount, decimal interestRate, decimal term)
        {
            _lender = lender;
            _purpose = purpose;
            _amount = amount;
            _interestRate = interestRate;
            _term = term;
        }

        //Methods
        public override string ToString()
        {
            return "Lender: " + _lender.Name + "\n" +
                   "Purpose: " + _purpose + "\n" +
                   "Amount: " + _amount.ToString("C") + "\n" +
                   "Interest Rate: " + _interestRate + "\n" +
                   "Term: " + _term + "\n" +
                   "Monthly Payment: " + Payment.ToString("C");
        }

        public string Amortize()
        {
            string amortizationSchedule = "Amortization Schedule for " + _lender.Name + " Loan\n\n";
            amortizationSchedule += "Payment Number\tPayment Amount\tInterest\tPrincipal\tBalance\n";
            decimal balance = _amount;
            decimal interest;
            decimal principal;
            for (int i = 1; i <= NumberOfPayments; i++)
            {
                interest = balance * MonthlyInterestRate;
                principal = Payment - interest;
                balance -= principal;
                amortizationSchedule += i + "\t\t" + Payment.ToString("C") + "\t\t" + interest.ToString("C") + "\t\t" + principal.ToString("C") + "\t\t" + balance.ToString("C") + "\n";
            }
            return amortizationSchedule;
        }
    }
}