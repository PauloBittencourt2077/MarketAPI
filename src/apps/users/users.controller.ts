import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { Public } from 'src/auth/constants';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Public()
    @Post()
    create(@Body() createUserDto: UserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('name') name: string) {
        const user = await this.usersService.findOne(name);
        if (!user) throw new NotFoundException();
        return user;
    }
}