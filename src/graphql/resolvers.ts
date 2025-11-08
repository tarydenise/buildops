import { Query } from 'mongoose';
import CrewModel from '../models/Crew';
import JobSiteModel from '../models/JobSite';
import Crew from '../models/Crew';
import { validateCrewInput } from './validators';
import { validate } from 'graphql';
import { validateJobSiteInput } from './validators';
import UserModel from '../models/User';

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
        createCrew: async (_: unknown, args: any, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to create a crew.');
            }

            const errors = validateCrewInput(args);
            if (errors.length > 0) {
                throw new Error(errors.join(' | '));
            }

            const crew = new CrewModel(args);
            return await crew.save();
        },

        updateCrew: async (_: unknown, { id, ...updates }: any, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to update a crew.');
            }

            const errors = validateCrewInput(id);
            if (errors.length > 0) {
                throw new Error(errors.join(' | '));
            }

            return await CrewModel.findByIdAndUpdate(id, updates, { new: true });
        },

        deleteCrew: async (_: unknown, { id }: any, context: any) => {
            if (!context.user) {
                throw new Error('Unauthorized: You must be logged in to delete a crew.');
            }

            return await CrewModel.findOneAndDelete(id);
        },

        createJobSite: async (_: unknown, args: any) => {
            const errors = validateJobSiteInput(args);
            if (errors.length > 0) {
                throw new Error(errors.join(' | '));
            }

            const jobSite = new JobSiteModel(args);
            return await jobSite.save();
        },

        updateJobSite: async (_: unknown, { id, ...updates }: any) => {
            const errors = validateJobSiteInput(id);
            if (errors.length > 0) {
                throw new Error(errors.join(' | '));
            }
            
            return await JobSiteModel.findByIdAndUpdate(id, updates, { new: true });
        },

        deleteJobSite: async (_: unknown, { id }: any) => {
            return await JobSiteModel.findByIdAndDelete(id);
        },
    },
};