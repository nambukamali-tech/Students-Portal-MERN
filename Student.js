const mongoose = require("mongoose");//Import mongoose -> mongoose like ORM ("EF Core")
const StudentSchema = new mongoose.Schema(
    {
        studentId : {//Field name
         type : Number,//Data type
         required : true,//Required field
         unique : true//Like unique key
        },
        registerNumber : {
         type : String,
         required : [true , "Register Number is Required"]
        },
        studentStatus : {
            type : String,
            enum : ["Active" , "Inactive"],
            required : [true , "Student Status is Required"]
        },
        studentName : {
            type : String,
            required : [true, "Student Name is Required"]
        },
        department : {
            type : String ,
            required : [true, "Department is Required"]
        },
        inTime : {
            type : String,
            required : [true, "InTime is required"]
           
        },
        outTime : {
            type : String,
            required : [true, "OutTime is required"]        
        }
    },
    {
        timestamps : true
    }
);
module.exports = mongoose.model("Student", StudentSchema);
