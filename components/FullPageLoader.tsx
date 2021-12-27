import type { NextPage } from 'next'
import Loader from './Loader'

const FullPageLoader: NextPage = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
        <Loader className="text-white" />
        Loading...
      </button>
    </div>
  )
}

export default FullPageLoader
