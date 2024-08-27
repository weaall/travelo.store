import { nanoid } from "nanoid";
import { axiosInstance } from "./axios.utils";

const createThumbnail = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };

        reader.readAsDataURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            const width = img.width;
            const height = img.height;

            let newWidth = width;
            let newHeight = height;

            if (width > height) {
                if (width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (height * maxWidth) / width;
                }
            } else {
                if (height > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (width * maxHeight) / height;
                }
            }

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(new File([blob], `${nanoid(12)}.jpg`, { type: 'image/jpeg' }));
                } else {
                    reject(new Error('Failed to create thumbnail blob'));
                }
            }, 'image/jpeg',1.0);
        };

        img.onerror = reject;
    });
};

export const uploadFilesToS3 = async (files: File[], url: string) => {
    const keysAndContentTypes = files.map((file, index) => ({
        key: encodeURIComponent(`${url}/${nanoid(12)}${index === 0 ? '' : ''}`),
        contentType: file.type,
    }));

    const thumbnailKey = encodeURIComponent(`${url}/thumbnail`);
    keysAndContentTypes.push({ key: thumbnailKey, contentType: 'image/jpeg' });

    const presignedUrlsResponse = await axiosInstance.post("/auth/presignedUrls", {
        keysAndContentTypes,
    });

    const presignedUrls = presignedUrlsResponse.data.data;

    const uploadedKeys: string[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const presignedUrl = presignedUrls[i];

        await fetch(presignedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            },
        });

        const imageUrl = presignedUrl.split("?")[0];
        uploadedKeys.push(imageUrl);
    }

    const thumbnailFile = await createThumbnail(files[0], 360, 360);
    const thumbnailPresignedUrl = presignedUrls[presignedUrls.length - 1];

    await fetch(thumbnailPresignedUrl, {
        method: "PUT",
        body: thumbnailFile,
        headers: {
            "Content-Type": thumbnailFile.type,
        },
    });

    uploadedKeys.push(thumbnailPresignedUrl.split("?")[0]);

    return uploadedKeys;
};
