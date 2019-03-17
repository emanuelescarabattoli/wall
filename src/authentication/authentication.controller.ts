import { Controller, Post, Body, NotFoundException } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService,
    ) { }

    // Route to login an user
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<string> {
        const user = await this.userService.detail(loginDto.username);
        if (user) {
            if (await this.userService.compareHash(loginDto.password, user.password)) {
                return await this.authenticationService.signIn(user.username);
            }
        }

        throw new NotFoundException('Username and password are not correct');
    }
}
