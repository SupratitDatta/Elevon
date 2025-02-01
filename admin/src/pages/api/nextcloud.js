import { cloudinaryLoader } from "next-cloudinary";

export const UploadImage = async (file, folder) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        await cloudinaryLoader.uploader.upload_stream({
            resource_type: "auto",
            folder: folder,
        },
            async (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve(resolve);
            }).end(bytes);
    });
};