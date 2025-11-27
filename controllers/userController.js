import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export function createUser(req, res) {

    if(req.body.role=="admin"){
        if(req.user == null )// meken karanne admin user ekak hadanna ona nm login wela inna ona kiyala
        {
            res.status(401).json(
        {
            message: "Please login as admin to create admin user"

        })
        return
    }
    if (req.user.role !="admin"){
        res.status(401).json(
            {
                message: "Only admin can create admin user" 
            })
            return

    }
    }

    console.log('createUser body:', req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user =  new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
        isBlocked: req.body.isBlocked,
        isEmailVerified: req.body.isEmailVerified,
        image: req.body.image
    }
    );
    user.save().then(
        ()=>{
            res.json({

            message: "User created successfully"
        })
    }
    ).catch(
        (err)=>{
            res.json(
                {
                message: "Error creating user"
                }
                
            )
            console.log(err);
        }
    )
}


export function loginUser(req, res) {
    // Login logic to be implemented
    User.findOne(
        {
         email: req.body.email 
        }
    ).then(
        (user) => {
            if(user == null){
                res.json({
                    message: "User with given email not found"
                });
            }
            else {
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);   
                if(isPasswordValid){
                    const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            image: user.image,
                            isEmailVerified: user.isEmailVerified,
                        },process.env.JWT_SECRET_KEY)

                    res.json({
                        message: "Login successful",
                        token: token
                    });
                    console.log(token);
                }
                else {
                    res.status(401).json({
                        message: "Invalid password"
                    });
                }
}}).catch(
    ()=>{
        res.status(500).json({
        message: "Error logging in user"
    
    })
}
);
    
}

export function isAdmin(req){
    if(req.user ==null){
        return false;
    }
    if(req.user.role !="admin"){
        return false;
    }
    return true;
}



//"email": "mainadmin1@example.com","password": "Test@1234" ---admin
//"email": "mainadmin2 @example.com","password": "Test@1234" ---admin
//"email": "testcustomer1@example.com","password":"Test@1234" --customer