import { Entity } from '@/common/models/entity'
import { FileSystemTypeEnum } from '../enums/file-system-type-enum'

export class FileSystemNode implements Entity {
  constructor(
    public id: string,
    public name: string,
    public fileSystemType: FileSystemTypeEnum,
    public createdAt: Date,
    public type?: string,
    public status?: string,
    public storageKey?: string,
    public mimeType?: string,
    public size?: number,
    public parentId?: string,
    public parent?: FileSystemNode,
    public children?: FileSystemNode[],
    public updatedAt?: Date,
    public deletedAt?: Date,
  ) {}

  isDirectory(): boolean {
    return this.fileSystemType === FileSystemTypeEnum.DIRECTORY
  }

  isRoot(): boolean {
    return !this.parentId
  }
  // add validation methods here, e.g.:
  // validateAddChild(child: FileSystemNode): void {
  //   if (!this.canContainChildren()) {
  //     throw new Error('Cannot add children to a file')
  //   }
  //   if (this.deletedAt) {
  //     throw new Error('Cannot add to a deleted directory')
  //   }
  // }

  // validateUpload(mimeType: string, size: number): void {
  //   if (!this.isDirectory()) {
  //     throw new Error('Can only upload to directories')
  //   }
  //   // outras regras: tamanho máximo, tipos permitidos, etc.
  // }
}
