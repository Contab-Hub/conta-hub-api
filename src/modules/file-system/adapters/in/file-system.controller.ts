import { CreateFolderDto } from '@/modules/file-system/dto/create-folder.dto'
import { SaveFileSystemDto } from '@/modules/file-system/dto/save-file-system.dto'
import {
  CREATE_FOLDER_USE_CASE,
  ICreateFolderUseCase,
} from '@/modules/file-system/ports/in/ICreateFolderUseCase'
import {
  DOWNLOAD_FILE_USE_CASE,
  IDownloadFileUseCase,
} from '@/modules/file-system/ports/in/IDownloadFileUseCase'
import {
  ISaveFileUseCase,
  SAVE_FILE_USE_CASE,
} from '@/modules/file-system/ports/in/ISaveFileUseCase'
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('File System')
@ApiExtraModels(SaveFileSystemDto)
@Controller('file-system')
export class FileSystemController {
  constructor(
    @Inject(SAVE_FILE_USE_CASE)
    private readonly saveFileUseCase: ISaveFileUseCase,
    @Inject(CREATE_FOLDER_USE_CASE)
    private readonly createFolderUseCase: ICreateFolderUseCase,
    @Inject(DOWNLOAD_FILE_USE_CASE)
    private readonly downloadFileUseCase: IDownloadFileUseCase,
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

  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { buffer, mimeType, fileName } = await this.downloadFileUseCase.execute(id)

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      'Content-Length': buffer.length,
    })

    res.send(buffer)
  }
}
