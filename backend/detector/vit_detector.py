from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch

# ✅ This model is specifically trained to detect AI-generated images
processor = AutoImageProcessor.from_pretrained("umm-maybe/AI-image-detector")
model = AutoModelForImageClassification.from_pretrained("umm-maybe/AI-image-detector")

def detect(image_path):
    img = Image.open(image_path).convert("RGB")
    inputs = processor(images=img, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)[0]

    # Check what labels this model uses
    label_map = model.config.id2label
    pred = int(torch.argmax(probs))
    score = float(probs[pred])
    raw_label = label_map[pred].lower()

    label = "AI-generated" if any(word in raw_label for word in ["fake", "artificial", "generated", "ai"]) else "Human-made"

    return {
        "label": label,
        "score": round(score, 3)
    }