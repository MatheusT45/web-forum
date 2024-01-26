import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from './controllers/user.controller';
import { Modules } from './modules';
import { Services } from './services';
import { Providers } from './providers';

@Module({
  imports: [DatabaseModule, ...Modules],
  controllers: [AppController, UserController],
  providers: [AppService, ...Services, ...Providers],
})
export class AppModule {}
