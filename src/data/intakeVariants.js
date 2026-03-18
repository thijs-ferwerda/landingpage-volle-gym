/**
 * Intake A/B Test Variant Configuration
 *
 * Elke variant definieert:
 * - headline/subheadline: tekst boven het formulier
 * - steps: volgorde van formulierstappen (zie STEPS in IntakeNative.jsx)
 * - ctaText: tekst op de submit-knop
 * - weight: relatief gewicht voor random toewijzing (1 = gelijk verdeeld)
 *
 * Nieuwe variant toevoegen: voeg een nieuw object toe.
 * Variant uitschakelen: zet weight op 0.
 * Variant forceren (test): /aanmelding?variant=b
 */
export const intakeVariants = {
  a: {
    id: 'a',
    name: 'Control: Qualifying First',
    weight: 1,
    headline: 'Meld je aan voor een Volle Gym.',
    subheadline: 'Vul het korte formulier hieronder in om te kijken of jouw club in aanmerking komt.',
    steps: ['eigenaar', 'knelpunt', 'openheid', 'doel', 'gymtype', 'gymnaam', 'contact'],
    ctaText: 'Verstuur mijn aanmelding',
  },
  b: {
    id: 'b',
    name: 'Test: Contact First',
    weight: 0,
    headline: 'Meld je aan voor een Volle Gym.',
    subheadline: 'Vul het korte formulier hieronder in om te kijken of jouw club in aanmerking komt.',
    steps: ['eigenaar', 'gymnaam', 'knelpunt', 'openheid', 'doel', 'gymtype', 'contact'],
    ctaText: 'Verstuur mijn aanmelding',
  },
};
