/**
 * Created by on 2016/12/19.
 */

export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        redirect: '/home/homepage'
    },
    {
        path: '/home/minapplication',
        redirect: '/home/minapplication/applicationmanage'
    },
    {
        path: '/home/attendance',
        redirect: '/home/attendance/attendanceMan'
    },
    {
        path: '/home/set',
        redirect: '/home/set/companyset'
    },
    {
        path: '/home/approve',
        redirect: '/home/approve/approveManage'
    },
    {
        path: '/home/notice',
        redirect: '/home/notice/sendNotice'
    },
    {
        path: '/home/message',
        redirect: '/home/message/consulting'
    },
    {
        path: '/home/log',
        redirect: '/home/log/logManage'
    },
    {
        path: '/home/sign',
        redirect: '/home/sign/signManage'
    },
    {
        path: '/login',
        component: function (resolve) {
            require(['./components/Login.vue'], resolve)
        }
    },
    {
        path: '/registration_1',
        component: function (resolve) {
            require(['./components/businessRegistration/registration_1.vue'], resolve)
        }
    },
    {
        path: '/registration_2',
        component: function (resolve) {
            require(['./components/businessRegistration/registration_2.vue'], resolve)
        }
    },
    {
        path: '/registration_3',
        component: function (resolve) {
            require(['./components/businessRegistration/registration_3.vue'], resolve)
        }
    },
    {
        path: '/home',
        component: function (resolve) {
            require(['./components/Home.vue'], resolve)
        },
        children: [{
            path: 'set',
            component: function (resolve) {
                require(['./components/set/set.vue'], resolve)
            },
            children: [
                {
                    path: 'companyset',
                    component: function (resolve) {
                        require(['./components/set/companyset.vue'], resolve)
                    }
                },
                {
                    path: 'addresslistInfo',
                    component: function (resolve) {
                        require(['./components/set/addresslistInfo.vue'], resolve)
                    }
                },
                {
                    path: 'changeMaster',
                    component: function (resolve) {
                        require(['./components/set/changeMaster.vue'], resolve)
                    }
                },
                {
                    path: 'setchildManager',
                    component: function (resolve) {
                        require(['./components/set/setchildManager.vue'], resolve)
                    }
                },
                {
                    path: 'changMasterNext',
                    component: function (resolve) {
                        require(['./components/set/changMasterNext.vue'], resolve)
                    }
                },
                {
                    path: 'addChildMaster',
                    component: function (resolve) {
                        require(['./components/set/addChildMaster.vue'], resolve)
                    }
                },
                {
                    path: 'compileChildMaster',
                    component: function (resolve) {
                        require(['./components/set/compileChildMaster.vue'], resolve)
                    }
                },
                {
                    path: 'versionManage',
                    component: function (resolve) {
                        require(['./components/set/versionManage.vue'], resolve)
                    }
                },
                {
                    path: 'modifyPassword',
                    component: function (resolve) {
                        require(['./components/set/modifyPassword.vue'], resolve)
                    }
                },
            ]
        },
        {
            path: 'homepage',
            component: function (resolve) {
                require(['./components/homepage/homepage.vue'], resolve)
            }
        },
        {
            path: 'formDesign',
            component: function (resolve) {
                require(['./components/minapplication/formDesign/formDesign.vue'], resolve)
            }
        },
        {
            path: 'addresslist',
            component: function (resolve) {
                require(['./components/addresslist/addresslist.vue'], resolve)
            }
        },
        {
            path: 'excelUpload',
            component: function (resolve) {
                require(['./components/addresslist/excelUpload.vue'], resolve)
            }
        },
        {
            path: 'team',
            component: function (resolve) {
                require(['./components/addresslist/team.vue'], resolve)
            }
        },
        {
            path: 'excelList',
            component: function (resolve) {
                require(['./components/addresslist/excelList.vue'], resolve)
            }
        },
        // 审批
        {
            path: 'approve',
            component: function (resolve) {
                require(['./components/minapplication/approve/approve.vue'], resolve)
            },
            children: [
                {
                    path: 'approveManage',
                    component: function (resolve) {
                        require(['./components/minapplication/approve/approveManage.vue'], resolve)
                    }
                },
                {
                    path: 'dataExport',
                    component: function (resolve) {
                        require(['./components/minapplication/approve/dataExport.vue'], resolve)
                    }
                },
                {
                    path: 'dataExportRecord',
                    component: function (resolve) {
                        require(['./components/minapplication/approve/dataExportRecord.vue'], resolve)
                    }
                },
                {
                    path: 'compileapprove',
                    component: function (resolve) {
                        require(['./components/minapplication/approve/compileapprove.vue'], resolve)
                    }
                },
            ]
        },
        // 公告
        {
            path: 'notice',
            component: function (resolve) {
                require(['./components/minapplication/notice/notice.vue'], resolve)
            },
            children: [
                {
                    path: 'sendNotice',
                    component: function (resolve) {
                        require(['./components/minapplication/notice/sendNotice.vue'], resolve)
                    }
                },
                {
                    path: 'alreadysentNotice',
                    component: function (resolve) {
                        require(['./components/minapplication/notice/alreadysentNotice.vue'], resolve)
                    }
                },
                //         {
                //     path: 'dataExportRecord',
                //     component: function (resolve) {
                //     require(['./components/minapplication/approve/dataExportRecord.vue'], resolve)
                // }
                // },
            ]
        },
        // 资讯
        {
            path: 'message',
            component: function (resolve) {
                require(['./components/minapplication/message/message.vue'], resolve)
            },
            children: [
                {
                    path: 'consulting',
                    component: function (resolve) {
                        require(['./components/minapplication/message/consulting.vue'], resolve)
                    }
                },
                {
                    path: 'compileMessage',
                    component: function (resolve) {
                        require(['./components/minapplication/message/compileMessage.vue'], resolve)
                    }
                },
                {
                    path: 'induction',
                    component: function (resolve) {
                        require(['./components/minapplication/message/induction.vue'], resolve)
                    }
                },
                        {
                    path: 'onJob',
                    component: function (resolve) {
                    require(['./components/minapplication/message/onJob.vue'], resolve)
                }
                },
                {
                    path: 'regime',
                    component: function (resolve) {
                    require(['./components/minapplication/message/regime.vue'], resolve)
                }
                },
                {
                    path: 'addregime',
                    component: function (resolve) {
                    require(['./components/minapplication/message/addregime.vue'], resolve)
                }
                },
                {
                    path: 'compileregime',
                    component: function (resolve) {
                    require(['./components/minapplication/message/compileregime.vue'], resolve)
                }
                },
            ]
        }, 
        // 日志
        {
            path: 'log',
            component: function (resolve) {
                require(['./components/minapplication/log/log.vue'], resolve)
            },
            children: [
                {
                    path: 'logManage',
                    component: function (resolve) {
                        require(['./components/minapplication/log/logManage.vue'], resolve)
                    }
                },
            ]
        },
        // 签到
        {
            path: 'sign',
            component: function (resolve) {
                require(['./components/minapplication/sign/sign.vue'], resolve)
            },
            children: [
                {
                    path: 'signManage',
                    component: function (resolve) {
                        require(['./components/minapplication/sign/signManage.vue'], resolve)
                    }
                },
            ]
        },
        {
            path: 'attendance',
            component: function (resolve) {
                require(['./components/minapplication/attendance/attendance.vue'], resolve)
            },
            children: [
                {
                    path: 'attendanceMan',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/attendanceMan.vue'], resolve)
                    }
                },
                {
                    path: 'editMember',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/editMember.vue'], resolve)
                    }
                },
                {
                    path: 'addattendance',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/addattendance.vue'], resolve)
                    }
                },
                {
                    path: 'clockTime',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/clockTime.vue'], resolve)
                    }
                },
                {
                    path: 'dailyStatistics',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/dailyStatistics.vue'], resolve)
                    }
                },
                {
                    path: 'monthlySummary',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/monthlySummary.vue'], resolve)
                    }
                },
                {
                    path: 'sourceRecord',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/sourceRecord.vue'], resolve)
                    }
                },
                {
                    path: 'editfixban',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/editfixban.vue'], resolve)
                    }
                },
                {
                    path: 'editpaiban',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/editpaiban.vue'], resolve)
                    }
                },
                {
                    path: 'editziyouban',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/editziyouban.vue'], resolve)
                    }
                },
                {
                    path: 'paiban',
                    component: function (resolve) {
                        require(['./components/minapplication/attendance/paiban.vue'], resolve)
                    }
                },
            ]
        },
        {
            path: 'minapplication',
            component: function (resolve) {
                require(['./components/minapplication/minapplication.vue'], resolve)
            },
            children: [
                {
                    path: 'applicationmanage',
                    component: function (resolve) {
                        require(['./components/minapplication/applicationmanage.vue'], resolve)
                    }
                },
            ]
        },
        {
            path: 'employeedata',
            component: function (resolve) {
                require(['./components/employeedata/employeedata.vue'], resolve)
            }
        },
        ]
    }
]
