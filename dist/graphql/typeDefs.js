"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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

    input CrewInput {
        id: ID
        name: String!
        foreman: String!
        members: [String!]!
        specialty: String!
        startDate: String!
        active: Boolean!
        notes: String
    }

    type JobSite {
        id: ID!
        name: String!
        location: String!
        startDate: String!
        endDate: String!
        crewAssigned: ID
        status: String
        client: String!
        budget: Float!
        notes: String
    }

    input JobSiteInput {
        id: ID
        name: String!
        location: String!
        startDate: String!
        endDate: String
        crewAssigned: String!
        status: String!
        client: String!
        budget: Float!
        notes: String
    }

    type Query {
        getCrews: [Crew!]!
        getJobSites: [JobSite!]!
        me: User
    }

    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String
    }

    type Mutation {
        createCrew(input: CrewInput!): Crew!
        updateCrew(input: UpdateCrewInput!): Crew!
        deleteCrew(id: ID!): Crew!

        createJobSite(input: JobSiteInput!): JobSite!
        updateJobSite(id: ID!, input: JobSiteInput!): JobSite!
        deleteJobSite(id: ID!): JobSite!
    }

    input UpdateCrewInput {
        id: ID!
        name: String!
        foreman: String!
        members: [String!]!
        specialty: String!
        startDate: String!
        active: Boolean!
        notes: String
    }
`;
