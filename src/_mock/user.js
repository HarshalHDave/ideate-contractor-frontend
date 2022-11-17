import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.phone.number('####'),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  type: sample(['Potholes', 'Manholes', 'Street Lights']),
  text: faker.commerce.productDescription() ,
  pocnum: faker.phone.number('+91 9#### #####'),
  isVerified: faker.datatype.boolean(),
  lat: faker.address.latitude(),
  long: faker.address.longitude(),
  status: sample(['resolved', 'unresolved']),
  pocname: faker.name.fullName(),
}));

export default users;
