import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { format, compareAsc } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./newTicket.css";

const today = new Date();

class NewTicket extends Component {
  state = {
    status: "desire",
    title: "",
    places: "",
    from: today,
    to: today,
    transport: "none",
    resume: "",
    showForm: "hide"
  };
  onChangeFrom = this.onChangeFrom.bind(this);
  onChangeTo = this.onChangeTo.bind(this);

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangePlaces(e) {
    this.setState({ places: e.target.value });
    if (this.state.title.length < 1) this.setState({ title: e.target.value });
  }
  onChangeFrom(date) {
    this.setState({ from: date });
    if (compareAsc(date, this.state.to) > 0) this.setState({ to: date });
  }
  onChangeTo(date) {
    this.setState({ to: date });
  }
  onChangeTransport(e) {
    this.setState({ transport: e.target.value });
  }
  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }
  onChangeResume(e) {
    this.setState({ resume: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    let from = "";
    let to = "";
    if (this.state.from) from = format(this.state.from, "DD/MM/YYYY");
    if (this.state.to) from = format(this.state.to, "DD/MM/YYYY");
    this.setState({
      title: "",
      places: "",
      from: today,
      to: today,
      resume: ""
    });
    this.props.onSendTicket(
      this.state.title,
      this.state.places,
      from,
      to,
      this.state.transport,
      this.state.status,
      this.state.resume
    );
  }

  displayForm(e, event) {
    e.preventDefault();
    this.setState({ showForm: event });
  }

  render() {
    const { title, places, from, to, resume, showForm } = this.state;
    return (
      <div className="container-fluid row">
        {showForm === "show" ? (
          <form
            className="form-newticket form-horizontal col-md-12"
            onSubmit={e => this.onSubmit(e)}
          >
            <div className="container-fluid row">
              <span className="col-md-12 label label-default label-form">
                Nouveau ticket
              </span>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Titre</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={title}
                  id="titleTicket"
                  type="text"
                  placeholder=""
                  onChange={e => this.onChangeTitle(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Lieu(x)</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  id="placesTicket"
                  type="text"
                  value={places}
                  placeholder=""
                  onChange={e => this.onChangePlaces(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Date du</label>
              <div className="col-sm-4 col-md-2">
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
                  showYearDropdown
                  showWeekNumbers
                  dateFormatCalendar="MMMM"
                  scrollableYearDropdown
                  showMonthDropdown
                  yearDropdownItemNumber={80}
                />
              </div>
              <label className="col-sm-1 col-form-label">au</label>
              <div className="col-sm-4 col-md-2">
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
                  showYearDropdown
                  showWeekNumbers
                  showMonthDropdown
                  dateFormatCalendar="MMMM"
                  scrollableYearDropdown
                  yearDropdownItemNumber={30}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Status</label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  onChange={e => this.onChangeStatus(e)}
                >
                  <option value="desire">Envie</option>
                  <option value="planned">Prévu</option>
                  <option value="current">En cours</option>
                  <option value="finished">Déjà fait</option>
                </select>
              </div>
              <label className="col-sm-2 col-form-label">
                Moyen de transport
              </label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  onChange={e => this.onChangeTransport(e)}
                >
                  <option value="none">Inconnu</option>
                  <option value="plane">Avion</option>
                  <option value="ship">Bateau</option>
                  <option value="bus">Bus</option>
                  <option value="motorcycle">Moto</option>
                  <option value="thumbs-up">Stop</option>
                  <option value="train">Train</option>
                  <option value="shuttle-van">Van</option>
                  <option value="bicycle">Vélo</option>
                  <option value="car">Voiture</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 control-label">Résumé</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  defaultValue={resume}
                  onChange={e => this.onChangeResume(e)}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-default"
              onClick={e => this.displayForm(e, "hide")}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-success">
              Ajouter
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={e => this.displayForm(e, "show")}
          >
            Nouveau Ticket
          </button>
        )}
      </div>
    );
  }
}

export default NewTicket;
