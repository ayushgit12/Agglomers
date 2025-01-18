from flask import Flask, jsonify, request
from main import scrapedata

app = Flask(__name__)

@app.route("/")
def read_root():
    return jsonify({"Hello": "World"})

@app.route("/scrapedata")
def read_scrape_data():
     # return jsonify({"Hello": "World"})
     data = request.get_json()  # Get JSON payload
     
     url = data.get('url')  # Extract 'url' from the JSON
     # return jsonify(url)
     if not url:
          return jsonify({"error": "URL is required in the JSON body"}), 400
     return jsonify(scrapedata(url))

# @app.route("/addItem")
# def read_item():
#     url = request.args.get('url')
#     return addItemHere(url)

# @app.route("/allItems")
# def read_all_items():
#     return jsonify(read_all_items_here())

# @app.route("/refreshPrices")
# def refresh_prices():
#     return jsonify(refresh_prices_here())



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
