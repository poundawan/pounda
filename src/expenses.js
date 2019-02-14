import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import "./expenses.css";

const DEVISES = [
  { currency: "AED", symbol: "DH", title: "United Arab Emirates Dirham" },
  { currency: "AFN", symbol: "؋", title: "Afghan Afghani" },
  { currency: "ALL", symbol: "L", title: "Albanian Lek" },
  { currency: "AMD", symbol: "AMD", title: "Armenian Dram" },
  { currency: "ANG", symbol: "NAf", title: "Netherlands Antillean Guilder" },
  { currency: "AOA", symbol: "Kz", title: "Angolan Kwanza" },
  { currency: "ARS", symbol: "$", title: "Argentine Peso" },
  { currency: "AUD", symbol: "$AUD", title: "Australian Dollar" },
  { currency: "AWG", symbol: "Afl", title: "Aruban Florin" },
  { currency: "AZN", symbol: "m.", title: "Azerbaijani Manat" },
  {
    currency: "BAM",
    symbol: "KM",
    title: "Bosnia-Herzegovina Convertible Mark"
  },
  { currency: "BBD", symbol: "Bds$", title: "Barbadian Dollar" },
  { currency: "BDT", symbol: "Tk", title: "Bangladeshi Taka" },
  { currency: "BGN", symbol: "BGN", title: "Bulgarian Lev" },
  { currency: "BHD", symbol: "BD", title: "Bahraini Dinar" },
  { currency: "BIF", symbol: "Fbu", title: "Burundian Franc" },
  { currency: "BMD", symbol: "BD$", title: "Bermudan Dollar" },
  { currency: "BND", symbol: "B$", title: "Brunei Dollar" },
  { currency: "BOB", symbol: "Bs.", title: "Bolivian Boliviano" },
  { currency: "BRL", symbol: "R$", title: "Brazilian Real" },
  { currency: "BSD", symbol: "B$", title: "Bahamian Dollar" },
  { currency: "BTC", symbol: "₿", title: "Bitcoin" },
  { currency: "BTN", symbol: "Nu.", title: "Bhutanese Ngultrum" },
  { currency: "BWP", symbol: "P", title: "Botswanan Pula" },
  { currency: "BYN", symbol: "Br", title: "New Belarusian Ruble" },
  { currency: "BZD", symbol: "BZ$", title: "Belize Dollar" },
  { currency: "CAD", symbol: "$CA", title: "Canadian Dollar" },
  { currency: "CDF", symbol: "FC", title: "Congolese Franc" },
  { currency: "CHF", symbol: "Fr.", title: "Swiss Franc" },
  { currency: "CLP", symbol: "$", title: "Chilean Peso" },
  { currency: "CNY", symbol: "¥", title: "Chinese Yuan" },
  { currency: "COP", symbol: "$", title: "Colombian Peso" },
  { currency: "CRC", symbol: "₡", title: "Costa Rican Colón" },
  { currency: "CUC", symbol: "$", title: "Cuban Convertible Peso" },
  { currency: "CUP", symbol: "$", title: "Cuban Peso" },
  { currency: "CVE", symbol: "$", title: "Cape Verdean Escudo" },
  { currency: "CZK", symbol: "Kč", title: "Czech Republic Koruna" },
  { currency: "DJF", symbol: "Fdj", title: "Djiboutian Franc" },
  { currency: "DKK", symbol: "kr", title: "Danish Krone" },
  { currency: "DOP", symbol: "$", title: "Dominican Peso" },
  { currency: "DZD", symbol: "DA", title: "Algerian Dinar" },
  { currency: "EGP", symbol: "E£", title: "Egyptian Pound" },
  { currency: "ERN", symbol: "Nkf", title: "Eritrean Nakfa" },
  { currency: "ETB", symbol: "Br", title: "Ethiopian Birr" },
  { currency: "EUR", symbol: "€", title: "Euro" },
  { currency: "FJD", symbol: "$FJ", title: "Fijian Dollar" },
  { currency: "FKP", symbol: "£", title: "Falkland Islands Pound" },
  { currency: "GBP", symbol: "£", title: "British Pound Sterling" },
  { currency: "GEL", symbol: "GEL", title: "Georgian Lari" },
  { currency: "GHS", symbol: "GH₵", title: "Ghanaian Cedi" },
  { currency: "GIP", symbol: "£", title: "Gibraltar Pound" },
  { currency: "GMD", symbol: "D", title: "Gambian Dalasi" },
  { currency: "GNF", symbol: "GNF", title: "Guinean Franc" },
  { currency: "GTQ", symbol: "Q", title: "Guatemalan Quetzal" },
  { currency: "GYD", symbol: "G$", title: "Guyanaese Dollar" },
  { currency: "HKD", symbol: "$", title: "Hong Kong Dollar" },
  { currency: "HNL", symbol: "L", title: "Honduran Lempira" },
  { currency: "HRK", symbol: "kn", title: "Croatian Kuna" },
  { currency: "HTG", symbol: "gourde", title: "Haitian Gourde" },
  { currency: "HUF", symbol: "Ft", title: "Hungarian Forint" },
  { currency: "IDR", symbol: "Rp", title: "Indonesian Rupiah" },
  { currency: "ILS", symbol: "₪", title: "Israeli New Sheqel" },
  { currency: "IMP", symbol: "£", title: "Manx pound" },
  { currency: "INR", symbol: "₹", title: "Indian Rupee" },
  { currency: "IQD", symbol: "IQD", title: "Iraqi Dinar" },
  { currency: "IRR", symbol: "IRR", title: "Iranian Rial" },
  { currency: "ISK", symbol: "kr", title: "Icelandic Króna" },
  { currency: "JEP", symbol: "£", title: "Jersey Pound" },
  { currency: "JMD", symbol: "J$", title: "Jamaican Dollar" },
  { currency: "JOD", symbol: "JOD", title: "Jordanian Dinar" },
  { currency: "JPY", symbol: "¥", title: "Japanese Yen" },
  { currency: "KES", symbol: "KSh", title: "Kenyan Shilling" },
  { currency: "KGS", symbol: "KGS", title: "Kyrgystani Som" },
  { currency: "KHR", symbol: "៛", title: "Cambodian Riel" },
  { currency: "KMF", symbol: "CF", title: "Comorian Franc" },
  { currency: "KPW", symbol: " ₩", title: "North Korean Won" },
  { currency: "KRW", symbol: " ₩", title: "South Korean Won" },
  { currency: "KWD", symbol: "KWD", title: "Kuwaiti Dinar" },
  { currency: "KYD", symbol: "CI$", title: "Cayman Islands Dollar" },
  { currency: "KZT", symbol: "₸", title: "Kazakhstani Tenge" },
  { currency: "LAK", symbol: "₭", title: "Laotian Kip" },
  { currency: "LBP", symbol: "LL", title: "Lebanese Pound" },
  { currency: "LKR", symbol: "Rs.", title: "Sri Lankan Rupee" },
  { currency: "LRD", symbol: "L$", title: "Liberian Dollar" },
  { currency: "LSL", symbol: "L", title: "Lesotho Loti" },
  { currency: "LYD", symbol: "LD", title: "Libyan Dinar" },
  { currency: "MAD", symbol: "MAD", title: "Moroccan Dirham" },
  { currency: "MDL", symbol: "MDL", title: "Moldovan Leu" },
  { currency: "MGA", symbol: "Ar", title: "Malagasy Ariary" },
  { currency: "MKD", symbol: "ден", title: "Macedonian Denar" },
  { currency: "MMK", symbol: "K", title: "Myanma Kyat" },
  { currency: "MNT", symbol: "₮", title: "Mongolian Tugrik" },
  { currency: "MOP", symbol: "MOP$", title: "Macanese Pataca" },
  { currency: "MRO", symbol: "UM", title: "Mauritanian Ouguiya" },
  { currency: "MUR", symbol: "Rs", title: "Mauritian Rupee" },
  { currency: "MVR", symbol: "MVR", title: "Maldivian Rufiyaa" },
  { currency: "MWK", symbol: "K", title: "Malawian Kwacha" },
  { currency: "MXN", symbol: "$", title: "Mexican Peso" },
  { currency: "MYR", symbol: "RM", title: "Malaysian Ringgit" },
  { currency: "MZN", symbol: "MT", title: "Mozambican Metical" },
  { currency: "NAD", symbol: "$", title: "Namibian Dollar" },
  { currency: "NGN", symbol: "₦", title: "Nigerian Naira" },
  { currency: "NIO", symbol: "C$", title: "Nicaraguan Córdoba" },
  { currency: "NOK", symbol: "kr", title: "Norwegian Krone" },
  { currency: "NPR", symbol: "Rs.", title: "Nepalese Rupee" },
  { currency: "NZD", symbol: "NZ$", title: "New Zealand Dollar" },
  { currency: "OMR", symbol: "OMR", title: "Omani Rial" },
  { currency: "PAB", symbol: "฿", title: "Panamanian Balboa" },
  { currency: "PEN", symbol: "S/.", title: "Peruvian Nuevo Sol" },
  { currency: "PGK", symbol: "Kina", title: "Papua New Guinean Kina" },
  { currency: "PHP", symbol: "₱", title: "Philippine Peso" },
  { currency: "PKR", symbol: "Rs", title: "Pakistani Rupee" },
  { currency: "PLN", symbol: "PLN", title: "Polish Zloty" },
  { currency: "PYG", symbol: "₲", title: "Paraguayan Guarani" },
  { currency: "QAR", symbol: "QR", title: "Qatari Rial" },
  { currency: "RON", symbol: "RON", title: "Romanian Leu" },
  { currency: "RSD", symbol: "RSD", title: "Serbian Dinar" },
  { currency: "RUB", symbol: "₽", title: "Russian Ruble" },
  { currency: "RWF", symbol: "FRw", title: "Rwandan Franc" },
  { currency: "SAR", symbol: "SR", title: "Saudi Riyal" },
  { currency: "SBD", symbol: "$", title: "Solomon Islands Dollar" },
  { currency: "SCR", symbol: "SR", title: "Seychellois Rupee" },
  { currency: "SDG", symbol: "SD", title: "Sudanese Pound" },
  { currency: "SEK", symbol: "kr", title: "Swedish Krona" },
  { currency: "SGD", symbol: "$", title: "Singapore Dollar" },
  { currency: "SHP", symbol: "£", title: "Saint Helena Pound" },
  { currency: "SLL", symbol: "Le", title: "Sierra Leonean Leone" },
  { currency: "SOS", symbol: "SOS", title: "Somali Shilling" },
  { currency: "SRD", symbol: "$", title: "Surinamese Dollar" },
  { currency: "STD", symbol: "Db", title: "São Tomé and Príncipe Dobra" },
  { currency: "SYP", symbol: "£S", title: "Syrian Pound" },
  { currency: "SZL", symbol: "E", title: "Swazi Lilangeni" },
  { currency: "THB", symbol: "฿", title: "Thai Baht" },
  { currency: "TJS", symbol: "TJS", title: "Tajikistani Somoni" },
  { currency: "TMT", symbol: "TMT", title: "Turkmenistani Manat" },
  { currency: "TND", symbol: "DT", title: "Tunisian Dinar" },
  { currency: "TOP", symbol: "T$", title: "Tongan Paʻanga" },
  { currency: "TRY", symbol: "TL", title: "Turkish Lira" },
  { currency: "TTD", symbol: "TT$", title: "Trinidad and Tobago Dollar" },
  { currency: "TWD", symbol: "NT$", title: "New Taiwan Dollar" },
  { currency: "TZS", symbol: "TZs", title: "Tanzanian Shilling" },
  { currency: "UAH", symbol: "₴", title: "Ukrainian Hryvnia" },
  { currency: "UGX", symbol: "Ush", title: "Ugandan Shilling" },
  { currency: "USD", symbol: "$", title: "United States Dollar" },
  { currency: "UYU", symbol: "$", title: "Uruguayan Peso" },
  { currency: "UZS", symbol: "UZS", title: "Uzbekistan Som" },
  { currency: "VEF", symbol: "Bs", title: "Venezuelan Bolívar Fuerte" },
  { currency: "VND", symbol: "₫", title: "Vietnamese Dong" },
  { currency: "VUV", symbol: "Vt", title: "Vanuatu Vatu" },
  { currency: "WST", symbol: "WS$", title: "Samoan Tala" },
  { currency: "XAF", symbol: "CFA", title: "CFA Franc BEAC" },
  { currency: "XCD", symbol: "EC$", title: "East Caribbean Dollar" },
  { currency: "XOF", symbol: "CFA", title: "CFA Franc BCEAO" },
  { currency: "XPF", symbol: "F", title: "CFP Franc" },
  { currency: "YER", symbol: "YER", title: "Yemeni Rial" },
  { currency: "ZAR", symbol: "R", title: "South African Rand" },
  { currency: "ZMW", symbol: "ZMW", title: "Zambian Kwacha" },
  { currency: "ZWL", symbol: "Z$", title: "Zimbabwean Dollar" }
];

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
      <div className={`ticket expenses ${ticket.status} col-md-12`}>
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
                  <div className="right">
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
              <div className="form-group">
                <select
                  className="form-control exp-cat"
                  onChange={e => this.onChangeCategory(e)}
                  value={this.state.category}
                >
                  <option value="transport">Transport</option>
                  <option value="fooddrink">Nouriture {"&"} Boissons</option>
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
                  {DEVISES.map(devise => (
                    <option value={devise.currency}>
                      {devise.currency} - {devise.title} ({devise.symbol})
                    </option>
                  ))}
                </select>
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
