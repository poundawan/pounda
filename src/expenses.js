import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";

function CategoryIcons({ categoryInput }) {
  const categories = [
    { input: "transport", output: "taxi" },
    { input: "fooddrink", output: "utensils" },
    { input: "accommodation", output: "bed" },
    { input: "gift", output: "gift" },
    { input: "activity", output: "walking" },
    { input: "unexpected", output: "exclamation-triangle" },
    { input: "other", output: "question-circle" }
  ];

  let categoryOutput = categories.filter(
    category => category.input === categoryInput
  );
  return (
    <Icon name={categoryOutput[0].output} title={categoryOutput[0].input} />
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
    this.setState({ currency: e.target.value });
  }

  onDeleteExpense = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.expenses.findIndex(x => x.id === id);
    ticket.expenses.splice(index, 1);
    this.props.onUpdateTicket(ticket);
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
    let total = [];
    if (ticket.expenses && ticket.expenses.length > 0) {
      total = this.getTotal(ticket.expenses);
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
            <ul className="right">
              {total.map(expenses => (
                <li key={expenses.currency}>
                  {"Total : "}
                  {expenses.amount}
                  {expenses.currency}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Expenses;
