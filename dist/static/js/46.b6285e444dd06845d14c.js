webpackJsonp([46,47],{435:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(19),r=i(s),o=a(8);a(107),e.default={name:"set",data:function(){return{isActive_1:!0,isActive_2:!1,oid:"ff80808159956936015995e711f40086",uid:"b7dbe60745954de4bf75e1c6a755ad8e",tableTitle:[],excelData:null,tableData:null,tableDataLength:"",updateData:[],isErrorlist:!1}},created:function(){if(void 0!=sessionStorage.getItem("orgId")){this.oid=sessionStorage.getItem("orgId"),this.uid=sessionStorage.getItem("userId");var t=this,e=JSON.parse(sessionStorage.getItem("excelData"));t.tableTitle=e.title,t.tableData=e.list,t.tableDataLength=e.list.length,e.update&&(t.updateData=e.update),0==e.error?t.isErrorlist=!1:t.isErrorlist=!0}},watch:{},methods:(0,r.default)({goAddresslist:function(){this.$router.push({path:"/home/addresslist"})},reuploadClick:function(){this.$router.push({path:"/home/excelUpload"})},saveClick:function(){var t=this,e=this;e.getsaveExcelList({oid:e.oid,uid:e.uid}).then(function(t){"000000"==t.code?(e.$message({type:"success",message:"保存excel成功！"}),e.$router.push({path:"/home/addresslist"})):e.$message(t.msg)}).catch(function(e){"188888"==JSON.parse(e.bodyText).code?(t.$message({type:"info",message:JSON.parse(e.bodyText).msg}),t.$router.push({path:"/login"})):t.$message({type:"info",message:"服务器错误!"})})}},(0,o.mapActions)(["getsaveExcelList"])),mounted:function(){}}},769:function(t,e,a){e=t.exports=a(6)(),e.push([t.id,".active[data-v-5815ca29]{background-color:rgba(228,74,17,.6);color:#fff}input[type=file][data-v-5815ca29]{display:none}label[data-v-5815ca29]{margin-bottom:0;font-weight:400;color:#fff;width:68px;height:30px;line-height:30px;border-radius:4px;background-color:#e7744a;margin-left:5px;text-align:center;cursor:pointer}.excelUpload[data-v-5815ca29]{width:1008px;margin:0 auto;padding:0 20px}.excelUpload>div[data-v-5815ca29]:first-child{margin-top:30px}.excelUpload>div[data-v-5815ca29]{margin-bottom:30px}.excelUpload>div:first-child > span[data-v-5815ca29]:nth-child(1){color:#e7744a;cursor:pointer}.excelUpload>div[data-v-5815ca29]:nth-child(2),.excelUpload>div[data-v-5815ca29]:nth-child(3){margin-bottom:20px;width:100%;background:#e7744a;padding:9px;color:#fff;border:1px solid #e7744a;border-radius:4px}.excelUpload>div[data-v-5815ca29]:nth-child(3){background:#f5c771;border:none}.excelUpload>div:nth-child(3) span[data-v-5815ca29]:nth-child(2){color:red}.tableBox[data-v-5815ca29]{overflow-x:auto;overflow-y:hidden;white-space:nowrap}ul li[data-v-5815ca29]{height:38px;line-height:38px}ul li div[data-v-5815ca29]{display:inline-block;min-width:80px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width:130px}.firstLi div[data-v-5815ca29]{border-right:1px solid #000;text-align:center;background:#eceff4}.btnBox[data-v-5815ca29]{text-align:center}.btnBox input[data-v-5815ca29]{padding:7px}.btnBox input[data-v-5815ca29]:first-child{background:#fff;border:1px solid #c3c6ce;margin-right:8px}.btnBox input[data-v-5815ca29]:nth-child(2){background:#e7744a;color:#fff;padding:7px 15px}.Butbox[data-v-5815ca29]{cursor:pointer;display:-ms-flexbox;display:flex;height:44px;line-height:44px;margin-top:30px;margin-bottom:15px;font-size:16px}.Butbox div[data-v-5815ca29]:first-child{border-bottom-left-radius:4px;border-top-left-radius:4px;width:155px;height:44px;text-align:center;border:1px solid #d7d7d7;border-right:none}.Butbox div[data-v-5815ca29]:nth-child(2){border-bottom-right-radius:4px;border-top-right-radius:4px;width:155px;height:44px;text-align:center;border:1px solid #d7d7d7;border-left:none}.content[data-v-5815ca29]{border-radius:4px;border:1px solid #d7d7d7}.content>div[data-v-5815ca29]{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:25px}.content>div>div[data-v-5815ca29]:first-child{margin-right:15px}#setMain[data-v-5815ca29]{height:100%;overflow-x:hidden;overflow-y:auto}",""])},1135:function(t,e,a){var i=a(769);"string"==typeof i&&(i=[[t.id,i,""]]);a(7)(i,{});i.locals&&(t.exports=i.locals)},1218:function(t,e,a){a(1135);var i=a(5)(a(435),a(1292),"data-v-5815ca29",null);t.exports=i.exports},1292:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"set",attrs:{id:"setMain"}},[a("div",{staticClass:"excelUpload"},[a("div",[a("span",{on:{click:t.goAddresslist}},[t._v("通讯录")]),t._v(" "),a("span",[t._v(">导入通讯录")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isErrorlist,expression:"!isErrorlist"}]},[t._v("您一共上传了"),a("span",[t._v(t._s(t.tableDataLength))]),t._v("条数据")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isErrorlist,expression:"isErrorlist"}]},[t._v("当前表格中有"),a("span",[t._v(t._s(t.tableDataLength))]),t._v("条错误，请修改完成后重新上传"),a("span",[t._v("（如有误，请调整excel后重新上传）")])]),t._v(" "),a("div",{staticClass:"tableBox"},[a("ul",[a("li",{staticClass:"firstLi"},t._l(t.tableTitle,function(e,i){return a("div",{key:e.name,attrs:{title:e.name}},[t._v(t._s(e.name))])})),t._v(" "),t._l(t.tableData,function(e,i){return a("li",{staticClass:"dataLi"},t._l(e.item,function(e,i){return a("div",{key:e.value,attrs:{title:e.value}},[t._v(t._s(e.value))])}))})],2)]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.updateData.length>0,expression:"updateData.length>0"}]},[t._v("以下有员工信息较之前有变更，将以此次为准（如有误，请调整 excel 重新上传）")]),t._v(" "),a("div",{staticClass:"tableBox"},[a("ul",[a("li",{directives:[{name:"show",rawName:"v-show",value:t.updateData.length>0,expression:"updateData.length>0"}],staticClass:"firstLi"},t._l(t.tableTitle,function(e,i){return a("div",{key:e.name,attrs:{title:e.name}},[t._v(t._s(e.name))])})),t._v(" "),t._l(t.updateData,function(e,i){return a("li",{staticClass:"dataLi"},t._l(e.item,function(e,i){return a("div",{key:e.value,attrs:{title:e.value}},[t._v(t._s(e.value))])}))})],2)]),t._v(" "),a("div",{staticClass:"btnBox"},[a("input",{attrs:{type:"button",value:"重新上传"},on:{click:t.reuploadClick}}),t._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:!t.isErrorlist,expression:"!isErrorlist"}],attrs:{type:"button",value:"保存"},on:{click:t.saveClick}})])])])},staticRenderFns:[]}}});