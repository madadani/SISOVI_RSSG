import React, { useState, useEffect } from 'react';
import { ArrowLeft, Syringe, Plus, RefreshCcw, ExternalLink, Loader2, Edit2, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../application/adminService';
import { motion, AnimatePresence } from 'framer-motion';

const VaccineManagementPage = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchVaccines = async () => {
    setLoading(true);
    try {
      const data = await adminService.getVaccines();
      setVaccines(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await adminService.updateVaccine(editingVaccine.id, {
        name: editingVaccine.name,
        description: editingVaccine.description,
        price: Number(editingVaccine.price),
        stock: Number(editingVaccine.stock),
        isActive: editingVaccine.isActive
      });
      setEditingVaccine(null);
      fetchVaccines();
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui data vaksin');
    } finally {
      setIsUpdating(false);
    }
  };

  const totalStock = vaccines.reduce((sum, v) => sum + (v.stock || 0), 0);
  const activeVaccines = vaccines.filter(v => v.isActive).length;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600 dark:text-slate-400" />
        </button>
        <div>
          <h2 className="text-3xl font-black text-rs-dark-blue dark:text-blue-400 flex items-center gap-3">
            <Syringe size={32} className="text-rs-green" /> Stok & Vaksinasi
          </h2>
          <p className="text-gray-500 dark:text-slate-400 font-medium">Monitor ketersediaan stok vaksin dan manajemen harga secara langsung.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Stok Gudang', value: loading ? '-' : totalStock, color: 'bg-rs-green' },
          { label: 'Vaksin Aktif (Tersedia)', value: loading ? '-' : activeVaccines, color: 'bg-rs-gold' },
          { label: 'Vaksin Nonaktif', value: loading ? '-' : vaccines.length - activeVaccines, color: 'bg-red-500' }
        ].map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800"
          >
            <p className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
            <h4 className="text-3xl font-black text-gray-800 dark:text-white">{item.value}</h4>
            <div className={`h-1.5 w-12 ${item.color} rounded-full mt-4`}></div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
          <h3 className="font-bold text-gray-700 dark:text-slate-200">Daftar Vaksin Terdaftar</h3>
          <button 
            disabled
            className="px-5 py-2.5 bg-gray-400 text-white font-bold rounded-xl flex items-center gap-2 cursor-not-allowed opacity-60"
          >
            <Plus size={20} /> Tambah Data
          </button>
        </div>
        
        {loading ? (
          <div className="p-12 flex justify-center text-primary">
             <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : vaccines.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-800 text-xs text-gray-500 dark:text-slate-400 uppercase">
                <tr>
                  <th className="px-6 py-4 font-bold">Nama Vaksin</th>
                  <th className="px-6 py-4 font-bold text-center">Stok</th>
                  <th className="px-6 py-4 font-bold">Harga</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                  <th className="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {vaccines.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-black text-gray-800 dark:text-slate-200">{v.name}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500 truncate max-w-[200px]">{v.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-600 dark:text-slate-400">{v.stock}</td>
                    <td className="px-6 py-4 font-black text-rs-dark-blue dark:text-blue-400">Rp {v.price?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${v.isActive ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        {v.isActive ? 'AKTIF' : 'NONAKTIF'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setEditingVaccine(v)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Syringe size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">Belum ada data vaksin di database.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingVaccine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingVaccine(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                <h3 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-2">
                  <Edit2 size={24} className="text-blue-500" /> Edit Detail Vaksin
                </h3>
                <button onClick={() => setEditingVaccine(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Nama Vaksin</label>
                  <input 
                    type="text" 
                    value={editingVaccine.name}
                    onChange={(e) => setEditingVaccine({...editingVaccine, name: e.target.value})}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Harga (Rp)</label>
                    <input 
                      type="number" 
                      value={editingVaccine.price}
                      onChange={(e) => setEditingVaccine({...editingVaccine, price: e.target.value})}
                      className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 font-black text-rs-dark-blue dark:text-blue-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Stok</label>
                    <input 
                      type="number" 
                      value={editingVaccine.stock}
                      onChange={(e) => setEditingVaccine({...editingVaccine, stock: e.target.value})}
                      className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Deskripsi</label>
                  <textarea 
                    rows={3}
                    value={editingVaccine.description || ''}
                    onChange={(e) => setEditingVaccine({...editingVaccine, description: e.target.value})}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={editingVaccine.isActive}
                    onChange={(e) => setEditingVaccine({...editingVaccine, isActive: e.target.checked})}
                    className="w-5 h-5 accent-rs-green"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-gray-700 dark:text-slate-300">Tampilkan untuk Pasien (Status Aktif)</label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingVaccine(null)}
                    className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-500 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="flex-3 py-3 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2 hover:bg-blue-700 transition"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaccineManagementPage;
