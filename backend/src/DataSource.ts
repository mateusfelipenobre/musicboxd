import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "mydatabase.sqlite",
    synchronize: true,
    entities: []
})