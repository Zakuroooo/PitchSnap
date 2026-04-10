import PyPDF2

with open('PitchSnap_Redesign_PRD_TRD.pdf', 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
        
with open('PitchSnap_Redesign_PRD_TRD.md', 'w') as out:
    out.write(text)
print("Done")
