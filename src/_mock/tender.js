import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const tenders = [...Array(24)].map(() => ({
    id: faker.commerce.price(),
    text: faker.commerce.productDescription(),
    lat: faker.address.latitude(),
    long: faker.address.longitude(),
    status: sample(['Submitted', 'Accepted', 'Rejected']),
}));

export default tenders;
