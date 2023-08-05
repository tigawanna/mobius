import { Mobius } from '../src'

const typeDefs = /* GraphQL */ `
    type Song {
        name: String!
        composer: Composer!
    }

    type Composer {
        name: String!
    }

    type Query {
        songs(composer: String!): [Song!]!
    }
`

const a = new Mobius({
    typeDefs
})

const b = await a.query({
    songs: {
        select: {
            name: true
        },
        where: {
            composer: 'a'
        }
    }
})

b?.songs