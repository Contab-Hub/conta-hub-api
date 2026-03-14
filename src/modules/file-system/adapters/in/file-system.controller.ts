import { CreateFolderDto } from '@/modules/file-system/dto/create-folder.dto'
import { SaveFileSystemDto } from '@/modules/file-system/dto/save-file-system.dto'
import {
  CREATE_FOLDER_USE_CASE,
  ICreateFolderUseCase,
} from '@/modules/file-system/ports/in/ICreateFolderUseCase'
import {
  ISaveFileUseCase,
  SAVE_FILE_USE_CASE,
} from '@/modules/file-system/ports/in/ISaveFileUseCase'
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
    @Inject(CREATE_FOLDER_USE_CASE)
    private readonly createFolderUseCase: ICreateFolderUseCase,
  ) {}

  @Post('upload')
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

  @Post('folder')
  createFolder(@Body() createFolderDto: CreateFolderDto) {
    return this.createFolderUseCase.execute(createFolderDto)
  }
}
