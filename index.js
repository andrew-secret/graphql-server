'use strict'

const express = require('express');
const graphqlHTTP = require('express-graphql');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} = require('graphql');

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
            resolve: () => new Promise((resolve) => {
                resolve({
                    id: '1',
                    title: 'Gravity Falls',
                    duration: 1337,
                    watched: true,
                });
            }),
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