import { S3Client, DeleteObjectCommand, ListObjectsV2Command, } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_S3_REGION as string,
});

export async function deleteS3Img(imageUrls: string[]) {
    try {
        const promises = imageUrls.map(async (imageUrl) => {
            try {
                const url = new URL(imageUrl);
                const bucketName = url.hostname.split(".")[0];
                const pathParts = url.pathname.split("/").filter((part) => part !== "");
                const fileName = pathParts[pathParts.length - 1]; 

                if(fileName !== "thumbnail"){  
                    await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `${pathParts.join("/")}` }));
                }

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