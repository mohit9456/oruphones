import User from "../../models/User";
import Jwt from "jsonwebtoken";
import connectDb from "../../middlewares/mongoose";

const handler = async ( req, res ) => {
    if(req.method == "POST"){
        let token = req.body.token;
        let user = Jwt.verify(token, process.env.JWT_SECRET)   
        let dbUser = await User.findOne({email : user.email});
        const { name, branch, clgDesc, clgName, intro, phone, skills, year, certification, experience, uploadPhoto } = dbUser;
        res.status(200).json({ name, branch, clgDesc, clgName, intro, phone, skills, year, certification, experience, uploadPhoto })
    }
    else{
        res.status(400).json({ error: "error" })
    }  
}

export default connectDb(handler);