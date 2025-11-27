import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true  
},
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['customer', 'admin'],
        required: true,//2nd batch eke project eke meka na
        default: 'customer'
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true//2nd batch eke project eke meka na
    },
    isEmailVerified: { //2nd batch eke project eke meka na
        type: Boolean,
        default: false,
        required: true
    },
    image:{
        type: String,
        default: "/images/default profile.png",
        required: true
    }}
);
const User = mongoose.model('User', userSchema);
export default User;