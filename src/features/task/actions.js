import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
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
