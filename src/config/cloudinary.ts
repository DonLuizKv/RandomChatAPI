import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

const cloud = process.env?.CLOUDINARY_CLOUD_NAME as string;
const key = process.env?.CLOUDINARY_API_KEY as string;
const secret = process.env?.CLOUDINARY_API_SECRET as string;
const path = process.env?.CLOUDINARY_URL as string;

cloudinary.config({
    cloud_name:cloud,
    api_key:key,
    api_secret:secret,
})

export default cloudinary;