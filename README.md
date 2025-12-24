# AI Image Detector

This project is a full-stack web application that detects whether an image is **AI-generated** or **human-made**. Users upload an image through a React-based frontend, and the backend analyzes the image using a pre-trained image classification model. The result is returned with a confidence score and displayed as a post.

The application demonstrates server-side image inference, API integration, and result persistence in a simple end-to-end system.

---

## Demo Screenshots

### Image Upload Screen
The interface where users select an image for analysis.

![Image Upload Screen](demo/upload.png)

### Image Submission
The image being sent to the backend for detection.

![Image Submission](demo/caption.png)

### Detection Result
The post displaying the uploaded image along with the classification result and confidence score.

![Detection Result](demo/post.png)

---

## Setup Instructions

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the backend server:

```bash
python app.py
```


The backend will run at: `http://localhost:5000`


---

### Frontend

1. Navigate to the frontend directory, install dependencies and start the server:

```bash
cd frontend
npm install
npm run dev
```


---

## How Image Upload Works

1. The user selects an image in the frontend interface.
2. The image is sent as `multipart/form-data` to the backend `/upload` endpoint.
3. The backend saves the image locally and performs image classification.
4. The detection result is returned and rendered as a post.

---

## Notes

- Uploaded images are stored locally by the backend.
- Detection results are saved in a JSON file for demonstration purposes.
- Classification results are probabilistic and should not be treated as definitive.
- This project is intended for demonstration and educational use.
