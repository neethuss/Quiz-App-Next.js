import mongoose, {Document} from "mongoose";

//Interface for schema
interface Instructor extends Document{
  email : string;
  password : string;
}

//schema
const InstructorSchema = new mongoose.Schema({
  email : {type : String , required : true},
  password : {type : String, required : true}
})

// Exporting the schema model
const InstructorModel = mongoose.model<Instructor>("Instructor", InstructorSchema);
export default InstructorModel