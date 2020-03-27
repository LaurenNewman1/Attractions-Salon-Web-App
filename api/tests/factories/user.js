import argon2 from 'argon2';
import User from '../../model/user';

export const userParams = {
  name: 'test',
  email: 'test@test.com',
  password: 'testpassword',
  role: 0,
};

export const workerParams = {
  ...userParams,
  email: 'worker@test.com',
  role: 1,
};

export const ownerParams = {
  ...userParams,
  email: 'owner@test.com',
  role: 2,
};

const ExecCreateUser = async (params) => {
  const hashedPassword = await argon2.hash(params.password);
  const user = await User.create({ ...params, password: hashedPassword });
  return user;
};

export const MakeUser = async () => ExecCreateUser(userParams);
export const MakeWorker = async () => ExecCreateUser(workerParams);
export const MakeOwner = async () => ExecCreateUser(ownerParams);
