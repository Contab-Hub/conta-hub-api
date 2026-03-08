import 'dotenv/config'

export const environment = {
  PORT: Number(process.env.PORT) || 3002,
  DATABASE_URL: process.env.DATABASE_URL || '',
}
