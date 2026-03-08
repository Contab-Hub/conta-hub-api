import { SaveFileInput } from '../domain/inputs/save-file.input'

export class SaveFileSystemDto implements SaveFileInput {
  name: string
  parentId: string
  type: string
}
