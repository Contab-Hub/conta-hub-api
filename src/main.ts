import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { environment } from './common/config/environment'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')

  const config = new DocumentBuilder()
    .setTitle('ContaHub API')
    .setDescription('ContaHub system API')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(environment.PORT)
  logger.log(`API running on http://localhost:${environment.PORT}`)
  logger.log(`Swagger docs available at http://localhost:${environment.PORT}/docs`)
}
bootstrap()
