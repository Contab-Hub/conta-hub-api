import { CreateFolderDto } from '@/modules/file-system/dto/create-folder.dto'
import { SaveFileSystemDto } from '@/modules/file-system/dto/save-file-system.dto'
import { UpdateFileDto } from '@/modules/file-system/dto/update-file.dto'
import {
  CREATE_FOLDER_USE_CASE,
  ICreateFolderUseCase,
} from '@/modules/file-system/ports/in/ICreateFolderUseCase'
import {
  DELETE_FILE_USE_CASE,
  IDeleteFileUseCase,
} from '@/modules/file-system/ports/in/IDeleteFileUseCase'
import {
  GET_SIGNED_URL_USE_CASE,
  IGetSignedUrlUseCase,
} from '@/modules/file-system/ports/in/IGetSignedUrlUseCase'
import {
  ISaveFileUseCase,
  SAVE_FILE_USE_CASE,
} from '@/modules/file-system/ports/in/ISaveFileUseCase'
import {
  IUpdateFileUseCase,
  UPDATE_FILE_USE_CASE,
} from '@/modules/file-system/ports/in/IUpdateFileUseCase'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger'
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
    @Inject(GET_SIGNED_URL_USE_CASE)
    private readonly getSignedUrlUseCase: IGetSignedUrlUseCase,
    @Inject(DELETE_FILE_USE_CASE)
    private readonly deleteFileUseCase: IDeleteFileUseCase,
    @Inject(UPDATE_FILE_USE_CASE)
    private readonly updateFileUseCase: IUpdateFileUseCase,
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
  @ApiQuery({
    name: 'returnUrl',
    required: false,
    type: Boolean,
    description: 'Set to "true" to return the URL instead of redirecting',
  })
  async download(
    @Param('id') id: string,
    @Query('returnUrl') returnUrl: boolean,
    @Res({ passthrough: true }) res: Response,
  ) {
    const signedUrl = await this.getSignedUrlUseCase.execute(id)

    return returnUrl ? { url: signedUrl } : res.redirect(signedUrl)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteFileUseCase.execute(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.updateFileUseCase.execute(id, updateFileDto)
  }
}
