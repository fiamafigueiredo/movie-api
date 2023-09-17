import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        uppercase: true,
        trim: true,
    },
});
const RoleModel = mongoose.model("Role", RoleSchema);
export default RoleModel;
//# sourceMappingURL=RoleModel.js.map