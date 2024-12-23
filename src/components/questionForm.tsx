"use client"

import { useState } from "react"
import axios from 'axios'

export default function QuestionForm(){
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleOptions = (index : number, value : string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async(e : React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/ques',{
        question,
        options,
        correctAnswer
      })
      console.log('Question added', response.data)
      setShowModal(true)
    } catch (error) {
      console.log('Error occured', error)
    } 
  }

  const closeModal = () => {
    setShowModal(false)
    window.location.reload()
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-10">
    <h1 className="text-2xl font-bold mb-4 text-center">Add New Question</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
          Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="options" className="block text-gray-700 font-bold mb-2">
          Options:
        </label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptions(index, e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="correctAnswer" className="block text-gray-700 font-bold mb-2">
          Correct Answer:
        </label>
        <input
          type="text"
          id="correctAnswer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Save Question</button>
    </form>

    {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p>Your question has been added successfully.</p>
            <button onClick={closeModal} className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              OK
            </button>
          </div>
        </div>
      )}
      
  </div>
  )
}