export const BUCKET_SERVICE = 'BUCKET_SERVICE'

export interface IBucketService {
  upload(storagePath: string, body: Buffer, mimeType: string): Promise<string>
  download(storagePath: string): Promise<Buffer>
  delete(storagePath: string): Promise<void>
  getSignedUrl(storagePath: string, expiresInSeconds?: number): Promise<string>
}
