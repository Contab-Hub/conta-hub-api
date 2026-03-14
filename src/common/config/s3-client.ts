import { S3Client } from '@aws-sdk/client-s3'
import { environment } from './environment'

export const s3Client = new S3Client({
  endpoint: environment.MINIO_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: environment.MINIO_ACCESS_KEY,
    secretAccessKey: environment.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
})
