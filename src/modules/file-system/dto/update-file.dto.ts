import { ApiPropertyOptional } from '@nestjs/swagger'
import { UpdateFileInput } from '../domain/inputs/update-file.input'

export class UpdateFileDto implements UpdateFileInput {
  @ApiPropertyOptional({ description: 'New file/folder name' })
  name?: string

  @ApiPropertyOptional({ description: 'File status' })
  status?: string

  @ApiPropertyOptional({ description: 'New parent folder ID' })
  parentId?: string
}
