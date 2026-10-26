import type { FC } from 'react'

const inputClass =
  'w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-maroon-900';

type AddFieldcomponentType = {
    label: string;
    // value and onChange are for text fields; a file field uses onFileChange instead
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'number' | 'tel' | 'password' | 'url' | 'file';
    // rows > 0 shows a textarea instead of a one-line input
    rows?: number;
    // a list of options shows a dropdown instead of an input
    dropdownOptions?: string[];
    // type="file" only: called with the picked file (null if the picker is cleared)
    onFileChange?: (file: File | null) => void;
    // type="file" only: which files the picker allows, e.g. "image/*"
    accept?: string;
    // small grey text under the field, e.g. "Maximum file size: 10 MB."
    hint?: string;
    autoFocus?: boolean;
    required?: boolean;
}
const AddFieldcomponent: FC<AddFieldcomponentType> = ({
  label, value = '', onChange, placeholder, type = 'text', rows, dropdownOptions,
  onFileChange, accept, hint, autoFocus, required,
}) => {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      {type === 'file' ? (
        // the browser owns a file input's value, so it is not set from props
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange?.(e.target.files?.[0] ?? null)}
          autoFocus={autoFocus}
          required={required}
          className={inputClass}
        />
      ) : dropdownOptions ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          autoFocus={autoFocus}
          required={required}
          className={inputClass}
        >
          {/* empty first option so nothing is picked until the admin chooses */}
          <option value="" disabled>{placeholder ?? `Select ${label.toLowerCase()}`}</option>
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          className={inputClass}
        />
      )}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  )
}

export default AddFieldcomponent
