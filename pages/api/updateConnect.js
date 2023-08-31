import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";


const handler = async (req, res) => {
    if (req.method == 'POST'){

        let email = req.body.email;
        let respArr = req.body.respArr;

        await User.findOneAndUpdate({email : email}, {connection : respArr });
        res.status(200).json({ success : true })
    }else{
        res.error(400).json({error : 'error'})
    }
}

export default connectDb(handler)