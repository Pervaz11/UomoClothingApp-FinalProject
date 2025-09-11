import { PORT } from "./config.js";
const { DB_URL } = process.env;
import { connect } from "mongoose";

const connectToDB = (app) => {
    connect(DB_URL)
        .then(() => {
            console.log("🚀 mongodb connected successfully!");
            app.listen(PORT, () => {
                console.log(`server running on port: ${PORT}`);
            });
        })
        .catch((err) => {
            console.warn("❌ db connection failed: ", err.message);
        });
};

export default connectToDB;