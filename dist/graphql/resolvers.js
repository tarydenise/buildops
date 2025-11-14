"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Crew_1 = __importDefault(require("../models/Crew"));
const JobSite_1 = __importDefault(require("../models/JobSite"));
const validators_1 = require("./validators");
const validators_2 = require("./validators");
const User_1 = __importDefault(require("../models/User"));
const graphql_1 = require("graphql");
exports.resolvers = {
    Query: {
        getCrews: async (_) => {
            return await Crew_1.default.find();
        },
        getJobSites: async (_) => {
            return await JobSite_1.default.find();
        },
        me: async (_, __, context) => {
            if (!context.user) {
                throw new Error('Unauthorized: No user found in context.');
            }
            const user = await User_1.default.findById(context.user.id);
            if (!user) {
                throw new Error('User not found.');
            }
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            };
        },
    },
    Mutation: {
        createCrew: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to create a crew.');
            }
            const errors = (0, validators_1.validateCrewInput)(input);
            if (Object.keys(errors).length > 0) {
                throw new graphql_1.GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }
            const crew = new Crew_1.default(input);
            return await crew.save();
        },
        updateCrew: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to update a crew.');
            }
            const { id, ...updates } = input;
            const errors = (0, validators_1.validateCrewInput)(updates);
            if (Object.keys(errors).length > 0) {
                throw new graphql_1.GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }
            try {
                const updatedCrew = await Crew_1.default.findByIdAndUpdate(id, updates, { new: true });
                if (!updatedCrew) {
                    throw new graphql_1.GraphQLError('Crew not found', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }
                return updatedCrew;
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },
        deleteCrew: async (_, { id }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to delete a crew.');
            }
            try {
                const deletedCrew = await Crew_1.default.findByIdAndDelete(id);
                if (!deletedCrew) {
                    throw new graphql_1.GraphQLError('Crew not fouind', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }
                return deletedCrew;
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },
        createJobSite: async (_, { input }) => {
            const errors = (0, validators_2.validateJobSiteInput)(input);
            if (Object.keys(errors).length > 0) {
                throw new graphql_1.GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }
            const jobSite = new JobSite_1.default(input);
            return await jobSite.save();
        },
        updateJobSite: async (_, { input }) => {
            const { id, ...updates } = input;
            const errors = (0, validators_2.validateJobSiteInput)(updates);
            if (Object.keys(errors).length > 0) {
                throw new graphql_1.GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }
            try {
                const updatedJobSite = await JobSite_1.default.findByIdAndUpdate(id, updates, {
                    new: true,
                });
                if (!updatedJobSite) {
                    throw new graphql_1.GraphQLError('JobSite not found', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }
                return updatedJobSite;
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },
        deleteJobSite: async (_, { id }) => {
            try {
                const deletedJobSite = await JobSite_1.default.findByIdAndDelete(id);
                if (!deletedJobSite) {
                    throw new graphql_1.GraphQLError('JobSite not found', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }
                return deletedJobSite;
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },
    },
};
