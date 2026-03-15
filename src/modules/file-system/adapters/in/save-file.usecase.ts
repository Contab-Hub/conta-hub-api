import {
  BUCKET_SERVICE_TOKEN,
  IBucketService,
} from '@/modules/bucket/interfaces/bucket-service.interface'
import { FileSystemTypeEnum } from '@/modules/file-system/domain/enums/file-system-type-enum'
import { SaveFileInput } from '@/modules/file-system/domain/inputs/save-file.input'
import { UniqueNameService } from '@/modules/file-system/domain/services/unique-name.service'
import { ISaveFileUseCase } from '@/modules/file-system/ports/in/ISaveFileUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

@Injectable()
export class SaveFileUseCase implements ISaveFileUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
    @Inject(BUCKET_SERVICE_TOKEN)
    private readonly bucketService: IBucketService,
    private readonly uniqueNameService: UniqueNameService,
  ) {}

  async execute(file: Express.Multer.File, input: SaveFileInput) {
    const existingNames = await this.fileSystemRepository.findExistingNames(
      input.parentId,
      FileSystemTypeEnum.FILE,
      input.name,
    )
    const uniqueName = this.uniqueNameService.generateUniqueName(input.name, existingNames)
    const bucketKey = randomUUID()
    await this.bucketService.upload(bucketKey, file.buffer, file.mimetype)
    return this.fileSystemRepository.saveFile(file.mimetype, bucketKey, {
      ...input,
      name: uniqueName,
    })
  }
}
