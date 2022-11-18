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
export const getManholeList = async () => {
  const users = [];
  const apiRes = await fetch('http://localhost:5000/admin/reports/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiJpN2NkeTA4MWptIiwiaWF0IjoxNjY4Njg5ODg0LCJleHAiOjE2NjkyODk4ODR9.ud2hjSxBDx33iVRTdJ6IYV_WA_mFqWAJN1wzPwd3FPE',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  // console.log(result.data.data);
  result.data.data.forEach((val) => {
    if (val.type === 'manholes')
      users.push({
        id: val.id,
        avatarUrl: val.img,
        type: val.type,
        pocname: val.pocname,
        pocnum: val.pocnum,
        lat: val.lat,
        long: val.long,
        text: val.text,
        status: val.isActive ? 'unresolved' : 'resolved',
        isVerified: val.isActive,
      });
  });
  return users;
  // users.push();
};

export const getPotholeList = async () => {
  const users = [];
  const apiRes = await fetch('http://localhost:5000/admin/reports/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiJpN2NkeTA4MWptIiwiaWF0IjoxNjY4Njg5ODg0LCJleHAiOjE2NjkyODk4ODR9.ud2hjSxBDx33iVRTdJ6IYV_WA_mFqWAJN1wzPwd3FPE',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  // console.log(result.data.data);
  result.data.data.forEach((val) => {
    if (val.type === 'pothole')
      users.push({
        id: val.id,
        avatarUrl: val.img,
        type: val.type,
        pocname: val.pocname,
        pocnum: val.pocnum,
        lat: val.lat,
        long: val.long,
        text: val.text,
        status: val.isActive ? 'unresolved' : 'resolved',
        isVerified: val.isActive,
      });
  });
  return users;
  // users.push();
};
export const getStreetLightList = async () => {
  const users = [];
  const apiRes = await fetch('http://localhost:5000/admin/reports/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiJpN2NkeTA4MWptIiwiaWF0IjoxNjY4Njg5ODg0LCJleHAiOjE2NjkyODk4ODR9.ud2hjSxBDx33iVRTdJ6IYV_WA_mFqWAJN1wzPwd3FPE',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  // console.log(result.data.data);
  result.data.data.forEach((val) => {
    if (val.type === 'streetlights')
      users.push({
        id: val.id,
        avatarUrl: val.img,
        type: val.type,
        pocname: val.pocname,
        pocnum: val.pocnum,
        lat: val.lat,
        long: val.long,
        text: val.text,
        status: val.isActive ? 'unresolved' : 'resolved',
        isVerified: val.isActive,
      });
  });
  return users;
  // users.push();
};
export default users;
