import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { format, compareAsc } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import "./ticket.css";

class TicketEdit extends Component {
  getDate = date => {
    let dateParts = date.split("/");
    let correctDate;
    dateParts.length === 3
      ? (correctDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]))
      : (correctDate = null);

    return correctDate;
  };
  state = {
    id: this.props.ticket.id,
    status: this.props.ticket.status,
    title: this.props.ticket.title,
    places: this.props.ticket.places,
    from: this.getDate(this.props.ticket.from),
    to: this.getDate(this.props.ticket.to),
    transport: this.props.ticket.transport,
    resume: this.props.ticket.resume
  };
  onChangeFrom = this.onChangeFrom.bind(this);
  onChangeTo = this.onChangeTo.bind(this);
  onDeleteTicket = (ev, id) => {
    ev.preventDefault();
    this.props.onDeleteTicket(id);
  };
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangePlaces(e) {
    this.setState({ places: e.target.value });
    if (this.state.title.length < 1) this.setState({ title: e.target.value });
  }
  onChangeFrom(date) {
    this.setState({ from: date });
    if (this.state.to && compareAsc(date, this.state.to) > 0)
      this.setState({ to: date });
  }
  onChangeTo(date) {
    (date && compareAsc(date, this.state.from)) < 0
      ? alert("La date doit être supérieur à la date départ")
      : this.setState({ to: date });
  }

  onChangeTransport(e) {
    this.setState({ transport: e.target.value });
  }
  onChangeResume(e) {
    this.setState({ resume: e.target.value });
  }
  showForm = (e, id) => {
    e.preventDefault();
    this.props.showForm(id);
  };
  onSubmit(e) {
    e.preventDefault();
    let from = "";
    let to = "";
    if (this.state.from) from = format(this.state.from, "DD/MM/YYYY");
    if (this.state.to) to = format(this.state.to, "DD/MM/YYYY");
    this.setState({
      id: "",
      title: "",
      places: "",
      from: null,
      to: null,
      resume: ""
    });
    this.props.onUpdateTicket({
      ...this.state,
      from,
      to
    });
  }

  render() {
    const {
      id,
      status,
      title,
      places,
      from,
      to,
      transport,
      resume
    } = this.state;

    return (
      <div className={`ticket ${status} col-md-12`}>
        <form
          className="form-horizontal col-md-12"
          onSubmit={e => this.onSubmit(e)}
        >
          <div className="form-group">
            <label className="col-sm-2 col-form-label">Titre</label>
            <div className="col-sm-12">
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
          <div className="form-group">
            <label className="col-sm-2 col-form-label">Lieu(x)</label>
            <div className="col-sm-12">
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
          <div className="form-group">
            <label className="col-sm-1 col-form-label">Du:</label>
            <div className="col-md-12">
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
                autoComplete="off"
              />
            </div>
            <label className="col-sm-1 col-form-label">au: </label>
            <div className="col-md-12">
              <DatePicker
                autoComplete="off"
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
          <div className="form-group">
            <label className="col-sm-2 col-form-label">Transport</label>
            <div className="col-sm-12">
              <select
                className="form-control"
                onChange={e => this.onChangeTransport(e)}
                value={transport}
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
          <div className="form-group">
            <label className="col-sm-3 col-form-label">Résumé</label>
            <div className="col-sm-12">
              <textarea
                className="form-control"
                defaultValue={resume}
                onChange={e => this.onChangeResume(e)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-default col-md-12"
              onClick={e => this.showForm(e, id)}
            >
              Annuler
            </button>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary col-md-12">
              Modifier
            </button>
          </div>
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-delete col-md-12"
              onClick={e => this.onDeleteTicket(e, id)}
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default TicketEdit;
