const initialState = [
  {
    id: 0,
    driverId: 0,
    weekId: 1,
    dayId: 0,
    startHourId: 12,
    endHourId: 13,
    taskCoordinates: ["1-0-12", "1-0-13"],
    type: "pickup",
    description: "Pick up and transport kittens",
    address: "24 Scottish Fold Blvd, Toronto, ON M2M 2V2",
  },
  {
    id: 1,
    driverId: 0,
    weekId: 3,
    dayId: 4,
    startHourId: 12,
    endHourId: 14,
    taskCoordinates: ["3-4-12", "3-4-13", "3-4-14"],
    type: "dropoff",
    description: "Drop off moar kittens",
    address: "24 Scottish Fold Blvd, Toronto, ON M2M 2V2",
  },
];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return state.slice().concat(action.payload);
    default:
      return state;
  }
}
