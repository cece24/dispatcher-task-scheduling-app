import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { DAYS_OF_THE_WEEK, HOURS_OF_THE_DAY } from "../../app/constants";
import { createTask } from "../task/actions";

const Modal = styled.div`
  display: none;

  ${({ show }) =>
    show &&
    `
    display: inline-block;
    position: fixed;
    top: 130px;
    width: 700px;
    height: 500px;
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

const FormContainer = styled.div`
  // border: 1px solid lightgrey;
  // color: #fff;
  // padding: 3rem;
`;

const Form = styled.form`
  max-width: 640px;
  // margin-top: 3rem;
  // overflow: auto;
  display: flex;
  flex-direction: column;
`;

const sharedFieldStyles = css`
  display: inline-block;
  margin-left: 10px;
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
  border: 1px solid lightgrey;
  margin: 5px;
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
  margin-top: 3rem;
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

export class ModalTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driverId: 1,
      startWeekId: 1,
      startDayId: 0,
      startHourId: 0,
      endWeekId: 1,
      endDayId: 0,
      endHourId: 0,
      taskCoordinates: [],
      type: "pickup",
      description: "",
      address: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const {
      driverId,
      startWeekId,
      startDayId,
      startHourId,
      endWeekId,
      endDayId,
      endHourId,
      type,
      description,
      address,
    } = this.state;

    const taskPayload = {
      driverId,
      startWeekId,
      startDayId,
      startHourId,
      endWeekId,
      endDayId,
      endHourId,
      type,
      description,
      address,
    };

    // console.log(`TASK PAYLOAD startHourId IS: ${JSON.stringify(taskPayload)}`);
    this.props.createTask(taskPayload);
    alert("Task has been created!");
    e.preventDefault();
  };

  render() {
    return (
      <Modal show={this.props.show}>
        <CloseModalButton onClick={() => this.props.close()}>
          X
        </CloseModalButton>
        <FormContainer>
          <h2>Create Task</h2>
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
                Start Time:
                <hr></hr>
                <Label>
                  Week:
                  <Input
                    name="startWeekId"
                    type="number"
                    min="1"
                    max="52"
                    placeholder="1-52"
                    required="required"
                    style={{ width: "100px" }}
                    value={this.state.startWeekId}
                    onChange={this.handleChange}
                  />
                </Label>
                <Label>
                  Day:
                  <Select
                    name="startDayId"
                    startDayId={this.state.startDayId}
                    onChange={this.handleChange}
                  >
                    {DAYS_OF_THE_WEEK.map((day) => (
                      <option value={day.dayId}>{day.label}</option>
                    ))}
                  </Select>
                </Label>
                <Label>
                  Hour:
                  <Select
                    name="startHourId"
                    startHourId={this.state.startHourId}
                    onChange={this.handleChange}
                  >
                    {HOURS_OF_THE_DAY.map((hour) => (
                      <option value={hour.Id}>{hour.label}</option>
                    ))}
                  </Select>
                </Label>
              </Label>
            </FormField>
            <FormField>
              <Label>
                End Time:
                <hr></hr>
                <Label>
                  Week:
                  <Input
                    name="endWeekId"
                    type="number"
                    min="1"
                    max="52"
                    placeholder="1-52"
                    required="required"
                    style={{ width: "100px" }}
                    value={this.state.endWeekId}
                    onChange={this.handleChange}
                  />
                </Label>
                <Label>
                  Day:
                  <Select
                    name="endDayId"
                    endDayId={this.state.endDayId}
                    onChange={this.handleChange}
                  >
                    {DAYS_OF_THE_WEEK.map((day) => (
                      <option value={day.dayId}>{day.label}</option>
                    ))}
                  </Select>
                </Label>
                <Label>
                  Hour:
                  <Select
                    name="endHourId"
                    endHourId={this.state.endHourId}
                    onChange={this.handleChange}
                  >
                    {HOURS_OF_THE_DAY.map((hour) => (
                      <option value={hour.Id}>{hour.label}</option>
                    ))}
                  </Select>
                </Label>
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
                  rows="1"
                  cols="60"
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
            <SubmitButton type="submit">CREATE</SubmitButton>
          </Form>
        </FormContainer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.tasks });
const mapDispatchToProps = { createTask };

export default connect(mapStateToProps, mapDispatchToProps)(ModalTaskForm);