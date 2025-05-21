import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("Connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("Mongodb Connection Error " + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong");
    console.error(error);
  }
}
