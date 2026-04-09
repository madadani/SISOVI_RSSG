import { useState, useCallback } from 'react';

export function useScreeningForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    birthdate: '',
    gender: '',
    phone: '',
    no_rm: '',
    address: '',
    // New Fields
    serviceLocation: 'RSSG Gemolong',
    serviceType: '',
    passportNumber: '',
    destinationCountry: '',
    namePassport1: '',
    namePassport4: '',
    email: '',
    departureDate: '',
    // Existing fields
    vaccines: [],
    purpose: '',
    visitDate: '',
    visitTime: '',
    answers: {},
    ktpFile: null,
    vaccineBookFile: null,
    consent: false,
    isAgreed: false,
  });

  const totalSteps = 5;

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleVaccine = useCallback((vaccine) => {
    setFormData((prev) => ({
      ...prev,
      vaccines: prev.vaccines.includes(vaccine)
        ? prev.vaccines.filter((v) => v !== vaccine)
        : [...prev.vaccines, vaccine],
    }));
  }, []);

  const updateAnswer = useCallback((questionIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionIndex]: value },
    }));
  }, []);

  const bulkUpdateAnswers = useCallback((indices, value) => {
    setFormData((prev) => {
      const newAnswers = { ...prev.answers };
      indices.forEach(idx => {
        newAnswers[idx] = value;
      });
      return { ...prev, answers: newAnswers };
    });
  }, []);

  return {
    step,
    setStep,
    formData,
    totalSteps,
    nextStep,
    prevStep,
    updateField,
    toggleVaccine,
    updateAnswer,
    bulkUpdateAnswers,
  };
}
