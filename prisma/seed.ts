import { PrismaClient } from '@generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const root = await prisma.fileSystemNode.upsert({
    where: { id: 'root' },
    update: {},
    create: {
      id: 'root',
      name: 'root',
      fileSystemType: 'DIRECTORY',
    },
  })

  console.log('Root directory seeded:', root)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
