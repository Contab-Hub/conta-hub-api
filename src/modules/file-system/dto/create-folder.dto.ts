import { ApiProperty } from '@nestjs/swagger'
import { CreateFolderInput } from '../domain/inputs/create-folder.input'

export class CreateFolderDto implements CreateFolderInput {
  @ApiProperty({ description: 'Folder name' })
  name: string

  @ApiProperty({ description: 'Parent folder ID' })
  parentId: string
}
