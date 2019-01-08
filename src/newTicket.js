import React, { Component } from "react";

import "./newTicket.css";

class NewTicket extends Component {
  state = {
    status: "desire",
    title: "",
    places: "",
    from: "",
    to: "",
    transport: "plane",
    resume: "",
    showForm: "hide"
  };
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangePlaces(e) {
    this.setState({ places: e.target.value });
  }
  onChangeFrom(e) {
    this.setState({ from: e.target.value });
  }
  onChangeTo(e) {
    this.setState({ to: e.target.value });
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
    this.setState({
      title: "",
      places: "",
      from: "",
      to: "",
      transport: "",
      status: "",
      resume: ""
    });
    this.props.onSendTicket(
      this.state.title,
      this.state.places,
      this.state.from,
      this.state.to,
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
                <input
                  className="form-control"
                  id="fromTicket"
                  type="text"
                  placeholder=""
                  value={from}
                  onChange={e => this.onChangeFrom(e)}
                />
              </div>
              <label className="col-sm-1 col-form-label">au</label>
              <div className="col-sm-4 col-md-2">
                <input
                  className="form-control"
                  id="toTicket"
                  type="text"
                  placeholder=""
                  value={to}
                  onChange={e => this.onChangeTo(e)}
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
