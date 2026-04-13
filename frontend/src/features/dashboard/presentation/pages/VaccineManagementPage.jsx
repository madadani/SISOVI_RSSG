import React, { useState, useEffect } from 'react';
import { ArrowLeft, Syringe, Plus, Loader2, Edit2, Save, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../application/adminService';
import { motion, AnimatePresence } from 'framer-motion';
import { createAdminToast, createAdminSwal } from '../../../../core/utils/swal';

const VaccineManagementPage = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const Toast = createAdminToast();
  const customSwal = createAdminSwal();

  const fetchVaccines = async () => {
    setLoading(true);
    try {
      const data = await adminService.getVaccines();
      setVaccines(data);
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: 'error',
        title: 'Gagal memuat data vaksin',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const handleDelete = async (v) => {
    const result = await customSwal.fire({
      title: 'Hapus Vaksin?',
      text: `Apakah Anda yakin ingin menghapus ${v.name}? Tindakan ini tidak dapat dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await adminService.deleteVaccine(v.id);
        fetchVaccines();
        Toast.fire({
          icon: 'success',
          title: 'Vaksin berhasil dihapus',
        });
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Gagal menghapus vaksin',
        });
      }
    }
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await adminService.updateVaccine(editingVaccine.id, {
        name: editingVaccine.name,
        description: editingVaccine.description,
        price: Number(editingVaccine.price),
        stock: Number(editingVaccine.stock)
      });
      setEditingVaccine(null);
      Toast.fire({
        icon: 'success',
        title: 'Data vaksin berhasil diperbarui',
      });
      fetchVaccines();
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: 'error',
        title: 'Gagal memperbarui data vaksin',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const totalStock = vaccines.reduce((sum, v) => sum + (v.stock || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
      <div className="mb-6">
        <div className="bg-white dark:bg-slate-900 border border-gray-100/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
              <ArrowLeft size={20} className="text-gray-600 dark:text-slate-300" />
            </button>
            <div>
              <h2 className="text-2xl font-black text-rs-dark-blue dark:text-slate-50 flex items-center gap-3">
                <Syringe size={22} className="text-rs-green" /> Stok & Vaksinasi
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Monitor ketersediaan stok vaksin dan manajemen harga secara langsung.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { label: 'Total Stok Gudang', value: loading ? '-' : totalStock, color: 'bg-rs-green' },
          { label: 'Total Jenis Vaksin', value: loading ? '-' : vaccines.length, color: 'bg-primary' }
        ].map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100/80 dark:border-slate-800"
          >
            <p className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
            <h4 className="text-3xl font-black text-gray-800 dark:text-white">{item.value}</h4>
            <div className={`h-1.5 w-12 ${item.color} rounded-full mt-4`}></div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100/80 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100/70 dark:border-slate-800 flex justify-between items-center bg-gray-50/60 dark:bg-slate-800/30">
          <h3 className="font-black text-rs-dark-blue dark:text-slate-50">Daftar Vaksin Terdaftar</h3>
          <button 
            disabled
            className="px-5 py-2.5 bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-bold rounded-2xl flex items-center gap-2 cursor-not-allowed opacity-70 border border-gray-200 dark:border-slate-700"
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
              <thead>
                <tr>
                  <th className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/50 text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100/70 dark:border-slate-800">Nama Vaksin</th>
                  <th className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/50 text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100/70 dark:border-slate-800 text-center">Stok</th>
                  <th className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/50 text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100/70 dark:border-slate-800">Harga</th>
                  <th className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/50 text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100/70 dark:border-slate-800 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/70 dark:divide-slate-800/60">
                {vaccines.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/70 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-black text-gray-800 dark:text-slate-200">{v.name}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500 truncate max-w-[200px]">{v.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-600 dark:text-slate-400">{v.stock}</td>
                    <td className="px-6 py-4 font-black text-rs-dark-blue dark:text-slate-50">Rp {v.price?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingVaccine(v)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(v)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100/80 dark:border-slate-800"
            >
              <div className="p-6 border-b border-gray-100/70 dark:border-slate-800 flex justify-between items-center bg-gray-50/60 dark:bg-slate-800/30">
                <h3 className="text-xl font-black text-rs-dark-blue dark:text-slate-50 flex items-center gap-2">
                  <Edit2 size={22} className="text-primary" /> Edit Detail Vaksin
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
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary/40 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Harga (Rp)</label>
                    <input 
                      type="number" 
                      value={editingVaccine.price}
                      onChange={(e) => setEditingVaccine({...editingVaccine, price: e.target.value})}
                      className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary/40 font-black text-rs-dark-blue dark:text-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Stok</label>
                    <input 
                      type="number" 
                      value={editingVaccine.stock}
                      onChange={(e) => setEditingVaccine({...editingVaccine, stock: e.target.value})}
                      className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary/40 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Deskripsi</label>
                  <textarea 
                    rows={3}
                    value={editingVaccine.description || ''}
                    onChange={(e) => setEditingVaccine({...editingVaccine, description: e.target.value})}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium"
                  />
                </div>



                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingVaccine(null)}
                    className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="flex-3 py-3 bg-primary hover:bg-rs-blue-dark text-white font-black rounded-2xl shadow-lg shadow-primary/30 flex justify-center items-center gap-2 transition-colors"
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
