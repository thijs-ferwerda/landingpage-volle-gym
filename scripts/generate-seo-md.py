import os
import sys
import json
import google.generativeai as genai
from pathlib import Path
import time

# Configuratie
SEO_DATA_FILE = "src/data/seo-pages.json" # Bestaande JSON met basis-data (slugs, titles, heroText)
OUTPUT_DIR = "src/content/seo"
TRANSCRIPTS_FILE = "transcripts.txt"

# Zorg dat dir bestaat
Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("❌ GEMINI_API_KEY environment variable is niet ingesteld.")
    print("Voer uit: export GEMINI_API_KEY='jouw-key-hier'")
    sys.exit(1)

genai.configure(api_key=api_key)
# Gebruik het snelle en slimme model
model = genai.GenerativeModel('gemini-1.5-flash')

# Lees basis data
try:
    with open(SEO_DATA_FILE, 'r', encoding='utf-8') as f:
        pages = json.load(f)
except Exception as e:
    print(f"❌ Fout bij lezen {SEO_DATA_FILE}: {e}")
    sys.exit(1)

# Lees interne kennis / SOP's
context_text = ""
try:
    with open(TRANSCRIPTS_FILE, 'r', encoding='utf-8') as f:
        context_text = f.read()
except FileNotFoundError:
    print("⚠️ transcripts.txt niet gevonden. De AI zal werken zonder interne context.")

SYSTEM_PROMPT = """
Jij bent de lead copywriter voor Volle Gym.
Jouw doel is het schrijven van lange, hoogwaardige SEO content (Information Gain) in 'Jip en Janneke' (simpele, begrijpelijke) taal.
Geen moeilijke vaktermen, geen 'marketing theorie' praat (geen 'funnels', 'high ticket', 'retentie' tenzij perfect uitgelegd).
De toon is: eerlijk, direct, nuchter, en professioneel lokaal Nederlands.
Focus op pijn oplossen: Waarom loopt een sportschool leeg? Waarom adverteren met korting niet werkt.
Maak de tekst lang en diepgaand (minimaal 800 - 1000 woorden), verdeeld over duidelijke H2 en H3 kopjes en makkelijk leesbare alinea's.

BELANGRIJK VOOR DEVELOPMENT: 
Het resultaat moet PURE Markdown zijn. Retourneer GEEN markdown code blocks (```markdown). Geef direct de tekst terug. Plaats GEEN frontmatter (---) aan de bovenkant. Start direct met een H2 (##).
"""

print(f"🚀 Start met genereren van {len(pages)} SEO pagina's via Google Gemini...")

for page in pages:
    slug = page.get("slug")
    title = page.get("title")
    desc = page.get("description")
    
    output_file = os.path.join(OUTPUT_DIR, f"{slug}.md")

    print(f"⏳ Genereren voor: {slug} ...")
    
    prompt = f"""
    {SYSTEM_PROMPT.strip()}
    
    ---
    
    Schrijf de SEO content 'body' tekst voor de pagina met de slug: '{slug}'.
    De titel van de pagina is: '{title}'.
    De meta beschrijving is: '{desc}'.
    
    Context vanuit Thijs (Volle Gym) transcripties:
    {context_text[:2000] if context_text else 'Geen specifieke interne context meegegeven, gebruik algemene Volle Gym visie (kwaliteit boven kwantiteit, lange termijn).'}
    
    Schrijf minimaal 800 woorden. Gebruik formattering (dikgedrukt, lijstjes).
    Vergeet niet af te sluiten met een interne link/Call to Action naar '/intake'.
    Start je reactie direct met "## [Titel van eerste sectie]".
    """
    
    try:
        response = model.generate_content(prompt)
        md_content = response.text.strip()
        
        # Strip eventuele markdown backticks 
        if md_content.startswith("```markdown"):
            md_content = md_content[11:]
        if md_content.startswith("```"):
            md_content = md_content[3:]
        if md_content.endswith("```"):
            md_content = md_content[:-3]
            
        md_content = md_content.strip()
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(md_content)
            
        print(f"✅ Opgeslagen: {output_file}")
        
    except Exception as e:
        print(f"❌ Fout bij genereren van {slug}: {e}")
        
    # Rate limit delay for free tier
    time.sleep(4)

print("🎉 Klaar! Alle content is gegenereerd.")
