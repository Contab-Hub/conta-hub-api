import { SaveFileSystemDto } from '@/file-system/dto/save-file-system.dto'
import { ISaveFileUseCase, SAVE_FILE_USE_CASE } from '@/file-system/ports/in/ISaveFileUseCase'
import { Body, Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger'

@ApiTags('File System')
@ApiExtraModels(SaveFileSystemDto)
@Controller('file-system')
export class FileSystemController {
  constructor(
    @Inject(SAVE_FILE_USE_CASE)
    private readonly saveFileUseCase: ISaveFileUseCase,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: '#/components/schemas/SaveFileSystemDto' },
        {
          type: 'object',
          properties: {
            file: { type: 'string', format: 'binary', description: 'File to upload' },
          },
          required: ['file'],
        },
      ],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() saveFileSystemDto: SaveFileSystemDto) {
    return this.saveFileUseCase.execute(file, saveFileSystemDto)
  }
}
