import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { format, compareAsc } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./newTicket.css";
import { COUNTRIES } from "./countries.js";
import { MultiSelect } from "react-sm-select";
import "react-sm-select/dist/styles.css";
import Icon from "./Icon";

const today = new Date();

class NewTicket extends Component {
  state = {
    status: "desire",
    title: "",
    places: [],
    from: today,
    to: today,
    resume: "",
    showForm: "hide"
  };

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
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
  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }
  onChangeResume(e) {
    this.setState({ resume: e.target.value.substring(0, 150) });
  }
  onSubmit(e) {
    e.preventDefault();
    let from = "";
    let to = "";
    let places = [];
    if (this.state.title.length === 0) {
      return alert("Le titre est vide");
    }
    if (this.state.from) from = format(this.state.from, "DD/MM/YYYY");
    if (this.state.to) to = format(this.state.to, "DD/MM/YYYY");
    if (this.state.places.length > 0) {
      this.state.places.map(place => {
        COUNTRIES.filter(country => {
          if (country.value === place) {
            places.push( place);
          }
        });
      });
    }

    this.setState({
      title: "",
      places: [],
      from: today,
      to: today,
      resume: ""
    });
    this.props.onSendTicket(
      this.state.title,
      places,
      from,
      to,
      this.state.status,
      this.state.resume
    );
  }

  displayForm(e, event) {
    e.preventDefault();
    this.setState({ showForm: event });
  }

  optionClicked(optionsList) {
    this.setState({ multiSelect: optionsList });
  }
  selectedBadgeClicked(optionsList) {
    this.setState({ multiSelect: optionsList });
  }
  render() {
    const { title, places, from, to, resume, showForm } = this.state;
    return (
      <div className="container-fluid">
        {showForm === "show" ? (
          <form
            className="form-newticket form-horizontal"
            onSubmit={e => this.onSubmit(e)}
          >
            <div>
              <span className="col-md-12 label-form">Nouveau voyage</span>
            </div>
            <div className="form-group col-md-12">
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
            <div className="form-group col-md-12">
              <label className="col-sm-2 col-form-label">Pays</label>
              <div className="col-sm-10">
                <MultiSelect
                  options={COUNTRIES}
                  mode="tags"
                  enableSearch={true}
                  resetable={true}
                  value={places}
                  onChange={value => this.setState({ places: value })}
                />
              </div>
            </div>
            <div className="form-group col-md-12">
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group col-md-12">
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
            </div>
            <div className="form-group col-md-12">
              <label className="col-sm-2 col-form-label">Résumé</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  value={resume}
                  onChange={e => this.onChangeResume(e)}
                />
              </div>
            </div>
            <div className="btn-group margin-left">
              <button
                type="button"
                className="btn btn-default"
                onClick={e => this.displayForm(e, "hide")}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                Ajouter
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={e => this.displayForm(e, "show")}
          >
            Nouveau Voyage
          </button>
        )}
      </div>
    );
  }
}

export default NewTicket;
