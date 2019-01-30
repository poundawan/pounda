import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";

const categories = [
  { input: "transport", output: "taxi", title: "Transport" },
  { input: "fooddrink", output: "utensils", title: "Nourriture" },
  { input: "accommodation", output: "bed", title: "Logement" },
  { input: "gift", output: "gift", title: "Souvenir" },
  { input: "activity", output: "walking", title: "Activité" },
  {
    input: "insurance",
    output: "hospital-symbol",
    title: "Assurance & Santé"
  },
  { input: "unexpected", output: "exclamation-triangle", title: "Imprévu" },
  { input: "other", output: "question-circle", title: "Autre" }
];

function CategoryIcons({ categoryInput }) {
  let categoryOutput = categories.filter(
    category => category.input === categoryInput
  );
  return (
    <Icon name={categoryOutput[0].output} title={categoryOutput[0].title} />
  );
}

class Expenses extends Component {
  state = {
    showForm: "false",
    id: 0,
    category: "transport",
    title: "",
    amount: 0,
    currency: "€"
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
  showForm = (e, show) => {
    e.preventDefault();
    this.setState({ showForm: show });
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

  getTotal = expenses => {
    let total = [];
    let index = 0;
    expenses.map(expense => {
      index = total.findIndex(x => x.currency === expense.currency);
      if (index < 0) {
        total.push({ currency: expense.currency, amount: expense.amount });
      } else {
        total[index].amount =
          parseInt(total[index].amount) + parseInt(expense.amount);
      }
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
    console.log(total);
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
    const { showForm } = this.state;
    let currencies = [];
    let total = [];
    let totalDetail = [];
    if (ticket.expenses && ticket.expenses.length > 0) {
      currencies = this.getCurrencies(ticket.expenses);
      total = this.getTotal(ticket.expenses);
      totalDetail = this.getTotalDetail(ticket.expenses, currencies);
    }
    return (
      <div className={`ticket expenses ${ticket.status} col-md-12`}>
        {showForm === "show" ? (
          <div className="col-md-12">
            <span
              className={`action-icon`}
              title="Add new expense"
              onClick={e => this.showForm(e, "hidden")}
            >
              <Icon name="minus-circle" />
            </span>
            <div id="formExpense">
              <form onSubmit={e => this.onSubmit(e, ticket)}>
                <div className="form-group">
                  <label className="col-sm-2 col-form-label">Catégorie</label>
                  <div className="col-sm-12">
                    <select
                      className="form-control"
                      onChange={e => this.onChangeCategory(e)}
                      value={this.state.category}
                    >
                      <option value="transport">Transport</option>
                      <option value="fooddrink">
                        Nouriture {"&"} Boissons
                      </option>
                      <option value="accommodation">Logement</option>
                      <option value="gift">Souvenir</option>
                      <option value="activity">Activité</option>
                      <option value="insurance">Assurance {"&"} Santé</option>
                      <option value="unexpected">Imprévu</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Titre</label>
                    <div className="col-sm-12">
                      <input
                        className="form-control"
                        value={this.state.title}
                        type="text"
                        placeholder=""
                        onChange={e => this.onChangeTitle(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-12 col-form-label">Montant</label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        value={this.state.amount}
                        type="number"
                        placeholder=""
                        onChange={e => this.onChangeAmount(e)}
                      />
                    </div>
                    <div className="col-sm-2">
                      <input
                        className="form-control"
                        value={this.state.currency}
                        type="text"
                        autocomplete
                        onChange={e => this.onChangeCurrency(e)}
                      />
                    </div>
                  </div>
                  <div className="btn-group col-md-12">
                    <button
                      className="btn btn-default"
                      onClick={e => this.showForm(e, "hidden")}
                    >
                      Annuler
                    </button>
                    <button className="btn btn-primary" type="submite">
                      Ajouter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <span
            className={`action-icon`}
            title="Add new expense"
            onClick={e => this.showForm(e, "show")}
          >
            <Icon name="plus-circle" />
          </span>
        )}
        <div className="col-md-12">
          {ticket.expenses && ticket.expenses.length > 0 ? (
            <ul>
              {ticket.expenses.map(expense => (
                <li key={expense.id} className="onHover">
                  <CategoryIcons categoryInput={expense.category} />
                  {" " + expense.title}
                  {" : "}
                  {expense.amount}
                  {expense.currency}
                  <div className="right">
                    <Icon
                      name="trash-alt"
                      title="Supprimer"
                      className="theme-trash"
                      onClick={e => this.onDeleteExpense(e, ticket, ticket.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-12 total">
          {ticket.expenses && ticket.expenses.length > 0 ? (
            <div>
              <ul className="right">
                {total.map(expenses => (
                  <li key={expenses.currency}>
                    {"Total : "}
                    {expenses.amount}
                    {expenses.currency}
                  </li>
                ))}
              </ul>
              <div className="btn-group">
                <button type="button" className="btn btn-primary">
                  Afficher total détaillé
                </button>
              </div>
              <table className="table table-striped table-hover table-total">
                <thead>
                  <tr>
                    <th />
                    {currencies.map(currency => (
                      <th>{currency}</th>
                    ))}
                  </tr>
                </thead>
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
