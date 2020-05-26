import axios from "axios";

const host = "http://localhost:8080";

export function listTask() {
  return axios.get(`${host}/tasks`);
}

export function createTask(task) {
  return axios.post(`${host}/tasks`, task);
}

export function deleteTask(task) {
  return axios.delete(`${host}/tasks/${task.id}`);
}

export function updateTask(task) {
  return axios.patch(`${host}/tasks/${task.id}`, {
    done: task.done,
  });
}
