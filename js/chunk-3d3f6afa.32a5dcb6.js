(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d3f6afa"],{"6cb3":function(e,t,n){},"9ed6":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("van-nav-bar",{staticClass:"app-nav-bar",attrs:{title:"注册 / 登录","left-arrow":""},on:{"click-left":function(t){return e.$router.back()}}}),n("van-form",{ref:"loginForm",attrs:{"show-error":!1,"show-error-message":!1,"validate-first":""},on:{submit:function(t){return e.onLogin()},failed:e.onFailed}},[n("van-field",{attrs:{placeholder:"请输入手机号","icon-prefix":"toutiao","left-icon":"shouji",name:"mobile",rules:e.formRules.mobile},model:{value:e.user.mobile,callback:function(t){e.$set(e.user,"mobile",t)},expression:"user.mobile"}}),n("van-field",{attrs:{placeholder:"请输入验证码","icon-prefix":"toutiao","left-icon":"yanzhengma",name:"code",rules:e.formRules.code},scopedSlots:e._u([{key:"button",fn:function(){return[e.isCountDownShow?n("van-count-down",{staticClass:"countdown",attrs:{time:6e4,format:"ss 秒"},on:{finish:function(t){e.isCountDownShow=!1}}}):e._e(),e.isCountDownShow?e._e():n("van-button",{ref:"codeBtn",staticClass:"code-btn",attrs:{size:"small",round:"",loading:e.isSendSmsLoading,"loading-text":"发送中..."},on:{click:function(t){return t.preventDefault(),e.onSendSms.apply(null,arguments)}}},[e._v(" 获取验证码 ")])]},proxy:!0}]),model:{value:e.user.code,callback:function(t){e.$set(e.user,"code",t)},expression:"user.code"}}),n("div",{staticClass:"login-btn-wrap"},[n("van-button",{staticClass:"login-btn",attrs:{type:"info",block:""}},[e._v(" 登录 ")])],1)],1)],1)},r=[],a=n("1da1"),s=(n("b0c0"),n("96cf"),n("c24f")),i=n("d399"),u={name:"LoginIndex",data:function(){return{user:{mobile:"",code:""},formRules:{mobile:[{required:!0,message:"手机号不能为空"},{pattern:/^1[3|5|7|8]\d{9}$/,message:"手机号格式错误"}],code:[{required:!0,message:"验证码不能为空"},{pattern:/^\d{6}$/,message:"验证码格式错误"}]},isCountDownShow:!1,isSendSmsLoading:!1}},methods:{onLogin:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i["a"].loading({message:"正在登录...",forbidClick:!0,duration:0}),t.prev=1,t.next=4,Object(s["f"])(e.user);case 4:n=t.sent,i["a"].success("登录成功"),e.$store.commit("setUser",n.data.data),e.$store.commit("removeCachePage","LayoutIndex"),e.$router.back(),t.next=16;break;case 11:t.prev=11,t.t0=t["catch"](1),console.log(t.t0),console.log("登录失败"),i["a"].fail("登录失败，手机号或验证码错误");case 16:case"end":return t.stop()}}),t,null,[[1,11]])})))()},onFailed:function(e){e.errors[0]&&(this.error=e.errors,Object(i["a"])({message:e.errors[0].message,position:"top"}))},onSendSms:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs.loginForm.validate("mobile");case 3:return e.isSendSmsLoading=!0,t.next=6,Object(s["g"])(e.user.mobile);case 6:e.isCountDownShow=!0,i["a"].success({message:"发送验证码成功，注意查看手机",position:"top"}),t.next=17;break;case 10:t.prev=10,t.t0=t["catch"](0),e.isCountDownShow=!1,e.isSendSmsLoading=!1,n="","mobile"===t.t0.name?n=t.t0.message:t.t0.isAxiosError&&(n="发送太频繁了，请稍后再试"),Object(i["a"])({message:n,position:"top"});case 17:case"end":return t.stop()}}),t,null,[[0,10]])})))()}}},c=u,l=(n("d218"),n("2877")),d=Object(l["a"])(c,o,r,!1,null,"86bea8be",null);t["default"]=d.exports},b0c0:function(e,t,n){var o=n("83ab"),r=n("5e77").EXISTS,a=n("e330"),s=n("9bf2").f,i=Function.prototype,u=a(i.toString),c=/^\s*function ([^ (]*)/,l=a(c.exec),d="name";o&&!r&&s(i,d,{configurable:!0,get:function(){try{return l(c,u(this))[1]}catch(e){return""}}})},c24f:function(e,t,n){"use strict";n.d(t,"f",(function(){return r})),n.d(t,"g",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"e",(function(){return i})),n.d(t,"i",(function(){return u})),n.d(t,"h",(function(){return c}));var o=n("b775"),r=function(e){return Object(o["a"])({method:"POST",url:"/v1_0/authorizations",data:e})},a=function(e){return Object(o["a"])({method:"GET",url:"/v1_0/sms/codes/".concat(e)})},s=function(){return Object(o["a"])({method:"GET",url:"/v1_0/user"})},i=function(){return Object(o["a"])({method:"GET",url:"/v1_0/user/profile"})},u=function(e){return Object(o["a"])({method:"PATCH",url:"/v1_0/user/profile",data:e})},c=function(e){return Object(o["a"])({method:"PATCH",url:"/v1_0/user/photo",data:e})},l=function(){return Object(o["a"])({method:"GET",url:"/v1_0/user/channels"})},d=function(e){return Object(o["a"])({method:"POST",url:"/v1_0/user/followings",data:{target:e}})},f=function(e){return Object(o["a"])({method:"DELETE",url:"/v1_0/user/followings/".concat(e)})}},d218:function(e,t,n){"use strict";n("6cb3")}}]);
//# sourceMappingURL=chunk-3d3f6afa.32a5dcb6.js.map