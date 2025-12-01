// order eka kawda damme kiyala order eke thiyenne one. 
// eka nisa email eka aniwarenma thiyenne one. Eeta amatharawa order eka specifically aduraganna order id ekak thiyenne one.
//  products wala nnm api id ekak denawa habai mekedi id eka aut generate wenna one.
//ordered items tika thiyenna one eka array ekak. eka athule gatha product eke id eka unit price eka quantity eka thiyenne one.
//habai e tika a thule e tika witharak thiyala ba. nikamata dan ape shop eke thiyana wadiya wikinenne nathi deyak api replace karanwa system eken nama, discription maru krala.habai e kalin thibba baduwa ape order eke thiyanawa. ethoakpt eka apita identify karaganna bari wenwa. eka nisa apita product id ,price,qauntity ekata amatharawa, product name eka and images walin ekak
//order date eka thiyenne one
//koikatath payment eka ta payment id eka denna one 
//note eka dannath thanak thiiyyanna one
///order ekaka status ekak thiyenne one, default pending kiyala
//oder eka yana gedara ekkenage nama, phone number eka, address eka thiyenne one


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    orderedItems: [
        {
            name: {
                type: String,
                required: true
            },
            price : {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    paymentId: {
        type: String,
    },
    status: {
        type: String, 
        default: 'preparing'
    },
    note: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    }
});
const Order = mongoose.model('Order', orderSchema);
export default Order;