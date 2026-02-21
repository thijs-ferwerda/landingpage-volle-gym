# Hosting Instructies: Volle Gym op een Subdomein

Je hebt nu de volledige Light Premium Volle Gym website lokaal draaien. Om dit online te zetten (bijvoorbeeld op `premium.vollegym.nl` of `go.vollegym.nl`), kun je de volgende stappen volgen.

## Stap 1: De Website Bouwen (Genereren)
Voordat je de website online zet, moet de code worden omgezet in statische, geoptimaliseerde bestanden.
1. Open je terminal in de map waar je project staat (`vollegym-landing`).
2. Typ het volgende commando in:
   ```bash
   npm run build
   ```
3. Vite zal nu een nieuwe map genaamd `dist` of `build` aanmaken. Deze map bevat alle finale bestanden (`index.html`, `assets/`, etc.). Dit is de map die je gaat uploaden naar je server.

## Stap 2: Subdomein Aanmaken
1. Log in op het controlepaneel van je webhost (bijv. TransIP, Hostnet, SiteGround, Vercel of Cloudflare).
2. Ga naar de DNS-instellingen (Domain of DNS tabblad).
3. Maak een nieuw **A-record** (of CNAME afhankelijk van je host) aan voor het gewenste subdomein, bijvoorbeeld `go`.
4. Koppel dit subdomein aan een specifieke route/map op je server. Bij traditionele hosting (DirectAdmin/cPanel) maak je via de interface een subdomein aan, die automatisch een map genereert.

## Stap 3: Bestanden Uploaden
### Optie A: Vercel of Netlify (Makkelijkste en gratis)
1. Maak een gratis account aan op [Vercel](https://vercel.com) of [Netlify](https://netlify.com).
2. Sleep de `dist` map (die je in Stap 1 hebt gemaakt) rechtstreeks in het dashboard via "Drag & Drop", óf koppel je GitHub repository.
3. Ga in Vercel naar **Settings > Domains** en voeg je subdomein toe (bijv. `go.vollegym.nl`).
4. Vercel geeft je een DNS-waarde (vaak een CNAME naar `cname.vercel-dns.com`). Voer deze in bij de DNS instellingen van je webhost (Stap 2).
5. Klaar! Vercel regelt ook direct een gratis SSL/HTTPS-certificaat.

### Optie B: Eigen Hosting (FTP)
Heeft vollegym.nl eigen webhosting?
1. Open een FTP programma zoals FileZilla.
2. Log in met de FTP gegevens van je host.
3. Navigeer naar de map van je zojuist aangemaakte subdomein (bijv. `public_html/go/`).
4. Upload de **inhoud** van je lokale `dist` map naar deze map. Zorg dat `index.html` direct in de root van die subdomein-map staat.

## De YouTube Links Aanpassen
Je noemde dat *Rick Astley* wel dik was (de beroemde rickroll!), dus we hebben die link even laten staan als voorbeeld in `SocialProof.jsx`! 

Als je later de échte video's wilt toevoegen:
1. Zoek in de code naar `src/components/SocialProof.jsx`.
2. Verander de `videoId: 'dQw4w9WgXcQ'` naar de echte YouTube ID.
   *(De ID is het stukje na `?v=` in een YouTube link. Vb: `youtube.com/watch?v=AbCdE123` heeft ID `AbCdE123`).*

Succes met de lancering! Laat het weten als je hulp nodig hebt met Vercel of FTP.
