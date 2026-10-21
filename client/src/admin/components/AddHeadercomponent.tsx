import { LayoutGrid, Plus } from 'lucide-react'
import React, { FC } from 'react'

type AddHeadercomponentType = {
    title?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}
const AddHeadercomponent: FC<AddHeadercomponentType> = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-1.5 text-[10px] text-marigold-700">
            <LayoutGrid size={14} aria-hidden="true" />
            Services
          </p>
          <h1 className="text-2xl font-medium tracking-tight text-maroon-900">
            {title}
          </h1>
        </div>
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-maroon-900 px-3.5 py-2 text-xs font-bold text-white transition hover:opacity-90"
        >
          <Plus size={14} aria-hidden="true" />
          {buttonText}
        </button>
      </div>
  )
}

export default AddHeadercomponent