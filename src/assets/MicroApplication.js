// 微应用模块
import Vue from 'vue'
const microApplication = {
    // 员工数据
    employeeNumber:function employeeNumber(ip,postdata){
        var ipstr = ip + '?oid=' + postdata.oid +'&access_token=' + postdata.access_token
        return Vue.http.get(ipstr,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取微应用列表
    microApplicationList:function microApplicationList(ip,postdata){
        var ipstr = ip + '/' + postdata.orgId
        return Vue.http.post(ipstr,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 微应用列表编辑排序
    microApplicationListSort:function microApplicationListSort(ip,postdata){
        var ipstr = ip + '/' + postdata.orgId
        return Vue.http.post(ipstr,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },

//    ******************** 审批模块 *************************
    // 审批列表
    approvalList:function approvalList(ip,postdata){
        var ipstr = ip + '?oid=' + postdata.oid +'&access_token=' + postdata.access_token
        return Vue.http.get(ipstr,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取审批设置项
    approvalSetItem:function approvalSetItem(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 保存审批设置项
    approvalsaveSetItem:function approvalsaveSetItem(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 设置审批流程
    approvalupdateProcess:function approvalupdateProcess(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 清空审批流程
    approvaldeleteProcess:function approvaldeleteProcess(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取审批条件
    approvalcdnget:function approvalcdnget(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 保存审批条件
    approvalcdnsave:function approvalcdnsave(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除审批条件
    approvalcdndelete:function approvalcdndelete(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取抄送人
    approvalcopyget:function approvalcopyget(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 保存抄送人
    approvalcopysave:function approvalcopysave(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取人员及头像列表
    deptGetOrgTreeAndUser:function deptGetOrgTreeAndUser(ip,postdata){
        // var ipstr = ip + '?oid=' + postdata.oid + '&uid=' + postdata.uid +'&access_token=' + postdata.access_token
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
//    **************************** 资讯模块 ******************************
    // 获取侧导航栏目
    columnGet:function columnGet(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    }, 
    // 获取所有内容列表
    contentGet:function contentGet(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    }, 
    // 删除内容
    contentDelete:function contentDelete(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 设为轮播
    contentUpdate:function contentUpdate(ip,postdata){
    return Vue.http.post(ip,postdata).then(response => {
        if(response.status == 200){
            return Promise.resolve(response.body)
        }else{
            return Promise.reject(response.data.message)
        }
      })
    },
    // 获取内容详情
    contentdetail:function contentdetail(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 保存/编辑内容
    contentedit:function contentedit(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
}
export default microApplication
// module.exports = companyset