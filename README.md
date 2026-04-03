# Bitcoin Price Prediction using Random Forest

A production‑ready machine learning system that predicts Bitcoin price movements using a **Random Forest** model. The solution includes automated data fetching, feature engineering, daily retraining, a Flask API backend, and a React + Tailwind CSS dashboard.

![Bitcoin Prediction Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Model Details](#model-details)
- [Automated Retraining Scheduler](#automated-retraining-scheduler)
- [API Endpoints](#api-endpoints)
- [Frontend Dashboard](#frontend-dashboard)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

Bitcoin’s high volatility makes price prediction challenging. This project uses a **Random Forest** algorithm – robust against overfitting and capable of capturing non‑linear relationships – to predict the next hour’s price direction (UP/DOWN) or the exact price (regression). Historical OHLCV data is sourced from a free crypto API (e.g., CoinGecko, Binance) and enriched with technical indicators. The model is retrained daily via a scheduler to stay current. A Flask API exposes predictions, and a React frontend visualizes forecasts, confidence scores, and historical accuracy.

---

## Features

- **Automated data pipeline** – fetches Bitcoin OHLCV data every hour
- **Feature engineering** – 20+ technical indicators (RSI, MACD, Bollinger Bands, moving averages, volatility, volume)
- **Random Forest model** – tuned hyperparameters, feature importance analysis
- **Binary classification** – predicts price direction (UP / DOWN) for next hour
- **Regression option** – predicts exact next price (MAE, RMSE evaluation)
- **Daily retraining scheduler** – uses APScheduler to rebuild model with fresh data
- **Flask REST API** – `/predict`, `/health`, `/retrain` endpoints
- **React + Tailwind frontend** – real‑time price chart, prediction card, confidence meter, feature importance chart
- **Docker support** – easy deployment with docker‑compose

---

## Architecture
![deepseek_svg_20260403_d10437](https://github.com/user-attachments/assets/93f98079-149e-4b8b-9bd4-16c5222302f8)

## Tech stack 
Layer	Technology
Data source	CoinGecko API / Binance API / Yahoo Finance
Processing	Python, pandas, numpy, ta (technical analysis lib)
Model	scikit‑learn (Random Forest)
Backend	Flask, Flask‑CORS, APScheduler
Frontend	React, Axios, Recharts, Tailwind CSS
Serialization	joblib / pickle
Scheduler	APScheduler (or cron)
Container	Docker, docker‑compose

## Usage

- **View dashboard** – live Bitcoin price chart (last 7 days).
- **Get prediction** – click "Predict Next Hour" or let auto‑refresh run.
- **Interpret signal** – model outputs:
  - **UP** (green) – predicted price increase
  - **DOWN** (red) – predicted price decrease
  - **Confidence percentage** (based on Random Forest probability)
- **Check feature importance** – see which indicators drive the model.
- **Manual retrain** – POST to `/retrain` endpoint or use scheduler.

---

## Model Details

### Target Variable
- **Regression**: next minute close price

### Features (24 total)

| Category          | Examples                                                       |
|-------------------|----------------------------------------------------------------|
| Price lags        | `close_t-1`, `close_t-2`, `close_t-3`                         |
| Moving averages   | `SMA_7`, `SMA_25`, `EMA_12`, `EMA_26`                         |
| Volatility        | ATR (Average True Range), Bollinger Bands width               |
| Momentum          | RSI (14), MACD line, signal line, histogram                   |
| Volume            | volume, volume SMA, volume change                             |
| Time features     | `hour_of_day`, `day_of_week`                                  |

### Hyperparameters (tuned)

```python
RandomForestClassifier(
    n_estimators=200,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    class_weight='balanced',
    random_state=42
)
```

Automated Retraining Scheduler

The scheduler (src/scheduler.py) runs daily at the hour defined in .env (RETRAIN_HOUR).

🔁 Process:
Fetch latest OHLCV data
Append to btc_ohlcv.csv
Recompute indicators
Retrain model
Save model → models/random_forest_model.pkl
Log metrics & feature importance

Api Endpoint 
| Method | Endpoint  | Description             | Example Response                         |
| ------ | --------- | ----------------------- | ---------------------------------------- |
| GET    | /health   | Health check            | {"status": "ok"}                         |
| GET    | /predict  | Latest prediction       | {"direction": "UP", "confidence": 0.72}  |
| POST   | /predict  | Custom input prediction | Same as above                            |
| POST   | /retrain  | Trigger retraining      | {"message": "Retraining started"}        |
| GET    | /history  | Last 100 predictions    | [{"predicted": "UP", "actual": "UP"}]    |
| GET    | /features | Feature importance      | [{"feature": "RSI", "importance": 0.12}] |

Frontend
Dashbord
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/da9bf82d-1aae-40d0-be44-215cbd09b019" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/7793385c-d1aa-40d4-829e-08a1eb2cdc98" />

Key Components
PriceChart → Recharts-based historical chart with zoom
PredictionCard → UP/DOWN signal + confidence bar
FeatureImportance → Top 10 features (bar chart)
AutoRefresh → Updates every 5 minutes

Future Improvements
Add LSTM / Transformer models
Integrate Twitter/Reddit sentiment analysis
Support multiple cryptocurrencies (ETH, SOL, etc.)
Add user authentication & alerts
Deploy Telegram bot for signals

Acknowledgements
yfinance API
scikit-learn
ta (Technical Analysis library)

Contact

Malik Sudais
📧 Maliksudais30@gmail.com

🔗 Project: https://github.com/yourusername/bitcoin-random-forest

