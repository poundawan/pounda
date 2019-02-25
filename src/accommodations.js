import React, { Component } from "react";
import "./ticket.css";
import "./accommodations.css";
import DatePicker from "react-datepicker";
import { format, compareAsc } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-sm-select/dist/styles.css";
import Icon from "./Icon";
import { CURRENCIES } from "./currencies.js";

const AccommodationsList = [
  { value: "airbnb", label: "Airbnb" },
  { value: "hostel", label: "Auberge de Jeunesse" },
  { value: "camping", label: "Camping" },
  { value: "friend", label: "Chez des amis" },
  { value: "local", label: "Chez l'habitant" },
  { value: "couch", label: "CouchSurfing" },
  { value: "hotel", label: "Hôtel" },
  { value: "second", label: "Maison secondaire" },
  { value: "vehicule", label: "Véhicule" }
];

class Accommodations extends Component {
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
    category: "hotel",
    place: "",
    start: null,
    end: null,
    amount: 0,
    currency: "EUR"
  };

  maxDate = this.getDate(this.props.ticket.to);
  minDate = this.getDate(this.props.ticket.from);

  getLastId = accommodations => {
    let accommodation = "";
    let id = 1;
    if (accommodations && accommodations.length > 0) {
      accommodation = accommodations[accommodations.length - 1];
      id = parseInt(accommodation.id) + 1;
    }
    return id;
  };
  onChangeStart = date => {
    this.setState({ start: date });
    if (compareAsc(date, this.state.end) > 0) this.setState({ end: date });
  };
  onChangeEnd = date => {
    (date && compareAsc(date, this.state.start)) < 0
      ? alert("La date d'arrivée doit être supérieur à la date départ")
      : this.setState({ end: date });
  };
  onChangePlace(e) {
    this.setState({ place: e.target.value });
  }
  onChangeCategory(e) {
    this.setState({ category: e.target.value });
  }
  onChangeAmount(e) {
    this.setState({ amount: e.target.value });
  }
  onChangeCurrency(e) {
    this.setState({ currency: e.target.value.toUpperCase() });
  }

  onDeleteAccommodation = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.accommodations.findIndex(x => x.id === id);
    ticket.accommodations.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  getLabelAccommodations = value => {
    let index = AccommodationsList.findIndex(x => x.value === value);
    let label = AccommodationsList[index].label;
    return label;
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.place.length === 0) return alert("Aucun lieu renseigné");
    if (this.state.start.length === 0) return alert("Date d'arrivée vide");
    if (this.state.end.length === 0) return alert("Date de départ vide");
    let id = 1;
    let idExp = 1;
    let start = "";
    let end = "";
    let label = this.getLabelAccommodations(this.state.category);
    let title = label + ": " + this.state.place;
    !ticket.accommodations
      ? (ticket.accommodations = [])
      : (id = this.getLastId(ticket.accommodations));

    if (this.state.start)
      start = format(this.state.start, "DD/MM/YYYY - HH:mm");
    if (this.state.end) end = format(this.state.end, "DD/MM/YYYY - HH:mm");
    ticket.accommodations.push({
      id: id,
      category: this.state.category,
      label: label,
      place: this.state.place,
      start: start,
      end: end,
      amount: this.state.amount,
      currency: this.state.currency
    });
    //initiate new expense
    !ticket.expenses
      ? (ticket.expenses = [])
      : (idExp = this.getLastId(ticket.expenses));
    ticket.expenses.push({
      id: idExp,
      category: "accommodation",
      title: title,
      amount: this.state.amount,
      currency: this.state.currency
    });
    this.setState({ place: "", start: null, end: null, amount: 0 });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    const { category, place, start, end, amount, currency } = this.state;

    return (
      <div className="accommodations">
        <div className="col-md-12">
          {ticket.accommodations && ticket.accommodations.length > 0 ? (
            <ul>
              {ticket.accommodations.map(accommodation => (
                <li className="onHover ">
                  <div>
                    <div>
                      <span>{accommodation.place}</span>
                      <span className="small light margin-left">
                        {accommodation.label}
                      </span>
                    </div>
                    <div>
                      <span className="very-small light italic">
                        {accommodation.start}
                      </span>{" "}
                      <Icon
                        name="long-arrow-alt-right"
                        className="very-small light italic"
                      />{" "}
                      <span className="very-small light italic">
                        {accommodation.end}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="small">
                      {accommodation.amount + " " + accommodation.currency}
                    </span>
                  </div>
                  <span className="action-icon">
                    <Icon
                      name="trash-alt"
                      title="Supprimer"
                      className="theme-trash"
                      onClick={e =>
                        this.onDeleteAccommodation(e, ticket, accommodation.id)
                      }
                    />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span>Où allez-vous dormir et comment ?</span>
          )}
        </div>
        <div className="col-md-12 detailForm">
          <div id="formAccommodations">
            <form
              className=" form-inline"
              onSubmit={e => this.onSubmit(e, ticket)}
            >
              <div className="col-md-12 no-padding padding-top-10">
                <select
                  className="form-control"
                  value={category}
                  onChange={e => this.onChangeCategory(e)}
                >
                  {AccommodationsList.map(accommodation => (
                    <option value={accommodation.value}>
                      {accommodation.label}
                    </option>
                  ))}
                </select>
                <input
                  className="form-control"
                  value={place}
                  type="text"
                  placeholder="Lieux"
                  onChange={e => this.onChangePlace(e)}
                />

                <DatePicker
                  className="form-control"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeCaption="time"
                  selectsStart
                  placeholderText="Date / heure de d'arrivée"
                  isClearable={true}
                  selected={start}
                  startDate={start}
                  endDate={end}
                  onChange={this.onChangeStart}
                  minDate={this.minDate}
                  maxDate={this.maxDate}
                  dateFormatCalendar="MMMM"
                  autoComplete="off"
                />
                <DatePicker
                  className="form-control"
                  isClearable={true}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeCaption="time"
                  placeholderText="Date / heure de départ"
                  selectsEnd
                  selected={end}
                  startDate={start}
                  endDate={end}
                  onChange={this.onChangeEnd}
                  minDate={this.minDate}
                  maxDate={this.maxDate}
                  dateFormatCalendar="MMMM"
                  autoComplete="off"
                />
                <input
                  className="form-control input-75"
                  value={amount}
                  type="number"
                  placeholder="Amount"
                  onChange={e => this.onChangeAmount(e)}
                />
                <select
                  className="form-control input-25"
                  value={currency}
                  type="text"
                  autocomplete
                  onChange={e => this.onChangeCurrency(e)}
                >
                  {CURRENCIES.map(devise => (
                    <option value={devise.currency}>
                      {devise.currency} - {devise.title} ({devise.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 no-padding padding-top-10">
                <button className="btn btn-primary right" type="submite">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Accommodations;
