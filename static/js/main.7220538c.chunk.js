(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{204:function(e,t,a){},206:function(e,t,a){},208:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(23),l=a.n(r),s=(a(88),a(78)),c=a(6),i=a(7),m=a(9),u=a(8),d=a(10),p=(a(90),a(92),a(41),a(82)),f=function(e){var t=e.name,a=e.className,n=e.style,r=Object(p.a)(e,["name","className","style"]);return o.a.createElement("i",Object.assign({className:"".concat(a," fa fa-").concat(t),style:n},r))},h=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).onDragStart=function(e,t){e.dataTransfer.setData("id",t)},a.updateRating=function(e,t,n){e.preventDefault(),a.props.onUpdateTicketRating(t,n)},a.showForm=function(e,t){e.preventDefault(),a.props.showForm(t)},a.onDeleteTicket=function(e,t){e.preventDefault(),a.props.onDeleteTicket(t)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.ticket,n=t.status,r="col-md-12";return a.to.length>0&&(r="col-md-6"),o.a.createElement("div",{onDragStart:function(t){return e.onDragStart(t,a.id)},draggable:!0,className:"ticket ".concat(n," draggable badge col-md-12")},o.a.createElement("button",{type:"button",className:"close","aria-label":"Close",onClick:function(t){return e.onDeleteTicket(t,a.id)}},o.a.createElement("span",{"aria-hidden":"true"},"\xd7")),o.a.createElement("h3",null,a.title),o.a.createElement("div",{className:"container-fluid row"},a.places.length>0?o.a.createElement("span",{className:"col-md-12"},"Lieux: ",a.places):"",a.from.length>0?o.a.createElement("span",{className:r},"Du: ",a.from):"",a.to.length>0?o.a.createElement("span",{className:"col-md-6"},"au: ",a.to):"",a.transport.length>0&&"none"!==a.transport?o.a.createElement("span",{className:"col-md-12"},o.a.createElement(f,{name:a.transport})):"",o.a.createElement("span",{className:"col-md-12"},a.resume),"finished"===n?o.a.createElement("div",{className:"col-md-12 rating"},o.a.createElement(f,{name:"angry",className:"angry"===a.rating?"rating-selected":"",onClick:function(t){return e.updateRating(t,a.id,"angry")}}),o.a.createElement(f,{name:"frown",className:"frown"===a.rating?"rating-selected":"",onClick:function(t){return e.updateRating(t,a.id,"frown")}}),o.a.createElement(f,{name:"meh",className:"meh"===a.rating?"rating-selected":"",onClick:function(t){return e.updateRating(t,a.id,"meh")}}),o.a.createElement(f,{name:"smile",className:"smile"===a.rating?"rating-selected":"",onClick:function(t){return e.updateRating(t,a.id,"smile")}}),o.a.createElement(f,{name:"grin-alt",className:"grin-alt"===a.rating?"rating-selected":"",onClick:function(t){return e.updateRating(t,a.id,"grin-alt")}}),o.a.createElement(f,{name:"grin-stars",className:"grin-stars"===a.rating?"rating-selected":"",onClick:function(t){return e.updateRating(t,a.id,"grin-stars")}})):"",o.a.createElement("div",null,o.a.createElement("span",{"aria-hidden":"true",title:"edit",className:"action-icon",onClick:function(t){return e.showForm(t,a.id)}},o.a.createElement(f,{name:"edit"})),o.a.createElement("span",{className:"action-icon",title:"See more informations"},o.a.createElement(f,{name:"info-circle"})))))}}]),t}(n.Component),b=a(5),v=a(18),g=a(11),E=(a(77),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getDate=function(e){var t=e.split("/");return 3===t.length?new Date(+t[2],t[1]-1,+t[0]):null},a.state={id:a.props.ticket.id,status:a.props.ticket.status,title:a.props.ticket.title,places:a.props.ticket.places,from:a.getDate(a.props.ticket.from),to:a.getDate(a.props.ticket.to),transport:a.props.ticket.transport,resume:a.props.ticket.resume},a.onChangeFrom=a.onChangeFrom.bind(Object(b.a)(Object(b.a)(a))),a.onChangeTo=a.onChangeTo.bind(Object(b.a)(Object(b.a)(a))),a.onDeleteTicket=function(e,t){e.preventDefault(),a.props.onDeleteTicket(t)},a.showForm=function(e,t){e.preventDefault(),a.props.showForm(t)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"onChangeTitle",value:function(e){this.setState({title:e.target.value})}},{key:"onChangePlaces",value:function(e){this.setState({places:e.target.value}),this.state.title.length<1&&this.setState({title:e.target.value})}},{key:"onChangeFrom",value:function(e){this.setState({from:e}),this.state.to&&Object(g.compareAsc)(e,this.state.to)>0&&this.setState({to:e})}},{key:"onChangeTo",value:function(e){(e&&Object(g.compareAsc)(e,this.state.from))<0?alert("La date doit \xeatre sup\xe9rieur \xe0 la date d\xe9part"):this.setState({to:e})}},{key:"onChangeTransport",value:function(e){this.setState({transport:e.target.value})}},{key:"onChangeResume",value:function(e){this.setState({resume:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault();var t="",a="";this.state.from&&(t=Object(g.format)(this.state.from,"DD/MM/YYYY")),this.state.to&&(a=Object(g.format)(this.state.to,"DD/MM/YYYY")),this.setState({id:"",title:"",places:"",from:null,to:null,resume:""}),this.props.onUpdateTicket(this.state.id,this.state.title,this.state.places,t,a,this.state.transport,this.state.resume)}},{key:"render",value:function(){var e=this,t=this.state,a=t.id,n=t.status,r=t.title,l=t.places,s=t.from,c=t.to,i=t.transport,m=t.resume;return o.a.createElement("div",{className:"ticket ".concat(n,"  badge col-md-12")},o.a.createElement("form",{className:"form-horizontal col-md-12",onSubmit:function(t){return e.onSubmit(t)}},o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Titre"),o.a.createElement("div",{className:"col-sm-12"},o.a.createElement("input",{className:"form-control",value:r,id:"titleTicket",type:"text",placeholder:"",onChange:function(t){return e.onChangeTitle(t)}}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Lieu(x)"),o.a.createElement("div",{className:"col-sm-12"},o.a.createElement("input",{className:"form-control",id:"placesTicket",type:"text",value:l,placeholder:"",onChange:function(t){return e.onChangePlaces(t)}}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-1 col-form-label"},"Du:"),o.a.createElement("div",{className:"col-md-12"},o.a.createElement(v.a,{className:"form-control",id:"fromTicket",selectsStart:!0,placeholder:"",isClearable:!0,dateFormat:"dd/MM/yyyy",selected:s,startDate:s,endDate:c,onChange:this.onChangeFrom,showYearDropdown:!0,showWeekNumbers:!0,dateFormatCalendar:"MMMM",scrollableYearDropdown:!0,showMonthDropdown:!0,yearDropdownItemNumber:80})),o.a.createElement("label",{className:"col-sm-1 col-form-label"},"au: "),o.a.createElement("div",{className:"col-md-12"},o.a.createElement(v.a,{className:"form-control",id:"toTicket",isClearable:!0,dateFormat:"dd/MM/yyyy",placeholder:"",selectsEnd:!0,selected:c,startDate:s,endDate:c,onChange:this.onChangeTo,showYearDropdown:!0,showWeekNumbers:!0,showMonthDropdown:!0,dateFormatCalendar:"MMMM",scrollableYearDropdown:!0,yearDropdownItemNumber:30}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Transport"),o.a.createElement("div",{className:"col-sm-12"},o.a.createElement("select",{className:"form-control",onChange:function(t){return e.onChangeTransport(t)},value:i},o.a.createElement("option",{value:"none"},"Inconnu"),o.a.createElement("option",{value:"plane"},"Avion"),o.a.createElement("option",{value:"ship"},"Bateau"),o.a.createElement("option",{value:"bus"},"Bus"),o.a.createElement("option",{value:"motorcycle"},"Moto"),o.a.createElement("option",{value:"thumbs-up"},"Stop"),o.a.createElement("option",{value:"train"},"Train"),o.a.createElement("option",{value:"shuttle-van"},"Van"),o.a.createElement("option",{value:"bicycle"},"V\xe9lo"),o.a.createElement("option",{value:"car"},"Voiture")))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-3 col-form-label"},"R\xe9sum\xe9"),o.a.createElement("div",{className:"col-sm-12"},o.a.createElement("textarea",{className:"form-control",defaultValue:m,onChange:function(t){return e.onChangeResume(t)}}))),o.a.createElement("div",{className:"col-md-12 row"},o.a.createElement("button",{type:"button",className:"btn btn-default col-md-12",onClick:function(t){return e.showForm(t,a)}},"Annuler")),o.a.createElement("div",{className:"col-md-12 row"},o.a.createElement("button",{type:"submit",className:"btn btn-primary col-md-12"},"Modifier")),o.a.createElement("div",{className:"col-md-12 row"},o.a.createElement("button",{type:"button",className:"btn btn-delete col-md-12",onClick:function(t){return e.onDeleteTicket(t,a)}},"Supprimer"))))}}]),t}(n.Component)),k=(a(204),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={editTicket:""},a.showForm=function(e){a.state.editTicket===e?a.setState({editTicket:""}):a.setState({editTicket:e})},a.onDragOver=function(e){e.preventDefault()},a.onUpdateTicket=function(e,t,n,o,r,l,s){a.setState({editTicket:""}),a.props.onUpdateTicket(e,t,n,o,r,l,s)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"onDropTicket",value:function(e,t){e.preventDefault(),this.props.onDrop(e,t)}},{key:"render",value:function(){var e=this,t=this.props,a=t.status,n=t.tickets,r=t.onDeleteTicket,l=t.onUpdateTicketRating;return o.a.createElement("div",{className:"table-droppable col-md-12 table-"+a+" droppable container-fluid",onDragOver:function(t){return e.onDragOver(t)},onDrop:function(t){e.onDropTicket(t,a)}},o.a.createElement("div",{className:"col-md-12 container-fluid row margin-bottom"},o.a.createElement("span",{className:"label label-default col-md-12"},a)),o.a.createElement("div",{className:"col-md-12"},n.map(function(t){return e.state.editTicket===t.id?o.a.createElement(E,{key:t.id,ticket:t,status:a,onDeleteTicket:r,showForm:e.showForm,onUpdateTicket:e.onUpdateTicket}):o.a.createElement(h,{key:t.id,ticket:t,status:a,onDeleteTicket:r,showForm:e.showForm,onUpdateTicketRating:l})})))}}]),t}(n.Component)),N=(a(206),new Date),w=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={status:"desire",title:"",places:"",from:N,to:N,transport:"none",resume:"",showForm:"hide"},a.onChangeFrom=a.onChangeFrom.bind(Object(b.a)(Object(b.a)(a))),a.onChangeTo=a.onChangeTo.bind(Object(b.a)(Object(b.a)(a))),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"onChangeTitle",value:function(e){this.setState({title:e.target.value})}},{key:"onChangePlaces",value:function(e){this.setState({places:e.target.value}),this.state.title.length<1&&this.setState({title:e.target.value})}},{key:"onChangeFrom",value:function(e){this.setState({from:e}),Object(g.compareAsc)(e,this.state.to)>0&&this.setState({to:e})}},{key:"onChangeTo",value:function(e){(e&&Object(g.compareAsc)(e,this.state.from))<0?alert("La date doit \xeatre sup\xe9rieur \xe0 la date d\xe9part"):this.setState({to:e})}},{key:"onChangeTransport",value:function(e){this.setState({transport:e.target.value})}},{key:"onChangeStatus",value:function(e){this.setState({status:e.target.value})}},{key:"onChangeResume",value:function(e){this.setState({resume:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault();var t="";this.state.from&&(t=Object(g.format)(this.state.from,"DD/MM/YYYY")),this.state.to&&(t=Object(g.format)(this.state.to,"DD/MM/YYYY")),this.setState({title:"",places:"",from:N,to:N,resume:""}),this.props.onSendTicket(this.state.title,this.state.places,t,"",this.state.transport,this.state.status,this.state.resume)}},{key:"displayForm",value:function(e,t){e.preventDefault(),this.setState({showForm:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.title,n=t.places,r=t.from,l=t.to,s=t.resume,c=t.showForm;return o.a.createElement("div",{className:"container-fluid row"},"show"===c?o.a.createElement("form",{className:"form-newticket form-horizontal col-md-12",onSubmit:function(t){return e.onSubmit(t)}},o.a.createElement("div",{className:"container-fluid row"},o.a.createElement("span",{className:"col-md-12 label label-default label-form"},"Nouveau ticket")),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Titre"),o.a.createElement("div",{className:"col-sm-10"},o.a.createElement("input",{className:"form-control",value:a,id:"titleTicket",type:"text",placeholder:"",onChange:function(t){return e.onChangeTitle(t)}}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Lieu(x)"),o.a.createElement("div",{className:"col-sm-10"},o.a.createElement("input",{className:"form-control",id:"placesTicket",type:"text",value:n,placeholder:"",onChange:function(t){return e.onChangePlaces(t)}}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Date du"),o.a.createElement("div",{className:"col-sm-4 col-md-2"},o.a.createElement(v.a,{className:"form-control",id:"fromTicket",selectsStart:!0,placeholder:"",isClearable:!0,dateFormat:"dd/MM/yyyy",selected:r,startDate:r,endDate:l,onChange:this.onChangeFrom,showYearDropdown:!0,showWeekNumbers:!0,dateFormatCalendar:"MMMM",scrollableYearDropdown:!0,showMonthDropdown:!0,yearDropdownItemNumber:80})),o.a.createElement("label",{className:"col-sm-1 col-form-label"},"au"),o.a.createElement("div",{className:"col-sm-4 col-md-2"},o.a.createElement(v.a,{className:"form-control",id:"toTicket",isClearable:!0,dateFormat:"dd/MM/yyyy",placeholder:"",selectsEnd:!0,selected:l,startDate:r,endDate:l,onChange:this.onChangeTo,showYearDropdown:!0,showWeekNumbers:!0,showMonthDropdown:!0,dateFormatCalendar:"MMMM",scrollableYearDropdown:!0,yearDropdownItemNumber:30}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Status"),o.a.createElement("div",{className:"col-sm-4"},o.a.createElement("select",{className:"form-control",onChange:function(t){return e.onChangeStatus(t)}},o.a.createElement("option",{value:"desire"},"Envie"),o.a.createElement("option",{value:"planned"},"Pr\xe9vu"),o.a.createElement("option",{value:"current"},"En cours"),o.a.createElement("option",{value:"finished"},"D\xe9j\xe0 fait"))),o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Moyen de transport"),o.a.createElement("div",{className:"col-sm-4"},o.a.createElement("select",{className:"form-control",onChange:function(t){return e.onChangeTransport(t)}},o.a.createElement("option",{value:"none"},"Inconnu"),o.a.createElement("option",{value:"plane"},"Avion"),o.a.createElement("option",{value:"ship"},"Bateau"),o.a.createElement("option",{value:"bus"},"Bus"),o.a.createElement("option",{value:"motorcycle"},"Moto"),o.a.createElement("option",{value:"thumbs-up"},"Stop"),o.a.createElement("option",{value:"train"},"Train"),o.a.createElement("option",{value:"shuttle-van"},"Van"),o.a.createElement("option",{value:"bicycle"},"V\xe9lo"),o.a.createElement("option",{value:"car"},"Voiture")))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 control-label"},"R\xe9sum\xe9"),o.a.createElement("div",{className:"col-sm-10"},o.a.createElement("textarea",{className:"form-control",defaultValue:s,onChange:function(t){return e.onChangeResume(t)}}))),o.a.createElement("button",{type:"button",className:"btn btn-default",onClick:function(t){return e.displayForm(t,"hide")}},"Annuler"),o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Ajouter")):o.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:function(t){return e.displayForm(t,"show")}},"Nouveau Ticket"))}}]),t}(n.Component),y=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={lastID:7,tables:["desire","planned","current","finished"],tickets:[{id:1,status:"desire",title:"Amerique du Sud",places:"Colombie - P\xe9rou",from:"",to:"",transport:"",resume:"un jour peut-\xeatre"},{id:2,status:"finished",title:"Japan",places:"Japon",from:"21/05/2016",to:"10/06/2016",transport:"plane",resume:"ZEeeeeeen !!!",rating:"grin-stars"},{id:3,status:"planned",title:"Sri Lanka",places:"Sri lanka",from:"",to:"",transport:"plane",resume:"Bient\xf4t !!!"},{id:4,status:"finished",title:"Norway",places:"Norv\xe8ge",from:"28/05/2017",to:"07/06/2017",transport:"plane",resume:"Mouill\xe9 !!!",rating:"grin-stars"},{id:5,status:"current",title:"Chez les parents",places:"Lyon",from:"01/12/2018",to:"",transport:"",resume:"Trop long !!!"},{id:6,status:"finished",title:"Asia 2k18",places:"Japon",from:"23/01/2018",to:"07/06/2018",transport:"plane",resume:"Enorme !!!",rating:"grin-stars"}]},a.onDrop=function(e,t){var n=e.dataTransfer.getData("id"),o=a.state.tickets.filter(function(e){return e.id==n&&(e.status=t),e});a.setState(Object(s.a)({tickets:o},"tickets",o))},a.onDeleteTicket=function(e){var t=a.state.tickets,n=t.findIndex(function(t){return t.id===e});t.splice(n,1),a.setState({tickets:t})},a.onUpdateTicket=function(e,t,n,o,r,l,s){var c=a.state.tickets.filter(function(a){return a.id===e&&(a.title=t,a.places=n,a.from=o,a.to=r,a.transport=l,a.resume=s),a});a.setState({tickets:c})},a.onUpdateTicketRating=function(e,t){var n=a.state.tickets.filter(function(a){return a.id===e&&(a.rating=t),a});a.setState({tickets:n})},a.onSendTicket=function(e,t,n,o,r,l,s){var c=a.state.tickets,i=a.state.lastID;c.push({id:i,title:e,places:t,from:n,to:o,transport:r,status:l,resume:s}),a.setState({tickets:c,lastID:i+1})},a.orderingTable=function(e,t){var a,n=[];return e.map(function(e){a=t.filter(function(t){return t.status===e}),n.push({status:e,tickets:a})}),n},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.tables,n=t.tickets,r=this.orderingTable(a,n);return o.a.createElement("div",null,o.a.createElement("nav",{className:"navbar navbar-dark bg-dark"},o.a.createElement("span",{className:"navbar-brand mb-0 h1"},"Pounda")),o.a.createElement("div",{className:"main-container container-fluid row "},o.a.createElement("div",{className:"form-container col-md-12 container-fluid row margin-bottom "},o.a.createElement(w,{onSendTicket:this.onSendTicket})),r.map(function(t){return o.a.createElement("div",{key:t.status,className:"table-container col-md-3 container-fluid row"},o.a.createElement(k,{status:t.status,tickets:t.tickets,onDrop:e.onDrop,onDeleteTicket:e.onDeleteTicket,onUpdateTicket:e.onUpdateTicket,onUpdateTicketRating:e.onUpdateTicketRating}))})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},41:function(e,t,a){},83:function(e,t,a){e.exports=a(208)},88:function(e,t,a){},90:function(e,t,a){},92:function(e,t,a){}},[[83,2,1]]]);
//# sourceMappingURL=main.7220538c.chunk.js.map