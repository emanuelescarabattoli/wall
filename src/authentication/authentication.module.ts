
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: '1234567890',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UserModule,
    ],
    providers: [AuthenticationService, JwtStrategy, UserService],
    controllers: [AuthenticationController],
})
export class AuthenticationModule { }
