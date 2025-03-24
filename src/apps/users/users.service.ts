import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) { }
    create(dto: UserDto) {
        const user = this.repository.create(dto);
        return this.repository.save(user);
      }

      findAll() {
        return this.repository.find();
      }

      findOne(email: string) {
        return this.repository.findOneBy({email});
      }

}