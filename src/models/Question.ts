import mongoose, {Document} from "mongoose";

//Interface for schema
interface Question extends Document{
  question : string;
  options : string[];
  correctAnswer : string
}

//schema
const QuestionSchema = new mongoose.Schema({
  question : {type : String , required : true},
  options : {type : [String], required : true},
  correctAnswer : {type : String, required : true}
})

//exporting model
const QuestionModel = mongoose.models.Question || mongoose.model<Question>('Question', QuestionSchema);
export default QuestionModel