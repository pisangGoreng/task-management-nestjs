import { TypeOrmModule } from "@nestjs/typeorm"

//TypeOrmModule => interface for bridge nestjs with typeorm
export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'bukabuka',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // ?? untuk baca semua schema dengan prefix entity
  synchronize: true,
}
