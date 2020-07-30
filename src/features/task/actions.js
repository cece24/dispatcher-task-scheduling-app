import { CREATE_TASK, DELETE_TASK } from "../../app/constants/action-types";

export function createTask(payload) {
  return { type: CREATE_TASK, payload };
}

export function deleteTask(payload) {
  return { type: DELETE_TASK, payload };
}
