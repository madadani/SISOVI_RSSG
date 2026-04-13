import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useScreeningForm } from '../application/useScreeningForm';
import { screeningService } from '../application/screeningService';
import ProgressBar from './components/ProgressBar';
import PatientDataStep from './components/PatientDataStep';
import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';
import VaccineSelectStep from './components/VaccineSelectStep';
import QuestionnaireStep from './components/QuestionnaireStep';
import ConfirmUploadStep from './components/ConfirmUploadStep';
import SuccessStep from './components/SuccessStep';

const ScreeningForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    step, 
    formData, 
    setStep,
    nextStep, 
    prevStep, 
    updateField, 
    toggleVaccine, 
    updateAnswer,
    bulkUpdateAnswers
  } = useScreeningForm();
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch initial data
  useEffect(() => {
    async function init() {
      try {
        const [vaxes, ques, locs] = await Promise.all([
          screeningService.getVaccines(),
          screeningService.getQuestions(),
          screeningService.getLocations()
        ]);
        setAvailableVaccines(vaxes);
        setQuestions(ques);
        setLocations(locs);
        
        // Auto-select first location if available
        if (locs.length > 0 && !formData.locationId) {
          updateField('locationId', locs[0].id);
        }

        // Auto-fill service type from navigation state if available
        if (location.state?.selectedVaccine) {
          if (!formData.serviceType) updateField('serviceType', location.state.selectedVaccine);
          
          // Also pre-check the vaccine in step 2 if we find a match
          const matchingVax = vaxes.find(v => v.name.toLowerCase().includes(location.state.selectedVaccine.toLowerCase()));
          if (matchingVax && formData.vaccines.length === 0) {
            // We use a Timeout because updateField might be batched or useScreeningForm state might not be ready
            // Actually, it's better to just call toggleVaccine or update vaccines directly.
            // Since we are in init(), let's just make sure vaccines is updated.
            updateField('vaccines', [matchingVax.id]);
          }
        }
      } catch (err) {
        setError('Gagal memuat data dari server. Silakan coba lagi.');
      } finally {
        setLoadingInitial(false);
      }
    }
    init();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    // Validasi Frontend
    const finalNik = formData.nik || formData.passportNumber;
    if (!finalNik) {
      setError('Pendaftaran digagalkan: Kolom No. Passport / NIK wajib diisi. Silakan kembali ke Tahap 1 (Data Diri) dan lengkapi data tersebut.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Map frontend data to DTO format
      // Note: In a real app, you'd map vaccine NAMES to IDs if the user selected names
      // But we'll try to use IDs directly from selection.
      
      const registrationData = {
        name: formData.namePassport1 || formData.name,
        nik: formData.nik || formData.passportNumber, // Use passport if NIK is not available
        birthdate: formData.birthdate,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        no_rm: formData.no_rm,
        vaccineIds: formData.vaccines, 
        locationId: formData.locationId,
        scheduleDate: formData.visitDate,
        scheduleTime: formData.visitTime,
        // New fields
        passportNumber: formData.passportNumber,
        namePassport1: formData.namePassport1,
        namePassport4: formData.namePassport4,
        destinationCountry: formData.destinationCountry,
        serviceType: formData.serviceType,
        departureDate: formData.departureDate,
        answers: questions.map((q, idx) => ({
          questionId: q.id,
          answer: formData.answers[idx] === 'yes'
        }))
      };

      const result = await screeningService.submitRegistration(registrationData);
      setSubmissionResult(result.data);
      setStep(5); // Go to success step
    } catch (err) {
      console.error('Submit error:', err);
      // Extra stringification to ensure error is readable if it's an object
      const serverError = err.response?.data?.error;
      const errorMsg = serverError ? (typeof serverError === 'string' ? serverError : JSON.stringify(serverError)) : err.message;
      setError(`Gagal mendaftar: ${errorMsg}. Mohon periksa kembali isian form Anda, pastikan semua kolom yang diperlukan (terutama No. Passport/NIK) sudah terisi.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-medium">Menghubungkan ke server RSSG...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-10 transition-colors duration-300">
      <BackgroundDecorator />
      <div className="container mx-auto px-4 py-6 relative z-10 max-w-4xl">
        <h2 className="text-3xl font-bold text-rs-dark-blue dark:text-blue-400 text-center mb-6">Skrining Vaksinasi Online</h2>
      
      <ProgressBar currentStep={step} />

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-6 md:p-8 transition-colors duration-300">
        {step === 1 && <PatientDataStep formData={formData} updateField={updateField} availableVaccines={availableVaccines} />}
        {step === 2 && (
          <VaccineSelectStep 
            formData={formData} 
            updateField={updateField} 
            toggleVaccine={toggleVaccine} 
            availableVaccines={availableVaccines}
            locations={locations}
          />
        )}
        {step === 3 && (
          <QuestionnaireStep 
            formData={formData} 
            updateAnswer={updateAnswer} 
            bulkUpdateAnswers={bulkUpdateAnswers}
            updateField={updateField}
            questions={questions}
          />
        )}
        {step === 4 && (
          <ConfirmUploadStep 
            formData={formData} 
            updateField={updateField} 
            availableVaccines={availableVaccines}
            questions={questions}
          />
        )}
        {step === 5 && <SuccessStep formData={formData} result={submissionResult} />}

        <div className="mt-8 pt-6 border-t flex justify-between">
          <button 
            disabled={step === 1 || step === 5 || isSubmitting} 
            onClick={prevStep}
            className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${step === 1 || step === 5 ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <ArrowLeft size={18} /> Kembali
          </button>
          
          {step < 4 && (
            <button 
              onClick={nextStep}
              disabled={step === 3 && !formData.isAgreed}
              className={`px-6 py-2 bg-primary text-white font-semibold rounded-lg transition flex items-center gap-2 shadow-md ${step === 3 && !formData.isAgreed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rs-blue-dark/90'}`}>
              Selanjutnya <ArrowRight size={18} />
            </button>
          )}

          {step === 4 && (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-rs-green text-white font-bold rounded-lg hover:bg-rs-green/90 transition flex items-center gap-2 shadow-md disabled:opacity-50">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Mendaftar...
                </>
              ) : (
                <>
                  <CheckCircle size={18} /> Konfirmasi & Daftar
                </>
              )}
            </button>
          )}

          {step === 5 && (
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition shadow-md">
              Kembali ke Beranda
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default ScreeningForm;
