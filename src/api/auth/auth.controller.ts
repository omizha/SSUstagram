import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
} from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";

@Controller("api/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    async signUp(@Body() userArg: CreateUserDto) {
        try {
            const user = await this.authService.signUp(userArg);
            delete user.password;
            return user;
        } catch (err) {
            throw err;
        }
    }

    @Post()
    create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }

    @Get()
    findAll() {
        return this.authService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.authService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.update(+id, updateAuthDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.authService.remove(+id);
    }
}