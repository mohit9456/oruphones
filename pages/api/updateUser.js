import User from "../../models/User";
import connectDb from "../../middlewares/mongoose";
import Jwt from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token;
        let user = Jwt.verify(token, process.env.JWT_SECRET);
        await User.findOneAndUpdate({ email: user.email }, { name: req.body.name, intro: req.body.intro, clgName: req.body.clgName, branch: req.body.branch, clgDesc: req.body.clgDesc, phone: req.body.phone, skills: req.body.skills, year: req.body.year, certification: req.body.certificateArr, experience: req.body.experienceArr, uploadPhoto: req.body.newImage })
        res.status(200).json({ success: true })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler)