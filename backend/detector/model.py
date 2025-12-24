from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch

# Load SDXL detector
processor = AutoImageProcessor.from_pretrained("Organika/sdxl-detector")
model = AutoModelForImageClassification.from_pretrained("Organika/sdxl-detector")

def detect_image(image_path):
    try:
        img = Image.open(image_path).convert("RGB")

        # Preprocess
        inputs = processor(images=img, return_tensors="pt")

        with torch.no_grad():
            outputs = model(**inputs)

        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)[0]

        ai_score = float(probs[0])
        human_score = float(probs[1])

        if ai_score > human_score:
            label = "AI-generated"
            score = ai_score
        else:
            label = "Human-made"
            score = human_score

        return {
            "score": round(score, 3),
            "label": label,
            "details": {
                "ai_score": round(ai_score, 4),
                "human_score": round(human_score, 4)
            }
        }

    except Exception as e:
        print("DETECT ERROR:", e)
        return {"score": None, "label": "Unknown", "details": {}}
