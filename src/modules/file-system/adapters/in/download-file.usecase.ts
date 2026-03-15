import {
  BUCKET_SERVICE_TOKEN,
  IBucketService,
} from '@/modules/bucket/interfaces/bucket-service.interface'
import {
  DownloadFileOutput,
  IDownloadFileUseCase,
} from '@/modules/file-system/ports/in/IDownloadFileUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DownloadFileUseCase implements IDownloadFileUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
    @Inject(BUCKET_SERVICE_TOKEN)
    private readonly bucketService: IBucketService,
  ) {}

  async execute(fileId: string): Promise<DownloadFileOutput> {
    const file = await this.fileSystemRepository.findFile(fileId)

    if (!file?.storageKey || !file?.mimeType) {
      throw new NotFoundException(`File not found: ${fileId}`)
    }

    const buffer = await this.bucketService.download(file.storageKey)

    return {
      buffer,
      mimeType: file.mimeType,
      fileName: file.name,
    }
  }
}
