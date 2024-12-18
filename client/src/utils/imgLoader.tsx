import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import S3UrlToCFUrl from "./s3UrlToCFD.utils";

interface ImageLoaderProps {
    imageUrl: string;
    altText: string;
    rounded?: string;
}

const fetchImage = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch image");
    }
    return response.blob();
};

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
};

export default function ImgLoader({ imageUrl, altText, rounded }: ImageLoaderProps) {
    const cloudFrontUrl = S3UrlToCFUrl(imageUrl);

    useEffect(() => {
        registerServiceWorker();
    }, []);

    const { data: imageBlob, isError } = useQuery<Blob, Error>({
        queryKey: ["image", cloudFrontUrl],
        queryFn: () => fetchImage(cloudFrontUrl),
        gcTime: 24 * 60 * 60 * 1000,
    });

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (imageBlob) {
            const objectUrl = URL.createObjectURL(imageBlob);
            setImageSrc(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }
    }, [imageBlob]);

    if (!imageSrc) {
        return <div className={`flex h-full justify-center items-center text-2xl font-bold`}></div>;
    }

    if (isError) {
        return <div className={`flex h-full justify-center items-center text-2xl font-bold`}>미등록</div>;
    }

    return (
        <img
            className={`w-full h-full object-cover ${rounded ? `rounded-${rounded}` : ""}`}
            src={imageSrc}
            alt={altText}
            loading="lazy"
        />
    );
}
