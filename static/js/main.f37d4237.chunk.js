(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{86:function(t,e,n){},87:function(t,e,n){},97:function(t,e,n){"use strict";n.r(e);var i=n(0),c=n.n(i),a=n(28),l=n.n(a),r=(n(86),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,163)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,a=e.getLCP,l=e.getTTFB;n(t),i(t),c(t),a(t),l(t)}))}),o=(n(87),n(14)),s=n(150),d=n(158),u=n(146),j=n(2),b=c.a.memo((function(t){console.log("AddItemForm called");var e=Object(i.useState)(""),n=Object(o.a)(e,2),c=n[0],a=n[1],l=Object(i.useState)(null),r=Object(o.a)(l,2),b=r[0],O=r[1],T=function(){""!==c.trim()?(t.addItem(c),a("")):O("Title is required")};return Object(j.jsxs)("div",{children:[Object(j.jsx)(s.a,{variant:"outlined",error:!!b,value:c,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){null!==b&&O(null),13===t.charCode&&T()},label:"Title",helperText:b}),Object(j.jsx)(d.a,{color:"primary",onClick:T,children:Object(j.jsx)(u.a,{})})]})})),O=c.a.memo((function(t){console.log("EditableSpan called");var e=Object(i.useState)(!1),n=Object(o.a)(e,2),c=n[0],a=n[1],l=Object(i.useState)(t.value),r=Object(o.a)(l,2),d=r[0],u=r[1];return c?Object(j.jsx)(s.a,{value:d,onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){a(!1),t.onChange(d)}}):Object(j.jsx)("span",{onDoubleClick:function(){a(!0),u(t.value)},children:t.value})})),T=n(155),f=n(152),h=n(147),k=c.a.memo((function(t){var e=Object(i.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(i.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n,t.todolistId)}),[t.task.id,t.todolistId]),c=Object(i.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(j.jsxs)("div",{className:t.task.isDone?"is-done":"",children:[Object(j.jsx)(f.a,{checked:t.task.isDone,color:"primary",onChange:n}),Object(j.jsx)(O,{value:t.task.title,onChange:c}),Object(j.jsx)(d.a,{onClick:e,children:Object(j.jsx)(h.a,{})})]},t.task.id)})),v=c.a.memo((function(t){console.log("Todolist called");var e=Object(i.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),n=Object(i.useCallback)((function(e){t.changeTodolistTitle(t.id,e)}),[t.id,t.changeTodolistTitle]),c=Object(i.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.id,t.changeFilter]),a=Object(i.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.id,t.changeFilter]),l=Object(i.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.id,t.changeFilter]),r=t.tasks;return"active"===t.filter&&(r=t.tasks.filter((function(t){return!1===t.isDone}))),"completed"===t.filter&&(r=t.tasks.filter((function(t){return!0===t.isDone}))),Object(j.jsxs)("div",{children:[Object(j.jsxs)("h3",{children:[Object(j.jsx)(O,{value:t.title,onChange:n}),Object(j.jsx)(d.a,{onClick:function(){t.removeTodolist(t.id)},children:Object(j.jsx)(h.a,{})})]}),Object(j.jsx)(b,{addItem:e}),Object(j.jsx)("div",{children:r.map((function(e){return Object(j.jsx)(k,{task:e,todolistId:t.id,removeTask:t.removeTask,changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus},e.id)}))}),Object(j.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(j.jsx)(T.a,{variant:"all"===t.filter?"outlined":"text",onClick:c,color:"inherit",children:"All"}),Object(j.jsx)(T.a,{variant:"active"===t.filter?"outlined":"text",onClick:a,color:"primary",children:"Active"}),Object(j.jsx)(T.a,{variant:"completed"===t.filter?"outlined":"text",onClick:l,color:"secondary",children:"Completed"})]})]})})),I=n(159),x=n(160),g=n(161),C=n(162),p=n(156),m=n(157),S=n(15),D=n(153),A=[],E=n(4),y=n(24),L={},F=n(39),N=n(148);var K=function(){var t=Object(F.c)((function(t){return t.todolists})),e=Object(F.c)((function(t){return t.tasks})),n=Object(F.b)(),c=Object(i.useCallback)((function(t,e){var i=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(t,e);n(i)}),[]),a=Object(i.useCallback)((function(t,e){var i=function(t,e){return{type:"ADD-TASK",title:t,todolistId:e}}(t,e);n(i)}),[]),l=Object(i.useCallback)((function(t,e,i){var c=function(t,e,n){return{type:"CHANGE-TASK-STATUS",isDone:e,todolistId:n,taskId:t}}(t,e,i);n(c)}),[]),r=Object(i.useCallback)((function(t,e,i){var c=function(t,e,n){return{type:"CHANGE-TASK-TITLE",title:e,todolistId:n,taskId:t}}(t,e,i);n(c)}),[]),o=Object(i.useCallback)((function(t,e){var i={type:"CHANGE-TODOLIST-FILTER",id:e,filter:t};n(i)}),[]),s=Object(i.useCallback)((function(t){var e={type:"REMOVE-TODOLIST",id:t};n(e)}),[]),u=Object(i.useCallback)((function(t,e){var i=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e);n(i)}),[]),O=Object(i.useCallback)((function(t){var e=function(t){return{type:"ADD-TODOLIST",title:t,todolistId:Object(D.a)()}}(t);n(e)}),[n]);return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(I.a,{position:"static",children:Object(j.jsxs)(x.a,{children:[Object(j.jsx)(d.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(j.jsx)(N.a,{})}),Object(j.jsx)(g.a,{variant:"h6",children:"News"}),Object(j.jsx)(T.a,{color:"inherit",children:"Login"})]})}),Object(j.jsxs)(C.a,{fixed:!0,children:[Object(j.jsx)(p.a,{container:!0,style:{padding:"20px"},children:Object(j.jsx)(b,{addItem:O})}),Object(j.jsx)(p.a,{container:!0,spacing:3,children:t.map((function(t){var n=e[t.id];return Object(j.jsx)(p.a,{item:!0,children:Object(j.jsx)(m.a,{style:{padding:"10px"},children:Object(j.jsx)(v,{id:t.id,title:t.title,tasks:n,removeTask:c,changeFilter:o,addTask:a,changeTaskStatus:l,filter:t.filter,removeTodolist:s,changeTaskTitle:r,changeTodolistTitle:u})})},t.id)}))})]})]})},G=n(61),H=Object(G.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":var n=Object(y.a)({},t),i=n[e.todolistId],c=i.filter((function(t){return t.id!=e.taskId}));return n[e.todolistId]=c,n;case"ADD-TASK":var a=Object(y.a)({},t),l={id:Object(D.a)(),title:e.title,isDone:!1},r=a[e.todolistId],o=[l].concat(Object(S.a)(r));return a[e.todolistId]=o,a;case"CHANGE-TASK-STATUS":var s=t[e.todolistId],d=s.map((function(t){return t.id===e.taskId?Object(y.a)(Object(y.a)({},t),{},{isDone:e.isDone}):t}));return t[e.todolistId]=d,Object(y.a)({},t);case"CHANGE-TASK-TITLE":var u=t[e.todolistId],j=u.map((function(t){return t.id===e.taskId?Object(y.a)(Object(y.a)({},t),{},{title:e.title}):t}));return t[e.todolistId]=j,Object(y.a)({},t);case"ADD-TODOLIST":return Object(y.a)(Object(y.a)({},t),{},Object(E.a)({},e.todolistId,[]));case"REMOVE-TODOLIST":var b=Object(y.a)({},t);return delete b[e.id],b;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[{id:e.todolistId,title:e.title,filter:"all"}].concat(Object(S.a)(t));case"CHANGE-TODOLIST-TITLE":var n=t.find((function(t){return t.id===e.id}));return n&&(n.title=e.title),Object(S.a)(t);case"CHANGE-TODOLIST-FILTER":var i=t.find((function(t){return t.id===e.id}));return i&&(i.filter=e.filter),Object(S.a)(t);default:return t}}}),w=Object(G.b)(H);window.store=w,l.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(F.a,{store:w,children:Object(j.jsx)(K,{})})}),document.getElementById("root")),r()}},[[97,1,2]]]);
//# sourceMappingURL=main.f37d4237.chunk.js.map