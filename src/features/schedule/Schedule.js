import React from "react";
import { connect } from "react-redux";
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
  position: relative;
  border-top: 0.1px solid grey;
  display: block;
  width: 100%;
  height: 40px;
`;

const Task = styled.div`
  display: none;

  ${({ show }) =>
    show &&
    `
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #1a73e8;
  `}
`;

const AddTaskButton = styled.button`
  position: sticky;
  left: 81vw;
  bottom: 60px;
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

  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
    bottom: 56px;
  }
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

  getDateCoordinates = (dayId, hourId) => {
    return `${this.state.week}-${dayId}-${hourId}`;
  };

  hasTask = (dayId, hourId) => {
    let hasTask;
    const dateCoordinate = this.getDateCoordinates(dayId, hourId);

    this.props.tasks.map((task) => {
      if (task.taskCoordinates.length !== 0) {
        task.taskCoordinates.map((coord) => {
          if (coord === dateCoordinate) {
            hasTask = true;
          }
        });
      }
    });

    return hasTask;
  };

  getTaskDescription = (dayId, hourId) => {
    const hasTask = this.hasTask(dayId, hourId);

    if (hasTask) {
      this.props.tasks.map((task) => {});
    }
  };

  openModal = () => {
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
      <div>
        <AddTaskButton onClick={this.openModal}>+</AddTaskButton>
        <ScheduleContainer>
          <Header>
            <Button>Driver Selector</Button>
            <Button onClick={() => this.setWeek("previous")}>{"<"}</Button>
            <div>WEEK {this.state.week}</div>
            <Button onClick={() => this.setWeek("next")}>{">"}</Button>
            <Button>Download Schedule</Button>
          </Header>
          <Body>
            {this.state.showModal && (
              <ModalTaskForm
                show={this.state.showModal}
                close={this.closeModal}
              ></ModalTaskForm>
            )}
            <DayContainer>
              <Hours style={{ marginTop: "40px" }}>
                {HOURS_OF_THE_DAY.map((hour, index) => (
                  <Hour key={`hour-ref-${index}`}>{hour.label}</Hour>
                ))}
              </Hours>
            </DayContainer>
            {DAYS_OF_THE_WEEK.map((day, index) => (
              <DayContainer key={`day-${index}`}>
                <Day>
                  <strong>{day.label}</strong>
                </Day>
                <Hours>
                  {HOURS_OF_THE_DAY.map((hour, index) => (
                    <Hour key={`hour-${index}`}>
                      <Task
                        show={this.hasTask(day.dayId, hour.hourId)}
                        description={this.getTaskDescription(
                          day.dayId,
                          hour.hourId
                        )}
                      ></Task>
                    </Hour>
                  ))}
                </Hours>
              </DayContainer>
            ))}
          </Body>
        </ScheduleContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.tasks });

export default connect(mapStateToProps)(Schedule);
