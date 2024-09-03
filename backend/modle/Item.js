import mongoose from "mongoose";


const itemSchema = mongoose.Schema({

    
   item_name:{type:String},
   quantity:{type:Number},

})


export default mongoose.model("Item", itemSchema);