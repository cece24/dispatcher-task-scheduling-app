import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  GET_TASKS_BY_DRIVER_ID,
} from "../../app/constants/action-types";

const initialState = [
  {
    id: 0,
    driverId: 1,
    weekId: 1,
    dayId: 0,
    startHourId: 12,
    endHourId: 13,
    taskCoordinates: ["1-0-12"],
    type: "pickup",
    description: "Pick up and transport kittens",
    address: "24 Scottish Fold Blvd, Toronto, ON M2M 2V2",
  },
  {
    id: 1,
    driverId: 2,
    weekId: 3,
    dayId: 4,
    startHourId: 12,
    endHourId: 14,
    taskCoordinates: ["3-4-12", "3-4-13"],
    type: "dropoff",
    description: "Drop off moar kittens",
    address: "24 Scottish Fold Blvd, Toronto, ON M2M 2V2",
  },
];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return state.slice().concat(action.payload);
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload.taskId);
    case UPDATE_TASK:
      return state
        .filter((task) => task.id !== action.payload.id)
        .concat(action.payload);
    case GET_TASKS_BY_DRIVER_ID:
      return state.filter((task) => task.driverId === action.payload.driverId);
    default:
      return state;
  }
}
