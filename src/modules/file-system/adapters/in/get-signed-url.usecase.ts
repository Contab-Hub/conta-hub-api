import {
  BUCKET_SERVICE_TOKEN,
  IBucketService,
} from '@/modules/bucket/interfaces/bucket-service.interface'
import { IGetSignedUrlUseCase } from '@/modules/file-system/ports/in/IGetSignedUrlUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class GetSignedUrlUseCase implements IGetSignedUrlUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
    @Inject(BUCKET_SERVICE_TOKEN)
    private readonly bucketService: IBucketService,
  ) {}

  async execute(fileId: string): Promise<string> {
    const file = await this.fileSystemRepository.findFile(fileId)

    if (!file?.storageKey) {
      throw new NotFoundException(`File not found: ${fileId}`)
    }

    return this.bucketService.getSignedUrl(file.storageKey)
  }
}
