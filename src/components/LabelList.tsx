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

  const [filterText, setFilterText] = useState('')
  const [filterColor, setFilterColor] = useState('')

  if (!hasMounted) return null
  if (labels.length === 0) return <p className="text-gray-500 mt-4">No labels yet.</p>


  const filteredLabels = labels.filter(label => {
    const matchesText = label.text.toLowerCase().includes(filterText.toLowerCase())
    const matchesColor = filterColor ? label.textColor === filterColor : true
    return matchesText && matchesColor
  })

  const handleExport = () => {
    const json = JSON.stringify(filteredLabels, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'labels.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2 space-y-4">
        <h2 className="text-lg font-semibold">Your Labels</h2>


        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by text..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="p-2 border rounded w-full sm:w-auto"
          />

          <input
            type="color"
            title="Filter by text color"
            value={filterColor}
            onChange={e => setFilterColor(e.target.value)}
            className="w-12 h-10 p-0 border rounded cursor-pointer"
          />

 
          {filterColor && (
            <button
              onClick={() => setFilterColor('')}
              className="ml-2 px-3 py-1 text-sm bg-[#e69138] text-white rounded hover:bg-[#f9cb9c]"
            >
              Clear Color
            </button>
          )}
        </div>


        {filteredLabels.length === 0 ? (
          <p className="text-gray-500">No labels match the filter.</p>
        ) : (
          filteredLabels.map(label => (
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
          ))
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Export Filtered to JSON
        </button>
      </div>
    </>
  )
}
