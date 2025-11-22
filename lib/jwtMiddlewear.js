import jwt from 'jsonwebtoken';

export default function authoraizeUser(req,res,next) { // mekan karanne user kenekge request enakota eyage jwt token eka check karala athuata ganne
        const header = req.header('Authorization');//header eke authorization kiyana eke token ekak thiyaawada nadda kiyala balanawa
        if(header != null){
            const token = header.replace("Bearer ","");//token ekak thiyanawa nm eke mulata "Bearer " ekak thiyanwa . eka meken replace karanawa
            jwt.verify(
                token,
                "i-computers-54!",
                (err,decoded) => {
                    if(decoded == null){
                        res.status(401).json({
                            message: "Unauthorized access"
                        });
                        
                    }else{
                        req.user = decoded;//token eka hadaddi ela athulata dapu data decrypt karama ganna puluwan. e data tika request eka athulaa danawa 
                        next();

                    }
                    
                }
                )

                
        
    }else{
        next();// meken wenne eelanga middlewear ekata yanna kiyala .meka dunne nathm request eka eelanga ekata yanne na 
    }
}