export const BUCKET_SERVICE_TOKEN = 'BUCKET_SERVICE'

export interface IBucketService {
  upload(key: string, body: Buffer, mimeType: string): Promise<string>
  download(key: string): Promise<Buffer>
  delete(key: string): Promise<void>
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>
}
