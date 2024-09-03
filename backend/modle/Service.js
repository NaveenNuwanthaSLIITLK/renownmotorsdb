import mongoose from "mongoose";

const ProductPriceSchema = new mongoose.Schema({
    product: { type: String },
    price: { type:Number },
    quantity: {type: Number}
});

const ServiceSchema = new mongoose.Schema({
    number_plate: { type: String },
    model:{type:String},
    brand:{type:String},
    services: { type: String},
    price_of_service: { type: Number},
    discount:{type:Number},
    product_prices: [ProductPriceSchema],
    total_price:{type:Number}
},
{ timestamps: true });

export default mongoose.model("Service", ServiceSchema);
