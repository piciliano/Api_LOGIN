import mongoose from "mongoose";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

const UserSchema = new mongoose.Schema ({
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true},
        age: { type: Number, required: true },
        birth: { type: String, required: true}
},
{
    timestamps: true,
});

const UserModel = mongoose.model<CreateUserDTO>("User", UserSchema);

export { UserModel }