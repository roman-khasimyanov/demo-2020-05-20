import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";

import { PostResolver } from "./resolvers/post-resolver";
import { Post } from "./entity/Post";
import { Rate } from "./entity/Rate";
import { User } from "./entity/User";
import { Context } from "./resolvers/types/context";
import mokData from './mok-data';
TypeORM.useContainer(Container);

async function bootstrap() {
    try {
        // create TypeORM connection
        await TypeORM.createConnection({
            type: "sqlite",
            database: `${process.cwd()}/db.sqlite`,
            entities: [User, Post, Rate],
            synchronize: true,
            logger: "advanced-console",
            logging: "all",
            dropSchema: true,
            cache: true,
        });

        // seed database with some data
        const { defaultUser } = await mokData();

        // build TypeGraphQL executable schema
        const schema = await TypeGraphQL.buildSchema({
            resolvers: [PostResolver],
            container: Container,
        });

        // create mocked context
        const context: Context = { user: defaultUser };

        // Create GraphQL server
        const server = new ApolloServer({ schema, context });

        // Start the server
        const { url } = await server.listen(4000);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    } catch (err) {
        console.error(err);
    }
}

bootstrap();