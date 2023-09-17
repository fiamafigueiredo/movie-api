import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import TokenService from "./TokenService.js";
class AuthService {
    async isAdmin(user) {
        return user.roles.includes("65003d364624f95d8cd997ce");
    }
    async getAll() {
        try {
            const allUsers = await UserModel.find()
                .populate("roles")
                .select("-password");
            console.log(allUsers);
            return allUsers;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getOne(userId) {
        try {
            const user = await UserModel.findById(userId)
                .populate("roles")
                .select("-password");
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }
    async register(name, email, password, roleIds = []) {
        try {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error(`User ${name} already exists`);
            }
            const rolesToAssign = roleIds.length > 0 ? roleIds : ["64f607236b45117d0fb7fdef"];
            const newUser = new UserModel({
                name,
                email,
                password,
                roles: rolesToAssign,
            });
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch (error) {
            console.error(error);
            throw new Error("Registration failed.");
        }
    }
    async login(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return null;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            const token = TokenService.generateAccessToken(user);
            return { token, user };
        }
        catch (err) {
            console.error(err);
            throw new Error("Login failed.");
        }
    }
}
export default new AuthService();
//# sourceMappingURL=AuthService.js.map