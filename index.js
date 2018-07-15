'use strict'

const express = require('express');
const graphqlHTTP = require('express-graphql');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const { getVideoById } = require('./src/data');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'some video',
    fields: {
        id: {
            type: GraphQLString,
            description: 'ID of the video',
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video',
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video',
        },
        watched: {
            type: GraphQLBoolean,
            description: 'has watched video',
        }
    }
})

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'ID of the video',
                }
            },
            resolve: (_, args) => {
                return getVideoById(args.id);
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: queryType,
});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});