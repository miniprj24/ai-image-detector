import os
import json
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from detector.model import detect_image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static/uploads"
DB_FILE = "database.json"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

BACKEND_URL = "http://localhost:5000"


def load_db():
    if not os.path.exists(DB_FILE):
        return []
    try:
        with open(DB_FILE, "r") as f:
            return json.load(f)
    except:
        return []


def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.route("/posts", methods=["GET"])
def get_posts():
    posts = load_db()
    return jsonify(posts)


@app.route("/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    caption = request.form.get("caption", "").strip()

    filename = secure_filename(file.filename)
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)

    # Run all detectors
    detections = detect_image(save_path)

    public_path = f"{BACKEND_URL}/static/uploads/{filename}"

    new_post = {
        "id": str(uuid.uuid4()),
        "caption": caption,
        "image": public_path,
        "results": {
            "swin": detections["swin"]["label"],
            "cnn": detections["cnn"]["label"],
            "vit": detections["vit"]["label"],
            "f3net": detections["f3net"]["label"]
        },
        "scores": {
            "swin": detections["swin"]["score"],
            "cnn": detections["cnn"]["score"],
            "vit": detections["vit"]["score"],
            "f3net": detections["f3net"]["score"]
        }
    }

    posts = load_db()
    posts.insert(0, new_post)
    save_db(posts)

    return jsonify(new_post), 200


if __name__ == "__main__":
    print("🚀 Flask backend running at http://localhost:5000")
    app.run(debug=False)