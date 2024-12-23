// src/app/api/ques/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/dbConnect';
import Question from '@/models/Question';
import { NextApiRequest, NextApiResponse } from 'next';

// Handle POST request
export async function POST(req: Request) {
  await connectDB();

  const { question, options, correctAnswer } = await req.json();
  try {
    const newQuestion = new Question({ question, options, correctAnswer });
    await newQuestion.save();
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error saving question', error }, { status: 500 });
  }
}

export async function GET(req : NextApiRequest, res : NextApiResponse){
  await connectDB()
  try {
    const questions = await Question.find()
    return NextResponse.json(questions, {status : 200})
  } catch (error){
    return NextResponse.json({ message: 'Error fetching questions', error }, { status: 500 });
  }
}
