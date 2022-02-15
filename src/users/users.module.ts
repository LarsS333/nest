import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Post } from "../posts/posts.model";

@Module({
    controllers: [UsersController], // регистрируем контроллеры
    providers: [UsersService], // регистрируем контроллеры в поле провайдеров
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Post]), // определяем какие модули зарегистрированы в текущей области
        RolesModule,
        forwardRef(() => AuthModule),
        //  forwardRef() позволяет Nest ссылаться на классы, которые еще не определены с помощью forwardRef()
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule { }
