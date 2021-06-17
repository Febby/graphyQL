const graphql = require('graphql');

// destructure the graphql object to get
// GraphQLSchema, GraphQLobjectType, GraphQLString

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = graphql;

const posts = [
  {
    title: 'First post',
    description: 'Content of the first post',
    author: 'Febby',
  },
  {
    title: 'Second post',
    description: 'Content of the second post',
    author: 'Gunawan',
  },
];

const authors = {
  Febby: {
    name: 'Febby',
    age: 32,
  },
  Gunawan: {
    name: 'Gunawan',
    age: 23,
  },
};

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  },
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    author: {
      type: authorType,
      /*
        Note that a resolver function can be async, 
        so we can use async/await to lookup resources from a database or the network.
        */
      resolve: (source, params) => {
        return authors[source.author];
      },
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (source, { id }) => {
        return posts[id];
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts;
      },
    },
  },
});

//change later
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return 'world';
//         },
//       },
//     },
//   }),
// });

const schema = new GraphQLSchema({
  query: queryType,
});

module.exports = schema;
