import React, { Component } from "react";
import "./ticket.css";
import "./transports.css";
import DatePicker from "react-datepicker";
import { format, compareAsc } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-sm-select/dist/styles.css";
import Icon from "./Icon";
import { TRANSPORTS } from "./transportsList.js";
import { CURRENCIES } from "./currencies.js";

class Transports extends Component {
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
    category: "plane",
    from: "",
    to: "",
    start: null,
    end: null,
    amount: 0,
    currency: "EUR"
  };

  maxDate = this.getDate(this.props.ticket.to);
  minDate = this.getDate(this.props.ticket.from);

  getLastId = transports => {
    let transport = "";
    let id = 1;
    if (transports && transports.length > 0) {
      transport = transports[transports.length - 1];
      id = parseInt(transport.id) + 1;
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
  onChangeFrom(e) {
    this.setState({ from: e.target.value });
  }
  onChangeTo(e) {
    this.setState({ to: e.target.value });
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

  onDeleteTransport = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.transports.findIndex(x => x.id === id);
    ticket.transports.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  getLabelTransport = value => {
    let index = TRANSPORTS.findIndex(x => x.value === value);
    let label = TRANSPORTS[index].label;
    return label;
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.from.length === 0) return alert("Départ vide");
    if (this.state.to.length === 0) return alert("Arrivé vide");
    if (this.state.start.length === 0) return alert("Date de départ vide");
    if (this.state.end.length === 0) return alert("Date d'arrivée vide");
    let id = 1;
    let idExp = 1;
    let start = "";
    let end = "";
    let label = this.getLabelTransport(this.state.category);
    let title = label + ": " + this.state.from + " -> " + this.state.to;
    !ticket.transports
      ? (ticket.transports = [])
      : (id = this.getLastId(ticket.transports));

    if (this.state.start)
      start = format(this.state.start, "DD/MM/YYYY - HH:mm");
    if (this.state.end) end = format(this.state.end, "DD/MM/YYYY - HH:mm");
    ticket.transports.push({
      id: id,
      category: this.state.category,
      label: label,
      from: this.state.from,
      to: this.state.to,
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
      category: "transport",
      title: title,
      amount: this.state.amount,
      currency: this.state.currency
    });
    this.setState({ from: "", to: "", start: null, end: null, amount: 0 });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    const { id, category, from, to, start, end } = this.state;

    return (
      <div className="transports">
        <div className="col-md-12">
          {ticket.transports && ticket.transports.length > 0 ? (
            <ul>
              {ticket.transports.map(transport => (
                <li className="onHover ">
                  <div>
                    <span>{transport.from}</span>
                    <span className="very-small light italic">
                      {transport.start}
                    </span>
                  </div>
                  <div>
                    <span>
                      <Icon name={transport.category} title={transport.label} />
                    </span>
                  </div>
                  <div>
                    <span>{transport.to}</span>
                    <span className="very-small light italic">
                      {transport.end}
                    </span>
                  </div>
                  <div>
                    <span className="small">
                      {transport.amount + " " + transport.currency}
                    </span>
                  </div>
                  <span className="action-icon">
                    <Icon
                      name="trash-alt"
                      title="Supprimer"
                      className="theme-trash"
                      onClick={e =>
                        this.onDeleteTransport(e, ticket, transport.id)
                      }
                    />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span>
              Quel moyens de transports utilisez vous? Pour aller où? Quand?
            </span>
          )}
        </div>
        <div className="col-md-12 detailForm">
          <div id="formTransports">
            <form
              className=" form-inline"
              onSubmit={e => this.onSubmit(e, ticket)}
            >
              <div className="col-md-12 no-padding padding-top-10">
                <div className="col-md-4 no-padding">
                  <select
                    className="form-control"
                    onChange={e => this.onChangeCategory(e)}
                  >
                    {TRANSPORTS.map(transport => (
                      <option value={transport.value}>{transport.label}</option>
                    ))}
                  </select>
                </div>
                <input
                  className="form-control input-33"
                  value={this.state.from}
                  id="fromTransport"
                  type="text"
                  placeholder="Lieux de départ"
                  onChange={e => this.onChangeFrom(e)}
                />
                <input
                  className="form-control input-33"
                  value={this.state.to}
                  id="toTransport"
                  type="text"
                  placeholder="Lieux d'arrivée"
                  onChange={e => this.onChangeTo(e)}
                />

                <DatePicker
                  className="form-control"
                  id="start"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeCaption="time"
                  selectsStart
                  placeholderText="Date / heure de départ"
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
                  id="end"
                  isClearable={true}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeCaption="time"
                  placeholderText="Date / heure d'arrivée"
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
                  value={this.state.amount}
                  type="number"
                  placeholder="Amount"
                  onChange={e => this.onChangeAmount(e)}
                />
                <select
                  className="form-control input-25"
                  value={this.state.currency}
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

export default Transports;
