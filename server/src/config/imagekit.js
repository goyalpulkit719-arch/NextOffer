import "dotenv/config";
import {ImageKit} from "@imagekit/nodejs";

console.log("Private Key:", process.env.IMAGEKIT_PRIVATE_KEY);
const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

export default imageKit;