import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as helmet from 'helmet'
import 'source-map-support/register'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  })

  // 开启跨域支持
  app.enableCors({
    origin: '*',
    credentials: true,
  })

  // 【中间件】- 全局注册
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.text({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  await app.listen(8080)
}

bootstrap()
