

import { v2 as cloudinary } from "cloudinary";
import {config} from "./config.config";

//instantiate the cloudinary library
/**
 * @description This is the cloudinary configuration file
 * @param cloud_name
 * @param api_key
 * @param api_secret
 */
cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.secretKey,
});


export default cloudinary
