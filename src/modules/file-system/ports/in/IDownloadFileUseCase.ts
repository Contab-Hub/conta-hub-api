export const DOWNLOAD_FILE_USE_CASE = 'DOWNLOAD_FILE_USE_CASE'

export interface DownloadFileOutput {
  buffer: Buffer
  mimeType: string
  fileName: string
}

export interface IDownloadFileUseCase {
  execute(fileId: string): Promise<DownloadFileOutput>
}
