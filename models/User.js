import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    intro: { type: String, required: true },
    clgName: { type: String, required: true },
    branch: { type: String, required: true },
    clgDesc: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: [String], required: true },
    password: { type: String, required: true },
    year: { type: String, required: true },
    certification: [{
        certificates: { type: String, default: '' },
        organizations: { type: String, default: '' }
    },],
    experience:
        [{
            yearCompany: { type: String, default: '' },
            company: { type: String, default: '' },
            work: { type: String, default: '' },
            position: { type: String, default: '' }
        },],
    uploadPhoto: { type: String, default: '' },
    connection:[
        {
            name: { type: String, default : '' },
            email: { type: String, default : '' },
            intro: { type: String, default : '' },
            uploadPhoto: { type: String, default: '' },
        }
    ]
}, { timestamps: true });


export default mongoose.models.User || mongoose.model("User", userSchema);