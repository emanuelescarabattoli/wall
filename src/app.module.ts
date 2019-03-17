import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ProxyModule } from './proxy/proxy.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProxyModule,
    AuthenticationModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
