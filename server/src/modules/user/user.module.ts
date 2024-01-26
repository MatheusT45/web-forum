import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...UserProvider, UserService],
})
export class UserModule {}
