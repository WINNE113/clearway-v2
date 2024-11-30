import React from 'react'

const Marker = ({ text }) => (
  <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
    {text}
  </div>
)

export default Marker

