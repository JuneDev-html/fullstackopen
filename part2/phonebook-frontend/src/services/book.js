/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const readAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (oldEntry, newEntry) => {
  const request = axios.put(`${baseUrl}/${oldEntry.id}`, newEntry);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  create,
  readAll,
  update,
  remove,
};
