// **********接口IP和端口***********

// 外网
// global.ip = 'https://api.botong.tech'
// global.port = '18189'
//图片验证码
// global.Imgip = 'api.botong.tech'
// global.Imgport = '18189'

// 内网
global.ip = '192.168.1.94'
global.port = '18189'
//图片验证码
global.Imgip = '192.168.1.94'
global.Imgport = '18189'
// 上传
global.uploadIp = 'image.botong.tech'

// 微应用
global.minIp = '192.168.1.94'
global.minport = '18189'
// 审批模块
global.approveIp = '192.168.1.94'
global.approvePort = '18189'
// 资讯模块
global.messageIp = '192.168.10.66'
global.messagePort = '8083'


// **********接口路径***********
// 注销登录
global.logoutPath = '/api-auth/oauth/token'
// 登录
global.loginPath = '/api-org/org/userLoginValid'

// 登录前获取token
global.loginTokenPath = '/api-auth/oauth/token'
// 企业注册
global.registerPath = '/api-org/org/registValid'
// 获取校验令牌
global.tokenPath = '/api-push/get_validation_token'
// 校验图片验证码
global.validatePath = '/api-push/validation_img'
// 校验图片验证码并发送短信
global.validatesmsPath = '/api-push/get_sms_validation'
// 获取短信验证码
global.codesmsPath = '/api-push/get_sms'
// 校验短信验证码
global.codevalidatesmsPath = '/api-push/validation_sms'
// 获取地区
global.areaPath = '/api-system/area/getArea'
// 获取类型
global.typePath = '/api-system/type/getType'
// 企业首页信息
global.businessPath = '/api-org/index'
// 验证企业管理员
global.adminvalidatePath = '/api-org/admin/validate'
// 绑定主管理员账号
global.adminchangePath = '/api-org/admin/change'
// 子管理员列表
global.alladminPath = '/api-org/orgAdmin/getAllAdmin'
// 保存子管理员
global.adminsavePath = '/api-org/orgAdmin/save'
// 子管理员详情页
global.orgAdmineditForwardPath = '/api-org/orgAdmin/editForward'
// 编辑子管理员
global.orgAdmineditOrgAdminPath = '/api-org/orgAdmin/editOrgAdmin'
// 删除子管理员
global.orgAdmindelUserAdminPath = '/api-org/orgAdmin/delUserAdmin'
// 修改密码
global.usermodifyPassWordPath = '/api-user/user/modifyPassWord'
// 获取部门人员
global.udeptstaffPath = '/api-org/dept/user/staff'
// 获取企业部门
global.deptgetchildPath = '/api-org/dept/getChild'
// 获取客户端版本信息列表
global.versionfindListPath = '/api-system/version/findList'
// 获取客户端版本信息
global.versioninfoPath = '/api-system/version/info'
// 修改客户端版本信息
global.versionupdatePath = '/api-system/version/update'
// 新建客户端版本信息
global.versionsavePath = '/api-system/version/save'
// 获取企业团队邀请信息
global.teamgetTeamInvitePath = '/api-org/team/getTeamInvite'
// 团队邀请-开启/关闭邀请功能
global.openInvitePath = '/api-org/team/modifyTeamIsInvite'
// 团队邀请-开启/申请人操作
global.modifyApplyInfoPath = '/api-org/team/modifyApplyInfo'
// 团队邀请-获取用户编辑/申请人弹框表格
global.UserAttrTemplateInfoPath = '/api-org/dept/user/getUserAttrTemplateInfo'
// 团队邀请-申请人列表-获取部门列表
global.DeptPathListPath = '/api-org/dept/getDeptPathList'
// 团队邀请-申请人列表-接受/保存申请人
global.saveOrgUserAttrPath = '/api-org/dept/user/saveOrgUserAttr'
// ******************************设置*************************
// 获取企业设置信息
global.GainCompanyInfoPath = '/api-org/org/info'
// 获取企业设置信息
global.authgetAllAuthPath = '/api-org/auth/getAllAuth'
// 保存企业设置信息
global.SaveCompanySetPath = '/api-org/org/save'
// 上传图片
global.uploadFilePath = '/api/file/uploadTempFile'
// *************************通讯录*********************************
// 添加子部门
global.addBranchPath = '/api-org/dept/create'
// 获取树结构
global.OrgTreeListPath = '/api-org/dept/getOrgTree'
// 删除部门
global.DelBranchPath = '/api-org/dept/delete'
// 获取部门信息
global.BranchInfoPath = '/api-org/dept/info'
// 编辑部门信息
global.addBranchInfoPath = '/api-org/dept/modify'
// 获取子公司信息
global.ChildCompanylistPath = '/api-org/org/list'
// 添加子公司
global.addChildSavePath = '/api-org/org/create'
// 获取部门人员列表
global.BranchMemberlistPath = '/api-org/dept/user/findDeptUserList'
// 添加用户自定义标签
global.addUserDefineConlistPath = '/api-org/book/createClientShowUserAttribute'
// 删除自定义标签
global.delUserDefineConlistPath = '/api-org/book/deleteClientShowUserAttribute'
// 获取用户自定义标签
global.AllUserDefineConlistPath = '/api-org/book/getUserAttrTemplate'
// 编辑用户自定义标签
global.editUserDefineConlistPath = '/api-org/book/modifyClientShowUserAttribute'
// 获取地区信息
global.RegionListPath = '/api-system/area/getArea'
// 获取子公司信息
global.ChildCompanyInfoPath = '/api-org/org/childInfo'
// 编辑子公司
global.editChildSavePath = '/api-org/org/modifyChildOrg'
// 企业人员搜索
global.RequestListPath = '/api-org/book/searchUserInfo'
// 获取成员模板信息
global.UserAttrTemplateInfoPath = '/api-org/dept/user/getUserAttrTemplateInfo'
// 添加成员信息
global.addMemberSavePath = '/api-org/dept/user/saveOrgUserAttr'
// 获取部门成员信息
global.editMemberInfoPath = '/api-org/dept/user/getUserAttrTemplateInfo'
// 删除部门成员
global.DelBranchMemberPath = '/api-org/dept/user/deleteOrgUserAttr'
// 批量删除部门人员
global.BatchDelBranchMemberPath = '/api-org/dept/user/deleteBatchOrgUserAttr'
// 调整部门顺序
global.sortBranchPath = '/api-org/dept/sort'
// 调整部门人员顺序
global.sortBranchMemberPath = '/api-org/book/modifyUserSort'
// 上传文件execl
global.uploadFileExcelPath = '/api-org/book/upload'
// 删除子公司
global.DelChildOrgPath = '/api-org/org/deleteChildOrg'
// 调整人员部门
global.AdjustBranchPath = '/api-org/dept/adJustDept'
// 导入通讯录
global.saveExcelListPath = '/api-org/book/import'
// 搜索本部门下的人员
global.RequestOnlyPeopleListPath = '/api-org/dept/user/findDeptRootUserList'

// *************** 微应用模块 ****************

// 微应用列表
global.appIndexPath = '/api-org/app/index'
// 微应用编辑排序
global.appSortPath = '/api-org/app/sort'

// *******************审批模块********************

// 审批列表
global.approvalListPath = '/api-approval/approval/list'
// 获取审批设置项
global.approvalSetItemPath = '/api-approval/approval/getSetItem'
// 保存审批设置项
global.approvalsaveSetItemPath = '/api-approval/approval/saveSetItem'
// 设置审批流程
global.approvalUpdateProcessPath = '/api-approval/approval/updateProcess'
// 清空审批流程
global.approvalDeleteProcessPath = '/api-approval/approval/deleteProcess'
// 获取抄送人
global.approvalCopygetPath = '/api-approval/approval/copy/get'
// 保存抄送人
global.approvalCopysavePath = '/api-approval/approval/copy/save'
// 获取审批条件
global.approvalcdngetPath = '/api-approval/approval/cdn/get'
// 保存审批条件
global.approvalcdnsavePath = '/api-approval/approval/cdn/save'
// 删除审批条件
global.approvalcdndeletePath = '/api-approval/approval/cdn/delete'
// 获取人员列表及头像
global.deptGetOrgTreeAndUserPath = '/api-approval/dept/getOrgTreeAndUser'

// **********************资讯模块********************

// 获取栏目
global.columnGetPath = '/column/get'
// 获取所有内容列表
global.contentGetPath = '/content/get'


// *********************员工数据**********************
global.employeeNumberPath = '/api-org/employee/get'

