import Client from '../src'

const schema = /* GraphQL */ `
    directive @deprecated(reason: String = "EOL") on FIELD_DEFINITION
    scalar Date

    interface A {
        A: String!
    }

    enum CD {
        C
        D
    }

    enum EF {
        E
        F
    }

    type B implements A {
        B: String!
    }

    type D {
        nested: Date!
    }

    type C {
        C: String
        D: D!
    }

    # This is C | D | E | F
    union CDEF = CD | EF

    union ABC = B | C

    type Query {
        Hi(cdef: CDEF): ABC!
    }
`

type Scalar = {
    Date: Date
}

const client = new Client<typeof schema, Scalar>('::1')

const a = await client.$({
    query: {
        Hi: {
            select: {
                A: true,
                D: {
                    nested: true
                }
            }
        }
    }
})

a.Hi.D.nested
