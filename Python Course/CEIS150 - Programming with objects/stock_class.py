
#Name: Andres Marte
#Date: 08/22/2025

#Write code here for the Stock class and DailyData class
import csv
import matplotlib.pyplot as plt

class Stock:
    def __init__(self, symbol, name, shares):
        self.symbol = symbol
        self.name = name
        self.shares = shares
        self.DataList = []

    def add_data(self, daily_data):
        self.DataList.append(daily_data)

class DailyData:
    def __init__(self, date, close, volume):
        self.date = date
        self.close = close
        self.volume = volume

# Add a new stock
def add_stock(stock_list):
    print("Add Stock ----")
    symbol = input("Enter stock symbol: ").upper()
    name = input("Enter company name: ")
    shares = float(input("Enter number of shares: "))
    stock = Stock(symbol, name, shares)
    stock_list.append(stock)
    print(f"{symbol} added successfully!")
    _ = input("Press Enter to Continue ***")

# Deleting a stock
def delete_stock(stock_list):
    print("Delete Stock ----")
    symbol = input("Enter stock symbol to delete: ").upper()
    for stock in stock_list:
        if stock.symbol == symbol:
            stock_list.remove(stock)
            print(f"{symbol} deleted successfully.")
            break
    else:
        print("Symbol Not Found ***")
        print("Press Enter to Continue")

# List all stocks
def list_stocks(stock_list):
    print("List of Stocks ----")
    if not stock_list:
        print("No stocks being tracked.")
    else:
        for stock in stock_list:
            print(f"{stock.symbol} - {stock.name} - Shares: {stock.shares}")
    _ = input("Press Enter to Continue ***")

# Import stock CSV
def import_stock_csv(stock_list):
    print("Import Stock Data ----")
    print("Available stocks:", [s.symbol for s in stock_list])
    symbol = input("Enter stock symbol to load data for: ").upper()

    for stock in stock_list:
        if stock.symbol == symbol:
            filename  = symbol + ".csv"
            try:
                with open(filename, newline="") as csvfile:
                    reader = csv.reader(csvfile)
                    next(reader)
                    for row in reader:
                        date = row[0]
                        close = float(row[4])
                        volume = float(row[6])
                        daily_data = DailyData(date, close, volume)
                        stock.add_data(daily_data)
                print(f"Data loaded successfully for {symbol}.")
                display_report(stock_list)
            except FileNotFoundError:
                print(f"File {filename} not found.")
            break
    else:
        print("Symbol not Found ****")
    _ = input("Press Enter to Continue ****")

#Display stock chart

def display_chart(stock_list):
    print("Display Chart ----")
    print("Available stocks:", [s.symbol for s in stock_list])
    symbol = input("Enter stock symbol to chart: ").upper()

    for stock in stock_list:
        if stock.symbol == symbol:
            if not stock.DataList:
                print("No data available to plot.")
                return

            dates = [data.date for data in stock.DataList]
            prices = [data.close for data in stock.Datalist]

            plt.figure(figsize=(10,5))
            plt.plot(dates, prices, marker="o")
            plt.xlabel("Date")
            plt.ylabel("Closing Price")
            plt.title(f"Stock Price Chart for {symbol}")
            plt.xticks(rotation=45)
            plt.tight_layout()
            plt.savefig("stock.png")
            plt.show()
            print("Chart saved as stock.png")
            break
    else:
        print("Symbol Not Found ***")
    _ = input("Press Enter to Continue ***")

        
        
# Unit Test - Do Not Change Code Below This Line *** *** *** *** *** *** *** *** ***
# main() is used for unit testing only. It will run when stock_class.py is run.
# Run this to test your class code. Once you have eliminated all errors, you are
# ready to continue with the next part of the project.

def main():
    error_count = 0
    error_list = []
    print("Unit Testing Starting---")
    # Test Add Stock
    print("Testing Add Stock...",end="")
    try:
        testStock = Stock("TEST","Test Company",100)
        print("Successful!")
    except:
        print("***Adding Stock Failed!")
        error_count = error_count+1
        error_list.append("Stock Constructor Error")
    # Test Change Symbol
    print("Test Change Symbol...",end="")
    try:
        testStock.symbol = "NEWTEST"
        if testStock.symbol == "NEWTEST":
            print("Successful!")
        else:
            print("***ERROR! Symbol change unsuccessful.")
            error_count = error_count+1
            error_list.append("Symbol Change Error")
    except:
        print("***ERROR! Symbol change failed.")
        error_count = error_count+1
        error_list.append("Symbol Change Failure")
    print("Test Change Name...",end="")
    try:
        testStock.name = "New Test Company"
        if testStock.name == "New Test Company":
            print("Successful!")
        else:
            print("***ERROR! Name change unsuccessful.")
            error_count = error_count+1
            error_list.append("Name Change Error")
    except:
        print("***ERROR! Name change failed.")
        error_count = error_count+1
        error_list.append("Name Change Failure")
        print("Test Change Name...",end="")
    try:
        testStock.shares = 2000
        if testStock.shares == 2000:
            print("Successful!")
        else:
            print("***ERROR! Shares change unsuccessful.")
            error_count = error_count+1
            error_list.append("Shares Change Error")
    except:
        print("***ERROR! Shares change failed.")
        error_count = error_count+1
        error_list.append("Shares Change Failure")
        

    # Test add daily data
    print("Creating daily stock data...",end="")
    daily_data_error = False
    try:
        dayData = DailyData("1/1/20",float(14.50),float(100000))
        testStock.add_data(dayData)
        if testStock.DataList[0].date != "1/1/20":
            error_count = error_count + 1
            daily_data_error = True
            error_list.append("Add Daily Data - Problem with Date")
        if testStock.DataList[0].close != 14.50:
            error_count = error_count + 1
            daily_data_error = True
            error_list.append("Add Daily Data - Problem with Closing Price")
        if testStock.DataList[0].volume != 100000:
            error_count = error_count + 1
            daily_data_error = True
            error_list.append("Add Daily Data - Problem with Volume")  
    except:
        print("***ERROR! Add daily data failed.")
        error_count = error_count + 1
        error_list.append("Add daily data Failure!")
        daily_data_error = True
    if daily_data_error == True:
        print("***ERROR! Creating daily data failed.")
    else:
        print("Successful!")
    
    if (error_count) == 0:
        print("Congratulations - All Tests Passed")
    else:
        print("-=== Problem List - Please Fix ===-")
        for em in error_list:
            print(em)
    print("Goodbye")

# Program Starts Here
if __name__ == "__main__":
    # run unit testing only if run as a stand-alone script
    main()
