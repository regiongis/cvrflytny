(this.webpackJsonpcvr_flyt_app=this.webpackJsonpcvr_flyt_app||[]).push([[0],{358:function(e,t){},415:function(e,t,a){e.exports=a(664)},420:function(e,t,a){},530:function(e,t,a){},560:function(e,t){},562:function(e,t){},573:function(e,t){},575:function(e,t){},602:function(e,t){},604:function(e,t){},605:function(e,t){},610:function(e,t){},612:function(e,t){},619:function(e,t){},621:function(e,t){},639:function(e,t){},641:function(e,t){},653:function(e,t){},656:function(e,t){},661:function(e,t){},662:function(e,t){},664:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),o=a.n(l),s=(a(420),a(135)),i=a(362),c=a.n(i),d=a(76),u=a(42),m=a(88),h=a(89),p=a(27),g=a(91),f=a(90),v=a(61),b=a(185),k=a(740),E=a(726),y=a(752),w=a(8),O=a(747),j=a(742),S=a(719),D=a(382),C=a.n(D),F=a(389),x=a(739),T=a(92),M=a.n(T),L=(a(426),a(754)),N=a(731),_=a(384),R=a.n(_),I=a(386),A=a.n(I),Y=a(387),P=a.n(Y),W=a(388),V=a.n(W),q=a(235),U=a(38),B=a(743),K=a(724),H=a(741),z=a(385),J=a.n(z),G=a(50),X=a.n(G),Z={width:"100%",height:"1200px"};window.geojsonLayer=void 0,window.lfMap=void 0;var $=X.a.control({position:"bottomleft"});$.onAdd=function(e){var t=X.a.DomUtil.create("div","legend");return t.innerHTML+="<h4>Signaturforklaring</h4>",t.innerHTML+='<i style="background:#0020d7"></i><span>NyStartet</span><br>',t.innerHTML+='<i style="background:#d79700"></i><span>Fraflyttet</span><br>',t.innerHTML+='<i style="background:#298b30"></i><span>Tilflyttet</span><br>',t.innerHTML+='<i style="background:#c10a0a"></i><span>Oph\xf8rt</span><br>',t};var Q=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={data:{},renderLegend:!1},n}return Object(h.a)(a,[{key:"renderMap",value:function(e){var t=X.a.tileLayer.wms("https://api.dataforsyningen.dk/topo_skaermkort_DAF?service=WMS&request=GetCapabilities",{layers:"dtk_skaermkort_daempet",token:"88c934808ac7ad80447995a577c6a32b",format:"image/png",attribution:'&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>'}),a=X.a.tileLayer.wms("https://api.dataforsyningen.dk/dagi_DAF?service=WMS&request=GetCapabilities&service=WMS&version=1.1.1",{layers:"Kommuneinddeling",format:"image/png",token:"88c934808ac7ad80447995a577c6a32b",transparent:!0,minZoom:10});window.lfMap=X.a.map("map",{center:[55.876823,9.961644],zoom:8,layers:[t,a]}),X.a.control.scale().addTo(window.lfMap)}},{key:"renderFeatures",value:function(e){$.addTo(window.lfMap);void 0!==window.geojsonLayer&&window.lfMap.removeLayer(window.geojsonLayer),window.geojsonLayer=X.a.geoJSON(e,{onEachFeature:function(e,t){t.bindPopup("<strong>"+e.properties.status+"</strong></br><hr>"+e.properties.navn+'</br><a href="https://datacvr.virk.dk/data/visenhed?enhedstype=produktionsenhed&id='+e.properties["p-nummer"]+'" target="_blank">Se mere her</a>')},pointToLayer:function(e,t){return X.a.marker(t,{icon:(a=e.properties.status,X.a.icon({iconUrl:function(e){var t="https://raw.githubusercontent.com/magloire/cvrflytny/master/public/";switch(e){case"Tilflytter":return t+"img/t.png";case"Fraflytter":return t+"img/f.png";case"Nystartet":return t+"img/n.png";case"Oph\xf8rt":return t+"img/o.png"}}(a),shadowUrl:"img/shadow.png",iconAnchor:[16,37],shadowAnchor:[20,35],popupAnchor:[0,-30]}))});var a}}).addTo(window.lfMap);var t=function(e){var t=e.filter((function(e){return["Nystartet",""].includes(e.properties.status)}));return 0===t.length?null:t[0].geometry.coordinates}(e);t?window.lfMap.setView([t[1],t[0]],12):window.lfMap.fitBounds(window.geojsonLayer.getBounds())}},{key:"componentDidMount",value:function(){this.renderMap(this.props.data),this.props.data.length>0&&this.renderFeatures(this.props.data)}},{key:"componentDidUpdate",value:function(){console.log("componentdidupdate"),this.props.data.length>0?this.renderFeatures(this.props.data):console.log("props empty")}},{key:"renderMarkers",value:function(e){void 0!==window.geojsonLayer&&window.lfMap.removeLayer(window.geojsonLayer),window.geojsonLayer=X.a.geoJSON(e,{onEachFeature:function(e,t){console.log("called for each feature"),t.bindPopup("<strong>"+e.properties.status+"</strong></br><hr>"+e.properties.navn+'</br><a href="https://datacvr.virk.dk/data/visenhed?enhedstype=produktionsenhed&id='+e.properties["p-nummer"]+'" target="_blank">Se mere her</a>')},pointToLayer:function(e,t){return X.a.marker(t,{icon:(a=e.properties.status,X.a.icon({iconUrl:function(e){switch(e){case"Tilflytter":return"img/t.png";case"Fraflytter":return"img/f.png";case"Nystartet":return"img/n.png";case"Oph\xf8rt":return"img/o.png"}}(a),shadowUrl:"img/shadow.png",iconAnchor:[16,37],shadowAnchor:[20,35],popupAnchor:[0,-30]}))});var a}}).addTo(window.lfMap)}},{key:"render",value:function(){return r.a.createElement("div",{id:"map",style:Z})}}]),a}(r.a.Component),ee=a(240),te=a(2),ae=a(11),ne=a(136),re=function(e){var t,a=e.value,n="Fraflytter"===(t=a)?"orange":"Tilflytter"===t?"green":"Nystartet"===t?"blue":"Oph\xf8rt"===t?"red":"blue";return r.a.createElement("b",{style:{color:n}},a)},le=function(e){return r.a.createElement(ae.b,Object.assign({formatterComponent:re},e))},oe=function(e){var t=e.value,a="https://datacvr.virk.dk/data/visenhed?enhedstype=produktionsenhed&id=".concat(t);return r.a.createElement("a",{href:a,target:"_blank",rel:"noopener noreferrer"},t)},se=function(e){return r.a.createElement(ae.b,Object.assign({formatterComponent:oe},e))},ie=function(e){return e.keyIndex},ce=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={rows:[],data:[],sorting:[{columnName:"hovedbranche",direction:"desc"}],statusColumns:["status"],pcols:["p-nummer"],grouping:[{columnName:"status"}]},n.changeSorting=function(e){return n.setState({sorting:e})},n.changeGrouping=function(e){return n.setState({grouping:e})},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.props.updateData,t=this.props.total,a=this.props.totalRendered,n=this.state.statusColumns,l=this.state.pcols,o=this.props.data.map((function(e,t){e.properties.keyIndex=t;var a=e.properties["fuldt ansvarlige deltagere"];return null!==a&&a.length>0&&(e.properties["fuldt ansvarlige deltagere"]=a.replace(/"/g,"")),"NULL"===a&&(e.properties["fuldt ansvarlige deltagere"]=""),e.properties}));return r.a.createElement(ee.a,{style:{height:"100%"}},r.a.createElement("h6",{style:{textAlign:"center"}},"".concat(a," ud af ").concat(t)),r.a.createElement(ne.a,{rows:o,columns:[{name:"status",title:"Status"},{name:"cvr-nummer",title:"CVR nummer"},{name:"p-nummer",title:"P nummer"},{name:"hovedbranchekode",title:"Branche (kode)"},{name:"hovedbranche",title:"Branche"},{name:"virksomhedsform",title:"virksomhedsform"},{name:"navn",title:"Virksomhedsnavn"},{name:"fuldt ansvarlige deltagere",title:"Kontaktperson"},{name:"maanedsbeskaeftigelse_antalansatteinterval",title:"Antal ansatte"},{name:"kommunekode",title:"Kommunekode"},{name:"vejnavn",title:"Vejnavn"},{name:"husnummer",title:"Husnummer"},{name:"postnummer",title:"Postnummer"},{name:"postdistrikt",title:"By"},{name:"emailadresse",title:"Email"},{name:"startdato",title:"Startdato cvr"},{name:"indl\xe6st dato",title:"Indl\xe6st dato"}],getRowId:ie,style:{height:"100%"}},r.a.createElement(ae.e,{defaultFilters:[]}),r.a.createElement(ae.i,null),r.a.createElement(ae.m,{defaultSorting:[{columnName:"status",direction:"desc"}]}),r.a.createElement(ae.j,null),r.a.createElement(le,{for:n}),r.a.createElement(se,{for:l}),r.a.createElement(ne.e,{height:600}),r.a.createElement(ne.b,{defaultColumnWidths:[{columnName:"status",width:100},{columnName:"cvr-nummer",width:100},{columnName:"p-nummer",width:100},{columnName:"hovedbranchekode",width:100},{columnName:"hovedbranche",width:150},{columnName:"virksomhedsform",width:150},{columnName:"navn",width:150},{columnName:"fuldt ansvarlige deltagere",width:120},{columnName:"maanedsbeskaeftigelse_antalansatteinterval",width:120},{columnName:"kommunekode",width:120},{columnName:"vejnavn",width:120},{columnName:"husnummer",width:120},{columnName:"postnummer",width:120},{columnName:"postdistrikt",width:120},{columnName:"emailadresse",width:120},{columnName:"startdato",width:120},{columnName:"indl\xe6st dato",width:120}]}),r.a.createElement(ne.d,{showSortingControls:!0}),r.a.createElement(ne.c,null),r.a.createElement(te.k,{name:"root"},r.a.createElement(te.l,null,(function(t){var a=t.rows;return console.log("filteredRows"),console.log(a),e(a),r.a.createElement(te.m,null)})))))}}]),a}(r.a.PureComponent),de=a(745),ue=a(753),me=a(759),he=a(390),pe=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this)).state={clicked:!1,style:{data:{fill:"tomato"}}},e}return Object(h.a)(a,[{key:"render",value:function(){var e=this,t=function(e){var t=e.map((function(e){return e.properties})),a=t.filter((function(e){return"Tilflytter"===e.status})).length;return[{x:"Fraflytter",y:t.filter((function(e){return"Fraflytter"===e.status})).length},{x:"Tilflytter",y:a},{x:"Oph\xf8rt",y:t.filter((function(e){return"Oph\xf8rt"===e.status})).length},{x:"Nystartet",y:t.filter((function(e){return"Nystartet"===e.status})).length}]}(this.props.data);return r.a.createElement("div",null,r.a.createElement(ee.a,{style:{height:800,width:800,margin:"auto"}},r.a.createElement(de.a,{height:200,width:300,theme:ue.a.material,domainPadding:15},r.a.createElement(me.a,{barWidth:8,dataComponent:r.a.createElement(he.a,{events:{onMouseOver:function(){var t=e.state.clicked?"blue":"tomato",a=!e.state.clicked;e.setState({clicked:a,style:{data:{fill:t}}})}}}),style:{data:{fill:function(e){return"Fraflytter"===e.datum.x?"orange":"Tilflytter"===e.datum.x?"green":"Oph\xf8rt"===e.datum.x?"red":"Nystartet"===e.datum.x?"blue":void 0}}},data:t,labels:function(e){return e.datum.y}}))))}}]),a}(r.a.Component),ge=a(82);function fe(){return r.a.createElement(ge.a,{variant:"h6",color:"inherit"},"CVR Flyttem\xf8nster")}a(530);var ve=a(239),be=a.n(ve),ke=a(184),Ee=a.n(ke),ye=a(106),we=a.n(ye),Oe=a(383),je=a.n(Oe),Se=a(728),De=a(756),Ce=a(718),Fe=a(666),xe=a(720),Te=a(725),Me=a(730),Le=a(177),Ne=a.n(Le),_e=a(132),Re=a.n(_e),Ie=a(729),Ae=a(749),Ye=Object(Se.a)({list:{width:450},fullList:{width:"auto"},nested:{paddingLeft:30}});function Pe(e){var t=Ye(),a=e.handleDrawer,n=e.filterCols,l=e.handleCheckedFilters,o=e.reset,s=e.doFilter,i=e.filterWords,c=r.a.useState({status:!1,postdistrikt:!1,postnummer:!1}),m=Object(d.a)(c,2),h=m[0],p=m[1];return r.a.createElement("div",null,r.a.createElement(De.a,{anchor:"right",open:e.drawerOpen,onClose:a},function(e,a){var n={};return e.forEach((function(e){a[e]&&(n[e]=function(e,a){return e[a].map((function(e,n){return r.a.createElement(Fe.a,{key:a+"_"+n,button:!0,className:t.nested},r.a.createElement(xe.a,{primary:Object.keys(e)[0]}),r.a.createElement(Ie.a,null,r.a.createElement(Ae.a,{checked:Object.values(e)[0],onChange:function(t){return l(a+"_"+Object.keys(e)[0],t)},edge:"end"})))}))}(a,e))})),r.a.createElement("div",{className:t.list,role:"presentation"},r.a.createElement(Ce.a,null,r.a.createElement(Fe.a,null,r.a.createElement(Te.a,null,r.a.createElement(K.a,{variant:"contained",color:"primary",size:"small",onClick:s},"Filtrere")),r.a.createElement(Ie.a,null,r.a.createElement(K.a,{variant:"contained",color:"secondary",size:"small",onClick:o},"Nulstil")))),r.a.createElement(Ce.a,{dense:!0},e.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:"cat_"+t},r.a.createElement(Fe.a,{button:!0,key:e,onClick:function(){return function(e){p(Object(u.a)(Object(u.a)({},h),{},Object(v.a)({},e,!h[e])))}(e)}},r.a.createElement(xe.a,{primary:e}),h[e]?r.a.createElement(Ne.a,null):r.a.createElement(Re.a,null)),r.a.createElement(Me.a,{in:h[e],timeout:"auto",unmountOnExit:!0},r.a.createElement(Ce.a,{component:"div",disablePadding:!0,dense:!0},n[e])))}))))}(i,n)))}var We=a(760),Ve=Object(Se.a)((function(e){return{root:{flexGrow:1},container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200}}}));var qe=function(e){Ve();var t=e.loginData,a=e.handleLoginDatachange,n=e.errorMessage;return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{item:!0,xs:3},r.a.createElement(We.a,null,"E-mail/brugernavn"),r.a.createElement(L.a,{id:"standard-basic",label:"",name:"user",variant:"standard",placeholder:"",InputLabelProps:{shrink:!1},value:t.user.value,error:n,helperText:n?"Der var fejl ved login. Pr\xf8v igen":"",onChange:a})),r.a.createElement(N.a,{item:!0,xs:3},r.a.createElement(We.a,null,"Adgangskode"),r.a.createElement(L.a,{type:"password",id:"standard-basic",label:"",name:"password",variant:"standard",value:t.password.value,onChange:a})))},Ue=a(733),Be=a(738),Ke=a(735),He=a(736),ze=a(734),Je=a(737),Ge=a(732),Xe=a(748);function Ze(e){return r.a.createElement(Xe.a,Object.assign({elevation:6,variant:"filled"},e))}function $e(e){var t=r.a.useState(!1),a=Object(d.a)(t,2),n=(a[0],a[1],r.a.useState({name:{value:"",error:!1,helperText:""},email:{value:"",error:!1,helperText:""},organisation:{value:"",error:!1,helperText:""},password:{value:"",error:!1,helperText:""},password2:{value:"",error:!1,helperText:""},consent:{value:!1,error:!1,helperText:""},btnDisabled:!0})),l=Object(d.a)(n,2),o=l[0],s=l[1],i=function(e){return"password2"===e&&o[e].value.length<2&&o.password.value!==o.password2.value?(console.log(o.password.value," and ",o.password2.value," are not equal"),!0):o[e].value.length<2},c=function(e){var t,a=e.target,n="checkbox"===a.type?a.checked:a.value,r=a.name;s(Object(u.a)(Object(u.a)({},o),{},(t={},Object(v.a)(t,r,Object(u.a)(Object(u.a)({},o[r]),{},{value:n})),Object(v.a)(t,"btnDisabled",i("name")||i("email")||i("organisation")||i("password")||i("password2")||!o.consent.value),t)))},m=e.handleCreateDialogClose,h=e.errorMessage;return r.a.createElement("div",null,r.a.createElement(Ue.a,{open:e.isRegisterFormShown,onClose:m,"aria-labelledby":"form-dialog-title"},r.a.createElement(ze.a,{id:"form-dialog-title"},"Opret dig som bruger"),r.a.createElement(Ke.a,null,r.a.createElement(He.a,null),h&&r.a.createElement(Ze,{severity:"error"},h),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",name:"name",id:"name",label:"Navn:",value:o.name.value,error:o.name.error,helperText:o.name.helperText,onChange:c,fullWidth:!0}),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"organisation",name:"organisation",label:"Organisation:",value:o.organisation.value,onChange:c,error:o.organisation.error,helperText:o.organisation.helperText,fullWidth:!0}),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"email",name:"email",label:"E-mail/brugernavn",type:"email",value:o.email.value,error:o.email.error,helperText:o.email.helperText,onChange:c,fullWidth:!0}),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"password",name:"password",label:"Adganskode:",type:"password",value:o.password.value,error:o.password.error,helperText:o.password.helperText,onChange:c,fullWidth:!0}),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"password2",name:"password2",label:"Gentag adgangskode:",type:"password",value:o.password2.value,error:o.password2.error,helperText:o.password2.helperText,onChange:c,fullWidth:!0}),r.a.createElement(Je.a,{control:r.a.createElement(Ae.a,{checked:o.consent.value,name:"consent",onChange:c}),label:"Med min oprettelse som bruger giver jeg mit samtykke til, at mine oplysninger bliver opbevaret, s\xe5ledes at projektet kan kontakte mig, fx. ifm. driftsforstyrrelser, nye versioner, nye tiltag, mv."}),!o.consent.value&&r.a.createElement(Ge.a,{error:!0},"Du skal give samtykke")),r.a.createElement(Be.a,{style:{justifyContent:"center"}},r.a.createElement(K.a,{disabled:!o.consent.value,variant:"contained",onClick:function(){var t={name:o.name.value,email:o.email.value,organisation:o.organisation.value,password:o.password.value};e.handleRegister(t)},color:"primary"},"Opret"))))}var Qe=a(391),et=a(723),tt=a(234),at=a.n(tt),nt=Object(w.a)({paper:{border:"1px solid #d3d4d5"}})((function(e){return r.a.createElement(Qe.a,Object.assign({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},e))})),rt=Object(w.a)((function(e){return{root:{"&:focus":{backgroundColor:e.palette.primary.main,"& .MuiListItemIcon-root, & .MuiListItemText-primary":{color:e.palette.common.white}}}}}))(et.a);function lt(e){var t=r.a.useState(null),a=Object(d.a)(t,2),n=a[0],l=a[1];return r.a.createElement("div",null,r.a.createElement(S.a,{"aria-controls":"customized-menu","aria-haspopup":"true",variant:"contained",color:"primary",onClick:function(e){l(e.currentTarget)}},r.a.createElement(at.a,null)),r.a.createElement(nt,{id:"customized-menu",anchorEl:n,keepMounted:!0,open:Boolean(n),onClose:function(){l(null)}},r.a.createElement(rt,{onClick:e.handleLogout},r.a.createElement(xe.a,{primary:"Log ud"}))))}M.a.locale("da");var ot=Ee.a.ExcelFile,st=Ee.a.ExcelFile.ExcelSheet,it=Ee.a.ExcelFile.ExcelColumn,ct=["status","virksomhedsform","hovedbranche"],dt=Object(F.a)({typography:{useNextVariants:!0,suppressDeprecationWarnings:!0}});function ut(e,t){var a={};function n(e,t){var a,n=e.map((function(e){return e[t]})),r=(a=n,Object(b.a)(new Set(a)));return r=r.map((function(e){return Object(v.a)({},e,!1)}))}return t.forEach((function(t){a[t]=n(e,t)})),a}function mt(e){return r.a.createElement("div",null,e.children)}var ht=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={value:0,startDate:M()().subtract(1,"months").startOf("month").format("YYYY-MM-DD"),endDate:M()().subtract(1,"months").endOf("month").format("YYYY-MM-DD"),data:[],kommuner:[],komkode:n.props.komnr,csvData:[],loading:!0,completed:0,canSendRequest:!1,filterOpen:!1,drawerOpen:!1,alertOpen:!1,alertMessage:"",uniqueVals:{},dataToRender:[],isLoginShown:!0,isRegisterFormShown:!1,sessionId:sessionStorage.getItem("sessionId")||"",loginData:{user:{value:"",error:!1,helperText:"*"},password:{value:"",error:!1,helperText:"*"}},registrationErrorMessage:"",loginErrorMessage:!1},n.handleChange=n.handleChange.bind(Object(p.a)(n)),n.handleStart=n.handleStart.bind(Object(p.a)(n)),n.handleEnd=n.handleEnd.bind(Object(p.a)(n)),n.handleSelect=n.handleSelect.bind(Object(p.a)(n)),n.handleDoneClick=n.handleDoneClick.bind(Object(p.a)(n)),n.handleFilterOpen=n.handleFilterOpen.bind(Object(p.a)(n)),n.handleFilterClose=n.handleFilterClose.bind(Object(p.a)(n)),n.handleDrawerOpen=n.handleDrawerOpen.bind(Object(p.a)(n)),n.handleCheckedFilters=n.handleCheckedFilters.bind(Object(p.a)(n)),n.reset=n.reset.bind(Object(p.a)(n)),n.updateRenderDataFromTable=n.updateRenderDataFromTable.bind(Object(p.a)(n)),n.doFilter=n.doFilter.bind(Object(p.a)(n)),n.onAlertClose=n.onAlertClose.bind(Object(p.a)(n)),n.handleCreateDialogOpen=n.handleCreateDialogOpen.bind(Object(p.a)(n)),n.handleCreateDialogClose=n.handleCreateDialogClose.bind(Object(p.a)(n)),n.handleLogin=n.handleLogin.bind(Object(p.a)(n)),n.handleLogout=n.handleLogout.bind(Object(p.a)(n)),n.handleRegister=n.handleRegister.bind(Object(p.a)(n)),n.handleLoginDatachange=n.handleLoginDatachange.bind(Object(p.a)(n)),n.db="erhvervsinfo",n}return Object(h.a)(a,[{key:"onAlertClose",value:function(){this.setState({alertOpen:!1})}},{key:"handleLoginDatachange",value:function(e){console.log("I was called!!!");var t=e.target,a=t.value,n=t.name;this.setState({loginData:Object(u.a)(Object(u.a)({},this.state.loginData),{},Object(v.a)({},n,Object(u.a)(Object(u.a)({},this.state.loginData[n]),{},{value:a})))})}},{key:"doFilter",value:function(){var e=this.state.uniqueVals,t=Object.keys(e),a={};t.forEach((function(t){var n=e[t];a[t]=n.filter((function(e){return!0===Object.values(e)[0]})).map((function(e){return Object.keys(e)[0]}))}));var n=this.state.dataToRender.filter((function(e){var n=!0;return t.forEach((function(t){a[t].length>0&&-1===a[t].indexOf(e.properties[t])&&(n=!1)})),n})),r="".concat(n.length," ud af ").concat(this.state.data.length);this.setState({dataToRender:n,drawerOpen:!1,alertMessage:r,alertOpen:!0})}},{key:"updateRenderDataFromTable",value:function(e){this.setState({csvData:e})}},{key:"reset",value:function(){this.setState({dataToRender:this.state.data,uniqueVals:ut(this.state.data.map((function(e){return e.properties})),ct)})}},{key:"handleCheckedFilters",value:function(e,t){var a=e.split("_"),n=Object(d.a)(a,2),r=n[0],l=n[1],o=this.state.uniqueVals[r],s=o.findIndex((function(e){return Object.keys(e)[0]===l})),i=o[s];i[l]=!i[l],this.setState({uniqueVals:Object(u.a)(Object(u.a)({},this.state.uniqueVals),{},Object(v.a)({},r,[].concat(Object(b.a)(o.slice(0,s)),[i],Object(b.a)(o.slice(s+1)))))})}},{key:"handleFilterOpen",value:function(){this.setState({filterOpen:!this.state.filterOpen})}},{key:"handleLogout",value:function(){var e=this;we.a.get("https://offentligedata.admin.gc2.io/api/v2/session/stop",(function(t){t&&t.success&&(sessionStorage.removeItem("sessionId"),e.setState({sessionId:"",data:[],csvData:[],dataToRender:[]}),window.lfMap&&window.geojsonLayer&&(console.log("removelayer called"),window.lfMap.removeLayer(window.geojsonLayer)))}))}},{key:"handleDrawerOpen",value:function(){this.setState({drawerOpen:!this.state.drawerOpen})}},{key:"handleFilterClose",value:function(){this.setState({filterOpen:!1})}},{key:"getKommuner",value:function(){var e="https://drayton.mapcentia.com/api/v1/sql/".concat(this.db,"?q=select right(komkode, 3)::int komkode, ")+"komnavn from data.kommune group by komkode, komnavn order by komnavn",t=this;we.a.ajax({url:e,type:"GET",dataType:"json",success:function(e){var a=e.features.map((function(e){return e.properties}));t.setState((function(e){return{kommuner:a}}))}})}},{key:"handleLogin",value:function(){var e=this,t={user:e.state.loginData.user.value,password:e.state.loginData.password.value,database:e.db};we.a.get("https://offentligedata.admin.gc2.io/api/v2/session/start",t,(function(t){t&&t.success&&(sessionStorage.setItem("sessionId",t.data.session_id),e.setState({sessionId:t.data.session_id,loginErrorMessage:!1}),console.log("login succeeded, session id: ",t.data.session_id))}),"json").fail((function(t){e.setState({loginErrorMessage:!0})}))}},{key:"handleRegister",value:function(e){var t=this,a={name:e.email,email:e.email,password:e.password,subuser:!0,usergroup:"erhvervsinfo",parentdb:t.db,properties:{org:e.organisation,name:e.name}},n={user:e.email,password:e.password,database:t.db};console.log("before posting data"),we.a.post("https://offentligedata.admin.gc2.io/api/v2/user",JSON.stringify(a),(function(e){console.log("data posted successfully!"),console.log(e),e&&e.success?we.a.get("https://offentligedata.admin.gc2.io/api/v2/session/start",n,(function(e){e&&e.success&&(t.handleCreateDialogClose(),sessionStorage.setItem("sessionId",e.data.session_id),t.setState({sessionId:e.data.session_id}),console.log("login succeeded, session id: ",e.data.session_id))}),"json"):e&&e.success}),"json").fail((function(e){console.log("login failed, message => ",e.responseJSON.message),t.setState({registrationErrorMessage:t.getErrorMessage(e.responseJSON.errorCode)})}))}},{key:"getErrorMessage",value:function(e){switch(e){case"SUB_USER_ALREADY_EXISTS":case"PARENT_USER_EXISTS_WITH_NAME":case"USER_ALREADY_EXISTS":case"EMAIL_ALREADY_EXISTS":return"E-mail/brugernavn er allerede taget.";case"WEAK_PASSWORD":return"Adgangskode skal opfylde f\xf8lgende kriterier: mindst 8 tegn langt, mindst 1 tal og mindst 1 stort bogstav";default:return"Der var en fejl ved oprettelse. Pr\xf8v igen."}}},{key:"getData",value:function(e,t,a){this.setState((function(e){return{csvData:[],loading:!0}}));var n=this,r={session_id:this.state.sessionId,komkode:e,startdate:t,enddate:a,database:n.db},l=JSON.stringify(r);if(e){we.a.ajax({url:"https://offentligedata.admin.gc2.io/extensions/offentligedata/api/request",type:"POST",dataType:"json",data:l,success:function(e){var t=e.features.map((function(e){return e.properties}));e.features.forEach((function(e){var t=e.properties.virksomhedsform;e.properties.virksomhedsform=function(e){switch(e){case 10:return"Enkeltmandsvirksomhed";case 15:return"Personligt ejet Mindre Virksomhed";case 20:return"D\xf8dsbo";case 30:return"Interessentskab";case 40:return"Kommanditselskab";case 45:return"Medarbejderinvesteringsselskab";case 50:return"Partrederi";case 60:return"Aktieselskab";case 70:return"Kommanditaktieselskab/Partnerskab";case 80:return"Anpartsselskab";case 81:return"Iv\xe6rks\xe6tterselskab";case 90:return"Fond";case 100:return"Erhvervsdrivende fond";case 110:return"Forening";case 115:return"Frivillig forening";case 130:return"Andelselskab(-forening)";case 140:return"Andelselskab(-forening) med begr\xe6nset ansvar";case 150:return"Forening eller selskab med begr\xe6nset ansvar";case 151:return"Selskab med begr\xe6nset ansvar";case 152:return"Forening med begr\xe6nset ansvar";case 160:return"Europ\xe6isk \xd8konomisk Firmagruppe";case 170:return"Filial af udenlandsk aktieselskab, kommanditakties";case 180:return"Filial af udenlandsk anpartselskab eller selskab";case 190:return"Filial af udenlandsk virksomhed med begr\xe6nset ansv";case 195:return"SCE-selskab";case 196:return"Filial af SCE-selskab";case 200:return"Filial af anden udenlandsk virksomhed";case 210:return"Anden udenlandsk virksomhed";case 220:return"Fast forretningssted af Europ\xe6isk \xf8konomisk Firmag";case 230:case 235:case 245:case 250:return"Offentlige arbejdsplads";case 260:return"Folkekirkelige institutioner";case 270:return"Enhed under oprettelse i Erhvervs- og Selskabsstyr";case 280:return"\xd8vrige virksomhedsformer";case 285:return"S\xe6rlig finansiel virksomhedsform";case 290:return"SE-selskab";case 291:return"Filial af SE-selskab";case 990:return"Uoplyst virksomhedsform";default:return e}}(t);var a=e.properties.startdato;e.properties.startdato=a&&a.length>0?a.substring(0,10):""})),n.setState((function(a){return{csvData:t,data:e.features,dataToRender:e.features,loading:!1,uniqueVals:ut(t,ct)}}))}})}else this.setState({loading:!1})}},{key:"handleSelect",value:function(e){e.persist(),this.setState((function(t){return{komkode:e.target.value}}))}},{key:"componentDidMount",value:function(){console.log("");var e=this.state,t=e.komkode,a=e.startDate,n=e.endDate;this.getData(t,a,n),this.getKommuner()}},{key:"componentWillUnmount",value:function(){}},{key:"handleChange",value:function(e,t){this.setState({value:t})}},{key:"handleDoneClick",value:function(){var e=this.state,t=e.komkode,a=e.startDate,n=e.endDate;t||(t=165),this.getData(t,a,n),Object(s.d)("#/"+t)}},{key:"handleStart",value:function(e){this.setState({startDate:e.format("YYYY-MM-DD")})}},{key:"handleEnd",value:function(e){this.setState({endDate:e.format("YYYY-MM-DD")})}},{key:"handleCreateDialogOpen",value:function(){console.log("Createdialog open"),this.setState({isRegisterFormShown:!0,isLoginShown:!1})}},{key:"handleCreateDialogClose",value:function(){this.setState({isRegisterFormShown:!1,isLoginShown:!0})}},{key:"render",value:function(){var e=this.state,t=e.value,a=e.startDate,n=e.endDate,l=e.kommuner,o=e.komkode;return r.a.createElement(x.a,{theme:dt},r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:this.state.loading?"loading":""}),r.a.createElement(Pe,{handleDrawer:this.handleDrawerOpen,drawerOpen:this.state.drawerOpen,filterCols:this.state.uniqueVals,handleCheckedFilters:this.handleCheckedFilters,reset:this.reset,doFilter:this.doFilter,filterWords:ct}),r.a.createElement($e,{handleRegister:this.handleRegister,isRegisterFormShown:this.state.isRegisterFormShown,handleCreateDialogClose:this.handleCreateDialogClose,handleCreateDialogOpen:this.handleCreateDialogOpen,errorMessage:this.state.registrationErrorMessage}),r.a.createElement("div",{className:""},r.a.createElement(k.a,{position:"static",color:"default"},r.a.createElement(E.a,null,r.a.createElement(N.a,{container:!0},r.a.createElement(N.a,{item:!0,xs:2},r.a.createElement(fe,null)),""===this.state.sessionId&&r.a.createElement(r.a.Fragment,null,r.a.createElement(qe,{loginData:this.state.loginData,handleLoginDatachange:this.handleLoginDatachange,errorMessage:this.state.loginErrorMessage}),r.a.createElement(N.a,{item:!0,xs:1},r.a.createElement(K.a,{variant:"contained",color:"primary",size:"small",onClick:this.handleLogin},"Log p\xe5")),r.a.createElement(N.a,{item:!0,xs:2},"eller \xa0",r.a.createElement(H.a,{color:"inherit",underline:"always",component:"button",onClick:this.handleCreateDialogOpen,size:"small"},"Opret dig som bruger"))),""!==this.state.sessionId&&r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{item:!0,xs:2},r.a.createElement("form",{className:be.a.container,noValidate:!0,autoComplete:"off"},r.a.createElement(L.a,{id:"standard-select",select:!0,label:"Kommune",placeholder:"Placeholder",className:be.a.textField,value:this.state.komkode||"",onChange:this.handleSelect,SelectProps:{native:!0},helperText:"",InputLabelProps:{shrink:!0}},l.map((function(e){return r.a.createElement("option",{key:e.komkode,value:e.komkode},e.komnavn)}))))),r.a.createElement(N.a,{item:!0,xs:2},r.a.createElement(U.a,{utils:q.a,locale:"da",moment:M.a},r.a.createElement(B.a,{value:a,label:"Startdato",format:"DD MMM YYYY",onChange:this.handleStart}))),r.a.createElement(N.a,{item:!0,xs:2},r.a.createElement(U.a,{utils:q.a},r.a.createElement(B.a,{value:n,label:"Slutdato",format:"DD MMM YYYY",onChange:this.handleEnd})))),""!==this.state.sessionId&&r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{item:!0,xs:2},r.a.createElement(S.a,{"arial-label":"Done",onClick:this.handleDoneClick},r.a.createElement(y.a,{title:"Send"},r.a.createElement(C.a,null))),r.a.createElement(S.a,{"arial-label":"Filter",onClick:this.handleDrawerOpen},r.a.createElement(y.a,{title:"Filter"},r.a.createElement(je.a,null))),this.state.csvData.length>0&&r.a.createElement(ot,{element:r.a.createElement(S.a,{"arial-label":"Excel"},r.a.createElement(y.a,{title:"Download Excel"},r.a.createElement(R.a,null))),filename:"export_"+o+"_"+a+"_"+n},r.a.createElement(st,{data:this.state.csvData,name:"CVR"},r.a.createElement(it,{label:"Status",value:"status"}),r.a.createElement(it,{label:"CVR nummer",value:"cvr-nummer"}),r.a.createElement(it,{label:"P nummer",value:"p-nummer"}),r.a.createElement(it,{label:"Branche (kode)",value:"hovedbranchekode"}),r.a.createElement(it,{label:"Branche",value:"hovedbranche"}),r.a.createElement(it,{label:"virksomhedsform",value:"virksomhedsform"}),r.a.createElement(it,{label:"Virksomhedsnavn",value:"navn"}),r.a.createElement(it,{label:"Kontaktperson",value:"fuldt ansvarlige deltagere"}),r.a.createElement(it,{label:"kvartalbes_interval",value:"Antal ansatte"}),r.a.createElement(it,{label:"Kommunekode",value:"kommunekode"}),r.a.createElement(it,{label:"vejnavn",value:"vejnavn"}),r.a.createElement(it,{label:"Husnummer",value:"husnummer"}),r.a.createElement(it,{label:"Postnummer",value:"postnummer"}),r.a.createElement(it,{label:"By",value:"postdistrikt"}),r.a.createElement(it,{label:"Email",value:"emailadresse"}),r.a.createElement(it,{label:"Startdato cvr",value:"startdato"}),r.a.createElement(it,{label:"Indl\xe6st dato",value:"indl\xe6st dato"})))),r.a.createElement(N.a,{item:!0,xs:1},r.a.createElement(lt,{handleLogout:this.handleLogout}))),r.a.createElement(N.a,{item:!0,xs:1},r.a.createElement("a",{href:"https://github.com/regiongis/erhvervsinfo/blob/master/Vejledning_Erhvervsinfo_20231210.pdf",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(y.a,{title:"Hj\xe6lpevejledning"},r.a.createElement(S.a,{color:"primary"},r.a.createElement(J.a,null)))))))),r.a.createElement(O.a,{value:t,onChange:this.handleChange,centered:!0},r.a.createElement(j.a,{icon:r.a.createElement(y.a,{title:"Kort"},r.a.createElement(A.a,null))}),r.a.createElement(j.a,{icon:r.a.createElement(y.a,{title:"Tabel"},r.a.createElement(P.a,null)),"aria-label":"Tabel"}),r.a.createElement(j.a,{icon:r.a.createElement(y.a,{title:"Histogram"},r.a.createElement(V.a,null))})),0===t&&r.a.createElement(mt,null,r.a.createElement(Q,{data:this.state.dataToRender})),1===t&&r.a.createElement(mt,null,r.a.createElement(ce,{data:this.state.dataToRender,updateData:this.updateRenderDataFromTable,total:this.state.data.length,totalRendered:this.state.csvData.length})),2===t&&r.a.createElement(mt,null,r.a.createElement(pe,{data:this.state.dataToRender})))))}}]),a}(n.Component),pt=Object(w.a)((function(e){return{root:{flexGrow:1},container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200},dense:{marginTop:19},menu:{width:300},progress:{margin:2*e.spacing(1)},nested:{paddingLeft:e.spacing(4)}}}))(ht),gt=c()(),ft=Object(s.c)(gt),vt=function(){return r.a.createElement(s.a,{history:ft},r.a.createElement(s.b,null,r.a.createElement(pt,{path:"/"}),r.a.createElement(pt,{path:"/:komnr"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(vt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[415,1,2]]]);
//# sourceMappingURL=main.02f24d0a.chunk.js.map