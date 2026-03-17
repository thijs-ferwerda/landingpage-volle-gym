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
    headline: 'Ontdek of jouw gym in aanmerking komt.',
    subheadline: 'Vul het korte formulier in. Binnen 24 uur weet je of we samen kunnen groeien.',
    steps: ['eigenaar', 'knelpunt', 'openheid', 'doel', 'gymtype', 'gymnaam', 'contact'],
    ctaText: 'Verstuur mijn aanmelding',
  },
  b: {
    id: 'b',
    name: 'Test: Contact First',
    weight: 1,
    headline: 'Ontdek of jouw gym in aanmerking komt.',
    subheadline: 'Vul het korte formulier in. Binnen 24 uur weet je of we samen kunnen groeien.',
    steps: ['eigenaar', 'contact', 'gymnaam', 'knelpunt', 'openheid', 'doel', 'gymtype'],
    ctaText: 'Verstuur mijn aanmelding',
  },
};
