import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import {
  DAYS_OF_THE_WEEK,
  HOURS_OF_THE_DAY,
} from "../../app/constants/constants";
import { createTask, deleteTask } from "../task/actions";

const Modal = styled.div`
  display: none;

  ${({ show }) =>
    show &&
    `
    display: inline-block;
    position: fixed;
    top: 130px;
    width: 700px;
    height: 550px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 2px 2px 10px #888888;
    z-index: 1;
    `}
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
  // border: 1px solid lightgrey;
  // color: #fff;
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
  // // color: #fff;

  // &::placeholder {
  //   // color: #fff;
  // }

  // font-family: "Futura", "Times New Roman", sans-serif;
  // border: none;
  // padding: 1rem 0;
  // margin-top: 1.4rem;
  // display: block;
  // width: 100%;
  // border-bottom: 1px solid #fff;
  // font-size: 1rem;
  // font-weight: bold;
  // background: transparent;
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
`;

const TextArea = styled.textarea`
  ${sharedFieldStyles};
`;

const Select = styled.select`
  ${sharedFieldStyles};
  display: inline-block;
  width: 150px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  width: 12rem;
  padding: 1rem;
  border-radius: 3rem;
  border: none;
  background-color: #1a73e8;
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

const DeleteButton = styled.button`
  width: 10rem;
  border-radius: 3rem;
  padding: 1rem;
  cursor: pointer;
  color: white;
  background-color: #1a73e8;
  font-weight: bold;
`;

export class ModalTaskForm extends React.Component {
  constructor(props) {
    super(props);

    const task = props.task;

    this.state = {
      id: task.id || 0,
      driverId: task.driverId || "",
      weekId: task.weekId || 1,
      dayId: task.dayId || 0,
      startHourId: task.startHourId || 0,
      endHourId: task.endHourId || 0,
      taskCoordinates: task.taskCoordinates || [],
      type: task.type || "pickup",
      description: task.description || "",
      address: task.address || "",
    };

    console.log(`INITIAL STATE: ${JSON.stringify(this.state)}`);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const {
      driverId,
      weekId,
      dayId,
      startHourId,
      endHourId,
      type,
      description,
      address,
    } = this.state;

    const taskPayload = {
      driverId,
      weekId,
      dayId,
      startHourId,
      endHourId,
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

    this.props.createTask(taskPayload);
    this.props.closeModal();
    alert("Task has been created!");
    e.preventDefault();
  };

  deleteTask = (e) => {
    this.props.deleteTask({ taskId: this.state.id });
    this.props.closeModal();
    alert("Task has been deleted!");
    e.preventDefault();
  };

  render() {
    const { type, show, closeModal } = this.props;
    return (
      <Modal show>
        <CloseModalButton onClick={() => closeModal()}>X</CloseModalButton>
        <FormContainer>
          <ModalTitle>
            {type === "create" ? "Create Task" : "Edit Task"}
          </ModalTitle>
          <DeleteButton onClick={this.deleteTask}>Delete</DeleteButton>
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
                    dayId={this.state.dayId}
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
                  startHourId={this.state.startHourId}
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
                  endHourId={this.state.endHourId}
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
                <TextArea
                  name="description"
                  value={this.state.description}
                  rows="2"
                  cols="40"
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
            <SubmitButton type="submit">
              {type === "create" ? "CREATE" : "SAVE CHANGES"}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.tasks });
const mapDispatchToProps = { createTask, deleteTask };

export default connect(mapStateToProps, mapDispatchToProps)(ModalTaskForm);
