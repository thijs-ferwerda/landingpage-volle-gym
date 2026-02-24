# Volle Gym - Handleiding Marketing Specialisten

Welkom! Deze website (Volle Gym) is gebouwd als een razendsnelle web applicatie. We hebben een workflow opgezet waarmee jij als marketeer **volledige controle** hebt over de teksten, zónder dat je code hoeft te schrijven of afhankelijk bent van developers.

Dit document legt uit:
1. Hoe de architectuur werkt (waarom het zo snel is).
2. Hoe je zelf de landingspagina's voor je advertenties (Google Ads / Meta Ads) aanpast.
3. Hoe je de tracking links inricht.

---

## 1. De "No-Code" Architectuur in Jip & Janneke Taal
Onze website wordt gehost op **Vercel** en de code staat in **GitHub**. Deze twee systemen praten 24/7 met elkaar.
Wat dit voor jou betekent:
1. Jij bewerkt een simpel tekstbestandje in de GitHub website (in je browser).
2. Zodra je op "Opslaan" klikt, krijgt Vercel een seintje.
3. Vercel bouwt de website opnieuw op met jouw nieuwe teksten en zet deze **binnen 2 minuten live**.

**Het resultaat:** Jij kan wekelijks experimenteren met nieuwe advertentie 'Hooks' of USP's op de landingspagina, zonder ooit in contact te komen met een server of FTP-client.

---

## 2. Teksten Aanpassen via GitHub

De teksten voor speciale lead-campagnes (zoals Personal Training, Boutique Gyms, etc.) staan gecentraliseerd in één bestand. 

### Stappenplan:
1. Maak (eenmalig) een gratis account aan op [GitHub.com](https://github.com).
2. Vraag de eigenaar van de Volle Gym repository om jou rechten te geven tot de code.
3. Navigeer in de repository naar dit specifieke bestand:
   👉 `src/data/campaigns.js`
4. Klik rechtsboven in dat bestand op het **Potlood icoontje (Edit)**.
5. Je ziet nu de code blokken per campagne. Bijvoorbeeld de `pt` (Personal Training) campagne:
   ```javascript
   pt: {
       introTag: "Exclusieve marketing voor PT & Small Group",
       titleLine1: "Hoogwaardige leads voor",
       titleLine2: "Personal Trainers",
       // ...
   }
   ```
6. Pas de teksten aan tussen de aanhalingstekens (`"..."`).
   > ⚠️ **Let op (Gevaar!):** Verwijder nooit per ongeluk een komma (',') aan het einde van de regel, of een aanhalingsteken (`"`). Hierdoor breekt het bestand en zal de website niet updaten.
7. Scrol naar beneden. Klik op de groene knop **"Commit changes..."** (of direct op "Commit"). Zorg dat de optie "Commit directly to the `main` branch" is geselecteerd.
8. Wacht 2 minuten en controleer de live website. Je aanpassing staat online!

---

## 3. Google Ads & Meta Ads Koppelen (De Flow)

We hebben de Homepagina slim gemaakt. Hij leest de URL uit die de bezoeker intypt (of waar de bezoeker op klikt vanuit jouw advertentie) en toont op basis daarvan exact de juiste teksten die jij in stap 2 hebt gedefinieerd.

Dit heet **Message Match** en zorgt voor een veel hogere conversieratio.

### Hoe werkt dit in Meta / Google Ads?
Als jij in GitHub in het document `campaigns.js` de structuur `pt: { ... }` hebt gedefinieerd, dan is `pt` de zogenaamde "campaign key".

In je advertentie-beheerder gebruik je de volgende URL als landingspagina:
👉 `https://www.vollegym.nl/?campaign=pt` (of de kortere versie: `https://www.vollegym.nl/?c=pt`)

### Wat gebeurt er dan?
1. Een Personal Trainer klikt op jouw Meta Ad over "Meer PT Leads".
2. Hij landt op `vollegym.nl/?c=pt`.
3. De website herkent de `pt` code en gooit direct de standaard teksten weg over "sportscholen".
4. In de plaats toont hij precies de teksten uit jouw `campaigns.js -> pt` configuratie (bijv: "Hoogwaardige leads voor Personal Trainers").

### Zelf Nieuwe Varianten Maken?
Wil je een test doen voor "Boutique Gyms"? 
1. Kopieer in GitHub onderin `campaigns.js` een heel campagneblokje (inclusief haakjes `{}`).
2. Noem de nieuwe sleutel bijvoorbeeld `boutique`.
3. Pas de teksten aan & Commit.
4. Gebruik in je Meta Ad URL de link `vollegym.nl/?c=boutique`.

En je hebt een nieuwe A/B test live gezet, in exact 3 minuten en zonder een webdeveloper in te huren.

---

## 4. Hoe meten we de A/B test data? (Inzicht & Tracking)

Nu de dynamische landingspagina's staan, wil je natuurlijk inzicht in *welke* pagina het beste converteert. We maken deze data inzichtelijk zonder ingewikkelde externe software, door simpelweg slim gebruik te maken van **GoHighLevel (GHL)** en **UTM-tags**.

### Stappenplan voor inzicht:

1. **Gebruik altijd UTM-tags in je Ads**
   Wanneer je de link instelt in Meta of Google, plak hier dan UTM tags achter. Zorg dat de `utm_campaign` of `utm_content` correspondeert met je test.
   *Voorbeeld URL voor de 'boutique' test:*
   `vollegym.nl/?c=boutique&utm_source=meta&utm_medium=cpc&utm_campaign=boutique_test_a`

2. **GoHighLevel vangt de data op**
   Omdat de intake via een geïntegreerd GoHighLevel formulier (iframe) verloopt, pakt GHL razendsnel de UTM paramaters uit de URL op zodra de opgeslagen cookie wordt uitgelezen, of via de verborgen velden in het formulier.

3. **Bouw een Smart List (of View) in GoHighLevel**
   - Ga naar *Contacts* in GHL.
   - Filter op `Source` of `Campaign` overeenkomstig met de UTM tag (`boutique_test_a`).
   - Sla deze weergave op als een **Smart List** (bijv. "A/B Test: Boutique").

4. **Kijk naar de Conversieratio (De Metriek die telt)**
   - In Meta/Google Ads zie je hoeveel unieke klikken (Link Clicks) naar `?c=boutique` zijn gegaan.
   - In GHL zie je hoeveel totale intakes met die specifieke UTM tag zijn binnengekomen.
   - **Formule:** `(Aantal intakes GHL / Aantal kliks Meta) * 100 = Conversieratio %`

Door simpelweg de campagnesleutel (`?c=...`) gelijk te houden met je UTM tracking structuur, heb je het volledige dashboard al klaar in GHL.

---

Vragen? Check met het team!
