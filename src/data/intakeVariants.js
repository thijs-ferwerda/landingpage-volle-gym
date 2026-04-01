/**
 * Intake Variant Configuration
 *
 * Elke variant definieert:
 * - headline/subheadline: tekst boven het formulier
 * - steps: volgorde van formulierstappen (zie STEPS in IntakeNative.jsx)
 * - ctaText: tekst op de submit-knop
 * - weight: relatief gewicht voor random toewijzing (1 = gelijk verdeeld)
 */
export const intakeVariants = {
  a: {
    id: 'a',
    name: 'Qualifying First',
    weight: 1,
    headline: 'Meld je aan voor een Volle Gym.',
    subheadline: 'Vul het korte formulier hieronder in om te kijken of jouw club in aanmerking komt.',
    steps: ['eigenaar', 'knelpunt', 'openheid', 'doel', 'smallgroup', 'gymtype', 'gymnaam', 'contact'],
    ctaText: 'Verstuur mijn aanmelding',
  },
};
