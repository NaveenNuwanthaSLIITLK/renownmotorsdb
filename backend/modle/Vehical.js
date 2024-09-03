import mongoose from "mongoose";


const VehivalSchema = new mongoose.Schema({

   
   number_plate:{type: String },
   model:{type:String},
   brand:{type:String},
   contact_number:{type:String}
   

})



export default mongoose.model("vehical", VehivalSchema);