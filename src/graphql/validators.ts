export const validateCrewInput = (input: {
    name?: string;
    foreman?: string;
    members?: string[];
    active?: boolean;
}) => {
    const errors: string[] = [];

    if (!input.name || input.name.trim().length < 2) {
        errors.push('Crew name must be at least 2 characters.');
    }

    if (!input.foreman || input.foreman.trim().length < 2) {
        errors.push('Foreman name must be at least 2 characters.');
    }

    if (!Array.isArray(input.members) || input.members.length === 0) {
        errors.push('Crew must have at least one member.');
    }

    if (typeof input.active !== 'boolean') {
        errors.push('Active status must be or false.');
    }

    return errors;
};