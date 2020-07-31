import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  GET_TASKS_BY_DRIVER_ID,
} from "../../app/constants/action-types";

export function createTask(payload) {
  return { type: CREATE_TASK, payload };
}

export function deleteTask(payload) {
  return { type: DELETE_TASK, payload };
}

export function updateTask(payload) {
  return { type: UPDATE_TASK, payload };
}

export function getTasksByDriverId(payload) {
  return { type: GET_TASKS_BY_DRIVER_ID, payload };
}
