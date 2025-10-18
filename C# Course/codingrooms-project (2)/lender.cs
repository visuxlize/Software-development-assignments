// Define lender class
using System;

namespace LoanTracker
{
    public class Lender
    {
        //Fields
        private string _name;
        private string _phone;
        private string _email;

        //Properties
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }



        public string Phone
        {
            get { return _phone; }
            set { _phone = value; }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }
        
        //Constructors
        public Lender()
        {
            _name = "";
            _phone = "";
            _email = "";
        }

        public Lender(string name,string phone, string email)
        {
            _name = name;
            _phone = phone;
            _email = email;
        }

        //Methods
        public override string ToString()
        {
            return _name +  "\n" + _phone + "\n" + _email;
        }

    }
}
