import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Crew {
        id: ID!
        name: String!
        foreman: String!
        members: [String!]!
        specialty: String
        startDate: String
        active: Boolean!
        notes: String
    }

    type JobSite {
        id: ID!
        location: String!
        client: String!
        budget: Float!
        deadline: String
        status: String
        crewAssigned: ID
        notes: String
    }

    type Query {
        getCrews: [Crew!]!
        getJobSites: [JobSite!]!
    }

    type Mutation {
        createCrew(
            name: String!
            foreman: String!
            members: [String!]!
            specialty: String
            startDate: String
            active: Boolean!
            notes: String 
        ): Crew!

        updateCrew(
           name: String!
            foreman: String!
            members: [String!]!
            specialty: String
            startDate: String
            active: Boolean!
            notes: String 
        ): Crew!

        deleteCrew(id: ID!): Crew!

        createJobSite(
            location: String!
            client: String!
            budget: Float!
            deadline: String
            status: String
            crewAssigned: ID
            notes: String
        ): JobSite!

        updateJobSite(
            id: ID!
            location: String!
            client: String!
            budget: Float!
            deadline: String
            status: String
            crewAssigned: ID
            notes: String
        ): JobSite!

        deleteJobSite(id: ID!): JobSite!
    }
`;