import React from "react";
import styled from "styled-components";

import { DAYS_OF_THE_WEEK, HOURS_OF_THE_DAY } from "../../app/constants";
import ModalTaskForm from "./ModalTaskForm";

const ScheduleContainer = styled.div`
  position: relative;
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

const AddTaskButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  font-size: 36px;
  font-weight: bold;
  background-color: white;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 10px #888888;
`;

export class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      week: 1,
      showModal: false,
    };
  }

  setWeek = (direction) => {
    if (direction === "previous" && this.state.week !== 1) {
      this.setState({ week: this.state.week - 1 });
    } else if (direction === "next" && this.state.week !== 52) {
      this.setState({ week: this.state.week + 1 });
    }
  };

  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
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
          <AddTaskButton onClick={this.handleClick}>+</AddTaskButton>
          {this.state.showModal && (
            <ModalTaskForm
              show={this.state.showModal}
              close={this.closeModal}
            ></ModalTaskForm>
          )}
          <DayContainer>
            <Hours style={{ marginTop: "40px" }}>
              {HOURS_OF_THE_DAY.map((h) => (
                <Hour key={h}>{h.label}</Hour>
              ))}
            </Hours>
          </DayContainer>
          {DAYS_OF_THE_WEEK.map((day) => (
            <DayContainer key={day.dayId}>
              <Day>
                <strong>{day.label}</strong>
              </Day>
              <Hours>
                {HOURS_OF_THE_DAY.map((hour, index) => (
                  <div>
                    <Hour key={hour.hourId}>
                      {hour.label}
                      <Task
                        active={() => this.hasTask(day.dayId, hour.hourId)}
                      ></Task>
                    </Hour>
                    {/* //   <Hour
                    //     key={`hour-${index}`}
                    //     weekId={this.state.week}
                    //     dayId={day.dayId}
                    //     hourId={hour.hourId}
                    //     hourLabel={hour.label}
                    //     tasks={this.props.tasks}
                    //   ></Hour> */}
                  </div>
                ))}
              </Hours>
            </DayContainer>
          ))}
        </Body>
      </ScheduleContainer>
    );
  }
}
