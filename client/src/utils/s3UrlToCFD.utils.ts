const S3_DOMAIN = process.env.REACT_APP_S3_DOMAIN || "";
const CF_DOMAIN = process.env.REACT_APP_CF_DOMAIN || "";

export default function S3UrlToCFUrl(s3Url: string): string {
    if (s3Url.startsWith(S3_DOMAIN)) {
        return CF_DOMAIN + s3Url.substring(S3_DOMAIN.length);
    }
    return s3Url;
}

export function getThumbnailCFUrl(rearUrl: string): string {
    const invalidPattern = /\/(?:undefined|0|)\//;

    if (invalidPattern.test(rearUrl)) {
        return "";
    }

    return `${CF_DOMAIN}${rearUrl}/thumbnail`;
}
