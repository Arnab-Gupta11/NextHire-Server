import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';

async function connectToDB() {
  try {
    //Connect server to the MongoDB database.
    await mongoose.connect(config.mongo_uri as string);
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port :${config.port} `);
    });
  } catch (error) {
    console.log(error);
  }
}
connectToDB();
