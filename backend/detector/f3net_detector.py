import subprocess

def detect(image_path):

    result = subprocess.run(
        ["python", "third-eye/code/app.py", image_path],
        capture_output=True,
        text=True
    )

    output = result.stdout.strip()

    label = "AI-generated" if "fake" in output.lower() else "Human-made"

    return {
        "label": label,
        "score": "N/A"
    }