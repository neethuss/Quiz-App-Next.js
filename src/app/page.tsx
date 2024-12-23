import Link from "next/link"
import connectDB from '../utils/dbConnect';

export default function Home(){
  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <div  className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Quiz App</h1>
      <Link href='/quiz'>
      <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-lg">
        Start Quiz
      </button>
      </Link>
      </div>
    </div>
    
  )
}