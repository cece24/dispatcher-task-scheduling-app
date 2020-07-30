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
      showCreateModal: false,
      showEditModal: false,
      taskClicked: {},
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

  openModal = (modalType) => {
    if (modalType === "create") {
      this.setState({
        showCreateModal: true,
        showEditModal: false,
      });
    } else if (modalType === "edit") {
      this.setState({
        showEditModal: true,
        showCreateModal: false,
      });
    }
  };

  closeModal = () => {
    this.setState({
      showCreateModal: false,
      showEditModal: false,
    });
  };

  getTaskById = (id) => {
    let retreivedTask;
    this.props.tasks.map((task) => {
      console.log(`GIVEN ID: ${id}`);
      console.log(`CURRENT TASK ID: ${task.id}`);
      if (task.id === parseInt(id)) {
        console.log(`inside MATCH`);
        console.log(`task is: ${JSON.stringify(task)}`);
        retreivedTask = task;
      }
    });

    return retreivedTask;
  };

  handleTaskClick = (e) => {
    const targetTaskId = e.target.getAttribute("id");
    let task = this.getTaskById(targetTaskId);
    console.log(`retreived task: ${JSON.stringify(task)}`);
    this.openModal("edit");
    this.setState({
      taskClicked: task,
    });

    console.log(
      `task clicked state is ${JSON.stringify(this.state.taskClicked)}`
    );
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <AddTaskButton onClick={() => this.openModal("create")}>
          +
        </AddTaskButton>
        <ScheduleContainer>
          <Header>
            <Button>Driver Selector</Button>
            <Button onClick={() => this.setWeek("previous")}>{"<"}</Button>
            <div>WEEK {this.state.week}</div>
            <Button onClick={() => this.setWeek("next")}>{">"}</Button>
            <Button>Download Schedule</Button>
          </Header>
          <Body>
            {this.state.showCreateModal && (
              <ModalTaskForm
                type="create"
                show={this.state.showCreateModal}
                close={this.closeModal}
              ></ModalTaskForm>
            )}
            {this.state.showEditModal && (
              <ModalTaskForm
                type="edit"
                task={this.state.taskClicked}
                show={this.state.showEditModal}
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
                      {this.props.tasks.map((task, index) => (
                        <div key={`task-${index}`}>
                          {console.log(`TASK TO BE CLICKED ID: ${task.id}`)}
                          <Task
                            id={`${task.id - 1}`}
                            show={this.hasTask(day.dayId, hour.hourId)}
                            onClick={this.handleTaskClick}
                          >
                            {task.description}
                          </Task>
                        </div>
                      ))}
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
