from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch

processor = AutoImageProcessor.from_pretrained("Organika/sdxl-detector")
model = AutoModelForImageClassification.from_pretrained("Organika/sdxl-detector")


def detect(image_path):

    img = Image.open(image_path).convert("RGB")

    inputs = processor(images=img, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)[0]

    pred = int(torch.argmax(probs))
    score = float(probs[pred])

    label_map = model.config.id2label
    raw_label = label_map[pred].lower()

    if any(word in raw_label for word in ["fake", "artificial", "generated", "ai", "synthetic", "sdxl"]):
        label = "AI-generated"
    else:
        label = "Human-made"

    return {
        "label": label,
        "score": round(score, 3)
    }