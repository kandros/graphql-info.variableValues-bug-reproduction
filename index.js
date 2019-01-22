const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Parent {
    text: String!
    child: Child!
  }

  type Child {
    text: String!
  }

  type Query {
    parent(hasInsight: Boolean): Parent!
  }
`

const resolvers = {
  Query: {
    parent: (root, args, context, info) => {
      return { text: `from parent, hasInsight is ${args.hasInsight}` }
    },
  },
  Parent: {
    child: (parent, args, context, info) => {
      return {
        text: 'from children',
      }
    },
  },
}

// info.variableValues prende solo le variabili custon
// in questo caso ci sarebbe info.variableValues.xxx e non info.variableValues.hasInsight
// query hasInsightQuery($xxx: Boolean!){
//     parent(hasInsight: $xxx) {
//       text
//       child{
//         text

//       }
//     }
//   }

// facendo solo
//
//     parent(hasInsight: true) {
//       text
//       child{
//         text

//       }
//     }
//
// info.variableValues sarebbe {}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
