const mongoose = require("mongoose");
const StudentPaperSchema = new mongoose.Schema(
    {
    studentId : 
    {
        type : Number,
        required : true
    },
    registerNumber : {
        type : String,
        required : [true , "Register Number is Required"]
    },
    paperName : {
        type : String,
        required : true
    },
    paperCode : {
        type : String,
        required : true
    },
    semester : {
        type : String,
        required : true
    },
    marks : {
        type : Number ,
        requred : true
    }
 },
 {timestamps : true}
);
module.exports = mongoose.model("StudentPaper", StudentPaperSchema);//file name and schema name must be exported