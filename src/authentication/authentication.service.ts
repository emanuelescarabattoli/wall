import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(username: string): Promise<string> {
        const user = { username };
        return this.jwtService.sign(user);
      }

    async validateUser(user): Promise<boolean> {
        if (user && user.username) {
            return this.userRepository.findOne({ username: user.username }) !== null;
        }
        return false;
    }
}
