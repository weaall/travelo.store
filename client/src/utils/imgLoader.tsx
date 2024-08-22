import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading/Loading";
import S3UrlToCFUrl from "./s3UrlToCFD.utils";

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

    const cloudFrontUrl = S3UrlToCFUrl(imageUrl);

    const { data: imageBlob, isLoading } = useQuery<Blob, Error>({
        queryKey: ["image", cloudFrontUrl],
        queryFn: () => fetchImage(cloudFrontUrl),
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

    if (isLoading) {
        return <Loading />;
    }

    return imageSrc ? (
        <img
            className={`w-full h-full object-cover ${rounded ? `rounded-${rounded}` : ''}`}
            src={imageSrc}
            alt={altText}
            srcSet={`
                ${cloudFrontUrl}?w=480 480w,
                ${cloudFrontUrl}?w=840 840w,
                ${cloudFrontUrl}?w=1200 1200w
            `}
            sizes="(max-width: 480px) 480px, (max-width: 840px) 840px, 1200px"
            loading="lazy"
        />
    ) : (
        <div>Image not available</div>
    );
}
