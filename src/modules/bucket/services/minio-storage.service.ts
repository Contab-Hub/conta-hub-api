import { environment } from '@/common/config/environment'
import { s3Client } from '@/common/config/s3-client'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { IBucketService } from '../interfaces/bucket-service.interface'

@Injectable()
export class MinioStorageService implements IBucketService {
  private readonly client: S3Client
  private readonly bucket: string

  constructor() {
    this.bucket = environment.MINIO_BUCKET
    this.client = s3Client
  }

  async upload(storagePath: string, body: Buffer, mimeType: string): Promise<string> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: storagePath,
        Body: body,
        ContentType: mimeType,
      }),
    )
    return storagePath
  }

  async download(storagePath: string): Promise<Buffer> {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: storagePath,
      }),
    )
    return Buffer.from(await response.Body!.transformToByteArray())
  }

  async delete(storagePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: storagePath,
      }),
    )
  }

  async getSignedUrl(storagePath: string, expiresInSeconds = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: storagePath,
    })
    return await getSignedUrl(this.client, command, { expiresIn: expiresInSeconds })
  }
}
