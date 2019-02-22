import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import "./expenses.css";
import { CURRENCIES } from "./currencies.js";

const categories = [
  { input: "transport", output: "taxi", title: "Transport(s)" },
  { input: "fooddrink", output: "utensils", title: "Nourriture" },
  { input: "accommodation", output: "bed", title: "Logement(s)" },
  { input: "gift", output: "gift", title: "Souvenir(s)" },
  { input: "activity", output: "walking", title: "Activité(s)" },
  {
    input: "insurance",
    output: "hospital-symbol",
    title: "Assurance & Santé"
  },
  { input: "unexpected", output: "exclamation-triangle", title: "Imprévu(s)" },
  { input: "other", output: "question-circle", title: "Autre" }
];

function CategoryIcons({ categoryInput }) {
  let categoryOutput = categories.filter(
    category => category.input === categoryInput
  );
  return (
    <span>
      <Icon
        name={categoryOutput[0].output}
        title={categoryOutput[0].title}
        className="category"
      />
    </span>
  );
}

class Expenses extends Component {
  state = {
    showTable: "false",
    id: 0,
    category: "transport",
    title: "",
    amount: 0,
    currency: "EUR"
  };
  getLastId = expenses => {
    let expense = "";
    let id = 1;
    if (expenses && expenses.length > 0) {
      expense = expenses[expenses.length - 1];
      id = expense.id + 1;
    }

    return id;
  };

  showTable = (e, show) => {
    e.preventDefault();
    this.setState({ showTable: show });
  };

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
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

  onDeleteExpense = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.expenses.findIndex(x => x.id === id);
    ticket.expenses.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  getCurrencies = expenses => {
    let currencies = [];
    let index = 0;
    expenses.map(expense => {
      index = currencies.findIndex(x => x === expense.currency);
      if (index < 0) {
        currencies.push(expense.currency);
      }
    });
    return currencies;
  };

  getTotal = (currencies, expenses) => {
    let total = [];
    let index = 0;
    currencies.map(currency => {
      total.push({
        currency: currency,
        amount: 0
      });
      expenses.map(expense => {
        if (currency === expense.currency) {
          index = total.findIndex(x => x.currency === expense.currency);
          total[index].amount =
            parseInt(total[index].amount) + parseInt(expense.amount);
        }
      });
    });
    return total;
  };

  getTotalDetail = (expenses, currencies) => {
    let total = [];
    let index = 0;
    categories.map(category => {
      currencies.map(currency => {
        total.push({
          category: category.input,
          currency: currency,
          amount: 0
        });
        expenses.map(expense => {
          if (
            expense.currency === currency &&
            category.input === expense.category
          ) {
            index = total.findIndex(
              x => x.currency === currency && category.input === x.category
            );

            total[index].amount =
              parseInt(total[index].amount) + parseInt(expense.amount);
          }
        });
      });
    });
    return total;
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.title.length === 0) return alert("Titre vide");
    if (this.state.amount.length === 0) return alert("Montant vide");
    if (this.state.currency.length === 0) return alert("Devise vide");
    let id = 1;
    !ticket.expenses
      ? (ticket.expenses = [])
      : (id = this.getLastId(ticket.expenses));
    this.setState({
      title: "",
      amount: 0
    });
    ticket.expenses.push({
      id: id,
      category: this.state.category,
      title: this.state.title,
      amount: this.state.amount,
      currency: this.state.currency
    });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    const { showTable } = this.state;
    let currencies = [];
    let total = [];
    let totalDetail = [];
    let colspan = 0;
    if (ticket.expenses && ticket.expenses.length > 0) {
      currencies = this.getCurrencies(ticket.expenses);
      total = this.getTotal(currencies, ticket.expenses);
      totalDetail = this.getTotalDetail(ticket.expenses, currencies);
      colspan = currencies.length + 1;
    }
    return (
      <div className={`expenses ${ticket.status} col-md-12`}>
        <div className="col-md-12">
          {ticket.expenses && ticket.expenses.length > 0 ? (
            <ul>
              {ticket.expenses.map(expense => (
                <li key={expense.id} className="onHover">
                  <CategoryIcons categoryInput={expense.category} />
                  <span className="col-md-12">
                    {" " + expense.title}
                    {" : "}
                    {expense.amount}
                    {expense.currency}
                  </span>
                  <div className="action-icon">
                    <Icon
                      name="trash-alt"
                      title="Supprimer"
                      className="theme-trash"
                      onClick={e => this.onDeleteExpense(e, ticket, expense.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-12 detailForm">
          <div id="formExpense">
            <form
              className="form-inline"
              onSubmit={e => this.onSubmit(e, ticket)}
            >
              <div className="flex">
                <select
                  className="form-control exp-cat"
                  onChange={e => this.onChangeCategory(e)}
                  value={this.state.category}
                >
                  <option value="transport">Transport</option>
                  <option value="fooddrink">Nourriture {"&"} Boissons</option>
                  <option value="accommodation">Logement</option>
                  <option value="gift">Souvenir</option>
                  <option value="activity">Activité</option>
                  <option value="insurance">Assurance {"&"} Santé</option>
                  <option value="unexpected">Imprévu</option>
                  <option value="other">Autre</option>
                </select>
                <input
                  className="form-control"
                  value={this.state.title}
                  type="text"
                  placeholder="Titre de la dépense"
                  onChange={e => this.onChangeTitle(e)}
                />
                <input
                  className="form-control exp-amount"
                  value={this.state.amount}
                  type="number"
                  placeholder="Amount"
                  onChange={e => this.onChangeAmount(e)}
                />
                <select
                  className="form-control exp-currencies"
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
              <div>
                <button className="btn btn-primary right" type="submite">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" total">
          {ticket.expenses && ticket.expenses.length > 0 ? (
            <div>
              {showTable === "show" ? (
                <button
                  type="button"
                  className="btn btn-dark btn-sm btn-block"
                  onClick={e => this.showTable(e, "false")}
                >
                  Cacher total détaillé
                </button>
              ) : (
                ""
              )}
              <table className="table table-striped table-hover table-total">
                <thead>
                  <tr>
                    <th>
                      <span className="right">Total</span>
                    </th>
                    {total.map(curTotal => (
                      <th>{curTotal.amount + " " + curTotal.currency}</th>
                    ))}
                  </tr>
                </thead>
                {showTable === "show" ? (
                  <tbody>
                    {categories.map(category => (
                      <tr>
                        <th>
                          <CategoryIcons categoryInput={category.input} />
                          {" " + category.title}
                        </th>
                        {currencies.map(currency =>
                          totalDetail.map(curTotal =>
                            curTotal.currency === currency &&
                            curTotal.category === category.input ? (
                              <td>{curTotal.amount}</td>
                            ) : (
                              ""
                            )
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colspan={colspan}>
                        <button
                          type="button"
                          className="btn btn-dark btn-sm btn-block"
                          onClick={e => this.showTable(e, "show")}
                        >
                          Afficher total détaillé
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Expenses;
