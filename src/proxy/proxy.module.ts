import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ProxyController } from './proxy.controller';

@Module({
    imports: [
        HttpModule,
        JwtModule.register({
            secretOrPrivateKey: '1234567890',
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    providers: [],
    controllers: [ProxyController],
})
export class ProxyModule { }
