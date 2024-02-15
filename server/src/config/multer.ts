import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"
import shortId from "shortid"

export const upload = multer({
    storage: multerS3({
        s3: new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
            },
            region: process.env.AWS_S3_REGION,
        }),
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileId = shortId.generate()
            const type = file.mimetype.split("/")[1]
            const fileName = `${fileId}.${type}`
            cb(null, fileName)
        },
        acl: "public-read-write",
    }),
})
