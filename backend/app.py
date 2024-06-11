from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
import pandas as pd
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Database setup
DB_URL = 'postgresql://user:password@db:5432/covid_db'
engine = create_engine(DB_URL)

# Load model
MODEL_PATH = './models/covid_model.h5'
model = tf.keras.models.load_model(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame(data)
    predictions = model.predict(df)
    return jsonify(predictions.tolist())

@app.route('/data', methods=['GET'])
def get_data():
    query = 'SELECT * FROM covid_data'
    df = pd.read_sql(query, engine)
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
