#Name: Andres Marte
#Date: 08/22/2025

from datetime import datetime
from stock_class import Stock, DailyData
import matplotlib.pyplot as plt
import csv
name = "Andres Marte"

def add_stock(stock_list):
     option = ""
     while option != "0":
        print("Add a stock")
        symbol = input("Enter symbol: ").upper()
        name = input("Enter company name: ")
        shares = float(input("Enter shares: "))
        new_stock = Stock(symbol, name, shares)
        stock_list.append(new_stock)
        option = input("Press enter to add another stock or 0 to quit: ")
        

# Remove stock and all daily data
def delete_stock(stock_list):
    print("Delete stock")
    print("Stock list:[ ", end="")
    for stock in stock_list:
        print(stock.symbol, end="")
    print("  ]")

    symbol = input("What stock do you want to delete: ").upper()
    found = False
    for i, stock in enumerate(stock_list):
        if stock.symbol == symbol:
            stock_list.pop(i)
            found = True
            print("Deleted: ", symbol)
            break
    if not found:
        print("Symbol Not Found ***")
    input("Press enter to continue")


     
# List stocks being tracked
def list_stocks(stock_list):
    print("\n--- Stock List ---")
    print(f"{'Symbol':<10}{'Name':<20}{'Shares':<10}")
    print("-" * 40)
    for stock in stock_list:
        print(f"{stock.symbol:<10}{stock.name:<20}{stock.shares:<10}")
    input("Press Enter to continue...")


# Get price and volume history from Yahoo! Finance using CSV import.
def import_stock_csv(stock_list):
    print("Stock data")
    print("Stock list: [", end="")
    for stock in stock_list:
        print(stock.symbol, end=" ")
    print(" ]")

    symbol = input("Which stock do you want to use: ").upper()
    filename = input("Enter the file name: ")

    for stock in stock_list:
        if stock.symbol == symbol:
            with open(filename, newline="") as stockdata:
                datareader = csv.reader(stockdata, delimiter=",")
                next(datareader)
                for row in datareader:
                    daily_data = DailyData(str(row[0]),
                                           float(row[4]),
                                           float(row[6]))
                    stock.add_data(daily_data)
            display_report(stock_list)
            break
    else:
        print("Symbol Not Found ***")
    input("")


# Display Chart
def display_chart(stock_list):
    print("\n--- Display Chart ---")
    print("Stock List: [", end="")
    for stock in stock_list:
        print(stock.symbol, end=" ")
    print("]")

    symbol = input("Enter stock symbol: ").upper()
    found = False
    current_stock = None
    for stock in stock_list:
        if stock.symbol == symbol:
            found = True
            current_stock = stock
            break
    if found:
        date = []
        price = []
        company = current_stock.name
        for dailyData in current_stock.DataList:
            date.append(dailyData.date)
            price.append(dailyData.close)

        plt.plot(date, price)
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.title(company)
        plt.savefig("stock.png")
        print("Chart saved as stock.png")

    else:
        print("Symbol Not Found ***")
    
    input("")


    # Add Daily Stock Data
def add_stock_data(stock_list):
    print("Add Daily Stock Data ----")
    print("Stock List: [",end="")
    for stock in stock_list:
        print(stock.symbol," ",end="")
    print("]")
    symbol = input("Which stock do you want to use?: ").upper()
    found = False
    for stock in stock_list:
        if stock.symbol == symbol:
            found = True
            current_stock = stock
    if found == True:
        print("Ready to add data for: ",symbol)
        print("Enter Data Separated by Commas - Do Not use Spaces")
        print("Enter a Blank Line to Quit")
        print("Enter Date,Price,Volume")
        print("Example: 8/28/24,47.85,10550")
        data = input("Enter Date,Price,Volume: ")
        while data != "":
            date, price, volume = data.split(",")
            daily_data = DailyData(date,float(price),float(volume))
          
            current_stock.add_data(daily_data)
            data = input("Enter Date,Price,Volume: ")
        print("Date Entry Complete")
    else:
        print("Symbol Not Found ***")
    _ = input("Press Enter to Continue ***")



   # Display Report for All Stocks
def display_report(stock_list):
    print("Stock report~~~~")
    for stock in stock_list:
        print("Report for: ", stock.symbol, stock.name)
        print("Shares: ", stock.shares)
        count = 0
        price_total = 0.00
        volume_total = 0
        lowPrice = 99999.99
        highPrice = 0
        lowVolume = 999999999
        highVolume = 0
        for daily_data in stock.DataList:
            count = count +1
            price_total = price_total + daily_data.close #accumulator calculates total price
            volume_total = volume_total + daily_data.volume #accumulator for volume
            if daily_data.close < lowPrice:
                lowPrice = daily_data.close
            if daily_data.close > highPrice:
                highPrice = daily_data.close
            if daily_data.volume < lowVolume:
                lowVolume = daily_data.volume
            if daily_data.volume > highVolume:
                highVolume = daily_data.volume
                
            #statistics
            priceChange = highPrice - lowPrice
            #print report
        if count>0:
            print("Summary report~~~~~")
            print("Low price: ${:,.2f}".format(lowPrice))
            print("High price: ${:,.2f}".format(highPrice))
            print("Average price: ${:,.2f}".format(price_total/count))
            print("Low volume: ",lowVolume)
            print("High volume: ", highVolume)
            print("Average volume {:,.2f}".format(volume_total/count))
            print("Change in price: ${:,.2f}".format(priceChange))
            print("Profit/loss: ${:,.2f}".format(priceChange * stock.shares))
        else:
            print("*** no daily history")
        print("\n\n\n")
        print("---Report Complete---")
        _=input("Press Enter to Continue")
    
def main_menu(stock_list):
    option = ""
    while True:
        print("Stock Analyzer ---")
        print("1 - Add Stock")
        print("2 - Delete Stock")
        print("3 - List stocks")
        print("4 - Load Data")
        print("5 - Show Chart")
        print("0 - Exit Program")

        try:
            option = input("Enter Menu Option: ")
        except EOFError:
            print("Goodbye")
            break
        if option =="0":
            print("Goodbye")
            break
        
        if option == "1":
            add_stock(stock_list)
        elif option == "2":
            delete_stock(stock_list)
        elif option == "3":
            list_stocks(stock_list)
        elif option == "4":
            import_stock_csv(stock_list)
        elif option == "5":
            display_chart(stock_list)

            
        else:
            
            print("Goodbye")

# Begin program
def main():
    stock_list = []
    main_menu(stock_list)

# Program Starts Here
if __name__ == "__main__":
    # execute only if run as a stand-alone script
    main()

