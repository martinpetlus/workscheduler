import { v4 } from 'uuid';

const workSchedules = new Map();

export const get = id => new Promise((resolve, reject) => {
  if (workSchedules.has(id)) {
    resolve(workSchedules.get(id));
  } else {
    reject(new Error(`Work schedule with ${id} doesn't exists.`));
  }
});

export const create = options => new Promise((resolve) => {
  const id = v4();
  const newWorkSchedule = { ...options, id };
  workSchedules.set(id, newWorkSchedule);
  resolve(newWorkSchedule);
});

export const getAll = () => new Promise((resolve) => {
  resolve([...workSchedules.values()]);
});
