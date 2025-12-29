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
         required : true
        },
        studentStatus : {
            type : String,
            enum : ["Active" , "Inactive"],
            required : true
        },
        studentName : {
            type : String,
            required : true
        },
        department : {
            type : String ,
            required : true
        },
        inTime : {
            type : String
           
        },
        outTime : {
            type : String        
        }
    },
    {
        timestamps : true
    }
);
module.exports = mongoose.model("Student", StudentSchema);
