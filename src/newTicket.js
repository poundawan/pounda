import React, { Component } from 'react';

import './newTicket.css'

class NewTicket extends Component {

    state ={
        title:"",
        status:"desire",
        detail:"",
        showForm: "hide",
    }
    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }
    onChangeStatus(e) {
        this.setState({status: e.target.value});
    }
    onChangeDetail(e) {
        this.setState({detail: e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ title:"", status:"", detail:"",});
        this.props.onSendTicket(this.state.title,this.state.status,this.state.detail);
      }
    
    displayForm(e,event){
        e.preventDefault();
        this.setState({showForm:event})
    }

  render() {
    const {title,detail,showForm} = this.state
    return (
      <div className="Input">
        {showForm==="show" ? (    
        <form className="form-newticket form-horizontal" onSubmit={e => this.onSubmit(e)}>
          <div className="container-fluid row"><span className="col-md-12 label label-default label-form">Nouveau ticket</span></div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Titre</label>
            <div className="col-sm-10">
                <input
                    value={title}
                    id="titleTicket"
                    type="text"
                    placeholder=""
                    onChange={e => this.onChangeTitle(e)}
                />
            </div>
          </div><div className="form-group">
            <label className="col-sm-2 control-label">Status</label>
            <div className="col-sm-10">
                <select className="form-control" onChange={e => this.onChangeStatus(e)}>
                    <option value="desire">Envie</option>
                    <option value="planned">Prévu</option>
                    <option value="current">En cours</option>
                    <option value="finished">Déjà fait</option>
                </select>
            </div>
          </div><div className="form-group">
            <label className="col-sm-2 control-label">Détail</label>
            <div className="col-sm-10">
                <input
                    defaultValue={detail}
                    type="text"
                    placeholder=""
                    onChange={e => this.onChangeDetail(e)}/>
            </div>
          </div>
          <button type="button" className="btn btn-default" onClick={e => this.displayForm(e,"hide")}>Annuler</button>
          <button type="submit" className="btn btn-success">Ajouter</button>
        </form>
        ) : (
        <button type="button" className="btn btn-primary" onClick={e => this.displayForm(e,"show")}>Nouveau Ticket</button>)
        }
      </div>
    );
  }
}

export default NewTicket;