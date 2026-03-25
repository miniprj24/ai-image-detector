from detector.swin_detector import detect as swin_detect
from detector.cnn_detector import detect as cnn_detect
from detector.vit_detector import detect as vit_detect
from detector.f3net_detector import detect as f3net_detect


def detect_image(image_path):

    results = {}

    try:
        results["swin"] = swin_detect(image_path)
    except Exception as e:
        print("SWIN ERROR:", e)
        results["swin"] = {"label": "Error", "score": None}

    try:
        results["cnn"] = cnn_detect(image_path)
    except Exception as e:
        print("CNN ERROR:", e)
        results["cnn"] = {"label": "Error", "score": None}

    try:
        results["vit"] = vit_detect(image_path)
    except Exception as e:
        print("VIT ERROR:", e)
        results["vit"] = {"label": "Error", "score": None}

    try:
        results["f3net"] = f3net_detect(image_path)
    except Exception as e:
        print("F3NET ERROR:", e)
        results["f3net"] = {"label": "Error", "score": None}

    return results