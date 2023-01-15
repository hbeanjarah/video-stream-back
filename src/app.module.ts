import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:rootpassword@127.0.0.1:27017/Stream?serverSelectionTimeoutMS=2000&authSource=admin',
      {
        connectionFactory: (connection) => {
          if (connection.readyState === 1) {
            console.log('DB connected');
          }

          connection.on('disconnected', () => {
            console.log('DB disconnected');
          });

          return connection;
        },
      },
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
