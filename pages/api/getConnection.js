import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";

const handler = async ( req, res ) => {
    if(req.method == "POST"){
        let DbUser = await User.find();
        res.status(200).json(DbUser)
    }
    else{
        res.status(400).json({ error: "error" })
    }  
}

export default connectDb(handler);