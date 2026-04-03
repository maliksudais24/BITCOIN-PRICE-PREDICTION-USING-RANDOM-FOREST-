from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

bitcoin_model = joblib.load("bitcoin_model.joblib")

@app.route("/api/bitcoin/predict", methods=["POST"])
def predict_bitcoin():
    try:
        data = request.get_json()
        
        current_price = float(data["price"])
        
        # Get current time features
        now = pd.Timestamp.now()
        
        # Prepare features: [lag1, lag2, price, hour, minute, dayofweek]
        # For prediction, we use current_price as both lag1 and lag2
        features = np.array([[
            current_price,  # lag1
            current_price,  # lag2
            current_price,  # price
            now.hour,
            now.minute,
            now.dayofweek
        ]])
        
        prediction = float(bitcoin_model.predict(features)[0])
        
        # Calculate price change
        price_change = prediction - current_price
        price_change_percent = (price_change / current_price) * 100
        
        return jsonify({
            "current_price": current_price,
            "predicted_price": round(prediction, 2),
            "price_change": round(price_change, 2),
            "price_change_percent": round(price_change_percent, 2),
            "prediction_timeframe": "2 minutes ahead"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ================================
# Run Server
# ================================
if __name__ == "__main__":
    app.run(port=5000, debug=True)
