import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
    private saltRounds = 10;

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    // The list of users
    async list(): Promise<User[]> {
        return await this.userRepository.find();
    }

    // The detail of a user
    async detail(username: string): Promise<User> {
        return await this.userRepository.findOne({ username });
    }

    // Saves a contract and returns the created object
    async create(userCreateDto: UserCreateDto): Promise<User> {
        const password = await this.getHash(userCreateDto.password);
        return await this.userRepository.save({ ...userCreateDto, password, status: 1 });
    }

    // Saves a contract and returns the created object
    async update(userUpdateDto: UserUpdateDto): Promise<User> {
        const user = await this.userRepository.findOne({ id: userUpdateDto.id });
        if (user) {
            const password = await this.getHash(userUpdateDto.password);
            return await this.userRepository.save({ ...user, ...userUpdateDto, password });
        }
        return null;
    }

    // Saves a contract and returns the created object
    async delete(id: number): Promise<number> {
        const result = await this.userRepository.delete({ id });
        return result.affected;
    }

    // Generate an hash to save the password
    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    // Compare given password and hash
    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
