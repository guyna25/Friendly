import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    // UsersModule,
    AuthModule,
    EventsModule,
    // MongooseModule.forRoot(
    //   //database url string
    //   'mongodb://localhost:27017/myapp',
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
