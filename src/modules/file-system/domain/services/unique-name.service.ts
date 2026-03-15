import { Injectable } from '@nestjs/common'

@Injectable()
export class UniqueNameService {
  generateUniqueName(name: string, existingNames: string[]): string {
    if (!existingNames.includes(name)) {
      return name
    }

    let counter = 1
    let candidateName: string

    do {
      candidateName = `${name} (${counter})`
      counter++
    } while (existingNames.includes(candidateName))

    return candidateName
  }
}
