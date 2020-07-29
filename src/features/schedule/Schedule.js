import React from "react";
import styled from "styled-components";

const ScheduleContainer = styled.div`
  display: inline-block;
  width: 70vw;
  height: 90vh;
  overflow: auto;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 20px 10px 20px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f6fa;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DayContainer = styled.div`
  width: 12%;
  display: flex;
  flex-direction: column;
`;

const Day = styled.div`
  width: 100%;
  height: 40px;
`;

const Hours = styled.div`
  width: 100%;
`;

const Hour = styled.div`
  border-bottom: 0.1px solid grey;
  display: inline-block;
  width: 100%;
  height: 40px;
`;

// const DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAYS_OF_THE_WEEK = [
  {
    dayId: 0,
    label: "MON",
  },
  {
    dayId: 1,
    label: "TUES",
  },
  {
    dayId: 2,
    label: "WEDS",
  },
  {
    dayId: 3,
    label: "THURS",
  },
  {
    dayId: 4,
    label: "FRI",
  },
  {
    dayId: 5,
    label: "SAT",
  },
  {
    dayId: 6,
    label: "SUN",
  },
];

const HOURS_OF_THE_DAY = [
  {
    hourId: 0,
    label: "12am",
  },
  {
    hourId: 1,
    label: "1am",
  },
  {
    hourId: 2,
    label: "2am",
  },
  {
    hourId: 3,
    label: "3am",
  },
  {
    hourId: 4,
    label: "4am",
  },
  {
    hourId: 5,
    label: "5am",
  },
  {
    hourId: 6,
    label: "6am",
  },
  {
    hourId: 7,
    label: "7am",
  },
  {
    hourId: 8,
    label: "8am",
  },
  {
    hourId: 9,
    label: "9am",
  },
  {
    hourId: 10,
    label: "10am",
  },
  {
    hourId: 11,
    label: "11am",
  },
  {
    hourId: 12,
    label: "12pm",
  },
  {
    hourId: 13,
    label: "1pm",
  },
  {
    hourId: 14,
    label: "2pm",
  },
  {
    hourId: 15,
    label: "3pm",
  },
  {
    hourId: 16,
    label: "4pm",
  },
  {
    hourId: 17,
    label: "5pm",
  },
  {
    hourId: 18,
    label: "6pm",
  },
  {
    hourId: 19,
    label: "7pm",
  },
  {
    hourId: 20,
    label: "8pm",
  },
  {
    hourId: 21,
    label: "9pm",
  },
  {
    hourId: 22,
    label: "10pm",
  },
  {
    hourId: 23,
    label: "11pm",
  },
];

const taskTimeId = "1-12";

export class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      week: 1,
    };
  }

  setWeek = (direction) => {
    if (direction === "previous" && this.state.week !== 1) {
      this.setState({ week: this.state.week - 1 });
    } else if (direction === "next" && this.state.week !== 52) {
      this.setState({ week: this.state.week + 1 });
    }
  };

  render() {
    return (
      <ScheduleContainer>
        <Header>
          <Button>Driver Selector</Button>
          <Button onClick={() => this.setWeek("previous")}>{"<"}</Button>
          <div>WEEK {this.state.week}</div>
          <Button onClick={() => this.setWeek("next")}>{">"}</Button>
          <Button>Download Schedule</Button>
        </Header>
        <Body>
          <DayContainer>
            <Hours style={{ marginTop: "40px" }}>
              {HOURS_OF_THE_DAY.map((h) => (
                <Hour key={h}>{h.label}</Hour>
              ))}
            </Hours>
          </DayContainer>
          {DAYS_OF_THE_WEEK.map((d) => (
            <DayContainer key={d}>
              <Day>
                <strong>{d.label}</strong>
              </Day>
              <Hours>
                {HOURS_OF_THE_DAY.map((h) => (
                  <Hour key={h} id={`${d.dayId}-${h.hourId}`}>
                    {h.label}
                    {`${d.dayId}-${h.hourId}` === taskTimeId && (
                      <span>has task</span>
                    )}
                  </Hour>
                ))}
              </Hours>
            </DayContainer>
          ))}
        </Body>
      </ScheduleContainer>
    );
  }
}
