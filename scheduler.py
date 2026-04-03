import schedule
import time
from bitcoinmodel import train_model
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def job():
    """Retraining job"""
    try:
        logger.info("Starting model retraining...")
        train_model()
        logger.info("Retraining completed successfully.")
    except Exception as e:
        logger.error(f"Retraining failed: {str(e)}")

# Schedule retraining every hour (adjust as needed, e.g., schedule.every(30).minutes.do(job))
schedule.every(1).hours.do(job)

# Initial training
job()

logger.info("Scheduler started. Retraining every 1 hour. Press Ctrl+C to stop.")

# Run continuously
while True:
    schedule.run_pending()
    time.sleep(60)  # Check every minute
