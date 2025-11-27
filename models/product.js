import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    // we store alternative names as a list of strings
    altNames:[
        {
            type: String
        }
    ],
    // eka product ekakata images keepayak thiyanawa kiyla. eka nisa ai images links array ekak widihata store karagannawa.
    images : [
        {
            type: String
        }
    ],
    price : {
        type: Number,
        required: true  
    },
    lastPrice :{
        type: Number,
        required: true 
    },
    stock:{
        type: Number,
        required: true
    },
    description:{   
        type: String,
        required: true
    }
});
const Product = mongoose.model('Product', productSchema);
export default Product;

    
