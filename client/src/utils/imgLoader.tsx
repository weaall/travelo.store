import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface ImageLoaderProps {
    imageUrl: string;
    altText: string;
    rounded?: string;
}

const fetchImage = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    return response.blob();
};

export default function ImgLoader({ imageUrl, altText, rounded}: ImageLoaderProps) {
    const { data: imageBlob, isLoading } = useQuery<Blob, Error>({
        queryKey: ["image", imageUrl],
        queryFn: () => fetchImage(imageUrl),
        gcTime: Infinity, 
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

    if (isLoading) return <div></div>;

    return imageSrc ? (
        <img className={`w-full h-full object-cover ${rounded ? `rounded-${rounded}` : ''}`}
            src={imageSrc}
            alt={altText}
            srcSet={`
                ${imageUrl}?w=480 480w,
                ${imageUrl}?w=840 840w,
                ${imageUrl}?w=1200 1200w
            `}
            sizes="(max-width: 480px) 480px, (max-width: 840px) 840px, 1200px"
        />
    ) : (
        <div>Image not available</div>
    );
}
