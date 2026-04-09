import React from 'react';

const QuestionnaireStep = ({ formData, updateAnswer, bulkUpdateAnswers, updateField, questions }) => {
  const handleBulkSelect = (value) => {
    // Collect all indices except index 18 (Question 19)
    const indicesToUpdate = questions
      .map((_, index) => index)
      .filter(index => index !== 18);
    
    bulkUpdateAnswers(indicesToUpdate, value);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b dark:border-slate-800 pb-4 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">3. Skrining Kesehatan</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Jawablah pertanyaan berikut dengan jujur sesuai kondisi Anda saat ini.</p>
        </div>
        
        <div className="flex gap-4 items-center bg-gray-50 dark:bg-slate-800/80 p-2 px-4 rounded-xl border border-gray-100 dark:border-slate-700">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-red-500" 
              onChange={(e) => e.target.checked && handleBulkSelect('yes')}
            />
            <span className="text-xs font-black text-red-600 uppercase tracking-tighter group-hover:underline">Pilih Semua Ya</span>
          </label>
          <div className="w-px h-4 bg-gray-200" />
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-green-600" 
              onChange={(e) => e.target.checked && handleBulkSelect('no')}
            />
            <span className="text-xs font-black text-green-700 uppercase tracking-tighter group-hover:underline">Pilih Semua Tidak</span>
          </label>
        </div>
      </div>

      <div className="space-y-0 border dark:border-slate-700 rounded-xl overflow-hidden divide-y dark:divide-slate-700">
        {questions.length > 0 ? (
          questions.map((q, idx) => (
            <div key={q.id || idx} className="flex flex-col p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-gray-700 dark:text-slate-200 text-sm font-medium flex-1">
                  <span className="mr-2 text-gray-400 dark:text-slate-500 font-bold">{idx + 1}.</span>
                  {q.questionText}
                </span>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateAnswer(idx, 'yes')}
                    className={`px-6 py-1.5 rounded-lg text-sm font-bold border-2 transition-all ${
                      formData.answers[idx] === 'yes'
                        ? 'bg-red-500 border-red-500 text-white shadow-md'
                        : 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                    }`}
                  >
                    Ya
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAnswer(idx, 'no')}
                    className={`px-6 py-1.5 rounded-lg text-sm font-bold border-2 transition-all ${
                      formData.answers[idx] === 'no'
                        ? 'bg-green-600 border-green-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-900 border-green-100 dark:border-green-900/30 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                  >
                    Tidak
                  </button>
                </div>
              </div>

              {/* Conditional Alert for Question 19 */}
              {idx === 18 && formData.answers[idx] && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-xs font-bold text-red-800 dark:text-red-300 animate-in fade-in slide-in-from-top-1">
                  {formData.answers[idx] === 'yes' 
                    ? "Harap membawa hasil pemeriksaan." 
                    : "Akan dilakukan pemeriksaan kehamilan di tempat pelayanan (tidak dipungut biaya pemeriksaan)."}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
             <p className="animate-pulse">Memuat formulir skrining...</p>
          </div>
        )}
      </div>

      {/* Declaration Section */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-4">
        <div className="flex gap-4">
          <div className="pt-1">
             <input 
              type="checkbox" 
              id="declaration"
              checked={formData.isAgreed || false}
              onChange={(e) => updateField('isAgreed', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-slate-700 text-primary focus:ring-primary cursor-pointer dark:bg-slate-800"
             />
          </div>
          <label htmlFor="declaration" className="text-sm font-bold text-gray-800 dark:text-slate-200 leading-relaxed cursor-pointer select-none">
            Dengan ini saya menyatakan data yang telah diisi adalah benar sesuai dengan kondisi kesehatan saat ini dan bersedia dilakukan tindakan vaksinasi, dokumen asli yang saya lampirkan, dan saya berkomitmen tidak akan memberikan hadiah, barang, uang, atau gratifikasi yang tidak sesuai dengan peraturan perundang-undangan kepada petugas dalam pelayanan vaksinasi.
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireStep;
