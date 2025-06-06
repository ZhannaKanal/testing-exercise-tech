'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { deleteLabel } from '@/features/labels/labelSlice'
import { useEffect, useState } from 'react'

export default function LabelList() {
  const dispatch = useDispatch()
  const labels = useSelector((state: RootState) => state.labels)


  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null 
  if (labels.length === 0) {
    return <p className="text-gray-500 mt-4">No labels yet.</p>
  }

  return (
    <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <h2 className="text-lg font-semibold">Your Labels</h2>
      {labels.map(label => (
        <div
          key={label.id}
          className="flex items-center justify-between p-3 border rounded shadow-sm"
          style={{
            color: label.textColor,
            backgroundColor: label.bgColor,
            fontSize: `${label.fontSize}px`,
            fontWeight: label.bold ? 'bold' : 'normal',
            fontStyle: label.italic ? 'italic' : 'normal',
          }}
        >
          <span>{label.text}</span>
          <button
            onClick={() => dispatch(deleteLabel(label.id))}
            className="ml-4 text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
