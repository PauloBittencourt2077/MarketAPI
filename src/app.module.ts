import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './apps/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './apps/orders/orders.module';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { UsersModule } from './apps/users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST','db'),
        port: Number(configService.get('DB_PORT',5432)),
        username: configService.get('DB_USERNAME','paulo'),
        password: configService.get('DB_PASSWORD','123'),
        database: configService.get('DB_DATABASE','postgres'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      })
    })
  ,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}


