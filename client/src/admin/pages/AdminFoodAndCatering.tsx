import { useEffect, useState, type FormEvent } from "react";
import AddHeadercomponent from "../components/AddHeadercomponent";
import AddFieldcomponent from "../components/AddFieldcomponent";
import { api, toApiError } from "../../api/API";
import { useAdminAuth } from "../context/AdminAuthContext";

const emptyForm = { name: '', description: '', price: '', dietaryType: '' };
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB, same limit as the server

export function AdminFoodAndCatering() {
  const [form, setForm] = useState(emptyForm);
  // the picked image stays in the browser until Save; the server uploads it to Cloudinary
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  // true once "Add Food & Catering" is clicked, which shows the form
  const [formOpen, setFormOpen] = useState(false);
  const { token } = useAdminAuth();

  // show the picked file as a local preview; free the old preview when it changes
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function handleImageChange(file: File | null) {
    setError('');
    if (file && file.size > MAX_FILE_SIZE) {
      setImageFile(null);
      setError('Image must be 10 MB or smaller.');
      return;
    }
    setImageFile(file);
  }

  function openForm() {
    setSuccess('');
    setFormOpen(true);
  }

  function closeForm() {
    setForm(emptyForm);
    setImageFile(null);
    setError('');
    setFormOpen(false);
  }

  //=======================Form Submit===========================//
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // quick checks here; the server checks everything again
    if (!form.name.trim()) return setError('Name is required.');
    if (!(Number(form.price) > 0)) return setError('Price must be greater than 0.');
    if (!form.dietaryType) return setError('Please choose a dietary type.');

    setError('');
    setSaving(true);
    // FormData can carry text fields and a file in one request
    const body = new FormData();
    body.append('name', form.name);
    body.append('description', form.description);
    body.append('price', form.price);
    body.append('dietaryType', form.dietaryType);
    if (imageFile) body.append('image', imageFile);

    try {
      const { data } = await api.post('/admin/foods', body, {
        headers: {
          // /admin/foods is behind protectAdmin, so send the admin's login token
          Authorization: `Bearer ${token}`,
          // overrides the api client's JSON default; the browser adds the boundary itself
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(data.message || 'Food item added successfully');
      closeForm();
    } catch (err) {
      setError(toApiError(err).message || 'Could not add food item.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="container-page py-10">
      <AddHeadercomponent title="Food & Catering" buttonText="Add Food & Catering" onButtonClick={openForm} />
      {success && <p className="mb-4 text-sm text-green-700">{success}</p>}
      {formOpen && (
      <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-xl border border-line bg-white p-6 shadow-sm">
        <AddFieldcomponent
          label="Name"
          autoFocus
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
          placeholder="e.g. South Indian Veg Buffet"
        />

        <AddFieldcomponent
          label="Price per plate"
          type="number"
          value={form.price}
          onChange={(price) => setForm({ ...form, price })}
          placeholder="e.g. 450"
        />

        <AddFieldcomponent
          label="Dietary Type"
          value={form.dietaryType}
          onChange={(dietaryType) => setForm({ ...form, dietaryType })}
          dropdownOptions={['Vegetarian', 'Non-Vegetarian']}
        />

        <AddFieldcomponent
          label="Description"
          rows={4}
          value={form.description}
          onChange={(description) => setForm({ ...form, description })}
          placeholder="Short description shown to customers"
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="mb-3 h-32 w-32 rounded-lg object-cover" />
        )}
        <AddFieldcomponent
          label="Image"
          type="file"
          accept="image/*"
          onFileChange={handleImageChange}
          hint="Maximum file size: 10 MB."
        />
        
        {error && <p className="mb-3 text-xs text-red-600">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeForm}
            className="cursor-pointer rounded-lg border border-line px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-lg bg-maroon-900 px-3.5 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
      )}
    </main>
  );
}
