import CrewModel from '../models/Crew';
import JobSiteModel from '../models/JobSite';
import { validateCrewInput } from './validators';
import { validateJobSiteInput } from './validators';
import UserModel from '../models/User';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        getCrews: async (_: unknown) => {
            return await CrewModel.find();
        },
        getJobSites: async (_: unknown) => {
            return await JobSiteModel.find();
        },
        me: async (_: unknown, __: unknown, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: No user found in context.');
            }

            const user = await UserModel.findById(context.user.id);
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
        createCrew: async (_: unknown, { input }: any, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to create a crew.');
            }

            const errors = validateCrewInput(input);
            if (Object.keys(errors).length > 0) {
                throw new GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }

            const crew = new CrewModel(input);
            return await crew.save();
        },

        updateCrew: async (_: unknown, { input }: any, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to update a crew.');
            }

            const { id, ...updates } = input;

            const errors = validateCrewInput(updates);
            if (Object.keys(errors).length > 0) {
                throw new GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }

            try {
                const updatedCrew = await CrewModel.findByIdAndUpdate(id, updates, { new: true });
                if (!updatedCrew) {
                    throw new GraphQLError('Crew not found', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }
                return updatedCrew;
            } catch (err: any) {
                throw new GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },

        deleteCrew: async (_: unknown, { id }: any, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to delete a crew.');
            }

            try {
                const deletedCrew = await CrewModel.findByIdAndDelete(id);
                if (!deletedCrew) {
                    throw new GraphQLError('Crew not fouind', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }
                return deletedCrew;
            } catch (err: any) {
                throw new GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },

        createJobSite: async (_: unknown, { input }: any) => {
            const errors = validateJobSiteInput(input);
            if (Object.keys(errors).length > 0) {
                throw new GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }

            const jobSite = new JobSiteModel(input);
            return await jobSite.save();
        },

        updateJobSite: async (_: unknown, { input }: any) => {
            const { id, ...updates } = input;

            const errors = validateJobSiteInput(updates);
            if (Object.keys(errors).length > 0) {
                throw new GraphQLError('Validation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        errors,
                    },
                });
            }

            try {
                const updatedJobSite = await JobSiteModel.findByIdAndUpdate(id, updates, {
                    new: true,
                });

                if (!updatedJobSite) {
                    throw new GraphQLError('JobSite not found', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }

                return updatedJobSite;
            } catch (err: any) {
                throw new GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },

        deleteJobSite: async (_: unknown, { id }: any) => {
            try {
                const deletedJobSite = await JobSiteModel.findByIdAndDelete(id);

                if (!deletedJobSite) {
                    throw new GraphQLError('JobSite not found', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }

                return deletedJobSite;
            } catch (err: any) {
                throw new GraphQLError('Database error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: err.message,
                    },
                });
            }
        },
    },
};