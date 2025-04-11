import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOWDINARY_NAME,
    api_key: process.env.CLOWDINARY_API_KEY,
    api_secret: process.env.CLOWDINARY_API_SECRET,
});

const uploadImageToClowdinary = async (image) => {
    const buffer = image.buffer || Buffer.from(await image.arrayBuffer());
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder : "CholoKinbo",
        },(error, uploadResult)=>{
            return resolve(uploadResult);
        }).end(buffer);
    })
    return uploadImage;
};

export default uploadImageToClowdinary;