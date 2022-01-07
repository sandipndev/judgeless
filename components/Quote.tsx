import type { NextPage } from 'next'

interface QuoteProps {
  body: string
  by: string
  title: string
}

const Quote: NextPage<QuoteProps> = ({ body, by, title }) => (
  <div className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style={{ maxWidth: "500px" }}>
    <div className="w-full mb-6">
      <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
      <p className="text-xl text-gray-600 text-center px-5">{body}</p>
      <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
    </div>
    <div className="w-full">
      <p className="text-md text-indigo-500 font-bold text-center">{title}</p>
      <p className="text-xs text-gray-500 text-center">{by}</p>
    </div>
  </div>
)

export default Quote
