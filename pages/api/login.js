import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken';


const handler = async (req, res) => {
    if(req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
       
        if(user){
            const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if(req.body.email == user.email && req.body.password == decryptedData){
                let token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn : "1d" } );
                res.status(200).json({ success :  true, token, email: user.email})
            }
            else{
                res.status(400).json({ success: false, error :  "Invalid credentials"})
            }
        }
        else{
            res.status(400).json({ success: false,error :  "No user Found !"})
        }
        
    }
    else{
        res.status(400).json({error :  "This message is not allowed"})
    }
}

export default connectDb(handler);