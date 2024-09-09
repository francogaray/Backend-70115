import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGO_URI||"mongodb+srv://coderBackend50015:coderBackend50015@cluster0.qutkujb.mongodb.net")
    .then(() => console.log("Conectados a Mongoose"))
    .catch((error) => console.log("Tenemos un error: ", error));
