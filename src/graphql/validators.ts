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

export const validateJobSiteInput = (input: {
    location?: string;
    client?: string;
    budget?: number;
    deadline?: string;
}) => {
    const errors: string[] = [];

    if (!input.location || input.location.trim().length < 3) {
        errors.push('Location must be at least 3 characters.');
    }

    if (!input.client || input.client.trim().length < 2) {
        errors.push('Client name must be at least 2 characters.');0
    }

    if (typeof input.budget !== 'number' || input.budget <= 0) {
        errors.push('Budget must be a positive number.');
    }

    if (input.deadline && isNaN(Date.parse(input.deadline))) {
        errors.push('Deadline must be a valid date string.');
    }

    return errors;
};