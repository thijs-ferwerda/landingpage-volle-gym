import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { intakeVariants } from '../../data/intakeVariants';
import { captureUTMs, assignVariant, trackEvent } from '../../utils/tracking';

// ─── Step Definitions ───

const STEPS = {
  eigenaar: {
    question: 'Ben jij eigenaar of mede-eigenaar van een sportschool?',
    type: 'choice',
    field: 'isOwner',
    options: [
      { value: 'ja', label: 'Ja, ik ben (mede-)eigenaar' },
      { value: 'nee', label: 'Nee' },
    ],
    disqualifyOn: 'nee',
  },
  knelpunt: {
    question: 'Wat is op dit moment je grootste knelpunt in groei?',
    type: 'choice',
    field: 'knelpunt',
    options: [
      { value: 'te-weinig-leden', label: 'Te weinig nieuwe leden' },
      { value: 'geen-structuur', label: 'Te weinig structuur in marketing & sales' },
      { value: 'lage-conversie', label: 'Te lage conversie van leads naar leden' },
      { value: 'te-afhankelijk', label: 'Alles draait te veel op mij als eigenaar' },
    ],
  },
  openheid: {
    question: 'Sta je open om je huidige aanpak aan te passen als data laat zien dat iets beter werkt?',
    type: 'choice',
    field: 'openForChange',
    options: [
      { value: 'ja', label: 'Ja, absoluut' },
      { value: 'nee', label: 'Nee, liever niet' },
    ],
  },
  doel: {
    question: 'Wat is je concrete doel voor 2026?',
    type: 'choice',
    field: 'goal',
    options: [
      { value: 'groei-leden', label: 'Structureel groeien in leden' },
      { value: 'rust', label: 'Meer rust & voorspelbaarheid in de business' },
      { value: 'opschalen', label: 'Opschalen met team en processen' },
      { value: 'weet-niet', label: 'Ik weet het nog niet' },
    ],
  },
  gymtype: {
    question: 'In welk type sportschool past jouw onderneming het beste?',
    type: 'choice',
    field: 'gymType',
    options: [
      { value: 'pt-studio', label: '(Small group) personal training studio' },
      { value: 'crossfit', label: 'CrossFit / functionele trainingsgym' },
      { value: 'fitness', label: 'Reguliere fitness (abonnementen & vrije inloop)' },
      { value: 'vechtsport', label: 'Vechtsportschool (judo, karate, boksen, MMA)' },
      { value: 'pilates-yoga', label: 'Pilates of yoga studio' },
    ],
  },
  gymnaam: {
    question: 'Wat is de naam van jouw sportschool?',
    type: 'text',
    field: 'gymName',
    placeholder: 'Bijv. FitFactory Utrecht',
    autoComplete: 'organization',
  },
  contact: {
    question: 'Waar kunnen we je bereiken?',
    subtitle: 'We gaan zorgvuldig met je gegevens om. Geen zorgen.',
    type: 'contact',
    fields: [
      { name: 'firstName', label: 'Voornaam', type: 'text', autoComplete: 'given-name', required: true },
      { name: 'lastName', label: 'Achternaam', type: 'text', autoComplete: 'family-name', required: true },
      { name: 'phone', label: 'Telefoonnummer', type: 'tel', autoComplete: 'tel', required: true },
      { name: 'email', label: 'E-mailadres', type: 'email', autoComplete: 'email', required: true },
    ],
  },
};

// ─── Sub-components ───

const ChoiceStep = ({ step, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    setTimeout(() => onSelect(value), 250);
  };

  return (
    <div className="space-y-3 mt-6">
      {step.options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 group
            ${selected === option.value
              ? 'border-accent bg-accent/5 shadow-sm'
              : 'border-primary/10 hover:border-primary/25 hover:shadow-sm'}
            font-sans text-sm md:text-base font-medium text-primary`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
              ${selected === option.value ? 'border-accent bg-accent' : 'border-primary/20 group-hover:border-primary/40'}`}
            >
              {selected === option.value && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {option.label}
          </div>
        </button>
      ))}
    </div>
  );
};

const TextStep = ({ step, formData, onSubmit, isLast, ctaText }) => {
  const [value, setValue] = useState(formData[step.field] || '');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && value.trim() && onSubmit(value.trim())}
        placeholder={step.placeholder}
        autoComplete={step.autoComplete || 'off'}
        className="w-full px-5 py-4 rounded-xl border-2 border-primary/10 bg-white text-primary font-sans text-base placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
      />
      <button
        onClick={() => value.trim() && onSubmit(value.trim())}
        disabled={!value.trim()}
        className="mt-4 w-full bg-accent text-white px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {isLast ? ctaText : 'Volgende'}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const ContactStep = ({ step, formData, onSubmit, isSubmitting, ctaText }) => {
  const [data, setData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    phone: formData.phone || '',
    email: formData.email || '',
  });
  const firstRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => firstRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, []);

  const isValid = step.fields.every(f => !f.required || data[f.name]?.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && !isSubmitting) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      {step.fields.map((field, i) => (
        <div key={field.name}>
          <label className="block text-xs font-medium text-primary/50 uppercase tracking-wider mb-1.5 ml-1">
            {field.label}
          </label>
          <input
            ref={i === 0 ? firstRef : undefined}
            type={field.type}
            value={data[field.name]}
            onChange={(e) => setData(prev => ({ ...prev, [field.name]: e.target.value }))}
            autoComplete={field.autoComplete}
            required={field.required}
            className="w-full px-5 py-3.5 rounded-xl border-2 border-primary/10 bg-white text-primary font-sans text-base placeholder:text-primary/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-2 w-full bg-accent text-white px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Verwerken...
          </>
        ) : (
          <>
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

// ─── Main Component ───

const IntakeNative = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [variant, setVariant] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const stepRef = useRef(null);

  // Initialize: capture UTMs, assign variant, track page view
  useEffect(() => {
    window.scrollTo(0, 0);
    captureUTMs();

    // Allow forcing variant via ?variant=b (for testing)
    const forcedVariant = searchParams.get('variant');
    if (forcedVariant && intakeVariants[forcedVariant]) {
      localStorage.setItem('vg_intake_variant', forcedVariant);
      setVariant(forcedVariant);
    } else {
      const v = assignVariant(intakeVariants);
      setVariant(v);
    }

    trackEvent('FormView');
  }, []);

  const animateTransition = useCallback((forward, callback) => {
    if (!stepRef.current) { callback(); return; }

    const dir = forward ? 1 : -1;
    gsap.to(stepRef.current, {
      opacity: 0,
      x: -30 * dir,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        callback();
        requestAnimationFrame(() => {
          if (stepRef.current) {
            gsap.fromTo(stepRef.current,
              { opacity: 0, x: 30 * dir },
              { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }
            );
          }
        });
      },
    });
  }, []);

  if (!variant) return null;

  const activeVariant = intakeVariants[variant];
  const steps = activeVariant.steps;
  const currentStepKey = steps[currentStepIndex];
  const currentStep = STEPS[currentStepKey];
  const totalSteps = steps.length;
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const goToNext = (value) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('FormStart');
    }

    trackEvent('StepComplete', {
      step: currentStepKey,
      stepIndex: currentStepIndex,
      value: typeof value === 'object' ? 'contact_info' : value,
    });

    if (currentStep.disqualifyOn && value === currentStep.disqualifyOn) {
      trackEvent('Disqualified', { step: currentStepKey });
      navigate('/sorry');
      return;
    }

    const updatedData = currentStep.type === 'contact'
      ? { ...formData, ...value }
      : { ...formData, [currentStep.field]: value };
    setFormData(updatedData);

    if (currentStepIndex < totalSteps - 1) {
      animateTransition(true, () => setCurrentStepIndex(prev => prev + 1));
    } else {
      handleSubmit(updatedData);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      animateTransition(false, () => setCurrentStepIndex(prev => prev - 1));
    }
  };

  const handleSubmit = async (finalData) => {
    setIsSubmitting(true);
    trackEvent('FormSubmit', {
      gymName: finalData.gymName,
      gymType: finalData.gymType,
      knelpunt: finalData.knelpunt,
      goal: finalData.goal,
    });

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...finalData, variant }),
      });
    } catch {
      // Continue even if API call fails
    }

    navigate('/intake/gekwalificeerd');
  };

  return (
    <>
      <Helmet>
        <title>Intake | Volle Gym</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="min-h-screen pt-28 md:pt-32 pb-20 px-4 md:px-6 bg-background flex flex-col items-center relative z-10 w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-lg w-full mx-auto relative z-20 flex flex-col items-center">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary/10 rounded-full bg-white shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="font-data text-primary text-xs uppercase tracking-widest font-bold">
                Stap 1 van 2: Doe de intake
              </p>
            </div>

            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary tracking-tighter leading-[1.1] mb-4">
              Ontdek of jouw gym{' '}
              <br className="hidden md:block" />
              <span className="font-drama italic text-primary/70">in aanmerking komt.</span>
            </h1>

            <p className="font-sans text-primary/60 text-base md:text-lg max-w-md mx-auto leading-relaxed">
              {activeVariant.subheadline}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-data text-primary/40 uppercase tracking-wider">
                Vraag {currentStepIndex + 1} / {totalSteps}
              </span>
              <span className="text-xs font-data text-primary/40">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progress, 3)}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full bg-white rounded-2xl shadow-xl border border-primary/10 p-6 md:p-8">
            <div ref={stepRef}>
              <h2 className="font-heading font-semibold text-lg md:text-xl text-primary leading-snug">
                {currentStep.question}
              </h2>
              {currentStep.subtitle && (
                <p className="font-sans text-sm text-primary/40 mt-1">{currentStep.subtitle}</p>
              )}

              {currentStep.type === 'choice' && (
                <ChoiceStep step={currentStep} onSelect={goToNext} />
              )}
              {currentStep.type === 'text' && (
                <TextStep step={currentStep} formData={formData} onSubmit={goToNext} isLast={isLastStep} ctaText={activeVariant.ctaText} />
              )}
              {currentStep.type === 'contact' && (
                <ContactStep step={currentStep} formData={formData} onSubmit={goToNext} isSubmitting={isSubmitting} ctaText={activeVariant.ctaText} />
              )}
            </div>

            {currentStepIndex > 0 && (
              <button
                onClick={goBack}
                className="mt-5 text-primary/30 hover:text-primary/60 text-sm font-sans font-medium transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Vorige
              </button>
            )}
          </div>

          {/* Social proof */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c0x00000000-cc-rp-mo',
                  'https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c0x00000000-cc-rp-mo',
                ].map((url, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-primary/5 overflow-hidden shrink-0">
                    <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-primary/50 font-sans">
                <span className="font-semibold text-primary/70">40+ sportscholen</span> gingen je voor
              </p>
            </div>

            <div className="flex items-center gap-5 opacity-50">
              <div className="flex items-center gap-1.5 font-sans text-xs text-primary font-medium">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-bit beveiligd
              </div>
              <div className="w-1 h-1 rounded-full bg-primary/20" />
              <span className="font-sans text-xs text-primary font-medium">100% vrijblijvend</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntakeNative;
