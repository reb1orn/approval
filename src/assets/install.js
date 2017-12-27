import Vue from 'vue'
// 企业设置
const install = {
    // 注销登录
    logout: function logout(ip, postdata) {
        return Vue.http.delete(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 用户登录
    login: function login(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 用户登录前获取token
    loginToken: function loginToken(ip, postdata) {
        // var ipStr = ip + '?client_id=android&client_secret=android&grant_type=password&username=' + postdata.userNick + '&password=' + postdata.userPwd
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data)
            }
        }
        )
    },
    // 企业注册
    register: function register(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 获取校验令牌
    token: function token(ip, postdata) {
        return Vue.http.get(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    //校验图片验证码
    validate: function validate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    //校验图片验证码并发送短信
    validatesms: function validatesms(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    //获取短信验证码
    codesms: function codesms(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    //校验短信验证码
    codevalidatesms: function codevalidatesms(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    //获取地区
    area: function area(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    //获取类型
    type: function type(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },

    // *************首页信息***************       
    // 企业首页信息
    business: function business(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data)
            }
        }
        )
    },

    // *************设置模块***************
    // 获取权限列表
    authgetAllAuth: function authgetAllAuth(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 验证企业管理员
    adminvalidate: function adminvalidate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 绑定主管理员账号
    adminchange: function adminchange(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 子管理员列表
    alladmin: function alladmin(ip, postdata) {
        var ipstr = ip + '/' + postdata.orgId
        return Vue.http.post(ipstr, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 保存子管理员
    adminsave: function adminsave(ip, postdata) {
        var ipstr = ip + '/' + postdata.oid + '/' + postdata.uid
        return Vue.http.post(ipstr, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 子管理员详情页
    orgAdmineditForward: function orgAdmineditForward(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 编辑子管理员
    orgAdmineditOrgAdmin: function orgAdmineditOrgAdmin(ip, postdata) {
         var ipstr = ip + '/' + postdata.oid + '/' + postdata.uid
        return Vue.http.post(ipstr, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 删除子管理员
    orgAdmindelUserAdmin: function orgAdmindelUserAdmin(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 修改密码
    usermodifyPassWord: function usermodifyPassWord(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取部门人员
    deptstaff: function deptstaff(ip, postdata) {
        var ipstr = ip + '/' + postdata.oid + '/' + postdata.uid
        return Vue.http.post(ipstr, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 获取企业部门
    deptgetchild: function deptgetchild(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 获取客户端版本信息列表
    versionfindList: function versionfindList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 获取客户端版本信息
    versioninfo: function versioninfo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 修改客户端版本信息
    versionupdate: function versionupdate(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 新建客户端版本信息
    versionsave: function versionsave(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        }
        )
    },
    // 获取企业团队邀请信息
    teamgetTeamInvite: function teamgetTeamInvite(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 团队邀请-开启/关闭邀请功能
    openInvite: function openInvite(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 团队邀请-开启/申请人操作
    modifyApplyInfo: function modifyApplyInfo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 团队邀请-获取用户编辑/申请人弹框表格
    UserAttrTemplateInfo: function UserAttrTemplateInfo(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 团队邀请-申请人列表-获取部门列表
    DeptPathList: function DeptPathList(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 团队邀请-申请人列表-接受/保存申请人
    saveOrgUserAttr: function saveOrgUserAttr(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status == 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
}
export default install