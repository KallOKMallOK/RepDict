(this.webpackJsonpRepDict=this.webpackJsonpRepDict||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"login",(function(){return M})),n.d(a,"logout",(function(){return V}));var i={};n.r(i),n.d(i,"show",(function(){return F})),n.d(i,"hide",(function(){return U}));var c={};n.r(c),n.d(c,"show",(function(){return B})),n.d(c,"hide",(function(){return H})),n.d(c,"success",(function(){return W}));var s,o,r=n(1),l=n.n(r),u=n(20),d=n.n(u),h=n(12),b=n(2),j=n(4),p=n(5),m=n(8),O=n(7),f=n(6),v=n(18),g=n(30),k=n.n(g),x=n(9),_={REGISTRATION:x.a+x.b.REGISTRATION,LOGIN:x.a+x.b.LOGIN,AUTH:x.a+x.b.AUTH,GET_DECKS:x.a+x.b.GET_DECKS,GET_ALL_DECKS:x.a+x.b.GET_ALL_DECKS,SET_LIKE:x.a+x.b.SET_LIKE,ADD_DECK:x.a+x.b.ADD_DECK,CHANGE_DECK:x.a+x.b.CHANGE_DECK,SUBSCRIBE_DECK:x.a+x.b.SUBSCRIBE_DECK,DELETE_DECK:x.a+x.b.DELETE_DECK},N=function(e){return e===_.GET_DECKS?{decks:[{is_private:0,author_login:"admin",cards:[{answer:"\u0440\u0435\u043f",description:null,id:1,main_word:"rap",type:"default"},{answer:"\u043c\u0435\u043b\u043e\u0434\u0438\u044f",description:null,id:2,main_word:"loop",type:"default"},{answer:"\u0442\u0435\u0445\u043d\u0438\u043a\u0430",description:null,id:3,main_word:"flow",type:"default"}],owner_login:"admin",description:"\u0442\u0443\u0442 \u0447\u0438\u0441\u0442\u043e \u043f\u0440\u043e \u0441\u043d\u044e\u0441",count_repetitions:0,main_language:"eng",second_language:"rus",price:0,count_words:0,name:"Rap",id:1,likes:0}],error:!1}:{error:!0}},y=function(){function e(){Object(j.a)(this,e)}return Object(p.a)(e,[{key:"POSTFake",value:function(e,t,n){return new Promise((function(e,t){}))}}],[{key:"GET",value:function(e,t,n){return k.a.get(e,{params:(null===n||void 0===n?void 0:n.token)?Object(b.a)(Object(b.a)({},t),{},{token:localStorage.getItem("token")||""}):Object(b.a)({},t),responseType:(null===n||void 0===n?void 0:n.downloadFile)?"blob":"json"})}},{key:"POST",value:function(e,t,n){var a=(null===n||void 0===n?void 0:n.token)?Object(b.a)(Object(b.a)({},t),{},{token:localStorage.getItem("token")||""}):Object(b.a)({},t);return k.a.post(e,a,{responseType:(null===n||void 0===n?void 0:n.downloadFile)?"blob":"json"})}},{key:"GETFake",value:function(e,t,n){return new Promise((function(t,n){setTimeout((function(){t({data:N(e)})}),100)}))}},{key:"registration",value:function(e){return this.POST(_.REGISTRATION,e)}},{key:"login",value:function(e){return this.POST(_.LOGIN,e)}},{key:"auth",value:function(){return this.GET(_.AUTH,{},{token:!0})}},{key:"transormArrayOfDeck",value:function(e){return{id:e.id,name:e.name,isPrivate:e.is_private,countWords:e.count_words,countRepetitions:e.count_repetitions,mainLang:e.main_language,secondLang:e.second_language,author:e.author_login,owner:e.owner_login,description:e.description,countLikes:e.likes,activeLike:e.liked,cards:e.cards,subscribed:e.subscribed}}},{key:"getDecks",value:function(){var e=this;return new Promise((function(t,n){e.GET(_.GET_DECKS,{},{token:!0}).then((function(n){var a={subscriptions:n.data.subscriptions.map((function(t){return e.transormArrayOfDeck(t)})),owned:n.data.owned.map((function(t){return e.transormArrayOfDeck(t)}))};console.log(Object(b.a)(Object(b.a)({},n.data),a)),t({data:Object(b.a)(Object(b.a)({},n.data),a)})}))}))}},{key:"getAllDecks",value:function(){var e=this;return new Promise((function(t,n){var a;e.GET(_.GET_ALL_DECKS,void 0!==(null===(a=localStorage.getItem("token"))||void 0===a?void 0:a.length)?{token:localStorage.getItem("token")}:{}).then((function(n){var a=n.data.decks.map((function(t){return e.transormArrayOfDeck(t)}));t(Object(b.a)(Object(b.a)({},n),{},{data:Object(b.a)(Object(b.a)({},n.data),{},{decks:a})}))}))}))}},{key:"addDeck",value:function(e){return this.POST(_.ADD_DECK,e,{token:!0})}},{key:"deleteDeck",value:function(e){return this.POST(_.DELETE_DECK,{deckId:e},{token:!0})}},{key:"applyChanges",value:function(e,t){return this.POST(_.CHANGE_DECK,{idDeck:e,changes:t},{token:!0})}},{key:"setLike",value:function(e){return this.POST(_.SET_LIKE,{deckId:e},{token:!0})}},{key:"subscribe",value:function(e){return this.POST(_.SUBSCRIBE_DECK,{deckId:e},{token:!0})}}]),e}(),w=n(19),E=n(11),S=n(10);!function(e){e.RUS="RUS",e.ENG="ENG",e.JPN="JPN",e.CHI="CHI",e.ITA="ITA",e.SPA="SPA",e.FRA="FRA",e.GER="GER"}(s||(s={})),function(e){e.SUCCESS="SUCCESS",e.ERROR="ERROR",e.WARNING="WARNING"}(o||(o={}));var C,L="APP/LOGIN",D="APP/LOGOUT",R="NOTIFY/SHOW",P="NOTIFY/HIDE";!function(e){e[e.ALERT=0]="ALERT",e[e.CONFIRM=1]="CONFIRM",e[e.PROMPT=2]="PROMPT"}(C||(C={}));var I,T="POPUP/SHOW",A="POPUP/HIDE",G="POPUP/SUCCESS";!function(e){e[e.NOT=0]="NOT",e[e.GOOGLE=1]="GOOGLE",e[e.VK=2]="VK",e[e.FACEBOOK=3]="FACEBOOK"}(I||(I={}));var K,M=function(e){return{type:L,payload:e}},V=function(){return{type:D}},F=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:300;return{type:R,payload:{type:e,head:t,content:n,timeout:a}}},U=function(){return{type:P}},B=function(e,t,n,a){return{type:T,payload:{type:e,head:t,content:n,actions:a}}},H=function(){return{type:A}},W=function(e){return{type:G,payload:e}},J={app:a,notification:i,popup:c},Y=function(e,t){var n=function(n){e.current&&!e.current.contains(n.target)&&t()};Object(r.useEffect)((function(){return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}))},q=(n(40),n(0)),z=Object(h.b)((function(e){return{auth:e.app.auth,user:e.app.user}}),(function(e){return{login:function(t){return e(J.app.login(t))},logout:function(){return e(J.app.logout())}}}))((function(e){Object(f.g)();var t=Object(r.useState)(!1),n=Object(E.a)(t,2),a=n[0],i=n[1],c=Object(r.useState)(!1),s=Object(E.a)(c,2),o=s[0],l=s[1],u=Object(r.useRef)(null),d=Object(f.h)().pathname;Y(u,(function(){a&&i(!1)})),Object(r.useEffect)((function(){document.body.style.overflow=o?"hidden":"unset"}),[o]);return Object(q.jsxs)("header",{className:"main_header",children:[Object(q.jsx)("div",{className:"logo",children:Object(q.jsx)("span",{className:"logo_text",children:Object(q.jsx)(v.b,{to:"/",onClick:function(e){return l(!1)},children:"RepDict"})})}),Object(q.jsxs)("div",{className:"menu",children:[Object(q.jsx)("div",{className:"icon_bars",onClick:function(e){return l(!o)},children:Object(q.jsx)(S.a,{})}),Object(q.jsxs)("ul",{className:"menu_list responsive_".concat(o?"active":"noactive"),children:[e.routes.filter((function(t){return t.isLogin===e.auth||void 0===t.isLogin})).map((function(e){return Object(q.jsx)("li",{className:"menu_list_item ".concat(e.path===d?"active":"noactive"),children:Object(q.jsxs)(v.b,{className:"menu_list_item_link",to:"".concat(e.path),onClick:function(e){return l(!1)},children:[!!e.icon&&Object(q.jsx)(e.icon,{}),e.name]})},e.path)})),e.auth&&Object(q.jsxs)("li",{style:{color:"white"},className:"user_panel",onClick:function(e){return i(!a)},children:[Object(q.jsxs)("div",{className:"user_panel_head",children:[Object(q.jsx)(S.n,{}),e.user.name]}),Object(q.jsxs)("ul",{className:"dropdown ".concat(a?"showedDB__fadeIn":"closed"),ref:u,children:[Object(q.jsx)("li",{className:"dropdown_item",children:Object(q.jsx)(v.b,{to:"/users/".concat(e.user.login),onClick:function(e){return l(!1)},children:"Profile"})}),Object(q.jsx)("li",{className:"dropdown_item",children:Object(q.jsx)(v.b,{to:"/settings",onClick:function(e){return l(!1)},children:"Setting"})}),Object(q.jsx)("li",{className:"dropdown_item",children:Object(q.jsx)(v.b,{to:"/",onClick:function(t){return e.logout(),void l(!1)},children:"Logout"})})]})]})]})]})]})})),Q=function(e){var t=Object(r.useState)(e.text),n=Object(E.a)(t,2),a=n[0],i=n[1],c=Object(r.useState)(!1),s=Object(E.a)(c,2),o=s[0],l=s[1],u=Object(r.useRef)(null),d=function(t,n){t?l(!0):(l(!1),e.onChanged(e.text,n))};return Y(u,(function(){o&&l(!1)})),Object(q.jsx)("div",{className:"edit_text",ref:u,children:o?Object(q.jsx)("input",{type:e.typeInput,defaultValue:a,onKeyPress:function(e){return function(e){"Enter"===e.key&&(d(!1,e.target.value),i(e.target.value))}(e)}}):Object(q.jsx)("span",{className:"edit_text_content",onClick:function(e){return d(!0)},children:a})})},X=n(22),Z=n(46),$=n(47),ee={auth:!1,user:{name:"",login:""}},te={visible:!1,type:null,head:"",content:"",timeout:2e3},ne={visible:!1,type:0,head:"",content:"",close:function(){}},ae=Object(X.combineReducers)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case L:return localStorage.setItem("token",t.payload.token),Object(b.a)(Object(b.a)({},e),{},{auth:!0,user:{name:t.payload.name,login:t.payload.login}});case D:return localStorage.removeItem("token"),Object(b.a)(Object(b.a)({},e),{},{auth:!1,user:{name:"",login:""}});default:return e}},notification:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R:return{visible:!0,type:t.payload.type,head:t.payload.head,content:t.payload.content,timeout:t.payload.timeout};case P:return Object(b.a)({},te);default:return e}},popup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T:return{type:t.payload.type,visible:!0,head:t.payload.head,content:t.payload.content,close:t.payload.actions.close,success:t.payload.actions.success};case A:return Object(b.a)({},ne);default:return e}}}),ie=ae,ce=Object($.composeWithDevTools)({trace:!0,traceLimit:25}),se=Object(X.createStore)(ie,ce(Object(X.applyMiddleware)(Z.a,(function(e){return function(t){return function(n){var a=!1,i=[];function c(){i.forEach((function(t){return e.dispatch(t)})),i=[]}var s=Object.assign({},n,{asyncDispatch:function(e){i=i.concat([e]),a&&c()}}),o=t(s);return a=!0,c(),o}}}))));!function(e){e.SUCCESS="SUCCESS",e.ERROR="ERROR",e.WARNING="WARNING"}(K||(K={}));var oe=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;se.dispatch(J.notification.show("success",e,t,n))},re=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;se.dispatch(J.notification.show("error",e,t,n))},le=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;se.dispatch(J.notification.show("warning",e,t,n))},ue=function(e){var t,n=Object(r.useState)(!1),a=Object(E.a)(n,2),i=a[0],c=a[1],s=Object(r.useState)(e.activeLike||!1),o=Object(E.a)(s,2),l=o[0],u=o[1],d=Object(r.useState)(e.subscribed||!1),h=Object(E.a)(d,2),b=h[0],j=h[1],p=Object(r.useState)(e.countLikes||0),m=Object(E.a)(p,2),O=m[0],f=m[1],g=Object(r.useState)(e.isPrivate||!1),k=Object(E.a)(g,2),x=k[0],_=k[1],N=Object(r.useRef)(null);Y(N,(function(){i&&c(!1)}));return Object(q.jsxs)("div",{className:"card_item card_item_noactive",children:[void 0!==e.enableMethods&&e.enableMethods.enableDelete&&e.enableMethods.enableEdit&&Object(q.jsxs)("div",{className:"control",children:[Object(q.jsx)("span",{className:"icon",onClick:function(e){return c(!i)},children:Object(q.jsx)(S.c,{})}),Object(q.jsxs)("ul",{className:"dropdown ".concat(i?"active":"noactive"),ref:N,children:[Object(q.jsx)("li",{className:"dropdown_item",onClick:function(e){return console.log(e)},children:"Play"}),Object(q.jsx)("li",{className:"dropdown_item",onClick:function(t){return function(t,n){c(!1),e.edit(t,e.index)}(t,e.index)},children:"Edit"}),Object(q.jsx)("li",{className:"dropdown_item",onClick:function(t){return e.delete(t,e.id)},children:"Delete"})]})]}),Object(q.jsxs)("p",{className:"card_item_head",children:[void 0!==e.enableMethods&&e.enableMethods.enableChangePrivate&&Object(q.jsx)("span",{style:{cursor:e.author===e.owner?"pointer":"default"},className:"private_lock",onClick:function(t){return function(t){e.author===e.owner&&(e.changePrivate(t,e.id,!x),_(!x))}(t)},children:x?Object(q.jsx)(S.g,{}):Object(q.jsx)(S.h,{})}),Object(q.jsx)("span",{className:"card_item_head_name",children:e.name}),Object(q.jsxs)(v.b,{to:"/users/".concat(e.author),className:"author",children:["(by ",e.author,")"]})]}),Object(q.jsxs)("div",{className:"middle_layer",children:[Object(q.jsxs)("div",{className:"card_item_head_langs",children:[Object(q.jsx)("div",{className:"lang main_lang",children:e.mainLang}),"/",Object(q.jsx)("div",{className:"lang sec_lang",children:e.secondLang})]}),Object(q.jsxs)("div",{className:"info",children:[Object(q.jsxs)("p",{className:"info_count_words",children:[e.countWords," words"]}),Object(q.jsxs)("p",{className:"info_count_repetitions",children:[e.countRepetitions," repetitions"]})]})]}),Object(q.jsx)("p",{className:"card_item_description",children:e.description}),Object(q.jsxs)("div",{className:"footer",children:[(null===(t=e.enableMethods)||void 0===t?void 0:t.enableSubscribe)?Object(q.jsx)("button",{className:"btn btn-".concat(b?"danger":"primary"),onClick:function(t){return y.subscribe(e.id),void j(!b)},children:b?"Unsubscribe":"Subscribe"}):Object(q.jsx)("div",{}),Object(q.jsxs)("span",{className:"likes",onClick:function(t){return function(t){var n;console.log(e.enableMethods),(null===(n=e.enableMethods)||void 0===n?void 0:n.enableLike)?(u(!l),f(l?O-1:O+1),e.like(t,e.id)):le("Warning","Please, sign in",3e3)}(t)},children:[Object(q.jsx)("span",{className:"heart ".concat(l?"active":"noactive"),children:Object(q.jsx)(S.d,{})}),O]})]})]})},de=function(e){var t,n,a,i=Object(r.useState)(e.cards),c=Object(E.a)(i,2),s=c[0],o=c[1],l=Object(r.useState)(e.countWords),u=Object(E.a)(l,2),d=u[0],h=u[1],b=Object(r.useState)([]),j=Object(E.a)(b,2),p=j[0],m=j[1],O=Object(r.useState)(e.name||"Deck name"),f=Object(E.a)(O,2),v=f[0],g=f[1],k=Object(r.useRef)(null),x=Object(r.useRef)(null);return Object(q.jsxs)("div",{className:"card_item card_item_active",children:[Object(q.jsx)("p",{className:"card_item_name",children:Object(q.jsx)(Q,{text:v,typeInput:"text",onChanged:function(e,t){return function(e){g(e);var t={name:"name",value:e};m((function(e){return[].concat(Object(w.a)(e),[{type:"CHANGE_DECK",payload:t}])}))}(t)}})}),Object(q.jsxs)("span",{className:"card_item_count_words",children:[d," words"]}),Object(q.jsxs)("p",{className:"card_item_count_repetitions",children:[e.countRepetitions," repetitions"]}),Object(q.jsxs)("div",{className:"card_item_panel_adding",children:[Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{type:"text",className:"form-control",id:"floatingInput",placeholder:"type word...",ref:k}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Main word"})]}),Object(q.jsx)("span",{className:"card_item_panel_toggler",children:"\u2194"}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{type:"text",className:"form-control",id:"floatingInput",placeholder:"type word...",ref:x}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Second word"})]}),Object(q.jsx)("button",{className:"card_item_panel_button_add",onClick:function(e){var t,n,a={id:-1,main_word:null===(t=k.current)||void 0===t?void 0:t.value,answer:null===(n=x.current)||void 0===n?void 0:n.value,type:"default",description:""};o((function(e){return[].concat(Object(w.a)(e),[a])})),h((function(e){return e+1})),m((function(e){return[].concat(Object(w.a)(e),[{type:"NEW_CARD",payload:a}])}))},children:"add"}),Object(q.jsx)("div",{className:"card_item_panel_item_words",children:Object(q.jsx)("ul",{className:"card_item_panel_item_words_ul",children:s.map((function(e){return Object(q.jsxs)("li",{className:"item",children:[Object(q.jsx)("span",{className:"main_word",children:e.main_word}),"-",Object(q.jsx)("span",{className:"second_word",children:e.answer})]})}))})})]}),Object(q.jsxs)("div",{className:"buttons_group",children:[(null===(t=e.enableMethods)||void 0===t?void 0:t.enableCreate)&&Object(q.jsx)("button",{className:"button_manipulate",onClick:function(t){var n={name:v,isPrivate:!1,description:"",mainLang:"RU",secondLang:"ENG",price:0,cards:s};e.create(t,n)},children:"create"}),(null===(n=e.enableMethods)||void 0===n?void 0:n.enableSave)&&Object(q.jsx)("button",{className:"button_manipulate",onClick:function(t){return e.save(t,e.id,p)},children:"save"}),(null===(a=e.enableMethods)||void 0===a?void 0:a.enableDelete)&&Object(q.jsx)("button",{className:"button_manipulate",onClick:function(t){return e.delete(t,e.id)},children:"delete"})]})]})},he=function(e){return Object(q.jsx)("div",{className:"card_item card_item_noactive new_card",children:Object(q.jsx)("div",{className:"svg_wrapper",children:Object(q.jsx)(S.j,{onClick:function(t){return e.add(t)}})})})},be={Header:z,Deck:ue,Currsection:function(e){var t=e.info;return Object(q.jsx)("section",{className:"lesson_section lesson_info",children:Object.keys(t).map((function(e,n){return Object(q.jsxs)("p",{className:"lesson_info_item",children:[Object(q.jsxs)("span",{className:"lesson_info_item_key",children:[e,":"]}),Object(q.jsx)("span",{className:"lesson_info_item_value",children:Object.values(t)[n]})]})}))})},Notification:function(e){var t=Object(r.useState)(e.visible),n=Object(E.a)(t,2),a=(n[0],n[1]);return e.visible&&setTimeout((function(){a(!1),se.dispatch(J.notification.hide())}),e.timeout||2e3),Object(q.jsx)("div",{className:"Notification notify_".concat(e.type||"default"),style:{display:e.visible?"block":"none"},children:Object(q.jsxs)("div",{className:"Notification_wrapper_content",children:[Object(q.jsx)("div",{className:"close",onClick:function(e){return se.dispatch(J.notification.hide())},children:Object(q.jsx)(S.m,{})}),Object(q.jsx)("h2",{className:"head",children:e.head}),Object(q.jsx)("p",{className:"content",children:e.content})]})})}},je=document.querySelector(".loader__wrapper"),pe=function(){je.classList.remove("loader__wrapper--hide"),document.body.style.overflowY="hidden"},me=function(){je.classList.add("loader__wrapper--hide"),document.body.style.overflowY="scroll"},Oe=be,fe=(n(41),function(e){return Object(q.jsxs)("div",{className:"Popup_confirm",children:[Object(q.jsx)("button",{className:"btn btn-danger",onClick:function(t){return e.success(!1)},children:"Cancel"}),Object(q.jsx)("button",{className:"btn btn-primary",onClick:function(t){return e.success(!0)},children:"Accept"})]})}),ve=Object(h.b)(null,(function(e){return{hide:function(){return e(J.popup.hide())}}})),ge=function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).state={visible:a.props.visible||!1},a}return Object(p.a)(n,[{key:"close",value:function(){this.props.hide(),this.props.close()}},{key:"success",value:function(e){this.props.success(e),this.props.hide(),this.props.close()}},{key:"switchModals",value:function(e){return e===C.CONFIRM?Object(q.jsx)(fe,{success:this.success.bind(this)}):Object(q.jsx)(q.Fragment,{})}},{key:"render",value:function(){return d.a.createPortal(Object(q.jsx)("div",{className:"Popup__wrapper ".concat(this.props.visible?"active":"noactive"),children:Object(q.jsxs)("div",{className:"Popup",children:[Object(q.jsx)("div",{className:"control_top",children:Object(q.jsx)("span",{className:"close_button",onClick:this.close.bind(this),children:Object(q.jsx)(S.m,{})})}),Object(q.jsx)("div",{className:"head",children:Object(q.jsx)("span",{children:this.props.head})}),Object(q.jsx)("div",{className:"content",children:Object(q.jsx)("span",{children:this.props.content})}),Object(q.jsx)("div",{className:"control_botton",children:this.switchModals(this.props.type)})]})}),document.getElementById("root-modals"))}}]),n}(l.a.PureComponent),ke=function(e,t,n,a){return se.dispatch(J.popup.show(C.CONFIRM,e,t,{close:n,success:a}))},xe=ve(ge),_e=Object(h.b)((function(e){return{user:e.app.user}}))(function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).state={decksSubscriptions:[],decksOwned:[],isNewDeck:!1,isEdit:!1,deckEdit:null},pe(),a}return Object(p.a)(n,[{key:"addDeck",value:function(e){this.setState({isNewDeck:!0})}},{key:"saveDeck",value:function(e,t,n){var a=this;y.applyChanges(t,n).then((function(e){console.log(e),a.setState({isEdit:!1})})).catch((function(e){return console.log(e)}))}},{key:"editDeck",value:function(e,t){console.log("edit",t),this.setState({isEdit:!0,deckEdit:this.state.decksOwned[t]})}},{key:"deleteDeck",value:function(e,t){ke("\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0435\u043a?","\u0415\u0441\u043b\u0438 \u0432\u044b \u0443\u0434\u0430\u043b\u0438\u0442\u0435 \u0434\u0435\u043a, \u0432\u0441\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0442\u043e\u0436\u0435 \u0443\u0434\u0430\u043b\u044f\u0442\u0441\u044f, \u0432\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u044d\u0442\u043e \u0441\u0434\u0435\u043b\u0430\u0442\u044c?",(function(){}),(function(e){e&&y.deleteDeck(t).then((function(e){console.log(e),e.data.error||oe("OK","\u0414\u0435\u043a \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d",3e3)})).catch((function(e){re("\u041e\u0448\u0431\u0438\u043a\u0430","\u0414\u0435\u043a \u043d\u0435 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d",3e3)}))}))}},{key:"like",value:function(e,t){y.setLike(t).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),console.log("like",t)}},{key:"changePrivate",value:function(e,t,n){y.applyChanges(t,[{type:"CHANGE_DECK",payload:{name:"isPrivate",value:Number(n)}}]).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}},{key:"createNewDeck",value:function(e,t){var n=this;y.addDeck(t).then((function(e){console.log(e),n.setState({isNewDeck:!1,decksOwned:[].concat(Object(w.a)(n.state.decksOwned),[Object(b.a)({},t)])})})).catch((function(e){return console.log(e)}))}},{key:"componentDidMount",value:function(){var e=this;console.log(this.state.decksOwned),0===this.state.decksOwned.length&&y.getDecks().then((function(t){console.log(t),!t.error&&e.setState({decksSubscriptions:[].concat(Object(w.a)(e.state.decksSubscriptions),Object(w.a)(t.data.subscriptions)),decksOwned:[].concat(Object(w.a)(e.state.decksOwned),Object(w.a)(t.data.owned))}),me()})).catch((function(e){return re("Error","Failed to load data",3e3)}))}},{key:"render",value:function(){var e=this;return Object(q.jsxs)(l.a.Fragment,{children:[Object(q.jsxs)("section",{className:"lesson_section",children:[Object(q.jsx)("h2",{className:"cards_main_name",children:"My Decks"}),Object(q.jsxs)("div",{className:"cards",children:[this.state.isEdit&&Object(q.jsx)(de,{index:-1,id:this.state.deckEdit.id,name:this.state.deckEdit.name,countWords:this.state.deckEdit.countWords,countRepetitions:this.state.deckEdit.countRepetitions,isPrivate:this.state.deckEdit.isPrivate,mainLang:this.state.deckEdit.mainLang,secondLang:this.state.deckEdit.secondLang,cards:this.state.deckEdit.cards,author:this.state.deckEdit.author,owner:this.state.deckEdit.owner,description:this.state.deckEdit.description,countLikes:this.state.deckEdit.countLikes||0,activeLike:this.state.deckEdit.activeLike||!1,enableMethods:{enableSave:!0,enableDelete:!0},save:this.saveDeck.bind(this),delete:this.deleteDeck}),this.state.isNewDeck&&Object(q.jsx)(de,{index:-1,id:-1,name:"New Deck",countWords:0,countRepetitions:0,isPrivate:!1,mainLang:"RU",secondLang:"ENG",cards:[],author:this.props.user.login,owner:this.props.user.login,description:"",countLikes:0,activeLike:!1,enableMethods:{enableCreate:!0},create:this.createNewDeck.bind(this)}),Object(q.jsx)(he,{add:this.addDeck.bind(this)}),0!==this.state.decksOwned.length&&this.state.decksOwned.map((function(t,n){return Object(q.jsx)(ue,{index:n,id:t.id,name:t.name,countWords:t.countWords||0,author:t.author,owner:t.owner,description:t.description,countRepetitions:t.countRepetitions||0,isPrivate:t.isPrivate,mainLang:t.mainLang.toUpperCase(),secondLang:t.secondLang.toUpperCase(),countLikes:t.countLikes||0,activeLike:t.activeLike||!1,cards:t.cards,enableMethods:{enableChangePrivate:!0,enableDelete:!0,enableEdit:!0,enableLike:!0},edit:e.editDeck.bind(e),delete:e.deleteDeck,like:e.like,changePrivate:e.changePrivate.bind(e)},"deck_".concat(n))}))]})]}),Object(q.jsxs)("section",{className:"lesson_section",children:[Object(q.jsx)("h2",{className:"cards_main_name",children:"My Subscribed Decks"}),Object(q.jsx)("div",{className:"cards",children:0!==this.state.decksSubscriptions.length&&this.state.decksSubscriptions.map((function(t,n){return Object(q.jsx)(ue,{index:n,id:t.id,name:t.name,countWords:t.countWords||0,author:t.author,owner:t.owner,description:t.description,countRepetitions:t.countRepetitions||0,isPrivate:t.isPrivate,mainLang:t.mainLang.toUpperCase(),secondLang:t.secondLang.toUpperCase(),countLikes:t.countLikes||0,activeLike:t.activeLike||!1,cards:t.cards,subscribed:t.subscribed,enableMethods:{enableLike:!0,enableSubscribe:!0},like:e.like},"deck_".concat(n))}))})]})]})}}]),n}(l.a.Component)),Ne=(n(42),n(43),function(e){return Object(q.jsx)("div",{className:"home",children:Object(q.jsx)("p",{style:{color:"white"},children:"Home, sweet home"})})}),ye=(n(44),Object(h.b)((function(e){return{auth:e.app.auth}}),(function(e){return{login:function(t){return e(J.app.login(t))}}}))(function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).state={loginValidate:null,passwordValidate:null},a.login=Object(r.createRef)(),a.password=Object(r.createRef)(),a}return Object(p.a)(n,[{key:"clickLogin",value:function(e){var t,n,a=this;e.preventDefault(),y.login({login:null===(t=this.login.current)||void 0===t?void 0:t.value,password:null===(n=this.password.current)||void 0===n?void 0:n.value}).then((function(e){e.data.error?re("\u041e\u0448\u0438\u0431\u043a\u0430","\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c",4e3):(a.props.login(e.data),a.props.history.push("/"),oe("OK","\u0412\u044b \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d\u044b!",3e3))})).catch((function(e){return re("Error","Error on server")}))}},{key:"validateForm",value:function(e){switch(console.log(e),e.target.name){case"login":e.target.value.length>3&&e.target.value.length<30?this.setState({loginValidate:!0}):this.setState({loginValidate:!1});break;case"password":e.target.value.length>7&&e.target.value.length<40?this.setState({passwordValidate:!0}):this.setState({passwordValidate:!1})}}},{key:"render",value:function(){var e=this;return Object(q.jsx)("div",{className:"login",children:Object(q.jsxs)("form",{children:[Object(q.jsx)("h2",{children:"Login"}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{type:"text",name:"login",onBlur:function(t){return e.validateForm(t)},ref:this.login,className:"input-login form-control \n\t\t\t\t\t\t\t\t".concat(null!==this.state.loginValidate?this.state.loginValidate?"is-valid":"is-invalid":""),id:"floatingInput",placeholder:"your login"}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Login"})]}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{type:"password",onBlur:function(t){return e.validateForm(t)},ref:this.password,className:"input-password form-control \n\t\t\t\t\t\t\t\t".concat(null!==this.state.passwordValidate?this.state.passwordValidate?"is-valid":"is-invalid":""),id:"floatingInput",name:"password",placeholder:"your password"}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Password"})]}),Object(q.jsx)("button",{className:"btn btn-primary",onClick:function(t){return e.clickLogin(t)},children:"login"})]})})}}]),n}(l.a.Component))),we=function(e){return Object(q.jsx)("div",{className:"page_statistics",children:"Statistics"})},Ee=Object(h.b)((function(e){return{auth:e.app.auth}}),(function(e){return{login:function(t){return e(J.app.login(t))}}}))(function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).state={nameValidate:null,loginValidate:null,passwordValidate:null},a.name=Object(r.createRef)(),a.login=Object(r.createRef)(),a.password=Object(r.createRef)(),a.rpassword=Object(r.createRef)(),a}return Object(p.a)(n,[{key:"clickRegistration",value:function(e){var t,n,a,i,c,s=this;(e.preventDefault(),this.state.loginValidate&&this.state.nameValidate&&this.state.passwordValidate)?(null===(t=this.password.current)||void 0===t?void 0:t.value)===(null===(n=this.rpassword.current)||void 0===n?void 0:n.value)?y.registration({name:null===(a=this.name.current)||void 0===a?void 0:a.value,login:null===(i=this.login.current)||void 0===i?void 0:i.value,password:null===(c=this.password.current)||void 0===c?void 0:c.value,refer:null}).then((function(e){console.log(e),e.data.error?re("\u041e\u0448\u0438\u0431\u043a\u0430","\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e, \u0442\u0430\u043a\u043e\u0439 \u043b\u043e\u0433\u0438\u043d \u0443\u0436\u0435 \u0437\u0430\u043d\u044f\u0442",4e3):(s.props.login(e.data),s.props.history.push("/"))})).catch((function(e){return console.log(e)})):le("\u041e\u0448\u0438\u0431\u043a\u0430","\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442",4e3):le("\u041e\u0448\u0438\u0431\u043a\u0430","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",4e3)}},{key:"onValidate",value:function(e){switch(console.log(e),e.currentTarget.name){case"name":this.setState({nameValidate:e.currentTarget.value.length>4});break;case"login":this.setState({loginValidate:e.currentTarget.value.length>3});break;case"password":this.setState({passwordValidate:e.currentTarget.value.length>7})}}},{key:"render",value:function(){var e=this;return Object(q.jsx)("div",{className:"registration",children:Object(q.jsxs)("form",{children:[Object(q.jsx)("h2",{children:"Registration"}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{name:"name",className:"form-control ".concat(null!==this.state.nameValidate?this.state.nameValidate?"is-valid":"is-invalid":""),onBlur:function(t){return e.onValidate(t)},type:"text",ref:this.name,id:"floatingInput",placeholder:"your name"}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Name"})]}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{name:"login",className:"form-control ".concat(null!==this.state.loginValidate?this.state.loginValidate?"is-valid":"is-invalid":""),onBlur:function(t){return e.onValidate(t)},type:"text",ref:this.login,id:"floatingInput",placeholder:"your login"}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Login"})]}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{name:"password",className:"form-control ".concat(null!==this.state.passwordValidate?this.state.passwordValidate?"is-valid":"is-invalid":""),onBlur:function(t){return e.onValidate(t)},type:"password",ref:this.password,id:"floatingInput",placeholder:"your password"}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Password"})]}),Object(q.jsxs)("div",{className:"form-floating mb-3",children:[Object(q.jsx)("input",{type:"password",ref:this.rpassword,className:"form-control",id:"floatingInput",placeholder:"your password"}),Object(q.jsx)("label",{htmlFor:"floatingInput",children:"Repeat password"})]}),Object(q.jsx)("button",{className:"btn btn-primary",onClick:function(t){return e.clickRegistration(t)},children:"registration"})]})})}}]),n}(l.a.Component)),Se=function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){return Object(j.a)(this,n),t.call(this,e)}return Object(p.a)(n,[{key:"render",value:function(){return Object(q.jsx)("div",{className:"Play",style:{color:"white"},children:"Play!!!"})}}]),n}(l.a.Component),Ce=Object(h.b)((function(e){return{auth:e.app.auth,notify:e.notification}}))(function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).state={decks:[]},pe(),a}return Object(p.a)(n,[{key:"handleLike",value:function(e,t){console.log("like",t),y.setLike(t).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}},{key:"componentDidMount",value:function(){var e=this;y.getAllDecks().then((function(t){e.setState({decks:t.data.decks}),me()})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return console.log(this.state.decks),Object(q.jsx)("div",{className:"Store",style:{color:"white"},children:Object(q.jsxs)("section",{className:"lesson_section",children:[Object(q.jsx)("h2",{className:"cards_main_name",children:"Store"}),Object(q.jsx)("div",{className:"cards",children:0!==this.state.decks.length&&this.state.decks.map((function(t,n){return Object(q.jsx)(ue,{index:n,id:t.id,name:t.name,countWords:t.countWords||0,author:t.author,owner:t.owner,description:t.description,countRepetitions:t.countRepetitions||0,isPrivate:t.isPrivate,mainLang:t.mainLang.toUpperCase(),secondLang:t.secondLang.toUpperCase(),countLikes:t.countLikes||0,activeLike:t.activeLike||!1,cards:t.cards,subscribed:t.subscribed,like:e.handleLike,enableMethods:{enableLike:e.props.auth,enableSubscribe:!0}},"deck_".concat(n))}))})]})})}}]),n}(l.a.Component)),Le=function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){return Object(j.a)(this,n),t.call(this,e)}return Object(p.a)(n,[{key:"render",value:function(){return Object(q.jsx)("div",{className:"Rating",style:{color:"white"},children:"Rating!!!"})}}]),n}(l.a.Component),De=(n(77),{Main:function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),a=t.call(this,e),pe(),a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){me()}},{key:"render",value:function(){return Object(q.jsx)("div",{className:"Main",style:{color:"white"},children:Object(q.jsxs)("div",{className:"slider",children:[Object(q.jsx)("div",{className:"image_wrapper",children:Object(q.jsx)("img",{className:"image_slider",src:"images/slider.png",alt:"slider image"})}),Object(q.jsxs)("div",{className:"text_block",children:[Object(q.jsx)("h1",{children:"Learn, Repeate and Develop"}),Object(q.jsx)("p",{children:"Welcome to the service for memorizing words in foreign languages using flashcards"})]})]})})}}]),n}(l.a.Component),Decks:_e,Home:Ne,Statistics:we,Play:Se,Store:Ce,Rating:Le,Registration:Ee,Login:ye}),Re=[{isNavBar:!1,isLogin:!1,isExact:!0,path:"/",name:"Main",component:De.Main},{isNavBar:!0,isLogin:!0,isExact:!0,isPrivate:!0,path:"/home",name:"Home",component:De.Home,icon:S.e},{isNavBar:!0,isLogin:!0,isExact:!0,isPrivate:!0,path:"/play",name:"Play",component:De.Play,icon:S.i},{isNavBar:!0,isLogin:!0,isExact:!0,isPrivate:!0,path:"/decks",name:"Decks",component:De.Decks,icon:S.f},{isNavBar:!0,isExact:!0,path:"/store",name:"Store",component:De.Store,icon:S.l},{isNavBar:!0,isLogin:!0,isExact:!0,isPrivate:!0,path:"/statistics",name:"Statistics",component:De.Statistics,icon:S.b},{isNavBar:!0,isExact:!0,path:"/rating",name:"Rating",component:De.Rating,icon:S.k},{isNavBar:!0,isExact:!0,isLogin:!1,path:"/registration",name:"Registration",component:De.Registration},{isNavBar:!0,isLogin:!1,isExact:!0,path:"/login",name:"Login",component:De.Login},{isNavBar:!1,isLogin:!1,isExact:!0,path:"/user/:login",name:"User",component:De.Home}],Pe=function(e,t){var n=function(n){Object(m.a)(i,n);var a=Object(O.a)(i);function i(){return Object(j.a)(this,i),a.apply(this,arguments)}return Object(p.a)(i,[{key:"render",value:function(){return t?Object(q.jsx)(e,Object(b.a)({},this.props)):Object(q.jsx)(f.a,{to:"/login"})}}]),i}(l.a.Component);return n},Ie=(n(78),n(79),n(80),Object(h.b)((function(e){return{auth:e.app.auth,notify:e.notification,popupProps:e.popup}}),(function(e){return{login:function(t){return e(J.app.login(t))},logout:function(){return e(J.app.logout())},confirm:function(t,n,a,i){return e(J.popup.show(C.CONFIRM,t,n,{close:a,success:i}))}}}))),Te=function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){return Object(j.a)(this,n),t.call(this,e)}return Object(p.a)(n,[{key:"render",value:function(){var e=this;return Object(q.jsx)(f.d,{children:Re.map((function(t){var n=t.isPrivate?Pe(t.component,e.props.auth):t.component;return Object(q.jsx)(f.b,{exact:!0,path:t.path,component:n},t.path)}))})}}]),n}(l.a.PureComponent),Ae=Ie(function(e){Object(m.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).state={auth:!0},a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e,t=this;void 0!==(null===(e=localStorage.getItem("token"))||void 0===e?void 0:e.length)&&"undefined"!==localStorage.getItem("token")?y.auth().then((function(e){console.log(e),e.data.error?t.props.logout():(t.setState({auth:!0}),t.props.login(e.data.data))})).catch((function(e){return console.log(e)})):this.setState({auth:!1}),me()}},{key:"render",value:function(){return Object(q.jsx)(v.a,{children:Object(q.jsxs)(l.a.Fragment,{children:[Object(q.jsx)(Oe.Header,{routes:Re.filter((function(e){return e.isNavBar}))}),Object(q.jsx)(Te,{auth:this.state.auth}),Object(q.jsx)(Oe.Notification,Object(b.a)({},this.props.notify)),Object(q.jsx)(xe,Object(b.a)({},this.props.popupProps))]})})}}]),n}(l.a.PureComponent));d.a.render(Object(q.jsx)(h.a,{store:se,children:Object(q.jsx)(Ae,{})}),document.getElementById("root"))},9:function(e){e.exports=JSON.parse('{"a":"","b":{"MAIN":"/","USERS":"/users","REGISTRATION":"/registration","LOGIN":"/login","AUTH":"/auth","GET_DECKS":"/get_decks","GET_ALL_DECKS":"/get_all_decks","SET_LIKE":"/like","ADD_DECK":"/new_deck","CHANGE_DECK":"/change_deck","SUBSCRIBE_DECK":"/subscribe","DELETE_DECK":"/delete_deck"}}')}},[[81,1,2]]]);
//# sourceMappingURL=main.1a68de74.chunk.js.map