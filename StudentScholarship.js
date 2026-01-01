const mongoose = require("mongoose");
const ScholarshipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    studentName : {
      type:String,
      required : true
    },

    registerNumber: {
      type: String,
      required: true
    },

    dateOfBirth : {
      type : Date,
      required: true
    },

    fatherName : {
        type : String,
        required: true
    },

    motherName : {
        type : String,
        required : true
    },
     
    fatherOccupation : {
        type : String ,
        required : true
    },

    country : {
        type : String ,
        required : true
    },

    state : {
        type : String ,
        required : true
    },

    area : {
        type : String ,
        required : true
    },
    
    scholarshipName : {
      type: String,
      required: true
    },

    community: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    academicYear: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Applied", "Approved", "Rejected"],
      default: "Applied"
    }
  },
  { timestamps: true }

);
ScholarshipSchema.index(
    {registerNumber : 1 , academicYear : 1 },
    {unique : true}
);
module.exports = mongoose.model("Scholarship", ScholarshipSchema);
