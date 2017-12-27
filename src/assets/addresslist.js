// 通讯录
import Vue from 'vue'
const addresslist = {
    // 添加部门
    addBranch:function addBranch(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取树结构
    OrgTreeList:function OrgTreeList(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除部门
    DelBranch:function DelBranch(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取部门信息
    BranchInfo:function BranchInfo(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 编辑部门信息
    addBranchInfo:function addBranchInfo(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取子公司信息
    ChildCompanylist:function ChildCompanylist(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加子公司
    addChildSave:function addChildSave(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取部门人员列表
    BranchMemberlist:function BranchMemberlist(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 下载新的通讯录excel模板
    // newTemplet:function newTemplet(ip,postdata){
    //     var ipstr = ip + '/' + postdata.oid + '/' + postdata.uid
    //     return Vue.http.get(ipstr,{}).then(response => {
    //         if(response.status == 200){
    //             return Promise.resolve(response.body)
    //         }else{
    //             return Promise.reject(response.data.message)
    //         }
    //     })
    // },
    // 添加用户自定义标签
    addUserDefineConlist:function addUserDefineConlist(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除自定义标签
    delUserDefineConlist:function delUserDefineConlists(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取用户自定义标签
    AllUserDefineConlist:function AllUserDefineConlist(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 编辑用户自定义标签
    editUserDefineConlist:function editUserDefineConlist(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取地区信息
    RegionList:function RegionList(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取子公司信息
    ChildCompanyInfo:function ChildCompanyInfo(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 编辑子公司
    editChildSave:function editChildSave(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 企业人员搜索
    RequestList:function RequestList(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取成员模板信息
    UserAttrTemplateInfo:function UserAttrTemplateInfo(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加成员信息
    addMemberSave:function addMemberSave(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取部门用户详情
    editMemberInfo:function editMemberInfo(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除部门成员
    DelBranchMember:function DelBranchMember(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 批量删除部门人员
    BatchDelBranchMember:function BatchDelBranchMember(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 调整部门顺序
    sortBranch:function sortBranch(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 调整部门人员顺序
    sortBranchMember:function sortBranchMember(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 上传通讯录
    uploadFileExcel:function uploadFileExcel(ip,postdata){
        var oid =  sessionStorage.getItem('orgId')
        var uid =  sessionStorage.getItem('userId')
        var TOKEN = sessionStorage.getItem('accessToken')
        var ipstr = ip + '/' + oid + '/' + uid + '?access_token=' + TOKEN
        return Vue.http.post(ipstr,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 删除子公司
    DelChildOrg:function DelChildOrg(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 调整人员部门
    AdjustBranch:function AdjustBranch(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 保存通讯录excel表
    saveExcelList:function saveExcelList(ip,postdata){
        var oid =  sessionStorage.getItem('orgId')
        var uid =  sessionStorage.getItem('userId')
        var TOKEN = sessionStorage.getItem('accessToken')
        var ipstr = ip + '/' + oid + '/' + uid + '?access_token=' + TOKEN
        return Vue.http.post(ipstr,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取部门下的人员
    RequestOnlyPeopleList:function RequestOnlyPeopleList(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
}
export default addresslist