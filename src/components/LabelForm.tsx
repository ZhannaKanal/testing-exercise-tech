'use client'

import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addLabel } from '@/features/labels/labelSlice'
import { v4 as uuidv4 } from 'uuid'
import type { Label } from '@/features/labels/types'
import { AppDispatch } from '@/store'

export default function LabelForm() {
  const dispatch = useDispatch<AppDispatch>()

  const [form, setForm] = useState<Omit<Label, 'id'>>({
    text: '',
    textColor: '#000000',
    bgColor: '#ffffff',
    fontSize: 16,
    bold: false,
    italic: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addLabel({ ...form, id: uuidv4() }))
    setForm({
      text: '',
      textColor: '#000000',
      bgColor: '#ffffff',
      fontSize: 16,
      bold: false,
      italic: false,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 border rounded-[8px] bg-white shadow text-[#a45f1f]">
      <h2 className="text-xl font-semibold ">Create Label</h2>

      <input
        name="text"
        type="text"
        placeholder="Label text"
        value={form.text}
        onChange={handleChange}
        className="w-full p-2 border rounded-[8px]"
        required
      />

      <div className="flex gap-2">
        <div>
          <label className="block text-sm">Text Color</label>
          <input type="color" name="textColor" value={form.textColor} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm">Background</label>
          <input type="color" name="bgColor" value={form.bgColor} onChange={handleChange} />
        </div>
      </div>

      <div>
        <label className="block text-sm">Font Size (px)</label>
        <input
          type="number"
          name="fontSize"
          value={form.fontSize}
          onChange={handleChange}
          className="w-full p-2 border rounded-[8px]"
          min={8}
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="bold" checked={form.bold} onChange={handleChange} />
          Bold
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="italic" checked={form.italic} onChange={handleChange} />
          Italic
        </label>
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-1">Live Preview:</div>
        <div
          className="p-2 border rounded-[8px]"
          style={{
            color: form.textColor,
            backgroundColor: form.bgColor,
            fontSize: `${form.fontSize}px`,
            fontWeight: form.bold ? 'bold' : 'normal',
            fontStyle: form.italic ? 'italic' : 'normal',
          }}
        >
          {form.text || 'Preview text'}
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#e69138] hover:bg-[#f9cb9c] text-white hover:text-[#b45f06] py-2 px-4 rounded-[8px] w-1/2 mx-auto"
      >
        Add Label
      </button>
    </form>
  )
}
