import buildSchema from 'redux-form-schema';

const schema = {
  email: {
    required: true,
    type: 'email',
  },
  password: {
    required: true,
  },
};

export default buildSchema(schema);
