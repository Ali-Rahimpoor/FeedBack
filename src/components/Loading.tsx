import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex w-[100%] sm:w-[640px] mx-auto justify-center items-center bg-zinc-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

export default Loading 