import { SaveFileSystemDto } from '@/file-system/dto/save-file-system.dto'
import { ISaveFileUseCase } from '@/file-system/ports/in/ISaveFileUseCase'
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('file-system')
export class FileSystemController {
  constructor(private readonly saveFileUseCase: ISaveFileUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() saveFileSystemDto: SaveFileSystemDto) {
    return this.saveFileUseCase.execute(file, saveFileSystemDto)
  }
}
