"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJobSiteInput = exports.validateCrewInput = void 0;
const validateCrewInput = (input) => {
    const errors = {};
    if (!input.name || input.name.trim().length < 2) {
        errors.name = ('Crew name must be at least 2 characters.');
    }
    if (!input.foreman || input.foreman.trim().length < 2) {
        errors.foreman = ('Foreman name must be at least 2 characters.');
    }
    if (!Array.isArray(input.members) || input.members.length === 0) {
        errors.members = ('Crew must have at least one member.');
    }
    if (!input.specialty || input.specialty.trim().length < 2) {
        errors.speciality = 'Specialty must be at least 2 characters.';
    }
    if (!input.startDate || isNaN(Date.parse(input.startDate))) {
        errors.startDate = 'Start date must be a valid date.';
    }
    if (typeof input.active !== 'boolean') {
        errors.active = ('Active status must be true or false.');
    }
    if (input.notes && input.notes.length > 500) {
        errors.notes = 'Notes must be under 500 characters.';
    }
    return errors;
};
exports.validateCrewInput = validateCrewInput;
const validateJobSiteInput = (input) => {
    const errors = {};
    if (!input.name || input.name.trim().length < 2) {
        errors.name = 'Job site name must be at least 2 characters.';
    }
    if (!input.location || input.location.trim().length < 2) {
        errors.location = 'Location must be at least 2 characters.';
    }
    if (!input.startDate || isNaN(Date.parse(input.startDate))) {
        errors.startDate = 'Start date must be a valid date.';
    }
    if (input.endDate && isNaN(Date.parse(input.endDate))) {
        errors.endDate = 'End date must be a valid date.';
    }
    if (!input.crewAssigned || input.crewAssigned.trim().length < 2) {
        errors.crewAssigned = 'Crew assignment must be specified.';
    }
    if (!input.status || !['pending', 'active', 'completed'].includes(input.status)) {
        errors.status = 'Status must be one of: pending, active, completed.';
    }
    if (!input.client || input.client.trim().length < 2) {
        errors.client = 'Client name must be at least 2 characters.';
    }
    if (typeof input.budget !== 'number' || input.budget <= 0) {
        errors.budget = 'Budget must be a positive number.';
    }
    if (input.notes && input.notes.length > 500) {
        errors.notes = 'Notes must be under 500 characters.';
    }
    return errors;
};
exports.validateJobSiteInput = validateJobSiteInput;
