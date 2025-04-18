import mongoose from "mongoose";

const dbConnect = async () => {
 await mongoose
    .connect(
      process.env.MONGO_URL
    )
    .then(() => {
      console.log(`DB Connected On ${mongoose.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
};

export default dbConnect;
