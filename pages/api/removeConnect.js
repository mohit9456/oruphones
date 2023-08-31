import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";



const handler = async(req, res) => {
    if(req.method == 'POST'){
        let email = req.body.email;
        let email1 = req.body.email1;

        await User.updateOne({email: email}, 
            {$pull : { connection : { _id : email1}}})

        res.status(200).json({success : true, User})
    }else{
        res.error(400).json({error : 'error'})
    }
}



export default connectDb(handler)