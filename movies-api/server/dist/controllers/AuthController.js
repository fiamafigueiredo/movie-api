import AuthService from "../services/AuthService.js";
import { RoleModel } from "../models/userModel.js";
import { validationResult } from "express-validator";
class AuthController {
    async getAll(req, res) {
        try {
            const userRoles = req.user.roles;
            if (!userRoles.includes("65003d364624f95d8cd997ce")) {
                return res
                    .status(403)
                    .json({ error: "Access denied. User is not an admin." });
            }
            const allUsers = await AuthService.getAll();
            res.json(allUsers);
        }
        catch (err) {
            console.log(err);
        }
    }
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(500)
                    .json({ message: "Error during registration.", errors });
            }
            const { name, email, password, roleIds } = req.body;
            const newUser = await AuthService.register(name, email, password, roleIds);
            res.status(201).json(newUser);
        }
        catch (err) {
            res.status(500).json({ errorMessage: "Registration failed", error: err });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await AuthService.login(email, password);
            if (!user) {
                return res.status(401).json({ message: "Authentication failed" });
            }
            res.json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async createRole(req, res) {
        try {
            const { name } = req.body;
            const createdRole = await RoleModel.create({ name: name });
            return res.status(201).json(createdRole);
        }
        catch (err) {
            console.log(err);
        }
    }
    async deleteRole(req, res) {
        try {
            const roleID = req.params.id;
            const deletedRole = await RoleModel.findByIdAndDelete(roleID);
            if (!deletedRole) {
                res.status(404).json({ error: "Role not found" });
            }
            res.json(deletedRole);
        }
        catch (err) {
            console.log(err);
            res
                .status(500)
                .send({ errorMessage: "Failed to delete role", error: err });
        }
    }
}
export default new AuthController();
//# sourceMappingURL=AuthController.js.map