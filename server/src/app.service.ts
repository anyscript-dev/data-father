import type { Logger } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
@Injectable()
export class AppService {
  constructor(private logger: Logger) {}

  getHello(): string {
    this.logger.log('log:Hello World!')
    return 'Hello World!'
  }
}
