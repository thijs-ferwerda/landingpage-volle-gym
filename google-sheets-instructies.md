# Veilig Live Data Delen via Google Sheets

Omdat je natuurlijk je echte klantdossiers (namen, nummers, etc.) **niet** openbaar wilt maken of per ongeluk wilt lekken met een publicatie-link, doen we dit 100% veilig en anoniem door de totalen te "isoleren" in een apart document.

Volg deze stappen exact op om de live data (uit je spreadsheet) anoniem en veilig op de site te krijgen:

### Stap 1: Maak een "Tussenstation" (Nieuwe Sheet)
1. Maak een gloednieuwe, lege Google Sheet aan (bijv. genaamd *VolleGym Website Live Data*).
2. In Rij 1 (Kolom A t/m E) komen de 5 cijfers te staan (Ad Spend, Leads, Calls, Intakes, Nieuwe Klanten).

**HOE JE DIT AUTOMATISEERT (De Formule):**
In plaats van de getallen wekelijks over te typen, kun je de volgende formule in cel A1 (en B1, C1 etc.) van je nieuwe *Tussenstation* sheet plakken:

`=IMPORTRANGE("LINK_VAN_JE_ECHTE_GEHEIME_SHEET"; "NaamVanTabblad!A1")`

- Vervang `LINK_VAN_JE_ECHTE_GEHEIME_SHEET` door de URL (uit je adresbalk) van je interne Volle Gym sheet.
- Vervang `NaamVanTabblad!A1` door de naam van het tabblad in je interne sheet, en de specifieke cel waar het totaal staat.

*(Let op: Je Google Sheet vraagt na het invullen van deze formule de eerste keer om "Toegang Toestaan". Klik daarop.)*

### Stap 2: Publiceer alléén dit Tussenstation
1. Ga in deze **nieuwe "Website Live Data" sheet** naar **Bestand** (File) -> **Delen** (Share) -> **Publiceren op internet...** (Publish to web).
2. Kies onder "Link" voor: **Hele document** en verander "Webpagina" naar **Kommagescheiden waarden (.csv)**.
3. Klik op **Publiceren** en kopieer de link die verschijnt.

### Stap 3: Geef de veilige link aan mij door
Plak deze gegenereerde `.csv` link in de chat. Ik bouw deze razendsnel in de website in! Omdat we alleen deze "Tussenstation"-sheet publiceren, is de rest van je echte CRM-data 100% ontoegankelijk voor de buitenwereld.
