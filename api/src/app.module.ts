import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './iam/iam.module';
import { RegistersModule } from './registers/registers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RegistersModule,
    UsersModule,
    IamModule,
    /*
      Bloco abaixo responsavel por se conectar no banco de dados postgres
      Para usar o TypoOrmModule deve ser instalado: npm install @nestjs/typeorm typeorm pg
    */
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo do banco (postegres, mysql e etc)
      host: 'localhost',
      port: 5432, // Porta informada no docker compose
      username: 'postgres',
      password: 'Nt@2022#', // Senha do banco de dados criada na instalacao do banco na maquina
      database: 'web-study-project', // Nome do banco de dados criado no pgAdmin para o projeto
      autoLoadEntities: true, // Indica que a tabela deve ser criada no banco a partir da definição de entities
      synchronize: true, // Indica que a tabela deve ser criada no banco a partir da definição de entities
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
