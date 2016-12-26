import buildSchema from 'redux-form-schema';

const schema = {
  name: {
    required: true,
    validate: {
      length: {
        min: 1,
        max: 100,
      },
    },
  },
  weeks: {
    required: true,
    validate: {
      int: {
        min: 1,
        max: 52,
      },
    },
  },
  employees: {
    required: true,
    validate: {
      int: {
        min: 1,
        max: 100,
      },
    },
  },
};

export default buildSchema(schema);
