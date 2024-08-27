import { S3Client, DeleteObjectCommand, ListObjectsV2Command, } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_S3_REGION as string,
});

export async function deleteHotelImg(imageUrls: string[]) {
    try {
        // Extract bucket names and file paths from the URLs
        const imageInfo = imageUrls.map((imageUrl) => {
            const url = new URL(imageUrl);
            const bucketName = url.hostname.split(".")[0];
            const pathParts = url.pathname.split("/").filter((part) => part !== "");
            const folderName = pathParts[0];
            const fileName = pathParts.slice(1).join("/");
            return { bucketName, folderName, fileName };
        });

        // Group images by bucket and folder
        const groupedImages: Record<string, Record<string, string[]>> = {};
        imageInfo.forEach(({ bucketName, folderName, fileName }) => {
            if (!groupedImages[bucketName]) {
                groupedImages[bucketName] = {};
            }
            if (!groupedImages[bucketName][folderName]) {
                groupedImages[bucketName][folderName] = [];
            }
            groupedImages[bucketName][folderName].push(fileName);
        });

        // Process each bucket and folder
        for (const [bucketName, folders] of Object.entries(groupedImages)) {
            for (const [folderName, fileNames] of Object.entries(folders)) {
                if (fileNames.length <= 1) {
                    // Only one image, nothing to delete
                    continue;
                }

                // Sort files by name (or use another sorting mechanism if timestamps are included)
                fileNames.sort();

                // Keep the most recent file and delete the rest
                const fileToKeep = fileNames.pop(); // Assume the last one is the most recent

                // Delete all but the most recent file
                await Promise.all(
                    fileNames.map(async (fileName) => {
                        try {
                            await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `${folderName}/${fileName}` }));
                            console.log(`Image deleted successfully: ${folderName}/${fileName}`);
                        } catch (error) {
                            console.error(`Error deleting image: ${folderName}/${fileName}`, error);
                        }
                    })
                );
            }
        }

    } catch (error) {
        console.error("Error deleting images:", error);
        throw new Error("Error deleting images");
    }
}

export async function deleteRoomImg(imageUrls: string[]) {
    try {
        // Extract bucket names and file paths from the URLs
        const imageInfo = imageUrls.map((imageUrl) => {
            const url = new URL(imageUrl);
            const bucketName = url.hostname.split(".")[0];
            const pathParts = url.pathname.split("/").filter((part) => part !== "");
            const folderName = pathParts[0];
            const fileName = pathParts.slice(1).join("/");
            return { bucketName, folderName, fileName };
        });

        // Group images by bucket and folder
        const groupedImages: Record<string, Record<string, string[]>> = {};
        imageInfo.forEach(({ bucketName, folderName, fileName }) => {
            if (!groupedImages[bucketName]) {
                groupedImages[bucketName] = {};
            }
            if (!groupedImages[bucketName][folderName]) {
                groupedImages[bucketName][folderName] = [];
            }
            groupedImages[bucketName][folderName].push(fileName);
        });

        // Process each bucket and folder
        for (const [bucketName, folders] of Object.entries(groupedImages)) {
            for (const [folderName, fileNames] of Object.entries(folders)) {
                if (fileNames.length <= 1) {
                    // Only one image, nothing to delete
                    continue;
                }

                // Sort files by name (or use another sorting mechanism if timestamps are included)
                fileNames.sort();

                // Keep the most recent file and delete the rest
                const fileToKeep = fileNames.pop(); // Assume the last one is the most recent

                // Delete all but the most recent file
                await Promise.all(
                    fileNames.map(async (fileName) => {
                        try {
                            await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `${folderName}/${fileName}` }));
                            console.log(`Image deleted successfully: ${folderName}/${fileName}`);
                        } catch (error) {
                            console.error(`Error deleting image: ${folderName}/${fileName}`, error);
                        }
                    })
                );
            }
        }

    } catch (error) {
        console.error("Error deleting images:", error);
        throw new Error("Error deleting images");
    }
}

