import initTest from '../../config/initializers/testing.js'
import User from '../../model/user'

describe('User Model', () => {
  let connection;

  beforeAll(async () => {
    connection = await initTest();
  });

  beforeEach(async (done) => {
    await User.deleteMany({});
    done()
  });

  afterAll(async (done) => {
    await connection.disconnect();
    done()
  });

  const validUser = {
    name: 'test',
    email: 'test@test.com',
    password: 'testpassword',
    role: 0,
  }

  it ('should be valid with all valid parameters', async () => {
    expect(await User.validate(validUser)).toEqual(undefined);
  });

  it ('should be not valid with an invalid name', async (done) => {
    try {
      await User.validate({ ...validUser, name: undefined })
      done("Failed to throw validation error")
    } catch(err) {
      done()
    }
  });

  it ('should be not valid with an invalid email', async (done) => {
    try {
      await User.validate({ ...validUser, email: undefined })
      done("Failed to throw validation error")
    } catch(err) {
      done()
    }
  });

  it ('should be not valid with an invalid password', async (done) => {
    try {
      await User.validate({ ...validUser, password: undefined })
      done("Failed to throw validation error")
    } catch(err) {
      done()
    }
  });

  it ('should be not valid with an invalid role', async (done) => {
    try {
      await User.validate({ ...validUser, role: undefined })
      done("Failed to throw validation error")
    } catch(err) {
      done()
    }
  });
});