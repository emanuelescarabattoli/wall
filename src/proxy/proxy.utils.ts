import { NotFoundException } from '@nestjs/common';

export const resolveRoute = url => {
    const route = url.split('/')[2];
    const rest = url.replace(`/api/${route}`, '');
    switch (route) {
        case 'contacts':
            return `http://localhost:3001${rest}`;
        default:
            throw new NotFoundException();
    }
};
