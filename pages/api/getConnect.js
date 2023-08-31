import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";


const handler = async (req, res) => {
    if(req.method == 'POST'){
        let email = req.body.email;

        let DbUser = await User.findOne({email : email})
        // const { connection } = DbUser;
        res.status(200).json({ DbUser })
    }else{
        res.error(400).json({error : 'error'})
    }
}

export default connectDb(handler)