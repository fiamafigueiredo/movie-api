import express from "express";
import bodyParser from "body-parser";
import movieRouter from "./routers/movieRouter.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRoutes from "./routers/authRoutes.js";
const app = express();
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3009;
app.use(cors({
    origin: "*",
}));
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(fileUpload());
app.use("/api", movieRouter);
app.use("/auth", authRoutes);
app.use(express.json());
app.use(errorMiddleware);
const startApp = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to db");
        app.listen(PORT, () => {
            if (process.env.NODE_ENV === "prod") {
                console.log(`Server is running in production mode on port ${PORT}`);
            }
            else {
                console.log(`Server is running in development mode on port ${PORT}`);
            }
        });
    }
    catch (err) {
        console.log("Error connecting to database", err);
    }
};
startApp();
//# sourceMappingURL=index.js.map