export function generateCsvReportData(reportInterval, driverId, tasks) {
  let data = [];
  const headers = ["Time-Frame", "Pickup", "Dropoff", "Other"];
  data.push(headers);

  const driverTasks = tasks.filter((task) => task.driverId === driverId);
  let dayCounter = 0;

  if (reportInterval === 2) {
    for (var day = 0; day < 365; day++) {
      let pickUps = 0;
      let dropOffs = 0;
      let other = 0;
      for (var interval = 0; interval < 3; interval++) {
        driverTasks.map((task) => {
          if (task.dayId === day) {
            if (task.type === "pickup") {
              pickUps++;
            }

            if (task.type === "dropoff") {
              dropOffs++;
            }

            if (task.type === "other") {
              other++;
            }
          }
        });
      }
      const timeFrame = `Day ${dayCounter + 1} - Day ${dayCounter + 3}`;
      const dataRow = [timeFrame, pickUps, dropOffs, other];
      data.push(dataRow);
      dayCounter++;
    }
  }

  if (reportInterval === 4) {
  }

  if (reportInterval === 14) {
  }

  if (reportInterval === 28) {
  }

  return data;
}
