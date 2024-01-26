import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Modules } from './modules';
import { Services } from './services';
import { Providers } from './providers';
import { Controllers } from './controllers';

@Module({
  imports: [DatabaseModule, ...Modules],
  controllers: [AppController, ...Controllers],
  providers: [AppService, ...Services, ...Providers],
})
export class AppModule {}
