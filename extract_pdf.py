import pypdf
import sys

try:
    reader = pypdf.PdfReader("CodeBandhu Research Paper.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open("extracted_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Extraction complete")
except Exception as e:
    print(f"Error: {e}")
