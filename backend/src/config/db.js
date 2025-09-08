import { PORT, DB_URL, DB_PASSWORD } from "./config";
import { connect } from "mongoose";

const connectToDB = (app) => {
    connect(DB_URL.replace("<db_password>", DB_PASSWORD))
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