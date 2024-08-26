import { nanoid } from "nanoid";
import { axiosInstance } from "./axios.utils";

export const uploadFilesToS3 = async (files: File[], url: string) => {
    const keysAndContentTypes = files.map((file) => ({
        key: encodeURIComponent(`${url}/${nanoid(12)}`),
        contentType: file.type,
    }));

    const presignedUrlsResponse = await axiosInstance.post("/auth/presignedUrls", {
        keysAndContentTypes: keysAndContentTypes,
    });

    const presignedUrls = presignedUrlsResponse.data.data;

    const uploadedKeys = [];
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
    return uploadedKeys;
};
