import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, LayoutGrid, Plus } from 'lucide-react';
import { useCloudinary } from "../../hooks/useCloudinary";
import { api, toApiError } from '../../api/API';
const inputClass =
  'w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-maroon-900';

function AdminCategoryAddPage() {
  //const [form, setForm] = useState({ name: '', description: '', active: true });
  const [form, setForm] = useState({ name: '', description: '', active: true, image: '' })
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { upload, uploading } = useCloudinary();
  const [imageUrl, setImageUrl] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // hide the toast 3 seconds after it appears
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);   // restarts the 3 seconds if a new toast arrives
  }, [toast]);

  //========================IMAGE===============================//
  async function handleImageUpload(file: File) {
    setError('');

    const result = await upload(file, {
      folder: 'Events/Category',
    });

    if (result) {
      setImageUrl(result.secure_url);
    } else {
      setError('Image upload failed. Please try again.');
    }
  }

  //=======================Form Submit===========================//
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.name.trim().length == 0) {
      setError("Name is Required.");
      return;
    }
    setError('');
    try {
      const { data } = await api.post('/admin/addcategories', {
        name: form.name.trim(),
        description: form.description.trim(),
        status: form.active ? 'active' : 'inactive',
        image: imageUrl,
      });
      setToast({ type: 'success', text: data.message || 'Category added successfully' });
      closeAdd();
    } catch (err) {
      setToast({ type: 'error', text: toApiError(err).message || 'Could not add category.' });
    }
  }

  //==========================open add pop up=======================================

  function openAdd() {
    setModalOpen(true);
  }

  function closeAdd() {
    setModalOpen(false);
    setForm({ name: '', description: '', active: true, image: '' });
    setSelectedFile(null);
    setImageUrl('');
    setError('');
  }

  return (
    <main className="container-page py-10">

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-1.5 text-[10px] text-marigold-700">
            <LayoutGrid size={14} aria-hidden="true" />
            Services
          </p>
          <h1 className="text-2xl font-medium tracking-tight text-maroon-900">
            Categories
          </h1>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-maroon-900 px-3.5 py-2 text-xs font-bold text-white transition hover:opacity-90"
        >
          <Plus size={14} aria-hidden="true" />
          Add category
        </button>
      </div>



      {modalOpen && (
        <>
          <button
            type="button"
            onClick={closeAdd}
            className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-maroon-900 hover:underline"
          >
            <ArrowLeft size={14} /> Back to categories
          </button>

          <h1 className="mb-1 text-2xl font-semibold text-maroon-900">Add category</h1>
          <p className="mb-6 text-sm text-muted">Create a new service category like DJ or Decoration.</p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl rounded-xl border border-line bg-white p-6 shadow-sm"
          >
            {error && (
              <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
                {error}
              </p>
            )}

            <label className="mb-4 block">
              <span className="mb-1 block text-xs font-semibold text-ink">Name</span>
              <input
                autoFocus
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. DJ"
                className={inputClass}
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1 block text-xs font-semibold text-ink">Description</span>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => { setForm({ ...form, description: e.target.value }) }}
                placeholder="Short description shown to customers"
                className={inputClass}
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1 block text-xs font-semibold text-ink">
                Category image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setSelectedFile(file);
                  setImageUrl('');
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
              <span className="mt-1 block text-xs text-muted">
                Maximum file size: 10 MB.
              </span>
            </label>

            {selectedFile && (
              <p className="mb-3 text-xs text-ink">
                Selected: {selectedFile.name}
              </p>
            )}

            <label className="mb-6 flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => { setForm({ ...form, active: e.target.checked }) }}
              />
              Active (visible on the customer site)
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeAdd}
                className="cursor-pointer rounded-lg border border-line px-3.5 py-2 text-xs font-bold text-maroon-900 hover:bg-gold-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="cursor-pointer rounded-lg bg-maroon-900 px-3.5 py-2 text-xs font-bold text-white hover:opacity-90 disabled:opacity-60"
              >
                {uploading ? 'Uploading image...' : 'Add category'}
              </button>
            </div>
          </form>
        </>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'
            }`}
        >
          {toast.text}
        </div>
      )}
    </main>
  );
}

export default AdminCategoryAddPage;