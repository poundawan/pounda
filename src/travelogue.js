import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import { Tab, Row, Nav, NavItem, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format, compareAsc } from "date-fns";

class Travelogue extends Component {
  getDate = date => {
    let dateParts = date.split("/");
    let correctDate;
    dateParts.length === 3
      ? (correctDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]))
      : (correctDate = null);

    return correctDate;
  };

  state = {
    id: 0,
    title: "",
    resume: "",
    from: null,
    to: null,
    edit: null
  };

  maxDate = this.getDate(this.props.ticket.to);
  minDate = this.getDate(this.props.ticket.from);

  editStep = (e, step) => {
    e.preventDefault();
    this.setState({
      edit: step.id,
      id: step.id,
      title: step.title,
      resume: step.resume,
      from: step.from,
      to: step.to
    });
  };

  closeForm = e => {
    e.preventDefault();
    this.setState({
      edit: null,
      id: 0,
      title: "",
      resume: "",
      from: null,
      to: null
    });
  };

  getLastId = toDoListBL => {
    let todo = "";
    let id = 1;
    if (toDoListBL && toDoListBL.length > 0) {
      todo = toDoListBL[toDoListBL.length - 1];
      id = parseInt(todo.id) + 1;
    }
    return id;
  };

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeResume(e) {
    this.setState({ resume: e.target.value });
  }

  onChangeFrom = date => {
    this.setState({ from: date });
    if (compareAsc(date, this.state.to) > 0) this.setState({ to: date });
  };

  onChangeTo = date => {
    (date && compareAsc(date, this.state.from)) < 0
      ? alert("La date doit être supérieur à la date départ")
      : this.setState({ to: date });
  };

  onDelete = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.travelogue.findIndex(x => x.id === id);
    ticket.travelogue.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.title.length === 0) return alert("Titre vide");
    let from = null;
    let to = null;
    if (this.state.from !== null) from = format(this.state.from, "DD/MM/YYYY");
    if (this.state.to !== null) to = format(this.state.to, "DD/MM/YYYY");
    let id = this.state.id;
    if (!ticket.travelogue) ticket.travelogue = [];
    if (id === 0) {
      id = this.getLastId(ticket.travelogue);
      ticket.travelogue.push({
        id: id,
        title: this.state.title,
        resume: this.state.resume,
        from: from,
        to: to
      });
    } else {
      ticket.travelogue = ticket.travelogue.map(step => {
        if (step.id === id) {
          step.title = this.state.title;
          step.resume = this.state.resume;
          step.from = from;
          step.to = to;
        }
        return step;
      });
    }
    this.setState({
      id: 0,
      title: "",
      resume: "",
      from: null,
      to: null,
      edit: null
    });
    this.props.onUpdateTicket(ticket);
  }

  getForm = (title, resume, from, to, id = 0) => (
    <div id="formTravelogue">
      <form className="" onSubmit={e => this.onSubmit(e, this.props.ticket)}>
        <div className="col-md-12 no-padding padding-top-10">
          <input
            className="form-control"
            value={title}
            type="text"
            placeholder="Quelle est cette étape ? "
            onChange={e => this.onChangeTitle(e)}
          />
        </div>{" "}
        <div className=" no-padding col-md-12 padding-top-10">
          {this.state.to !== null ? (
            <label className="col-sm-1 no-padding padding-top-5">Du</label>
          ) : (
            <label className="col-sm-1 no-padding padding-top-5">Le</label>
          )}
          <div className="col-sm-5 no-padding">
            <DatePicker
              className="form-control"
              id="fromTicket"
              selectsStart
              placeholder=""
              isClearable={true}
              dateFormat="dd/MM/yyyy"
              selected={from}
              startDate={from}
              endDate={to}
              onChange={this.onChangeFrom}
              minDate={this.minDate}
              maxDate={this.maxDate}
              dateFormatCalendar="MMMM"
              autoComplete="off"
            />
          </div>
          <label className="col-sm-1 no-padding padding-top-5 padding-left-5">
            au
          </label>
          <div className="col-sm-5 no-padding ">
            <DatePicker
              className="form-control"
              id="toTicket"
              isClearable={true}
              dateFormat="dd/MM/yyyy"
              placeholder=""
              selectsEnd
              selected={to}
              startDate={from}
              endDate={to}
              onChange={this.onChangeTo}
              minDate={this.minDate}
              maxDate={this.maxDate}
              dateFormatCalendar="MMMM"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="col-md-12 no-padding padding-top-10">
          <textarea
            className="form-control"
            value={resume}
            placeholder="Parlez nous de cette étape"
            onChange={e => this.onChangeResume(e)}
          />
        </div>
        {id === 0 ? (
          <div className="col-md-12 no-padding padding-top-10">
            <button className="btn btn-primary" type="submite">
              Ajouter
            </button>
          </div>
        ) : (
          <div className="col-md-12 no-padding padding-top-10 btn-group">
            <button className="btn btn-primary" type="submite">
              Modifier
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={e => this.closeForm(e)}
            >
              Annuler
            </button>
          </div>
        )}
      </form>
    </div>
  );

  render() {
    const { ticket } = this.props;
    const { title, resume, from, to, edit } = this.state;
    let stepsTitle = [];
    let stepResume = [];

    let stepDate = "";
    let stepFrom,
      stepTo = null;
    if (ticket.travelogue && ticket.travelogue.length > 0) {
      ticket.travelogue.map(curStep => {
        stepsTitle.push(
          <NavItem className="tab-detail" eventKey={curStep.id}>
            {curStep.title}
          </NavItem>
        );
        stepDate = "";
        if (curStep.from !== null) stepDate = <span>{curStep.from} </span>;
        if (curStep.to !== null)
          stepDate = (
            <span>
              {curStep.from + " "}
              <Icon name="long-arrow-alt-right" />
              {" " + curStep.to}
            </span>
          );
        stepFrom = stepTo = null;
        if (curStep.from !== null) stepFrom = this.getDate(curStep.from);
        if (curStep.to !== null) stepTo = this.getDate(curStep.to);
        stepResume.push({
          id: curStep.id,
          title: curStep.title,
          resume: curStep.resume,
          date: stepDate,
          from: stepFrom,
          to: stepTo
        });
      });
    } else {
      stepResume.push({
        id: 0,
        title: "",
        resume:
          "Vous n'avez encore entré aucune étape dans votre carnet de bord. Complétez le étape par étape."
      });
    }

    return (
      <div className="travelogue">
        <Tab.Container defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" className="subNav" stacked>
                <NavItem
                  className="tab-detail"
                  eventKey="first"
                  onClick={e => this.closeForm(e)}
                >
                  Mon carnet
                </NavItem>
                {stepsTitle.map(step => {
                  return step;
                })}
                <NavItem
                  className="tab-detail"
                  eventKey="second"
                  onClick={e => this.closeForm(e)}
                >
                  <Icon name="plus-circle" />
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8} className={`${ticket.status} padding-right-0 `}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <div class="steps">
                    {stepResume.map(step => {
                      return (
                        <div className="travel-step">
                          <h4>{step.title}</h4>
                          <span className="small italic light">
                            {step.date}
                          </span>
                          <div className="step-resume">{step.resume}</div>
                        </div>
                      );
                    })}
                  </div>
                  {this.getForm(title, resume, from, to)}
                </Tab.Pane>
                {stepResume.map(step => {
                  return (
                    <Tab.Pane eventKey={step.id}>
                      {edit !== step.id ? (
                        <div>
                          <h4>{step.title}</h4>
                          <span className="small italic light">
                            {step.date}
                          </span>
                          <div className="step-resume">{step.resume}</div>
                          <div className="btn-group padding-top-10">
                            <button
                              className="btn btn-primary"
                              onClick={e => this.editStep(e, step)}
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-dark"
                              onClick={e => this.onDelete(e, ticket, step.id)}
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ) : (
                        this.getForm(title, resume, from, to, step.id)
                      )}
                    </Tab.Pane>
                  );
                })}
                <Tab.Pane eventKey="second">
                  {this.getForm(title, resume, from, to)}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default Travelogue;
