require('../../api/api')
import install from '../assets/install'
import companyset from '../assets/companyset'
import addresslist from '../assets/addresslist'
import microApplication from '../assets/MicroApplication'

export default {
    // ******************************企业设置模块*************************
    // 获取企业信息
    getGainCompanyInfo({ }, postdata) {
        return companyset.GainCompanyInfo(global.GainCompanyInfoPath, postdata)
    },
    // 保存企业信息
    getSaveCompanySet({ }, postdata) {
        return companyset.SaveCompanySet(global.SaveCompanySetPath, postdata)
    },
    // 上传图片
    uploadFile({ }, postdata) {
        return companyset.uploadFile(global.uploadFilePath, postdata)
    },

    // ******************************通讯录模块*************************
    // 添加子部门
    getaddBranch({ }, postdata) {
        return addresslist.addBranch(global.addBranchPath, postdata)
    },
    // 删除部门
    getDelBranch({ }, postdata) {
        return addresslist.DelBranch(global.DelBranchPath, postdata)
    },
    // 获取树结构
    getOrgTreeList({ }, postdata) {
        return addresslist.OrgTreeList(global.OrgTreeListPath, postdata)
    },
    // 获取部门信息
    getBranchInfo({ }, postdata) {
        return addresslist.BranchInfo(global.BranchInfoPath, postdata)
    },
    // 编辑部门信息
    getaddBranchInfo({ }, postdata) {
        return addresslist.addBranchInfo(global.addBranchInfoPath, postdata)
    },
    // 获取子公司信息
    getChildCompanylist({ }, postdata) {
        return addresslist.ChildCompanylist(global.ChildCompanylistPath, postdata)
    },
    // 添加子公司
    getaddChildSave({ }, postdata) {
        return addresslist.addChildSave(global.addChildSavePath, postdata)
    },
    // 获取部门人员列表
    getBranchMemberlist({ }, postdata) {
        return addresslist.BranchMemberlist(global.BranchMemberlistPath, postdata)
    },
    // 下载通讯录新的excel模板
    // getnewTemplet({},postdata) {
    //   return addresslist.newTemplet(global.newTempletPath,postdata)
    // },
    // 添加自定义标签
    getaddUserDefineConlist({ }, postdata) {
        return addresslist.addUserDefineConlist(global.addUserDefineConlistPath, postdata)
    },
    // 删除自定义标签
    getdelUserDefineConlist({ }, postdata) {
        return addresslist.delUserDefineConlist(global.delUserDefineConlistPath, postdata)
    },
    // 获取用户自定义标签
    getAllUserDefineConlist({ }, postdata) {
        return addresslist.AllUserDefineConlist(global.AllUserDefineConlistPath, postdata)
    },
    // 编辑用户自定义标签
    geteditUserDefineConlist({ }, postdata) {
        return addresslist.editUserDefineConlist(global.editUserDefineConlistPath, postdata)
    },
    // 获取地区信息
    getRegionList({ }, postdata) {
        return addresslist.RegionList(global.RegionListPath, postdata)
    },
    // 获取子公司信息
    getChildCompanyInfo({ }, postdata) {
        return addresslist.ChildCompanyInfo(global.ChildCompanyInfoPath, postdata)
    },
    // 编辑子公司信息
    geteditChildSave({ }, postdata) {
        return addresslist.editChildSave(global.editChildSavePath, postdata)
    },
    // 企业人员搜索
    getRequestList({ }, postdata) {
        return addresslist.RequestList(global.RequestListPath, postdata)
    },
    // 获取成员模板信息
    getUserAttrTemplateInfo({ }, postdata) {
        return addresslist.UserAttrTemplateInfo(global.UserAttrTemplateInfoPath, postdata)
    },
    // 添加成员信息
    getaddMemberSave({ }, postdata) {
        return addresslist.addMemberSave(global.addMemberSavePath, postdata)
    },
    // 获取部门成员详情
    geteditMemberInfo({ }, postdata) {
        return addresslist.editMemberInfo(global.editMemberInfoPath, postdata)
    },
    // 删除部门成员
    getDelBranchMember({ }, postdata) {
        return addresslist.DelBranchMember(global.DelBranchMemberPath, postdata)
    },
    // 批量删除部门人员
    getBatchDelBranchMember({ }, postdata) {
        return addresslist.BatchDelBranchMember(global.BatchDelBranchMemberPath, postdata)
    },
    // 调整部门顺序
    getsortBranch({ }, postdata) {
        return addresslist.sortBranch(global.sortBranchPath, postdata)
    },
    // 调整部门人员顺序
    getsortBranchMember({ }, postdata) {
        return addresslist.sortBranchMember(global.sortBranchMemberPath, postdata)
    },
    // 上传通讯录
    uploadFileExcel({ }, postdata) {
        return addresslist.uploadFileExcel(global.uploadFileExcelPath, postdata)
    },
    // 删除子公司
    getDelChildOrg({ }, postdata) {
        return addresslist.DelChildOrg(global.DelChildOrgPath, postdata)
    },
    // 调整人员部门
    getAdjustBranch({ }, postdata) {
        return addresslist.AdjustBranch(global.AdjustBranchPath, postdata)
    },
    // 保存通讯录excel表
    getsaveExcelList({ }, postdata) {
        return addresslist.saveExcelList(global.saveExcelListPath, postdata)
    },
    // 搜索当前部门下的人员
    getRequestOnlyPeopleList({ }, postdata) {
        return addresslist.RequestOnlyPeopleList(global.RequestOnlyPeopleListPath, postdata)
    },


    // **********登录注册***********

    // 退出注销
    getlogout({ }, postdata) {
        return install.logout(global.logoutPath, postdata)
    },
    // 登录验证
    getlogin({ }, postdata) {
        return install.login(global.loginPath, postdata)
    },
    // 登录验证前获取token
    getloginToken({ }, postdata) {
        return install.loginToken(global.loginTokenPath, postdata)
    },
    //企业注册
    getregister({ }, postdata) {
        return install.register(global.registerPath, postdata)
    },
    //获取校验令牌
    gettoken({ }, postdata) {
        return install.token(global.tokenPath, postdata)
    },
    //校验图片验证码
    getvalidate({ }, postdata) {
        return install.validate(global.validatePath, postdata)
    },
    //校验图片验证码并发送短信
    getvalidatesms({ }, postdata) {
        return install.validatesms(global.validatesmsPath, postdata)
    },
    //获取短信验证码
    getcodesms({ }, postdata) {
        return install.codesms(global.codesmsPath, postdata)
    },
    //校验短信验证码
    getcodevalidatesms({ }, postdata) {
        return install.codevalidatesms(global.codevalidatesmsPath, postdata)
    },
    //获取地区
    getArea({ }, postdata) {
        return install.area(global.areaPath, postdata)
    },
    //获取类型
    gettype({ }, postdata) {
        return install.type(global.typePath, postdata)
    },

    // **********企业首页信息***********

    // 获取首页信息
    getbusiness({ }, postdata) {
        return install.business(global.businessPath, postdata)
    },




    // **********设置模块***********
    //获取权限列表
    getauthgetAllAuth({ }, postdata) {
        return install.authgetAllAuth(global.authgetAllAuthPath, postdata)
    },
    //验证企业管理员
    getadminvalidate({ }, postdata) {
        return install.adminvalidate(global.adminvalidatePath, postdata)
    },
    // 绑定主管理员账号
    getadminchange({ }, postdata) {
        return install.adminchange(global.adminchangePath, postdata)
    },
    // 子管理员列表
    getalladmin({ }, postdata) {
        return install.alladmin(global.alladminPath, postdata)
    },
    // 保存子管理员
    getadminsave({ }, postdata) {
        return install.adminsave(global.adminsavePath, postdata)
    },
    // 子管理员详情页
    getorgAdmineditForward({ }, postdata) {
        return install.orgAdmineditForward(global.orgAdmineditForwardPath, postdata)
    },
    // 编辑子管理员
    getorgAdmineditOrgAdmin({ }, postdata) {
        return install.orgAdmineditOrgAdmin(global.orgAdmineditOrgAdminPath, postdata)
    },
    // 删除子管理员
    getorgAdmindelUserAdmin({ }, postdata) {
        return install.orgAdmindelUserAdmin(global.orgAdmindelUserAdminPath, postdata)
    },
    // 修改密码
    getusermodifyPassWord({ }, postdata) {
        return install.usermodifyPassWord(global.usermodifyPassWordPath, postdata)
    },
    // 获取部门人员
    getdeptstaff({ }, postdata) {
        return install.deptstaff(global.udeptstaffPath, postdata)
    },
    // 获取企业部门
    getdeptgetchild({ }, postdata) {
        return install.deptgetchild(global.deptgetchildPath, postdata)
    },
    // 获取客户端版本信息列表
    getversionfindList({ }, postdata) {
        return install.versionfindList(global.versionfindListPath, postdata)
    },
    // 获取客户端版本信息
    getversioninfo({ }, postdata) {
        return install.versioninfo(global.versioninfoPath, postdata)
    },
    // 修改客户端版本信息
    getversionupdate({ }, postdata) {
        return install.versionupdate(global.versionupdatePath, postdata)
    },
    // 新建客户端版本信息
    getversionsave({ }, postdata) {
        return install.versionsave(global.versionsavePath, postdata)
    },
    // 获取企业团队邀请信息
    getteamgetTeamInvite({ }, postdata) {
        return install.teamgetTeamInvite(global.teamgetTeamInvitePath, postdata)
    },
    // 团队邀请-开启/关闭邀请功能
    getopenInvite({ }, postdata) {
        return install.openInvite(global.openInvitePath, postdata)
    },
    // 团队邀请-开启/申请人操作
    getmodifyApplyInfo({ }, postdata) {
        return install.modifyApplyInfo(global.modifyApplyInfoPath, postdata)
    },
    // 团队邀请-获取用户编辑/申请人弹框表格
    getUserAttrTemplateInfo({ }, postdata) {
        return install.UserAttrTemplateInfo(global.UserAttrTemplateInfoPath, postdata)
    },
    // 团队邀请-申请人列表-获取部门列表
    getDeptPathList({ }, postdata) {
        return install.DeptPathList(global.DeptPathListPath, postdata)
    },
    // 团队邀请-申请人列表-接受/保存申请人
    getsaveOrgUserAttr({ }, postdata) {
        return install.saveOrgUserAttr(global.saveOrgUserAttrPath, postdata)
    },


                             // ********* 微应用模块 *********
    // 获取微应用列表
    getmicroApplicationList ({},postdata){
        return microApplication.microApplicationList(global.appIndexPath,postdata)
    },
    // 获取微应用列表
    getmicroApplicationListSort ({},postdata){
        return microApplication.microApplicationListSort(global.appSortPath,postdata)
    },
                    
                       //  ***************审批模块*******************
    // 审批列表
    getapprovalList ({},postdata){
        return microApplication.approvalList(global.approvalListPath,postdata)
    },
    // 获取审批设置项
    getapprovalSetItem ({},postdata){
        return microApplication.approvalSetItem(global.approvalSetItemPath,postdata)
    },
    // 保存审批设置项
    getapprovalsaveSetItem ({},postdata){
        return microApplication.approvalsaveSetItem(global.approvalsaveSetItemPath,postdata)
    },
    // 设置审批流程
    getapprovalupdateProcess ({},postdata){
        return microApplication.approvalupdateProcess(global.approvalUpdateProcessPath,postdata)
    },
     // 清空审批流程
    getapprovaldeleteProcess ({},postdata){
        return microApplication.approvaldeleteProcess(global.approvalDeleteProcessPath,postdata)
    },
    // 获取审批条件
    getapprovalcdnget ({},postdata){
        return microApplication.approvalcdnget(global.approvalcdngetPath,postdata)
    },
    // 保存审批条件
    getapprovalcdnsave ({},postdata){
        return microApplication.approvalcdnsave(global.approvalcdnsavePath,postdata)
    },
    // 删除审批条件
    getapprovalcdndelete ({},postdata){
        return microApplication.approvalcdndelete(global.approvalcdndeletePath,postdata)
    },
    //获取抄送人
    getapprovalcopyget ({},postdata){
        return microApplication.approvalcopyget(global.approvalCopygetPath,postdata)
    },
    //保存抄送人
    getapprovalcopysave ({},postdata){
        return microApplication.approvalcopysave(global.approvalCopysavePath,postdata)
    },
    // 获取人员列表及头像
    getdeptGetOrgTreeAndUser ({},postdata){
        return microApplication.deptGetOrgTreeAndUser(global.deptGetOrgTreeAndUserPath,postdata)
    },

    // ********************* 资讯模块 ************************
    
    // 获取侧导航栏目
    getcolumnGet ({},postdata){
        return microApplication.columnGet(global.columnGetPath,postdata)
    }, 
    // 获取所有内容列表
    getcontentGet({},postdata){
        return microApplication.contentGet(global.contentGetPath,postdata)
    },  
    // 删除内容
    getcontentDelete({},postdata){
        return microApplication.contentDelete(global.contentDeletePath,postdata)
    }, 
    // 设为轮播
    getcontentUpdate({},postdata){
        return microApplication.contentUpdate(global.contentUpdatePath,postdata)
    }, 
    // 获取内容详情
    getcontentdetail({},postdata){
        return microApplication.contentdetail(global.contentdetailPath,postdata)
    }, 
    // 保存/编辑内容
    getcontentedit({},postdata){
        return microApplication.contentedit(global.contenteditPath,postdata)
    },
        // ***********************员工数据************************
    getemployeeNumber ({},postdata){
        return microApplication.employeeNumber(global.employeeNumberPath,postdata)
    }
}