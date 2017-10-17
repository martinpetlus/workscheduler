import buildSchema from 'redux-form-schema';

const schema = {
  name: {
    label: 'Work schedule name',
    required: true,
    validate: {
      length: {
        min: 1,
        max: 100,
      },
    },
  },
  weeks: {
    label: 'Weeks',
    required: true,
    validate: {
      int: {
        min: 1,
        max: 52,
      },
    },
  },
  employees: {
    label: 'Employees',
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
