import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken';



const handler = async (req, res) => {
    if(req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
       
        if(!user){
        const { name, email, intro, clgName, branch, clgDesc, skills, phone, year } = req.body;
        let u = new User({name, email, intro, clgName, branch, clgDesc, skills, phone, year, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
        await u.save();
        let token = jwt.sign({ email: req.body.email, name: req.body.name }, process.env.JWT_SECRET, { expiresIn : "1d" } );
        res.status(200).json({success :  "Success", token, email: req.body.email})
        }else{
            res.status(400).json({error :  "this email Id already registered !!"})
        }
    }
    else{
        res.status(400).json({error :  "This message is not allowed"})
    }
}

export default connectDb(handler);