import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import {
  DAYS_OF_THE_WEEK,
  HOURS_OF_THE_DAY,
} from "../../app/constants/constants";
import { createTask, deleteTask, updateTask } from "../task/actions";

const Modal = styled.div`
  display: inline-block;
  position: fixed;
  top: 130px;
  width: 700px;
  height: 550px;
  background-color: white;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 10px #888888;
  z-index: 1;
`;

const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  font-size: 16px;
  font-weight: bold;
  color: black;
  background-color: lightgrey;
  border: 1px solid lightgrey;
`;

const ModalTitle = styled.h2`
  width: 150px;
  border-right: 1px solid lightgrey;
  padding-right: 24px;
`;

const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 640px;
  display: flex;
  flex-direction: column;
`;

const sharedFieldStyles = css`
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 2px;
`;

const FormField = styled.div`
  margin: 10px;
  padding: 5px;
  text-align: left;
`;

const Label = styled.label`
  display: inline-block;
`;

const Input = styled.input`
  ${sharedFieldStyles};
  width: 300px;
`;

const Select = styled.select`
  ${sharedFieldStyles};
  width: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const SharedButtonStyles = css`
  margin-top: 10px;
  width: 12rem;
  padding: 1rem;
  border-radius: 3rem;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-out;
  position: relative;
  top: 0;

  &:hover {
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
    top: -4px;
  }
`;

const SubmitButton = styled.button`
  ${SharedButtonStyles}
  background-color: #1a73e8;
`;

const DeleteButton = styled.button`
  ${SharedButtonStyles}
  background-color: red;
`;

const ConflictAlert = styled.div`
  display: none;

  ${({ show }) =>
    show &&
    `
    width: 400px;
    height: 170px;
    display: inline-block;
    position: fixed;
    top: 33vh;
    left: 37vw;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 2px 2px 10px #888888;
    z-index: 2;
  `}
`;

const ConflictButton = styled.button`
  ${SharedButtonStyles}
  background-color: red;
  padding: 1rem;
  margin-top: 0;
`;

export class ModalTaskForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.type === "edit") {
      const {
        id,
        driverId,
        weekId,
        dayId,
        startHourId,
        endHourId,
        taskCoordinates,
        type,
        description,
        address,
      } = this.props.task;

      this.state = {
        id,
        driverId,
        weekId,
        dayId,
        startHourId,
        endHourId,
        taskCoordinates,
        type,
        description,
        address,
        alertType: "",
      };
    } else {
      this.state = {
        id: 0,
        driverId: 1,
        weekId: this.props.week,
        dayId: 0,
        startHourId: 0,
        endHourId: 0,
        taskCoordinates: [],
        type: "pickup",
        description: "",
        address: "",
        alertType: "",
      };
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  deleteTask = (e) => {
    this.props.deleteTask({ taskId: this.state.id });
    this.props.closeModal();
    alert("Task has been deleted!");
    e.preventDefault();
  };

  checkForConflicts = (newTaskCoordinates) => {
    let hasConflict = false;

    this.props.tasks.map((task) => {
      if (task.driverId === this.state.driverId) {
        if (task.taskCoordinates.length > 0) {
          task.taskCoordinates.map((coord) => {
            if (newTaskCoordinates.includes(coord)) {
              hasConflict = true;
            }
          });
        }
      }
    });

    return hasConflict;
  };

  generateTaskCoordinates = () => {
    let newCoords = [];
    let numOfCoords = this.state.endHourId - this.state.startHourId;
    for (let coord = 0; coord < numOfCoords; coord++) {
      let hourCoord = parseInt(this.state.startHourId) + coord;
      newCoords.push(`${this.state.weekId}-${this.state.dayId}-${hourCoord}`);
    }

    this.setState({
      taskCoordinates: newCoords,
    });
  };

  mapStateToTaskPayload = () => {
    this.generateTaskCoordinates();

    const {
      id,
      driverId,
      weekId,
      dayId,
      startHourId,
      endHourId,
      taskCoordinates,
      type,
      description,
      address,
    } = this.state;

    const taskPayload = {
      id,
      driverId,
      weekId,
      dayId,
      startHourId,
      endHourId,
      taskCoordinates,
      type,
      description,
      address,
    };

    return taskPayload;
  };

  // TO DO: refactor with mapStateToTaskPayload
  handleSubmit = (e) => {
    const {
      id,
      driverId,
      weekId,
      dayId,
      startHourId,
      endHourId,
      taskCoordinates,
      type,
      description,
      address,
    } = this.state;

    const taskPayload = {
      id,
      driverId,
      weekId,
      dayId,
      startHourId,
      endHourId,
      taskCoordinates,
      type,
      description,
      address,
    };

    taskPayload.taskCoordinates = [];
    let numOfCoords = endHourId - startHourId;
    for (let coord = 0; coord < numOfCoords; coord++) {
      let hourCoord = parseInt(startHourId) + coord;
      taskPayload.taskCoordinates.push(`${weekId}-${dayId}-${hourCoord}`);
    }

    this.setState({
      taskCoordinates: taskPayload.taskCoordinates,
    });

    const hasConflict = this.checkForConflicts(taskPayload.taskCoordinates);

    if (hasConflict === false) {
      if (this.props.type === "create") {
        this.props.createTask(taskPayload);
        this.props.closeModal();
        alert("Task has been created!");
      } else if (this.props.type === "edit") {
        this.props.updateTask(taskPayload);
        this.props.closeModal();
        alert("Task has been updated!");
      }
    } else if (hasConflict === true) {
      if (this.props.type === "create") {
        this.setState({
          showConflictAlert: true,
          alertType: "overwrite",
        });
      } else if (this.props.type === "edit") {
        this.setState({
          showConflictAlert: true,
          alertType: "delete",
        });
      }
    }
    e.preventDefault();
  };

  handleAlertSubmit = (e) => {
    const taskPayload = this.mapStateToTaskPayload();

    if (this.state.alertType === "delete") {
      this.props.updateTask(taskPayload);
      this.props.closeModal();
      alert("Task has been updated! The conflicting task has been deleted.");
    } else if (this.state.alertType === "overwrite") {
      this.props.updateTask(taskPayload);
      this.props.closeModal();
      alert(
        "Task has been created! The conflicting task has been overwritten."
      );
    }

    e.preventDefault();
  };

  render() {
    const { type, closeModal } = this.props;
    return (
      <Modal>
        <CloseModalButton onClick={() => closeModal()}>X</CloseModalButton>
        <FormContainer>
          <ModalTitle>
            {type === "create" ? "Create Task" : "Edit Task"}
          </ModalTitle>
          <Form onSubmit={this.handleSubmit}>
            <FormField>
              <Label>
                Driver:
                <Select
                  name="driverId"
                  value={this.state.driverId}
                  onChange={this.handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Select>
              </Label>
            </FormField>
            <FormField>
              <Label>
                Date:
                <hr></hr>
                <Label>
                  Week:
                  <Input
                    name="weekId"
                    type="number"
                    min="1"
                    max="52"
                    placeholder="1-52"
                    required="required"
                    style={{ width: "100px" }}
                    value={this.state.weekId}
                    onChange={this.handleChange}
                  />
                </Label>
                <Label>
                  Day:
                  <Select
                    name="dayId"
                    value={this.state.dayId}
                    onChange={this.handleChange}
                  >
                    {DAYS_OF_THE_WEEK.map((day, index) => (
                      <option key={`day-${index}`} value={day.dayId}>
                        {day.label}
                      </option>
                    ))}
                  </Select>
                </Label>
              </Label>
            </FormField>
            <FormField>
              Time:
              <hr></hr>
              <Label>
                From:
                <Select
                  name="startHourId"
                  value={this.state.startHourId}
                  onChange={this.handleChange}
                >
                  {HOURS_OF_THE_DAY.map((hour, index) => (
                    <option key={`start-hour-${index}`} value={hour.hourId}>
                      {hour.label}
                    </option>
                  ))}
                </Select>
              </Label>
              <Label>
                To:
                <Select
                  name="endHourId"
                  value={this.state.endHourId}
                  onChange={this.handleChange}
                >
                  {HOURS_OF_THE_DAY.map((hour, index) => (
                    <option key={`end-hour-${index}`} value={hour.hourId}>
                      {hour.label}
                    </option>
                  ))}
                </Select>
              </Label>
            </FormField>
            <FormField>
              <Label>
                Task Type:
                <Select
                  name="type"
                  type={this.state.type}
                  onChange={this.handleChange}
                >
                  <option value="pickup">Pickup</option>
                  <option value="dropoff">Drop off</option>
                  <option value="other">Other</option>
                </Select>
              </Label>
            </FormField>
            <FormField>
              <Label>
                Description:
                <Input
                  name="description"
                  value={this.state.description}
                  type="text"
                  required="required"
                  onChange={this.handleChange}
                />
              </Label>
            </FormField>
            <FormField>
              <Label>
                Address:
                <Input
                  name="address"
                  value={this.state.address}
                  type="text"
                  required="required"
                  onChange={this.handleChange}
                />
              </Label>
            </FormField>
            <ButtonContainer>
              <SubmitButton type="submit">
                {type === "create" ? "CREATE" : "SAVE CHANGES"}
              </SubmitButton>
              {type === "edit" && (
                <DeleteButton onClick={this.deleteTask}>DELETE</DeleteButton>
              )}
            </ButtonContainer>
          </Form>
        </FormContainer>
        <ConflictAlert show={this.state.showConflictAlert}>
          {this.state.alertType === "overwrite" && (
            <div style={{ padding: "0.5rem" }}>
              <h3 style={{ margin: "5px" }}>TASK CONFLICT</h3>
              <p>
                Would you like to <strong>overwrite</strong> the{" "}
                <strong>existing task</strong> with the new task?
              </p>
              <ConflictButton onClick={this.handleAlertSubmit}>
                OVERWRITE
              </ConflictButton>
            </div>
          )}
          {this.state.alertType === "delete" && (
            <div style={{ padding: "0.5rem" }}>
              <h3 style={{ margin: "5px" }}>TASK CONFLICT</h3>
              <p>
                Would you like to <strong>delete</strong> the{" "}
                <strong>conflicting task</strong> and <strong>save</strong> the{" "}
                <strong>new task</strong>?
              </p>
              <ConflictButton onClick={this.handleAlertSubmit}>
                DELETE
              </ConflictButton>
            </div>
          )}
        </ConflictAlert>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.tasks });
const mapDispatchToProps = { createTask, deleteTask, updateTask };

export default connect(mapStateToProps, mapDispatchToProps)(ModalTaskForm);
