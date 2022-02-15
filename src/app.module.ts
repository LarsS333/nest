import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

// главный app модуль 
// nest nest CLI позволяет создать структуру подмодуля
// nest generate ...
// сюда будем импортировать отдельные подмодули


@Module({
    controllers: [], 
    providers: [], 
    // imports - массив импортов в который мы добавляем разные модули
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
           // npm i @nestjs/config 
           // выносим системные переменные в .env и подгружаем отдельно
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            // подключаем системные переменные
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post], // регистрируем модели из других подмодулей
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})

// Корневой модуль - отпровная точка для построения внутренней структуры данных, которую Nest использует для разрешения взаимосвязей и зависимостей между модулями и поставщиками. 

export class AppModule {}
