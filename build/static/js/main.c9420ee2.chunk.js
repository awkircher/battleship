(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{10:function(t,n,r){},11:function(t,n,r){"use strict";r.r(n);var e=r(0),c=r(1),a=r.n(c),i=r(4),u=r.n(i),o=(r(10),r(3)),s=function(t,n,r){var e=[];return{type:t,coordinates:n,targets:e,hit:function(){e.push(!0)},isSunk:function(){return e.length===r}}},f=function(t){for(var n=t.length-1;n>0;n--){var r=Math.floor(Math.random()*(n+1)),e=[t[r],t[n]];t[n]=e[0],t[r]=e[1]}return t},l=function(){var t=[["Carrier",5],["Battleship",4],["Cruiser",3],["Submarine",3],["Destroyer",2]],n=["A1","B1","C1","D1","E1","F1","A2","B2","C2","D2","E2","F2","A3","B3","C3","D3","E3","F3","A4","B4","C4","D4","E4","F4","A5","B5","C5","D5","E5","F5","A6","B6","C6","D6","E6","F6"],r=["A1","B1","C1","D1","E1","F1","A2","B2","C2","D2","E2","F2","A3","B3","C3","D3","E3","F3","A4","B4","C4","D4","E4","F4","A5","B5","C5","D5","E5","F5","A6","B6","C6","D6","E6","F6"],e=[];return{placeShips:function(){function r(r,e){return 0===Math.floor(Math.random()*Math.floor(2))?function(r,e){var c,a=[];for(c=0;c<=30;c+=6)a.push(n.slice(c,c+6));var i=6-r,u=[],o=null;a.forEach((function(n){for(var e=0;e<=i;e++)(o=n.slice(e,e+r)).includes(t[0][0])||o.includes(t[1][0])||o.includes(t[2][0])||o.includes(t[3][0])||o.includes(t[4][0])||u.push(o)}));for(var s=u.shift(),f=function(t){var r=n.findIndex((function(n){return n===s[t]}));n[r]=e},l=0;l<s.length;l++)f(l);return s}(r,e):function(r,e){for(var c=[],a=0;a<6;a++){var i=[n[a],n[a+6],n[a+12],n[a+18],n[a+24],n[a+30]];c.push(i)}var u=6-r,o=[],s=null;c.forEach((function(n){for(var e=0;e<=u;e++)(s=n.slice(e,e+r)).includes(t[0][0])||s.includes(t[1][0])||s.includes(t[2][0])||s.includes(t[3][0])||s.includes(t[4][0])||o.push(s)}));for(var f=o.shift(),l=function(t){var r=n.findIndex((function(n){return n===f[t]}));n[r]=e},h=0;h<f.length;h++)l(h);return f}(r,e)}return f(t),t.forEach((function(t){var n=t[0],c=t[1],a=r(c,n),i=s(n,a,c);e.push(i)})),console.table(e),e},receiveAttack:function(t){var n;e.forEach((function(r){r.coordinates.includes(t)&&(r.hit(),n=!0)}));var c=r.findIndex((function(n){return n===t}));r[c]=n?"hit":"miss"},isGameOver:function(){var t=[];return e.forEach((function(n){!0===n.isSunk()&&t.push(!0)})),5===t.length},yourAttacks:r}},h=function(){return{getComputerAttackTarget:function(t){var n=[];return t.forEach((function(t){"hit"!==t&&"miss"!==t&&n.push(t)})),f(n),n.pop()},getPlayerAttackTarget:function(t){return t.preventDefault(),t.target.dataset.coordinate}}},d=function(t){var n=t.attackGrid.map((function(n){return Object(e.jsxs)("button",{"data-coordinate":n,onClick:t.getPlayerInput,children:["player1 ",n]},n.toString())}));return Object(e.jsx)("div",{children:Object(e.jsx)("div",{className:"player1",children:n})})};var p=function(){var t=l(),n=h(),r=Object(c.useState)(t.placeShips()),a=Object(o.a)(r,2),i=(a[0],a[1],Object(c.useState)(t.yourAttacks)),u=Object(o.a)(i,2),s=u[0],f=u[1];return Object(e.jsx)("div",{className:"App",children:Object(e.jsx)(d,{attackGrid:s,getPlayerInput:function(r){var e=r?n.getPlayerAttackTarget(r):n.getComputerAttackTarget();t.receiveAttack(e),f(t.yourAttacks),console.log(t.isGameOver())}})})};u.a.render(Object(e.jsx)(a.a.StrictMode,{children:Object(e.jsx)(p,{})}),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.c9420ee2.chunk.js.map