import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import shortId from "shortid";

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_S3_REGION as string,
});

export const uploadRegDoc = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const folderPath = "reg_docs";
            const fileId = shortId.generate();
            const type = file.mimetype.split("/")[1];
            const fileName = `${folderPath}/${fileId}.${type}`;
            cb(null, fileName);
        },
        acl: "public-read-write",
    }),
});


export const uploadHotelImg = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const folderPath = "hotel_img";
            const fileId = shortId.generate();
            const type = file.mimetype.split("/")[1];
            const fileName = `${folderPath}/${fileId}.${type}`;
            cb(null, fileName);
        },
        acl: "public-read-write",
    }),
});

export const uploadRoomImg = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const folderPath = "room_img";
            const fileId = shortId.generate();
            const type = file.mimetype.split("/")[1];
            const fileName = `${folderPath}/${fileId}.${type}`;
            cb(null, fileName);
        },
        acl: "public-read-write",
    }),
});

export async function deleteHotelImg(imageUrls: string[]) {
    try {
        const promises = imageUrls.map(async (imageUrl) => {
            try {
                const url = new URL(imageUrl);
                const bucketName = url.hostname.split(".")[0];
                const pathParts = url.pathname.split("/").filter((part) => part !== "");
                const folderName = pathParts[0];
                const fileName = pathParts.slice(1).join("/");

                await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `${folderName}/${fileName}` }));

                console.log(`Image deleted successfully: ${imageUrl}`);
            } catch (error) {
                console.error(`Error deleting image: ${imageUrl}`, error);
                throw new Error(`Error deleting image: ${imageUrl}`);
            }
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error deleting images:", error);
        throw new Error("Error deleting images");
    }
}

export async function deleteRoomImg(imageUrls: string[]) {
    try {
        const promises = imageUrls.map(async (imageUrl) => {
            try {
                const url = new URL(imageUrl);
                const bucketName = url.hostname.split(".")[0];
                const pathParts = url.pathname.split("/").filter((part) => part !== "");
                const folderName = pathParts[0];
                const fileName = pathParts.slice(1).join("/");

                await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `${folderName}/${fileName}` }));

                console.log(`Image deleted successfully: ${imageUrl}`);
            } catch (error) {
                console.error(`Error deleting image: ${imageUrl}`, error);
                throw new Error(`Error deleting image: ${imageUrl}`);
            }
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error deleting images:", error);
        throw new Error("Error deleting images");
    }
}

