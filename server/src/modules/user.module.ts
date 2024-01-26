import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserProvider } from '../providers/user.provider';
import { UserService } from '../services/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...UserProvider, UserService],
})
export class UserModule {}
