from bs4 import BeautifulSoup
import pymongo
import requests
from html.parser import HTMLParser
from datetime import datetime
import asyncio
import certifi



# async def connectDB(product_name, price, product_link):
#     try:
#         client = pymongo.MongoClient('mongodb+srv://ayush:ayush123@cluster0.s0fsubx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
#                                      tlsCAFile=certifi.where())
#         db = client['FastApi-learning']
#         collection = db['ScrapeUp']
        
#         if collection.find_one({"Product_Name": product_name}):
#             collection.update_one(
#                 {"Product_Name": product_name},
#                 {"$push": {"Prices": {"Price": price, "Date": datetime.today().strftime('%d-%m-%Y')}}}
#             )
#         else:
#             collection.insert_one({"Product_Name": product_name,"Product_Link": product_link, "Prices": [{"Price": price, "Date": datetime.today().strftime('%d-%m-%Y')}]})


#     except Exception as e:
#         print(f"Error: {e}")



# def addItemHere(url):
#      urls = [url]

#      HEADERS = ({'User-Agent': "Mozilla/5.0 (Macintosh: Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36" })

#      for url in urls:
#           if "amazon" in url:
#                webpage = requests.get(url, headers=HEADERS)

#                soup = BeautifulSoup(webpage.content, "html.parser")



#                price = soup.find(class_="a-offscreen")

#                product_name = soup.find(class_="a-size-large product-title-word-break")

#                if not price or price.getText().strip() == "":
#                     price = soup.find(class_="a-price-whole")
#                     if not price or price.getText().strip() == "":
#                          price = soup.find(class_="a-price")
#                          if not price or price.getText().strip() == "":
#                               price = soup.find(class_="a-text-price")

#                if price and product_name:
                    
#                     product_name = product_name.get_text().strip()
#                     price = price.get_text().strip().replace("₹", "").replace(",", "")   
#                     print(f"Product Name: {product_name}")
#                     print(f"Price: {price}")

#                     try:
#                          asyncio.run(connectDB(product_name.strip(), price.strip(), url))
#                          return {"Success": "Data Added"}

#                     except Exception as e:
#                          print(f"Error{e}")
#                          return {"Error": "Error Occured"}
#                          continue;
#                else:
#                     print("Product not found")
#                     return {"Error": "Product not found"}
#                     continue

#           else:
#                print("Website not supported")
#                return {"Error": "Website not supported"}
#                continue;

     

# def read_all_items_here():
#      try:
#           client = pymongo.MongoClient('mongodb+srv://ayush:ayush123@cluster0.s0fsubx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
#                                      tlsCAFile=certifi.where())
#           db = client['FastApi-learning']
#           collection = db['ScrapeUp']
#           items = collection.find()
#           all_items = []
#           for item in items:
#                # Convert ObjectId to string
#                item['_id'] = str(item['_id'])
#                all_items.append(item)
          
#           return {"Items": all_items}
        
    
#      except Exception as e:
#           print(f"Error: {e}")
#           return {"Error": "Error Occurred"}
     


# def refresh_prices_here():

#      try:
#           client = pymongo.MongoClient('mongodb+srv://ayush:ayush123@cluster0.s0fsubx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
#                                      tlsCAFile=certifi.where())
          
#           db = client['FastApi-learning']
#           collection = db['ScrapeUp']
#           items2 = collection.find()
#           items = []
#           for item in items2:
#                # Convert ObjectId to string
#                item['_id'] = str(item['_id'])
#                items.append(item)

#           for item in items:
#                url = item['Product_Link']
#                HEADERS = ({'User-Agent': "Mozilla/5.0 (Macintosh: Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36" })

#                if "amazon" in url:
#                     webpage = requests.get(url, headers=HEADERS)

#                     soup = BeautifulSoup(webpage.content, "html.parser")

#                     price = soup.find(class_="a-offscreen")


#                     if not price or price.getText().strip() == "":
#                          price = soup.find(class_="a-price-whole")
#                          if not price or price.getText().strip() == "":
#                               price = soup.find(class_="a-price")
#                               if not price or price.getText().strip() == "":
#                                    price = soup.find(class_="a-text-price")

#                     if price:
#                          price = price.get_text().strip().replace("₹", "").replace(",", "")   
#                          print(f"Product Link: {url}")
#                          print(f"Price: {price}")

#                          if(price == item['Prices'][-1]['Price']):
#                               continue

#                          try:
#                               collection.update_one(
#                                    {"Product_Link": url},
#                                    {"$push": {"Prices": {"Price": price, "Date": datetime.today().strftime('%d-%m-%Y')}}})
#                          except Exception as e:
#                               print(f"Error{e}")
#                               return {"Error": "Error Occured"}
#                     else:
#                          print(url)
#                          print("Product not found")
#                          return {"Error": "Product not found"}

               
          

#      except Exception as e:
#           print(f"Error: {e}")
#           return {"Error": "Error Occurred"}
     
#      return {"Success": "Prices Updated"}

      
    


          # title = soup.find(class_="Nx9bqj CxhGGd").get_text()
          # print(title.strip())
          # except:
          #      print("Error")
          #      continue;

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}


def scrapedata(url):
     webpage = requests.get(url, headers=HEADERS)

     soup = BeautifulSoup(webpage.content, "html.parser")



     return (soup.prettify())
