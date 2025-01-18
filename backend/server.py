from flask import Flask, jsonify, request
from main import addItemHere, read_all_items_here, refresh_prices_here

app = Flask(__name__)

@app.route("/")
def read_root():
    return jsonify({"Hello": "World"})

@app.route("/addItem")
def read_item():
    url = request.args.get('url')
    return addItemHere(url)

@app.route("/allItems")
def read_all_items():
    return jsonify(read_all_items_here())

@app.route("/refreshPrices")
def refresh_prices():
    return jsonify(refresh_prices_here())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
