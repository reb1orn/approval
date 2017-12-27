<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="addrest" v-loading="loading" element-loading-text="加载中....">
        <div class="main_left">
            <div class="searchInput">
                <div class="searchIcon"></div>
                <div>
                    <input maxlength="255"  v-model.trim="keyword" type="text" placeholder="搜索" @keyup="getRequest($event)" @input="getRequest($event)"  @keydown.enter="searchLiClick()"> 
                </div>
                <div class="xicon" @click="emptyKeyword" v-show="keyword != ''"></div>
            </div>
            <div class="searchList" v-show="isSearchList == true">
                <ul>
                    <li v-for="(item,index) in searchDatas" :class="{selectback:index==now}" @mouseover="selectHover(index)" @click="searchLiClick()"
                        :key="index">
                        <div><img :src="item.userAvatar | imgFun" alt=""></div>
                        <div :title="item.name">{{item.name}}</div>
                        <div :title="item.position">{{item.position}}</div>
                        <div>{{item.mobile}}</div>
                    </li>
                </ul>
            </div>
            <div class="searchList nosearchList" v-show="isnoSearchList == true">
                <p>抱歉，什么都没搜到</p>
            </div>
            <div>
                <div id="treeBox" v-if='ztreeDataSource.length>0'>
                    <div class="pantidname">{{parentOrgName}}</div>
                    <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :is-open='false'></vue-ztree>
                </div>
            </div>
        </div>
        <div class="main_right" v-show="isAuthority">
            <div>
                <div class="navTitle" v-show="isBranch == false">
                    <div>{{businessName}}
                        <small v-show="iscreatemsgCompanys == 1">全员群</small>
                    </div>
                    <div @click="setBusinessClick">设置</div>
                </div>
                <div class="navTitle" v-show="isBranch == true">
                    <div v-show="isBranch == true">{{selectBranch}}
                        <small v-show="iscreatemsgs == 1">部门群</small>
                    </div>
                    <div @click="editBranch">设置</div>
                </div>
                <div class="nav">
                    <ol class="breadcrumbs">
                        <li id="parentOrgName" v-show="parentOrgName !== undefined"><a>{{parentOrgName}}</a></li>
                        <li v-for="(item,index) in dataList" @click="breadcrumbLiClick(index,item)" :key="index">
                            <span v-show="!(parentOrgName == undefined && index == 0)">></span>
                            <span>{{item.name}}</span>
                        </li>
                    </ol>
                </div>
            </div>
            <div>
                <div class="smallCompany"  v-show="parentOrgName == null && dataList.length == 1">
                    <div >
                        <div class="mr_10">
                            <img src="/static/img/iconfont_page_company.png" alt="">
                        </div>
                        <div class="font_18">子公司</div>
                    </div>
                    <div  class="butStyle" @click="addChildrenCompanyClick">添加子公司</div>
                </div>
                <ul class="childrenCompanyUl" v-show="parentOrgName == null && dataList.length == 1">
                    <li v-for="(item,index) in companyListSlice" :key="index">
                        <div :title="item.oName">{{item.oName}}</div>
                        <div :title="item.oAdmin">{{item.oAdmin}}</div>
                        <div :title="item.oMobile">{{item.oMobile}}</div>
                        <div @click="editChildrenCompanyClick(index)">
                            <img src="/static/img/compile.png" alt="">
                        </div>
                    </li>
                    <div class="lookAll" @click="lookAllcompanyList" v-show="companyList.length > 10 && companyListSlice.length !== companyList.length">查看全部</div>
                    <div class="lookAll" @click="lookPartcompanyList" v-show="companyList.length > 10 && companyListSlice.length == companyList.length">收起</div>
                    <p class="noChildren" v-show="companyList.length == 0 && parentOrgName == null">当前企业不包含子公司</p>
                </ul>

                <div class="smallCompany">
                    <div>
                        <div class="mr_10">
                            <img src="/static/img/iconfont_page_group.png" alt="">
                        </div>
                        <div class="font_18">下级部门</div>
                    </div>
                    <div>
                        <div :class="{butStyle:true,graybutStyle:isgraybutStyle}" id="adjustbutStyle" @click="adjustSort">调整排序</div>
                        <div class="butStyle" @click="addBranchClick">添加子部门</div> 
                    </div>
                </div>
                <div class="sortTip" v-show="dragLi == true">
                    <span>上下拖动调整排序</span>
                    <span @click="sortSave">保存</span>
                    <span @click="revokeSort">撤销</span>
                </div>
                <ul class="subDepartments" v-show="departmentList.length > 0">
                    <li v-if="dragLi == true" v-for="(item,index) in departmentListSlice" v-dragging="{item:item,list:departmentListSlice,group:'branch'}"
                        :key="item.id">
                        <div :title="item.name">
                            <img src="/static/img/iconfont_page_sequence.png" alt="">
                            <div class="subDepartments-name">{{item.name}}</div>
                            <div>({{item.peopleNum}}人)</div>
                        </div>
                        <div class="angleIcon"></div>
                        </li>
                        <li v-if="dragLi == false" :key="item.id" v-for="(item,index) in departmentListSlice" @click="childBranch(item)">
                            <div>
                                <div class="subDepartments-name">{{item.name}}</div>
                                <div>({{item.peopleNum}}人)</div>
                            </div>
                            <div class="angleIcon"></div>
                        </li>
                        <div v-show="departmentListSlice.length !== departmentList.length && departmentList.length>10" class="lookAll" @click="lookAlldepartment">查看全部</div>
                        <div v-show="departmentListSlice.length == departmentList.length && departmentList.length>10" class="lookAll" @click="lookPartdepartment">收起</div>
                </ul>
                <p class="noChildren" v-show="departmentList.length == 0">当前部门不包含下级部门</p>
                <div class="smallCompany" id="smallCompanyBorder">
                    <div>
                        <div class="mr_10">
                            <img src="/static/img/iconfont_page_personnel.png" alt="">
                        </div>
                        <div class="font_18">部门人员</div>
                    </div>
                    <div>
                    </div>
                </div>
                <div class="butBox">
                    <div class="butStyle" @click="addMemberClick">添加人员</div>
                    <div class="butStyle" @click="batchImport">批量导入/出</div>
                    <div class="butStyle" @click="team">团队邀请</div>
                    <div :class="{butStyle:true,graybutStyle:isgraybutStyle_1}" @click="adjustBranch">调整部门</div>
                    <div :class="{butStyle:true,graybutStyle:isgraybutStyle_1}" @click="adjustSortMember">调整排序</div>
                    <div :class="{butStyle:true,delStyle:true,graybutStyle:isgraybutStyle_1}" @click="batchDel">批量删除</div>
                </div>
                <div class="sortTip sortTipMember" v-show="dragLiMember == true">
                    <span>上下拖动调整排序</span>
                    <span @click="sortSaveMember">保存</span>
                    <span @click="revokeSortMember">撤销</span>
                </div>
                <div class="branchData">
                    <ul v-if="dragLiMember == false">
                        <li class="firstLi" v-show="dataLists.length >0">
                            <div class="checkBoxCl">
                                <div>
                                    <el-checkbox v-model="checked" @change="numChange"></el-checkbox>
                                </div>
                                <div>
                                    <!--<span style="margin-left: 5px;">姓名</span>-->
                                </div>
                            </div>
                            <div>姓名</div>
                            <div>职位</div>
                            <div>邮箱</div>
                            <div>手机号</div>
                        </li>
                        <li :key="index" :class="{dataLi:true,activeLi:isactiveLi == index}" v-for="(item,index) in dataLists" @mouseover="hoverLi(index)"
                            @mouseout="noHoverLi(index)" @click="editMember(index,item)">
                            <div class="checkCl" @click.stop="bb">
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item" :key="">{{random}}</el-checkbox>
                                </el-checkbox-group>
                                <!--<div :title="item.userName">{{item.userName}} </div>-->
                            </div>
                            <div :title="item.userName">{{item.userName}} </div>
                            <div :title="item.userPosition">{{item.userPosition}}</div>
                            <div :title="item.userEmail">{{item.userEmail}}</div>
                            <div :title="item.userPhone">{{item.userPhone}}</div>
                        </li>
                    </ul>
                    <ul v-if="dragLiMember == true">
                        <li class="firstLi" v-show="dataLists.length >0">
                            <div class="checkBoxCl">
                                <div>
                                    <!--<img src="/static/img/compile.png" alt="">-->
                                </div>
                                <div>
                                    <!--<span style="margin-left: 5px;">姓名</span>-->
                                </div>
                            </div>
                            <div>姓名</div>
                            <div>职位</div>
                            <div>邮箱</div>
                            <div>手机号</div>
                        </li>
                        <li :class="{dataLi:true,activeLi:isactiveLi == index}" v-for="(item,index) in dataLists" v-dragging="{item:item,list:dataLists,group:'member'}"
                            :key="item.userId" @mouseover="hoverLi(index)" @mouseout="noHoverLi(index)" @click="editMember(index,item)">
                            <div class="checkCl" @click.stop="bb">
                                <div>
                                    <img src="/static/img/iconfont_page_sequence.png" alt="">
                                </div>
                                <!--<div>
                                    <span style="margin-left: 5px;">{{item.userName}}</span>
                                </div>-->
                            </div>
                            <div :title="item.userName">{{item.userName}} </div>
                            <div :title="item.userPosition">{{item.userPosition}}</div>
                            <div :title="item.userEmail">{{item.userEmail}}</div>
                            <div :title="item.userPhone">{{item.userPhone}}</div>
                        </li>
                    </ul>
                    <p class="noChildren" v-show="dataLists.length == 0">当前部门下暂无人员</p>
                </div>
            </div>
        </div>
        <div class="main_right" v-show="!isAuthority">
          <div id="noAuthority">
            <img src="/static/img/suo.png" alt="">
            <p>对不起,没有权限</p>
          </div>
          
        </div>
        <!--编辑企业/编辑公司弹出框-->
        <div class="ModalsBox" v-show="setBusiness">
            <div class="ModalsLeft">
                <div class="modalsLeftTop">
                    编辑公司
                </div>
                <div class="ModalsLeftMain ModalsLeftMainCompany">
                    <div class="companyInfo">
                        <div class="font_16">公司信息</div>
                        <div></div>
                    </div>
                    <div class="companyInfoDetail">
                        <div v-show="false">
                            <span>母公司信息：</span>
                            <input :disabled="true" type="text" v-model="ParentcompanyName">
                        </div>
                        <div>
                            <span>公司名称：</span>
                            <input :disabled="true" type="text" v-model="BigcompanyName">
                        </div>
                        <div class="directorSelect">
                            <span>设置主管：</span>
                            <div id="directorSelect-right" :class="{redInput:isReddirector}" @click="setDirectorClick">
                                <ul>
                                    <li v-for="(item,index) in directors" :key="index">
                                        <div>{{item.adminName}}</div>
                                        <div class="xicon" @click.stop="delDirector(index)"></div>
                                    </li>
                                </ul>
                            </div>
                            <br>
                        </div>
                        <p class="redFont" v-show="isReddirector == true">主管不能为空</p>

                    </div>
                    <div class="companyGroup">
                        <div class="font_16">企业群
                            <span class="created" v-show="iscreatemsgCompany == 1">√已创建</span>
                        </div>
                        <div class="dissolutionGroup" v-show="iscreatemsgCompany == 1" @click="dissolutionGroupCompany">解散该群</div>
                    </div>
                    <div class="companyGroupDetail" v-show="iscreatemsgCompany == 1">
                        <div>自动添加群成员</div>
                        <div @click="companyOpenClick">
                            <div v-show="companyOpen == true">
                                <span>开启</span>
                                <img src="/static/img/iconfont_page_open.png" alt="">
                            </div>
                            <div v-show="companyOpen == false">
                                <span>关闭</span>
                                <img src="/static/img/iconfont_page_colse.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="newcomer" v-show="iscreatemsgCompany == 1">有新成员时会自动加入此群</div>
                    <div class="newcomer" v-show="iscreatemsgCompany == 0" id="nogroup">暂时没有群聊
                        <a @click="createGroupCompany">创建群聊</a>
                    </div>
                </div>
                <div class="modalLeftfoot modalLeftfootCompany">
                    <p id="noDelTip" v-show="departmentListSlice.length > 0 || dataLists.length > 1">该部门下有子部门或人员不能删除</p>
                    <input type="button" value="保存" @click="bigCompantSave">
                    <input type="button" :disabled="departmentListSlice.length > 0 || dataLists.length > 1" value="删除" @click="bigCompantDel">
                    <input type="button" value="取消" @click="cancle">
                </div>
            </div>
        </div>
        <!--添加/编辑子公司-->
        <div class="ModalsBox" v-show="setChildrenBusiness">
            <div class="ModalsLeft">
                <div class="modalsLeftTop">
                    {{addCompanyTitle}}
                </div>
                <div class="ModalsLeftMain ModalsLeftMainCompany">
                    <div class="companyInfo">
                        <div class="font_16">子公司信息</div>
                        <div></div>
                    </div>
                    <div class="ChildcompanyInfoDetail">
                        <div>
                            <span>母公司名称：</span>
                            <input :disabled="true" type="text" v-model="ParentcompanyName">
                        </div>
                        <div>
                            <span>子公司名称：</span>
                            <input :class="{redInput:isBigcompanyName}" maxlength="30" type="text" v-model.trim="BigcompanyName" placeholder="最多输入30个字符">
                        </div>
                        <p class="redFont ml89" v-show="isBigcompanyName == true">{{BigcompanyNameText}}</p>
                        <div>
                            <span>所在地区：</span>
                            <div>
                                <select :class="{selectWidth:true,redInput:isRedselectedAreaone}" @change="selectedAreaoneClick" v-model="selectedAreaone">
                                    <option :key="type.id" v-for="(type,index) in selectedAreaones" :value="type.id">{{type.name}}</option>
                                </select>
                            </div>
                            <div id="areaSelectTwo">
                                <select :class="{selectWidth:true,redInput:isRedselectedAreatwo}" @change="selectedAreatwoClick" v-model="selectedAreatwo">
                                    <option :key="type.id" v-for="(type,index) in selectedAreatwos" :value="type.id">{{type.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <span>所属行业：</span>
                            <div>
                                <select :class="{selectWidth:true,redInput:isRedselectedTrade}" @change="selectedTradeClick" v-model="selectedTrade">
                                    <option :key="type.id" v-for="(type,index) in selectedTrades" :value="type.id">{{type.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="companyGroup">
                        <div class="font_16">管理员</div>
                    </div>
                    <div class="managerDetail">
                        <div>
                            <span>管理员姓名：</span>
                            <input :class="{redInput:isRedmanagerName}" maxlength="20" type="text" v-model.trim="managerName" placeholder="最多输入20个字符">
                        </div>
                        <p class="redFont ml89" v-show="isRedmanagerName == true">{{managerNameText}}</p>
                        <div>
                            <span>手机号码：</span>
                            <input :class="{redInput:isRedmanagerPhone}" type="text" v-model="managerPhone" placeholder="请输入手机号码">
                        </div>
                        <p class="redFont ml89" v-show="isRedmanagerPhone == true">{{managerPhoneText}}</p>
                        <div>
                            <h2>提示：</h2>
                            <p>1.如果管理员手机号还未注册为伯通账号，则会收到伯通后台的通知短信，短信中有登录账号、密码。当新管理员登录激活后，方可生效。</p>
                            <p>2.如果管理员手机号已经注册为伯通账号，则该管理员可以直接用已注册的手机号和密码登录。</p>
                        </div>
                    </div>
                </div>
                <div class="modalLeftfoot modalLeftfootChildCompany">
                    <input type="button" value="保存" @click="addChildSave" v-show="addCompanyTitle == '添加子公司'">
                    <input type="button" value="保存" @click="editChildSave" v-show="addCompanyTitle == '编辑子公司'">
                    <input type="button" value="删除" @click="childCompanyDel" v-show="addCompanyTitle == '编辑子公司'">
                    <input type="button" value="取消" @click="cancle">
                </div>
            </div>
        </div>
        <!--添加部门-->
        <div class="ModalsBox" v-show="setBranch">
            <div class="ModalsLeft">
                <div class="modalsLeftTop">
                    添加部门
                </div>
                <div class="ModalsLeftMain ModalsLeftMainCompany">
                    <div class="companyInfo">
                        <div class="font_16">部门信息</div>
                        <div></div>
                    </div>
                    <div class="companyInfoDetail">
                        <div id="higherBranchBox">
                            <span>上级部门：</span>
                            <input :disabled="true" type="text" v-model="superBranch">
                        </div>
                        <div>
                            <span>部门名称：</span>
                            <input id="branchNameInput" :class="{redInput:isRedbranchName}" maxlength="20" type="text" v-model.trim="branchName" placeholder="最多输入20个字符">
                        </div>
                        <p class="redFont" v-show="isRedbranchName == true">{{branchNameText}}</p>
                    </div>
                    <div class="companyGroup">
                        <div class="font_16">部门企业群</div>
                        <div></div>
                    </div>
                    <div class="companyGroupDetail">
                        <div>是否创建部门企业群</div>
                        <div @click="branchOpenClick">
                            <div v-show="branchOpen == true">
                                <span>开启</span>
                                <img src="/static/img/iconfont_page_open.png" alt="">
                            </div>
                            <div v-show="branchOpen == false">
                                <span>关闭</span>
                                <img src="/static/img/iconfont_page_colse.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="newcomer">创建一个关联此部门的企业群，如果有新人加入部门会自动加入该群</div>
                </div>
                <div class="modalLeftfoot modalLeftfootBranch">
                    <input type="button" value="保存" @click="addBranchSave">
                    <input type="button" value="取消" @click="cancle">
                </div>
            </div>
        </div>
        <!--编辑部门-->
        <div class="ModalsBox" v-show="seteditBranch">
            <div class="ModalsLeft">
                <div class="modalsLeftTop">
                    编辑部门
                </div>
                <div class="ModalsLeftMain ModalsLeftMainCompany">
                    <div class="companyInfo">
                        <div class="font_16">部门信息</div>
                        <div></div>
                    </div>
                    <div class="branchInfoDetail">
                        <div>
                            <span>上级部门：</span>
                            <input :disabled="true" type="text" v-model="superBranch">
                        </div>
                        <div>
                            <span>部门名称：</span>
                            <input id="branchNameInputEdit" :class="{redInput:isRedbranchName}" maxlength="20" type="text" v-model.trim="branchName" placeholder="最多输入20个字符">
                        </div>
                        <p class="redFont mf_89" v-show="isRedbranchName == true">{{branchNameText}}</p>
                        <div class="directorSelect">
                            <span>设置主管：</span>
                            <div id="directorSelect-right" :class="{redInput:isRedbranchdirector}" @click="setDirectorClick(1)">
                                <ul>
                                    <li v-for="(item,index) in branchdirectors" :key="index">
                                        <div>{{item.adminName}}</div>
                                        <div class="xicon" @click.stop="delbranchDirector(index)"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="redFont mf_89" v-show="isRedbranchdirector == true">主管不能为空</p>
                    </div>
                    <div class="companyGroup">
                        <div class="font_16">部门企业群
                            <span class="created" v-show="iscreatemsg == 1">√已创建</span>
                        </div>
                        <div class="dissolutionGroup" v-show="iscreatemsg == 1" @click="dissolutionGroupClick">解散该群</div>
                    </div>
                    <div class="companyGroupDetail" v-show="iscreatemsg == 1">
                        <div>自动添加群成员</div>
                        <div @click="branchOpenClick">
                            <div v-show="branchOpen == true">
                                <span>开启</span>
                                <img src="/static/img/iconfont_page_open.png" alt="">
                            </div>
                            <div v-show="branchOpen == false">
                                <span>关闭</span>
                                <img src="/static/img/iconfont_page_colse.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="newcomer" v-show="iscreatemsg == 1">有新人加入时会自动加入此群</div>
                    <div class="newcomer" v-show="iscreatemsg == 0" id="nogroupBranch">暂时没有群聊
                        <a @click="createGroupClick">创建群聊</a>
                    </div>
                    <!-- <div class="companyGroup">
                        <div class="font_16">隐藏部门</div>
                        <div></div>
                    </div>
                    <div class="companyGroupDetail">
                        <div>是否隐藏当前部门</div>
                        <div @click="hideBranchOpenClick">
                            <div v-show="hideBranchOpen == true">
                                <span>开启</span>
                                <img src="/static/img/iconfont_page_open.png" alt="">
                            </div>
                            <div v-show="hideBranchOpen == false">
                                <span>关闭</span>
                                <img src="/static/img/iconfont_page_colse.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="newcomer">隐藏后，别人从通讯录中无法看到此部门</div>
                    <div class="directorSelect" v-show="hideBranchOpen == true">
                        <span>可见人/部门：</span>
                        <div id="directorSelect-right" :class="{redInput:isRedvisibleMan}" @click="setDirectorClick(2)">
                            <ul>
                                <li v-for="(item,index) in visibleMans" :key="index">
                                    <div>{{item.adminName}}</div>
                                    <div class="xicon" @click.stop="delvisibleMan(index)"></div>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                    <!--<p class="redFont mf_89" v-show="isRedbranchdirector == true">主管不能为空</p>-->

                </div>
                <div class="modalLeftfoot modalLeftfootBranch">
                    <p id="noDelTip" v-show="departmentListSlice.length > 0 || dataLists.length > 0">该部门下有子部门或人员不能删除</p>
                    <input type="button" value="保存" @click="editBranchSave">
                    <input type="button" :disabled="departmentListSlice.length > 0 || dataLists.length > 0" value="删除" @click="editBranchDel">
                    <input type="button" value="取消" @click="cancle">
                </div>
            </div>
        </div>
        <!--添加成员-->
        <div class="ModalsBox" v-show="setMember">
            <div class="ModalsLeft">
                <div class="modalsLeftTop">
                    {{setMemberTitle}}
                </div>
                <div class="ModalsLeftMain ModalsLeftMainCompany">
                    <div class="companyInfo">
                        <div class="font_16">手机端展示信息</div>
                        <div class="dissolutionGroup" @click="custom">自定义手机端展示</div>
                    </div>
                    <div class="MobileDetail">
                        <div>
                            <span>
                                <i class="mustIcon">*</i>姓名</span>：
                            <input :class="{redInput:isRedmemberName}" maxlength="20" type="text" v-model.trim="memberName">
                        </div>
                        <p class="redFont" v-show="isRedmemberName == true">{{addMemberName}}</p>
                        <div class="directorSelect">
                            <span>
                                <i class="mustIcon">*</i>部门</span>：
                            <div :class="{redInput:isRedbranchMember}" @click="setDirectorClick(3)">
                                <ul>
                                    <li v-for="(item,index) in branchMembers" :key="index">
                                        <div>{{item.adminName}}</div>
                                        <div class="xicon" @click.stop="delbranchMember(index)"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="redFont" v-show="isRedbranchMember == true">部门不能为空</p>
                        <div>
                            <span>邮箱</span>：
                            <input :class="{redInput:isRedmemberEmail}" maxlength="100" type="text" v-model="memberEmail">
                        </div>
                        <p class="redFont" v-show="isRedmemberEmail == true">请输入正确的邮箱</p>
                        <div v-for="(item,index) in MobileVisibles" class="hideLable" :key="index">
                            <span :title="item.cKey">
                                <i class="mustIcon" v-show="item.cKey == '手机号'">*</i>{{item.cKey}}</span>：
                            <input maxlength="20" :disabled="MobileVisibles[index].isPhoneLive" :class="{redInput:MobileVisibles[index].status}"  type="text"
                                v-model="MobileVisibles[index].value">
                                <p v-show="MobileVisibles[index].isPhoneLive" class="activityMember">此成员已激活，不可编辑</p>
                            <!-- <input type="text" disabled v-show="activeTel == '1'" v-model="MobileVisibles[index].value" > -->
                            <p class="redFont" v-show="MobileVisibles[index].status == true">{{tips}}</p>
                        </div>
                    </div>
                    <div class="companyGroup">
                        <div class="font_16">手机端隐藏信息</div>
                        <div></div>
                    </div>
                    <!--<div v-show="!isMobileshow" class="hideLable">
                        <span>手机号码：</span>
                        <input :class="{redInput:isRedmemberPhone}" type="text" v-model="memberPhone" placeholder="请输入手机号码">
                    </div>
                    <p class="redFont mf_89" v-show="isRedmemberPhone == true">请输入正确的手机号码</p>
                    <div v-show="!isPositionshow" class="hideLable">
                        <span>职位：</span>
                        <input :class="{redInput:isRedmemberPosition}" type="text" v-model="memberPosition">
                    </div>
                    <p class="redFont mf_89" v-show="isRedmemberPosition == true">不能输入特殊字符</p>-->
                    <div v-for="(item,index) in MobileHides" class="hideLable" :key="index">
                        <span :title="item.cKey">
                            <i class="mustIcon" v-show="item.cKey == '手机号'">*</i>{{item.cKey}}</span>：
                        <input maxlength="20" :disabled="MobileHides[index].isPhoneLive" :class="{redInput:MobileHides[index].status}" type="text" v-model="MobileHides[index].value">
                        <p v-show="MobileHides[index].isPhoneLive" class="activityMember">此成员已激活，不可编辑</p>
                        <p class="redFont" v-show="MobileHides[index].status == true">{{tips}}</p>
                    </div>
                </div>
                <div class="modalLeftfoot modalLeftfootMember">
                    <input type="button" value="保存" @click="addMemberSave" v-show="setMemberTitle == '添加成员'">
                    <input type="button" value="保存" @click="addMemberSave" v-show="setMemberTitle == '编辑成员'">
                    <input type="button" value="保存并添加" @click="addMemberSaveAndadd" v-show="setMemberTitle == '添加成员'">
                    <input type="button" value="删除" @click="delMember" v-show="setMemberTitle == '编辑成员'">
                    <input type="button" value="取消" @click="cancle">
                </div>
            </div>
        </div>
        <!--删除子公司弹出框-->
        <div v-show="delBoxChildCompany" class="delBox">
            <div class="delContent">
                <vue-del @ok="okClickChildCompany" @canle="canleClick" :name="titlename"></vue-del>
            </div>
        </div>
        <!--删除公司弹出框-->
        <div v-show="delBoxCompany" class="delBox">
            <div class="delContent">
                <vue-del @ok="okClickCompany" @canle="canleClick" :name="titlenameCompany"></vue-del>
            </div>
        </div>
        <!--删除部门弹出框-->
        <div v-show="delBoxBranch" class="delBox">
            <div class="delContent">
                <vue-del @ok="okClickBranch" @canle="canleClick" :name="titlenameBranch"></vue-del>
            </div>
        </div>
        <!--删除部门人员弹出框-->
        <div v-show="delBoxMember" class="delBox">
            <div class="delContent">
                <vue-del @ok="okClickMember" @canle="canleClick" :name="titlenameMember"></vue-del>
            </div>
        </div>
        <!--批量删除部门人员弹出框-->
        <div v-show="delBoxMemberBatch" class="delBox">
            <div class="delContent">
                <vue-del @ok="okClickMemberBatch" @canle="canleClick" :name="titlenameMemberBatch"></vue-del>
            </div>
        </div>
        <!--弹出框选择部门人员组件-->
        <div v-show='ModalsShow' class="ModalsmemBox">
            <div class="Modalsmem">
                <div class="ModalsmemTop">
                    {{selectBranchTitle}}
                </div>
                <div class="ModalsmemCenter">
                    <div class="centerLeft">
                        <div class="centerLeftTop">
                            {{selectBranchTitle}}
                        </div>
                        <div class="centerLeftBot">
                            <div class="centerLeftBotOne">
                                <div v-show="selectBranchTitle == '选择人员' || selectBranchTitle == '选择人员或部门'">
                                    <div class="centerLeftBotOneL">
                                        <img src="/static/img/watchsee.png" alt="">
                                    </div>
                                    <div class="centerLeftBotOneI">
                                        <input type="text" placeholder="搜索" v-model.trim="searchsmemVal">
                                    </div>
                                     <div v-show="searchsmemVal != ''" class="centerLeftBotOneX" @click="clearSearchClick">
										<img src="/static/img/Group.png" alt="">
									</div>
                                </div>
                            </div>
                            <div class="centerLeftBotTwo">
                                <ul>
                                    <li v-for="(item,index) in navLists" :key="index" @click="navClick(index)">
                                        <div v-show="index !== 0">
                                            >
                                        </div>
                                        <div>
                                            {{item.name}}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="centerLeftBotThr">
                                <div>
                                    <el-checkbox v-model="checkedDesign" @change="numChangeDesign"></el-checkbox>
                                </div>
                                <div>
                                    <span>全选</span>
                                </div>
                            </div>
                            <div class="centerLeftBotFour">
                                <ul>
                                    <li v-for="(item,index) in selectLeftlists" :key="index">
                                        <div class="centerLeftBotFourLiL" @click="lefthandleCheckedCitiesChange(index)">
                                            <div v-show="item.type == 1 && (selectBranchTitle == '选择部门' || selectBranchTitle == '选择人员或部门')">
                                                <img v-show="item.open" src="/static/img/on@2x.png" alt="">
                                                <img v-show="!item.open" src="/static/img/out@2x.png" alt="">
                                            </div>
                                            <div v-show="item.type == 2 && (selectBranchTitle == '选择人员' || selectBranchTitle == '选择人员或部门')">
                                                <img v-show="item.open" src="/static/img/on@2x.png" alt="">
                                                <img v-show="!item.open" src="/static/img/out@2x.png" alt="">
                                            </div>
                                            <div v-show="item.type == 1">
                                                <img src="/static/img/member@2x.png" alt="">
                                            </div>
                                            <div :title="item.name" :class="{grayColor:item.isAuth == 0}">
                                                {{item.name}}-{{item.type | typeFun}}
                                            </div>
                                        </div>
                                        <div v-if="item.type == 1" class="centerLeftBotFourLiR" @click="leftNextClick(index)">
                                            <div>
                                                <img src="/static/img/can@2x.png" alt="">
                                            </div>
                                            <div>
                                                下级
                                            </div>
                                        </div>
                                        <div v-else class="centerLeftBotFourLiR">
                                            <!-- <div>
                                                <img src="/static/img/canon@2x.png" alt="">
                                            </div>
                                            <div>
                                                下级
                                            </div> -->
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="centerCenter">
                        <div @click="commodityLeftClick">
                            <img src="/static/img/xright@2x.png" alt="">
                        </div>
                        <div @click="commodityRightClick">
                            <img src="/static/img/xleft@2x.png" alt="">
                        </div>
                    </div>
                    <div class="centerRight">
                        <div class="centerRightTop">
                            {{selectBranchTitleAlready}}
                        </div>
                        <div class="centerRightBot">
                            <ul>
                                <li v-for="(item,index) in selectRightlists" :key="index" @click="righthandleCheckedCitiesChange(index)">
                                    <div class="centerRightBotLiL">
                                        <div>
                                            <img v-show="item.open" src="/static/img/on@2x.png" alt="">
                                            <img v-show="!item.open" src="/static/img/out@2x.png" alt="">
                                        </div>
                                        <div v-show="item.type == 1">
                                            <img src="/static/img/member@2x.png" alt="">
                                        </div>
                                        <div :title="item.name">
                                            {{item.name}}-{{item.type | typeFun}}
                                        </div>
                                    </div>
                                    <div class="centerRightBotLiR">
                                        <div>
                                            <!-- <img src="/static/img/清空@2x.png" alt=""> -->
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ModalsmemBot">
                    <div @click="confirmClick">
                        确定
                    </div>
                    <div @click="cancelClick">
                        取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vueZtree from "../subgroup/vue-ztree.vue";
import industry from "../../assets/industry";
import { mapActions, mapState } from "vuex";
import vueDel from "../subgroup/del.vue";
export default {
  name: "set",
  data() {
    return {
      loading: false,
      isAuthority: true,
      searchsmemVal: "",
      selectBranchTitle: "选择人员",
      selectBranchTitleAlready: "已选人员",
      activeTel: "",
      branchNameText: "请输入部门名称",
      managerNameText: "请输入管理员姓名",
      managerPhoneText: "请输入手机号码",
      BigcompanyNameText: "请输入子公司名称",
      addMemberName: "请输入姓名",
      batchTrue: false,
      addTrue: false,
      selectDomName: "",
      titlenameMemberBatch: "确定批量删除成员吗？",
      delBoxMemberBatch: false,
      keywordId: "",
      random: "",
      tips: "不能输入特殊字符",
      isRedmemberPosition: false,
      memberPosition: "",
      businessName: "",
      delBoxChildCompany: false,
      titlename: "确定要删除子公司吗？",
      delBoxCompany: false,
      titlenameCompany: "确定要删除公司吗？",
      delBoxBranch: false,
      titlenameBranch: "确定要删除该部门吗？",
      delBoxMember: false,
      titlenameMember: "确定要删除该成员吗？",
      isReddirector: false,
      isBigcompanyName: false,
      isRedmanagerName: false,
      isRedmanagerPhone: false,
      addCompanyTitle: false,
      isSadeNav: 0,
      chidlists: [
        {
          name: "应用管理",
          push: "applicationmanage"
        }
      ],
      ztreeDataSource: [],
      treeDeepCopy: [],
      show: true,
      dataList: [],
      companyList: [],
      departmentList: [],
      dataLists: [],
      checked: false,
      checkList: [],
      setBusiness: false,
      BigcompanyName: "",
      ParentcompanyName: "",
      setChildrenBusiness: false,
      isRedselectedAreaone: false,
      isRedselectedAreatwo: false,
      isRedselectedTrade: false,
      selectedAreaone: 0,
      selectedAreaones: [
        { name: "请选择", id: 0 },
        { name: "河南省", id: 1 },
        { name: "江苏省", id: 2 }
      ],
      selectedAreatwo: 0,
      selectedAreatwos: [{ name: "请选择", id: 0 }],
      selectedTrade: 0,
      selectedTrades: industry,
      managerName: "",
      managerPhone: "",
      directors: [],
      setBranch: false,
      superBranch: "",
      branchName: "",
      isRedbranchName: false,
      seteditBranch: false,
      branchdirectors: [],
      isRedbranchdirector: false,
      isRedvisibleMan: false,
      visibleMans: [],
      dragLi: false,
      selectBranch: "",
      isBranch: false,
      setMember: false,
      memberName: "",
      memberEmail: "",
      MobileVisibles: [],
      MobileHides: [],
      setMemberTitle: "添加成员",
      isRedmemberName: false,
      branchMembers: [
        { adminName: "小李", adminId: "ff80808159af3f800159b09d9ca90003" }
      ],
      isRedbranchMember: false,
      isRedmemberEmail: false,
      isRedmemberPhone: false,
      memberPhone: "",
      MobileHidesStatus: false,
      MobileVisiblesStatus: false,
      isactiveLi: 1111111111,
      dragLiMember: false,
      ids: "",
      companyOpen: true,
      branchOpen: false,
      hideBranchOpen: true,
      searchDatas: [],
      isSearchList: false,
      isnoSearchList: false,
      now: -1,
      searchIndex: 0,
      keyword: "",
      iscreatemsgCompanys: "",
      mClicks: {},
      selectDomId: "",
      oid: "ff80808159956936015995e711f40086",
      uid: "b7dbe60745954de4bf75e1c6a755ad8e",
      newBranchName: "",
      iscreatemsg: "",
      isgraybutStyle: false,
      isgraybutStyle_1: false,
      departmentListSlice: [],
      companyListSlice: [],
      childOid: "",
      isMobileshow: false,
      submitData: {},
      isBranchGroup: "",
      selectUserId: "",
      continueAdd: "",
      adminId: "",
      iscreatemsgCompany: "",
      isCompanyGroup: "",
      parentOrgName: "",
      iscreatemsgs: "",
      isOnceAddChild: true,
      // *************组件样式*****
      leftcheckNull: "",
      checkNull: "",
      checkedDesign: false,
      leftcheckList: [],
      rightcheckList: [],
      ModalsShow: false,
      navLists: [],
      selectLeftlists: [],
      selectRightlists: [],
      directorsArr: [],
      issetBranchDirector: "",
      selectMembersVal_1: [],
      selectMembersVal_2: [],
      selectMembersVal_3: [],
      selectMembersVal_4: [],
      selectMembersVal_5: [],
      asd: "",
      myProduct: {
        type: "text"
      },
      ischeckedDesignBranch: false,
      ischeckedDesignPeople: false
    };
  },
  components: {
    vueZtree,
    vueDel
  },
  filters: {
    typeFun: function(val) {
      if (val == 1) {
        return "部门";
      } else {
        return "人员";
      }
    },
    imgFun: function(val) {
      if (val) {
        return val;
      } else {
        return "/static/img/tx@2x.png";
      }
    }
  },
  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
    }
    // 若此人中途无权限，则跳到登录页
    this.getbusiness({
      oid: sessionStorage.getItem("orgId"),
      uid: sessionStorage.getItem("userId")
    })
      .then(data => {
        if (data.code == "100005") {
          this.$message({
            type: "info",
            message: "对不起，没有权限"
          });
          this.$router.push({
            path: "/login"
          });
        }
      })
      .catch(msg => {
        if (JSON.parse(msg.bodyText).code == "188888") {
          this.$message({
            type: "info",
            message: JSON.parse(msg.bodyText).msg
          });
          this.$router.push({
            path: "/login"
          });
        } else {
          this.$message({
            type: "info",
            message: "服务器错误!"
          });
        }
      });
    this.oid = sessionStorage.getItem("orgId");
    this.uid = sessionStorage.getItem("userId");
    this.getRegion(0);
    this.getOrgTree();
    this.getChildCompany();
    this.loading = true;
  },
  mounted() {
    var self = this;
    this.$dragging.$on("dragged", ({ value }) => {
      if (value.group == "member") {
        self.dataLists = value.list;
      } else if (value.group == "branch") {
        if (self.departmentListSlice.length == self.departmentList.length) {
          self.departmentListSlice = value.list;
        } else {
          self.departmentListSlice = value.list.slice(0, 10);
        }
      }
    });
  },
  watch: {
    searchsmemVal: function(val) {
      var self = this;
      self.selectLeftlists = [];
      if (val.length == 0) {
        if (self.selectBranchTitle == "选择人员") {
          self.listFun(1);
        } else {
          self.listFun(0);
        }
      } else {
        // 只是在当前部门下的人员中进行查找
        if (self.selectBranchTitle == "选择人员") {
          self
            .getRequestOnlyPeopleList({
              deptId: self.selectDomId,
              oid: self.oid,
              key: val
            })
            .then(data => {
              if (data.code == "000000") {
                data.data.forEach(function(ele, ind) {
                  self.selectLeftlists.push({
                    name: ele.name,
                    open: false,
                    parentId: ele.userId,
                    type: 2,
                    id: ele.userId,
                    isAuth: ele.isAuth
                  });
                });
                // 点击数组更新后，循环遍历与右侧进行对比是否选中
                self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                  self.selectRightlists.forEach(function(eleRight, rightInd) {
                    if (eleLeft.id == eleRight.id) {
                      self.selectLeftlists[eleLeftInd].open = true;
                    }
                  });
                });
                self.judgeSelectAll();
              } else {
                self.$message({
                  type: "info",
                  message: data.msg
                });
              }
            })
            .catch(msg => {
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        } else {
          // 在公司所有的人员中进行查找
          self
            .getRequestList({
              oid: self.oid,
              uid: self.uid,
              searchKey: val
            })
            .then(data => {
              if (data.code == "000000") {
                data.data.forEach(function(ele, ind) {
                  self.selectLeftlists.push({
                    name: ele.name,
                    open: false,
                    parentId: ele.userId,
                    type: 2,
                    id: ele.userId,
                    isAuth: ele.isAuth
                  });
                });
                // 点击数组更新后，循环遍历与右侧进行对比是否选中
                self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
                  self.selectRightlists.forEach(function(eleRight, rightInd) {
                    if (eleLeft.id == eleRight.id) {
                      self.selectLeftlists[eleLeftInd].open = true;
                    }
                  });
                });
                self.judgeSelectAll();
              } else {
                self.$message({
                  type: "info",
                  message: data.msg
                });
              }
            })
            .catch(msg => {
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        }
      }
    }
  },
  methods: {
    listFun(m) {
      var self = this;
      self.selectLeftlists = [];
      self.isResponseData = false;
      this.getdeptstaff({
        oid: self.oid,
        uid: self.uid,
        deptId: m == 0 ? "" : self.selectDomId
      })
        .then(data => {
          if (data.code == "000000") {
            if (m == 0) {
              self.navLists = [{ name: "通讯录", deptId: "" }];
              self.selectLeftlists.push({
                name: data.data.name,
                open: false,
                parentId: 0,
                type: data.data.type,
                id: data.data.id,
                isAuth: data.data.isAuth
              });
            } else {
              if (self.dataList.length == 1) {
                self.navLists = [
                  { name: self.businessName, deptId: self.selectDomId }
                ];
              } else {
                self.navLists = [
                  { name: self.selectBranch, deptId: self.selectDomId }
                ];
              }

              if (self.selectBranchTitle == "选择人员") {
                data.data.forEach(function(ele, ind) {
                  if (ele.type == 2) {
                    self.selectLeftlists.push({
                      name: ele.name,
                      open: false,
                      parentId: ele.parentId,
                      type: ele.type,
                      id: ele.id,
                      isAuth: ele.isAuth
                    });
                  }
                });
              } else {
                data.data.forEach(function(ele, ind) {
                  self.selectLeftlists.push({
                    name: ele.name,
                    open: false,
                    parentId: ele.parentId,
                    type: ele.type,
                    id: ele.id,
                    isAuth: ele.isAuth
                  });
                });
              }
            }
            self.isResponseData = true;
          } else if (data.code == "100005") {
            self.$message(data.msg);
            self.$router.push({
              path: "/login"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    navClick(index) {
      var self = this;
      this.getdeptstaff({
        oid: self.oid,
        uid: self.uid,
        deptId: self.navLists[index].deptId
      })
        .then(data => {
          if (data.code == "000000") {
            self.selectLeftlists = [];
            var start = index + 1;
            self.navLists.splice(index + 1, self.navLists.length - start);
            // 如果是公司走这里
            if (self.navLists[index].deptId == "") {
              self.selectLeftlists.push({
                name: data.data.name,
                open: false,
                parentId: 0,
                type: data.data.type,
                id: data.data.id,
                isAuth: data.data.isAuth
              });
            } else {
              if (self.selectBranchTitle == "选择部门") {
                data.data.forEach(function(ele, ind) {
                  if (ele.type == 1) {
                    self.selectLeftlists.push({
                      name: ele.name,
                      open: false,
                      parentId: ele.parentId,
                      type: ele.type,
                      id: ele.id,
                      isAuth: ele.isAuth
                    });
                  }
                });
              } else if (self.selectBranchTitle == "选择人员") {
                data.data.forEach(function(ele, ind) {
                  if (ele.type == 2) {
                    self.selectLeftlists.push({
                      name: ele.name,
                      open: false,
                      parentId: ele.parentId,
                      type: ele.type,
                      id: ele.id,
                      isAuth: ele.isAuth
                    });
                  }
                });
              } else {
                data.data.forEach(function(ele, ind) {
                  self.selectLeftlists.push({
                    name: ele.name,
                    open: false,
                    parentId: ele.parentId,
                    type: ele.type,
                    id: ele.id,
                    isAuth: ele.isAuth
                  });
                });
              }
            }
            // 点击数组更新后，循环遍历与右侧进行对比是否选中
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
            self.judgeSelectAll();
          } else if (data.code == "100005") {
            self.$message(data.msg);
            self.$router.push({
              path: "/login"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 下一级
    leftNextClick(index) {
      var self = this;
      this.getdeptstaff({
        oid: self.oid,
        uid: self.uid,
        deptId: self.selectLeftlists[index].id
      })
        .then(data => {
          if (data.code == "000000") {
            self.navLists.push({
              name: self.selectLeftlists[index].name,
              deptId: self.selectLeftlists[index].id
            });
            self.selectLeftlists = [];
            if (self.selectBranchTitle == "选择部门") {
              data.data.forEach(function(ele, ind) {
                if (ele.type == 1) {
                  self.selectLeftlists.push({
                    name: ele.name,
                    open: false,
                    parentId: ele.parentId,
                    type: ele.type,
                    id: ele.id,
                    isAuth: ele.isAuth
                  });
                }
              });
            } else {
              data.data.forEach(function(ele, ind) {
                self.selectLeftlists.push({
                  name: ele.name,
                  open: false,
                  parentId: ele.parentId,
                  type: ele.type,
                  id: ele.id,
                  isAuth: ele.isAuth
                });
              });
            }
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
            self.judgeSelectAll();
          }else if (data.code == "100005") {
            self.$message(data.msg);
            self.$router.push({
              path: "/login"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 取消选中商品
    righthandleCheckedCitiesChange(index) {
      var self = this;
      this.selectRightlists[index].open = !this.selectRightlists[index].open;
    },
    // 点击向左移动按钮
    commodityRightClick() {
      var self = this;
      var rights = [];
      var seRight = [];
      self.selectRightlists.forEach(function(ele, ind) {
        if (ele.open == false) {
          rights.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        } else {
          seRight.push({
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id
          });
        }
      });
      self.selectRightlists = rights;
      this.selectLeftlists.forEach(function(eleL, indL) {
        seRight.forEach(function(ele, ind) {
          if (eleL.id === ele.id) {
            self.selectLeftlists[indL].open = false;
          }
        });
      });
      this.selectLeftlists.forEach(function(eleL, indL) {
        rights.forEach(function(ele, ind) {
          if (eleL.id === ele.id) {
            self.selectLeftlists[indL].open = true;
          }
        });
      });
      this.judgeSelectAll();
    },
    // 判断是否全选
    judgeSelectAll() {
      var rArrs = [];
      this.selectLeftlists.forEach(function(ele, ind) {
        if (ele.open == true) {
          rArrs.push({
            clickNode: ele.clickNode,
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id,
            isAuth: ele.isAuth
          });
        }
      });
      var hash = {};
      rArrs = rArrs.reduce(function(item, next) {
        hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
        return item;
      }, []);
      // 如果是选择人员就只找出人员的数量进行比较哦
      if (this.selectBranchTitle == "选择人员") {
        var onlyPeople = [];
        this.selectLeftlists.forEach(function(ele, ind) {
          if (ele.type == 2) {
            onlyPeople.push({
              clickNode: ele.clickNode,
              name: ele.name,
              open: false,
              parentId: ele.parentId,
              type: ele.type,
              id: ele.id,
              isAuth: ele.isAuth
            });
          }
        });
        if (rArrs.length == onlyPeople.length && rArrs.length !== 0) {
          this.checkedDesign = true;
        } else {
          this.checkedDesign = false;
        }
      } else {
        if (rArrs.length == this.selectLeftlists.length && rArrs.length !== 0) {
          this.checkedDesign = true;
        } else {
          this.checkedDesign = false;
        }
      }
    },
    // 添加选中商品
    lefthandleCheckedCitiesChange(index) {
      var self = this;
      if (this.selectBranchTitle == "选择部门") {
        if (self.selectLeftlists[index].isAuth == 0) {
          //   this.selectLeftlists[index].open = this.selectLeftlists[index].open;
        } else {
          this.selectLeftlists[index].open = !this.selectLeftlists[index].open;
        }
      } else if (this.selectBranchTitle == "选择人员") {
        if (this.selectLeftlists[index].type == 2) {
          this.selectLeftlists[index].open = !this.selectLeftlists[index].open;
        }
      } else if (this.selectBranchTitle == "选择人员或部门") {
        if (
          self.selectLeftlists[index].isAuth == 0 &&
          self.selectLeftlists[index].type == 1
        ) {
          //   this.selectLeftlists[index].open = this.selectLeftlists[index].open;
        } else {
          this.selectLeftlists[index].open = !this.selectLeftlists[index].open;
        }
      }
      this.judgeSelectAll();
    },
    // 点击向右移动
    commodityLeftClick() {
      var self = this;
      var rArrs = [];
      this.selectLeftlists.forEach(function(ele, ind) {
        if (ele.open == true) {
          self.selectRightlists.push({
            clickNode: ele.clickNode,
            name: ele.name,
            open: false,
            parentId: ele.parentId,
            type: ele.type,
            id: ele.id,
            isAuth: ele.isAuth
          });
        }
      });
      var hash = {};
      self.selectRightlists = self.selectRightlists.reduce(function(
        item,
        next
      ) {
        hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
        return item;
      },
      []);
    },
    // 所有序号被选中时
    numChangeDesign(event) {
      var self = this;
      self.ischeckedDesignPeople = false;
      self.ischeckedDesignBranch = false;
      if (self.selectBranchTitle == "选择人员") {
        if (event.target.checked) {
          this.selectLeftlists.forEach(function(ele, ind) {
            if (ele.type == 2) {
              ele.open = true;
            }
          });
        } else {
          this.selectLeftlists.forEach(function(ele, ind) {
            if (ele.type == 2) {
              ele.open = false;
            }
          });
        }
      } else if (self.selectBranchTitle == "选择部门") {
        self.selectLeftlists.forEach(function(ele, ind) {
          if (ele.isAuth == 0) {
            self.ischeckedDesignPeople = true;
          }
        });
        if (self.ischeckedDesignPeople == true) {
          self.checkedDesign = false;
          self.$message("不能选择没有权限的部门！");
        } else {
          if (event.target.checked) {
            this.selectLeftlists.forEach(function(ele, ind) {
              if (ele.type == 1) {
                ele.open = true;
              }
            });
          } else {
            this.selectLeftlists.forEach(function(ele, ind) {
              if (ele.type == 1) {
                ele.open = false;
              }
            });
          }
        }
        //
      } else {
        self.selectLeftlists.forEach(function(ele, ind) {
          if (ele.isAuth == 0 && ele.type == 1) {
            self.ischeckedDesignBranch = true;
          }
        });
        if (self.ischeckedDesignBranch == true) {
          self.checkedDesign = false;
          self.$message("不能选择没有权限的部门！");
        } else {
          if (event.target.checked) {
            this.selectLeftlists.forEach(function(ele, ind) {
              ele.open = true;
            });
          } else {
            this.selectLeftlists.forEach(function(ele, ind) {
              ele.open = false;
            });
          }
        }
      }
    },
    //选择成员弹出框确认
    confirmClick() {
      var val = "";
      var arr = this.selectRightlists.map(function(data) {
        return { adminName: data.name, adminId: data.id, type: data.type };
      });

      // 添加公司设置主管
      if (this.setBusiness == true) {
        this.ModalsShow = false;
        this.directors = [];
        for (var i = 0; i < arr.length; i++) {
          this.directors.push(arr[i]);
        }
        this.selectMembersVal_1 = this.directors.map(function(data) {
          return data.adminId;
        });
      } else if (
        this.seteditBranch == true &&
        this.issetBranchDirector == "1"
      ) {
        // 添加部门设置主管
        this.ModalsShow = false;
        this.branchdirectors = [];
        for (var i = 0; i < arr.length; i++) {
          this.branchdirectors.push(arr[i]);
        }
        this.selectMembersVal_2 = this.branchdirectors.map(function(data) {
          return data.adminId;
        });
      } else if (
        this.seteditBranch == true &&
        this.issetBranchDirector == "2"
      ) {
        this.ModalsShow = false;
        // 编辑部门设置可见人
        this.visibleMans = [];
        for (var i = 0; i < arr.length; i++) {
          this.visibleMans.push(arr[i]);
        }
        this.selectMembersVal_3 = this.visibleMans.map(function(data) {
          return { id: data.adminId, type: data.type };
        });
      } else if (this.issetBranchDirector == "3") {
        // 添加人员设置部门
        this.ModalsShow = false;
        this.branchMembers = [];
        for (var i = 0; i < arr.length; i++) {
          this.branchMembers.push(arr[i]);
        }
        this.selectMembersVal_5 = this.branchMembers.map(function(data) {
          return data.adminId;
        });
      } else {
        var arrAdjustBrnch = [];
        for (var i = 0; i < arr.length; i++) {
          arrAdjustBrnch.push(arr[i]);
        }
        this.selectMembersVal_4 = arrAdjustBrnch.map(function(data) {
          return data.adminId;
        });
        if (this.selectMembersVal_4.length == 0) {
          this.$message("请选择要调整的部门！");
          return;
        }
        this.ModalsShow = false;
        var self = this;
        self
          .getAdjustBranch({
            oid: self.oid,
            uid: self.uid,
            currentDeptId: self.selectDomId,
            targetUserIdArray: self.ids,
            targetDeptIdArray: self.selectMembersVal_4.join(",")
          })
          .then(data => {
            if (data.code == "000000") {
              self.getOrgTree();
              self.$message({
                type: "success",
                message: "调整部门操作成功！"
              });
            } else {
              self.$message(data.msg);
            }
          })
          .catch(msg => {
            if (JSON.parse(msg.bodyText).code == "188888") {
              this.$message({
                type: "info",
                message: JSON.parse(msg.bodyText).msg
              });
              this.$router.push({
                path: "/login"
              });
            } else {
              this.$message({
                type: "info",
                message: "服务器错误!"
              });
            }
          });
      }
    },
    // 选择成员弹出框取消
    cancelClick() {
      this.ModalsShow = false;
    },
    // 点击调整部门按钮
    adjustBranch() {
      if (this.dataLists.length == 0) {
        return;
      } else {
        if (this.checkList.length == 0) {
          this.$message("请选择人员");
        } else {
          this.checkedDesign = false;
          this.ModalsShow = true;
          this.selectBranchTitle = "选择部门";
          this.selectRightlists = [];
          this.selectLeftlists = [];
          this.listFun(0);
        }
      }
    },
    // **************************************************************************
    // 点击设置主管
    setDirectorClick(m) {
      var self = this;
      self.searchsmemVal = "";
      this.ModalsShow = true;
      this.selectRightlists = [];
      // this.selectLeftlists = [];
      // this.navLists = [];
      if (self.isResponseData == true) {
        if (m == 1) {
          //添加部门设置主管
          this.listFun(1);
          this.selectBranchTitle = "选择人员";
          this.selectBranchTitleAlready = "已选人员";
          this.issetBranchDirector = "1";
          if (this.branchdirectors.length > 0) {
            this.branchdirectors.forEach(function(ele, index) {
              self.selectRightlists.push({
                name: ele.adminName,
                id: ele.adminId,
                open: false,
                type: 2
              });
            });
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
          } else {
            this.selectRightlists = [];
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
          }
        } else if (m == 2) {
          this.listFun(0);
          //添加部门设置可见人
          this.selectBranchTitle = "选择人员或部门";
          this.selectBranchTitleAlready = "已选人员或部门";
          this.issetBranchDirector = "2";
          if (this.visibleMans.length > 0) {
            this.visibleMans.forEach(function(ele, index) {
              self.selectRightlists.push({
                name: ele.adminName,
                id: ele.adminId,
                open: false,
                type: ele.type
              });
            });
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
            this.judgeSelectAll();
          } else {
            this.selectRightlists = [];
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
          }
        } else if (m == 3) {
          //添加人员设置部门
          this.selectBranchTitle = "选择部门";
          this.selectBranchTitleAlready = "已选部门";
          this.issetBranchDirector = "3";
          if (this.branchMembers.length > 0) {
            this.branchMembers.forEach(function(ele, index) {
              self.selectRightlists.push({
                name: ele.adminName,
                id: ele.adminId,
                open: false,
                type: 1
              });
            });
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
          } else {
            this.selectRightlists = [];
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
          }
        } else {
          //添加公司主管
          this.selectBranchTitle = "选择人员";
          this.selectBranchTitleAlready = "已选人员";
          this.issetBranchDirector = "";
          if (this.directors.length > 0) {
            this.directors.forEach(function(ele, index) {
              self.selectRightlists.push({
                name: ele.adminName,
                id: ele.adminId,
                open: false,
                type: 2
              });
            });
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
            self.selectLeftlists.forEach(function(eleLeft, eleLeftInd) {
              self.selectRightlists.forEach(function(eleRight, rightInd) {
                if (eleLeft.id == eleRight.id) {
                  self.selectLeftlists[eleLeftInd].open = true;
                }
              });
            });
          } else {
            this.selectRightlists = [];
            self.selectLeftlists.forEach(function(ele, index) {
              ele.open = false;
            });
            self.checkedDesign = false;
          }
        }
        this.judgeSelectAll();
      }
    },
    // 获取地区信息
    getRegion(m) {
      var self = this;
      self
        .getRegionList({
          pid: m
        })
        .then(data => {
          if (data.code == "000000") {
            data.data.unshift({ id: 0, name: "请选择", pid: "0" });
            if (m == 0) {
              self.selectedAreaones = data.data;
            } else {
              self.selectedAreatwo = 0;
              self.selectedAreatwos = data.data;
            }
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 查看所有下级部门
    lookAlldepartment() {
      this.departmentListSlice = this.departmentList;
    },
    // 查看部分下级部门
    lookPartdepartment() {
      this.departmentListSlice = this.departmentList.slice(0, 10);
      this.dragLi = false;
    },
    // 查看所有子公司
    lookAllcompanyList() {
      this.companyListSlice = this.companyList;
    },
    // 查看部分子公司
    lookPartcompanyList() {
      this.companyListSlice = this.companyList.slice(0, 10);
    },
    // 获取子公司列表
    getChildCompany() {
      var self = this;
      self
        .getChildCompanylist({
          oid: self.oid,
          uid: self.uid
        })
        .then(data => {
          if (data.code == "000000") {
            if (data.data.length == 0) {
              self.dragLi = false;
            }
            self.companyList = data.data;
            self.companyListSlice = data.data.slice(0, 10);
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 查找选中的那条数据的children
    mClickChild(data, id) {
      var vm = this;
      for (var i = 0; i < data.length; i++) {
        if (id == data[i].id) {
          vm.newBranchName = data[i].name;
          vm.iscreatemsgs = data[i].isCreateGroup;
          vm.iscreatemsgCompanys = data[i].isCreateGroup;
          //   alert(data[i].isCreateGroup)
          vm.departmentList =
            data[i].hasOwnProperty("children") == true ? data[i].children : [];
          return;
        }
        if (data[i].hasOwnProperty("children")) {
          vm.mClickChild(data[i].children, id);
        }
      }
    },
    // 根据id查找部门名称
    seekBranchById(data, id) {
      var vm = this;
      for (var i = 0; i < data.length; i++) {
        if (id == data[i].id) {
          vm.superBranch = data[i].name;
          return;
        }
        if (data[i].hasOwnProperty("children")) {
          vm.seekBranchById(data[i].children, id);
        }
      }
    },
    // 查找部门下的人员列表
    getBranchMember() {
      var self = this;
      self
        .getBranchMemberlist({
          oid: self.oid,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            self.dataLists = data.data;
            if (self.dataLists.length == 0) {
              self.isgraybutStyle_1 = true;
              self.dragLiMember = false;
            } else {
              self.isgraybutStyle_1 = false;
            }
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 获取数结构数据
    getOrgTree() {
      var self = this;

      self
        .getOrgTreeList({
          oid: self.oid,
          uid: self.uid
        })
        .then(data => {
          self.loading = false;
          if (data.code == "000000") {
            if (data.data.name == undefined || data.data == {}) {
              return;
              this.$message("获取子公司信息有误！");
            }
            self.ztreeDataSource = [data.data];
            self.parentOrgName = self.ztreeDataSource[0].parentOrgName;
            self.businessName = this.ztreeDataSource[0].name;
            self.selectDomId = this.ztreeDataSource[0].id;
            if (sessionStorage.getItem("mClicks")) {
              var mClickData = JSON.parse(sessionStorage.getItem("mClicks"));
              self.selectDomId = mClickData.id;
              self.mClickChild(self.ztreeDataSource, mClickData.id);

              mClickData.children = self.departmentList;
              mClickData.name = self.newBranchName;
              // 触发点击节点效果形成导航
              self.nodeClick(mClickData, "", self.ztreeDataSource);
              // 根据选中的节点id,让其父级展开，并让自身加上背景色
              self.findselectId(self.ztreeDataSource, self.selectDomId);
            } else {
              data.data.isExpand = false;
              data.data.isFolder = true;
              data.data.loadNode = 0;
              var mClickData = data.data;
              self.mClickChild(self.ztreeDataSource, self.selectDomId);

              mClickData.children = self.departmentList;
              mClickData.name = self.newBranchName;
              // 触发点击节点效果形成导航
              self.nodeClick(mClickData, "", self.ztreeDataSource);
              // 根据选中的节点id,让其父级展开，并让自身加上背景色
              self.findselectId(self.ztreeDataSource, self.selectDomId);
            }
          } else if (data.code == "100005") {
            self.$message(data.msg);
            self.$router.push({
              path: "/login"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          self.loading = false;
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 确定删除子公司
    okClickChildCompany() {
      var self = this;
      self.delBoxChildCompany = false;
      self
        .getDelChildOrg({
          oid: self.childOid,
          uid: self.uid
        })
        .then(data => {
          if (data.code == "000000") {
            self.delBoxChildCompany = self.setChildrenBusiness = false;
            self.getChildCompany();
            self.$message({
              type: "success",
              message: "删除子公司成功！"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 确定删除公司
    okClickCompany() {
      var self = this;
      self.delBoxCompany = false;
      self
        .getDelChildOrg({
          oid: self.oid,
          uid: self.uid
        })
        .then(data => {
          if (data.code == "000000") {
            self.delBoxCompany = self.setBusiness = false;
            sessionStorage.removeItem("mClicks");
            self.$message({
              type: "success",
              message: "删除公司成功！"
            });
            self.$router.push({
              path: "/login"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 确定删除部门
    okClickBranch() {
      var self = this;
      self.delBoxBranch = false;
      self
        .getDelBranch({
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            self.seteditBranch = self.delBoxBranch = self.isBranch = false;
            sessionStorage.removeItem("mClicks");
            self.dataList = [];
            self.getOrgTree();
            self.$message({
              type: "success",
              message: "删除部门成功！"
            });
          } else {
            self.delBoxBranch = false;
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 确定删除成员
    okClickMember() {
      var self = this;
      self.delBoxMember = false;
      self
        .getDelBranchMember({
          oid: self.oid,
          uid: self.selectUserId,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            self.delBoxMember = self.setMember = false;
            self.getBranchMember();
            self.getOrgTree();
            self.$message({
              type: "success",
              message: "删除部门人员成功！"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    canleClick() {
      this.delBoxChildCompany = false;
      this.delBoxCompany = this.delBoxBranch = this.delBoxMember = this.delBoxMemberBatch = false;
    },
    cancle() {
      this.setBusiness = false;
      this.setChildrenBusiness = false;
      this.setBranch = false;
      this.seteditBranch = false;
      this.setMember = false;
    },
    // 点击导航
    breadcrumbLiClick(index, item) {
      var self = this;
      if (index == this.dataList.length - 1) {
        return;
      }
      // 递归
      var recurFunc = data => {
        data.forEach(i => {
          if (i.id == item.id) {
            i.clickNode = true;
            sessionStorage.setItem("mClicks", JSON.stringify(i));
            this.getOrgTree();
          } else {
            i.clickNode = false;
          }
          if (i.children) {
            recurFunc(i.children);
          }
        });
      };
      recurFunc(this.treeDeepCopy);
      self.dataList.splice(index + 1, self.dataList.length - (index + 1));
      var tree = Object.assign([], this.treeDeepCopy);
      this.ztreeDataSource = tree;
    },
    // 根据父级id查找数据形成导航
    findById(data, parentId) {
      var vm = this;
      for (var i = 0; i < data.length; i++) {
        if (parentId == data[i].id) {
          vm.dataList.push(data[i]);
          vm.findById(vm.ztreeDataSource, data[i].parentId);
          return data[i];
        }
        if (data[i].hasOwnProperty("children")) {
          vm.findById(data[i].children, parentId);
        }
      }
    },
    // 由选中的那条数据通过parentID,让其父级都展开
    launch(data, parentId) {
      var vm = this;
      for (var i = 0; i < data.length; i++) {
        if (parentId == data[i].id) {
          data[i].open = true;
          data[i].clickNode = false;
          vm.launch(vm.ztreeDataSource, data[i].parentId);
          return;
        }
        if (data[i].hasOwnProperty("children")) {
          vm.launch(data[i].children, parentId);
        }
      }
    },
    // 根据id找到选中的那条数据标记它
    findselectId(data, id) {
      var vm = this;
      for (var i = 0; i < data.length; i++) {
        if (id == data[i].id) {
          data[i].open = true;
          data[i].clickNode = true;
          vm.launch(vm.ztreeDataSource, data[i].parentId);
          return;
        }
        if (data[i].hasOwnProperty("children")) {
          vm.findselectId(data[i].children, id);
        }
      }
    },
    // 点击节点
    nodeClick: function(m, parent, tree) {
      this.selectDomName = m.name;
      this.checkList = [];
      this.checked = false;
      this.dragLiMember = this.dragLi = false;
      this.selectDomId = m.id;
      sessionStorage.setItem("mClicks", JSON.stringify(m));
      //   树结构添加权限
      if (m.isAuth == 0) {
        this.isAuthority = false;
        return;
      } else {
        this.isAuthority = true;
      }
      this.treeDeepCopy = tree;
      if (m.hasOwnProperty("parentId") == true) {
        this.isBranch = true;
        this.selectBranch = m.name;
      } else {
        this.isBranch = false;
      }
      this.departmentList = m.children;
      if (this.departmentList.length == 0) {
        this.isgraybutStyle = true;
      } else {
        this.isgraybutStyle = false;
      }
      if (this.departmentList.length > 10) {
        this.departmentListSlice = this.departmentList.slice(0, 10);
      } else {
        this.departmentListSlice = this.departmentList;
      }

      this.dataList = [];
      this.findById(this.ztreeDataSource, m.parentId);
      this.dataList = this.dataList.reverse();
      this.dataList.push(m);
      // 获取当前点击的部门下的人员
      this.getBranchMember();
      // 获取当前点击的部门信息，是否显示创建群聊的标志
      var self = this;
      self
        .getBranchInfo({
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            self.iscreatemsgs = self.iscreatemsgCompanys =
              data.data.deptInfo.createmsg;
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 所有序号被选中时
    numChange(event) {
      this.checkList = event.target.checked ? this.dataLists : [];
      var a = this.checkList.map(function(data) {
        return data.userId;
      });
      this.ids = a.join(",");
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checked = checkedCount === this.dataLists.length;
      var a = this.checkList.map(function(data) {
        return data.userId;
      });
      this.ids = a.join(",");
    },
    bb(e) {},
    // 点击设置企业按钮  获取企业信息
    setBusinessClick() {
      this.listFun(1);
      this.setBusiness = true;
      this.BigcompanyName = this.businessName;
      this.isRedbranchdirector = false;
      // 获取企业信息
      var self = this;
      self
        .getBranchInfo({
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            if (data.data.admin && data.data.admin != "") {
              self.directors = data.data.admin;
            } else {
              self.directors = [];
            }

            self.companyOpen =
              data.data.deptInfo.isAutoAddUser == 0 ? false : true;
            self.iscreatemsgCompany = data.data.deptInfo.createmsg;
            self.isCompanyGroup = data.data.deptInfo.createmsg;
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 编辑企业删除管理员
    delDirector(index) {
      this.directors.splice(index, 1);
      this.selectMembersVal_1 = this.directors.map(function(data) {
        return data.adminId;
      });
    },
    // 编辑企业保存
    bigCompantSave() {
      // if (this.directors.length == 0) {
      //     this.isReddirector = true
      // }else{
      var commitData;
      var self = this;
      // 判断如果是返回的数据是已经有群的话，那就是传是否解散；如果没有群的话就是时候创建；
      if (self.isCompanyGroup == 1) {
        commitData = {
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId,
          deptName: self.BigcompanyName,
          admin: self.selectMembersVal_1,
          isAutoAddUser: self.companyOpen == false ? 0 : 1,
          // isHide:self.hideBranchOpen == false ? 0 : 1,
          isDisbandGroup: self.iscreatemsgCompany == 1 ? 0 : 1
          // deptShowSetting:'',
        };
        self
          .getaddBranchInfo(commitData)
          .then(data => {
            if (data.code == "000000") {
              self.setBusiness = false;
              self.getOrgTree();
              self.$message({
                type: "success",
                message: "编辑企业成功"
              });
            } else {
              self.$message(data.msg);
            }
          })
          .catch(msg => {
            if (JSON.parse(msg.bodyText).code == "188888") {
              this.$message({
                type: "info",
                message: JSON.parse(msg.bodyText).msg
              });
              this.$router.push({
                path: "/login"
              });
            } else {
              this.$message({
                type: "info",
                message: "服务器错误!"
              });
            }
          });
      } else if (self.isCompanyGroup == 0) {
        commitData = {
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId,
          deptName: self.BigcompanyName,
          admin: self.selectMembersVal_1,
          isAutoAddUser: self.companyOpen == false ? 0 : 1,
          // isHide:self.hideBranchOpen == false ? 0 : 1,
          isCreateGroup: self.iscreatemsgCompany == 1 ? 1 : 0
          // deptShowSetting:'',
        };
        self
          .getaddBranchInfo(commitData)
          .then(data => {
            if (data.code == "000000") {
              self.setBusiness = false;
              self.getOrgTree();
              self.$message({
                type: "success",
                message: "编辑企业成功"
              });
            } else {
              self.$message(data.msg);
            }
          })
          .catch(msg => {
            if (JSON.parse(msg.bodyText).code == "188888") {
              this.$message({
                type: "info",
                message: JSON.parse(msg.bodyText).msg
              });
              this.$router.push({
                path: "/login"
              });
            } else {
              this.$message({
                type: "info",
                message: "服务器错误!"
              });
            }
          });
      }

      // }
    },
    // 编辑企业删除
    bigCompantDel() {
      this.delBoxCompany = true;
    },
    // 点击添加子公司按钮
    addChildrenCompanyClick() {
      this.setChildrenBusiness = true;
      this.isBigcompanyName = this.isRedselectedAreaone = this.isRedselectedAreatwo = this.isRedselectedTrade = this.isRedmanagerName = this.isRedmanagerPhone = false;
      this.addCompanyTitle = "添加子公司";
      this.ParentcompanyName = this.businessName;
      this.BigcompanyName = this.managerName = this.managerPhone = "";
      this.selectedAreatwos = [{ name: "请选择", id: 0 }];
      this.selectedAreaone = this.selectedAreatwo = this.selectedTrade = 0;
    },
    // 点击编辑子公司按钮
    editChildrenCompanyClick(index) {
      this.setChildrenBusiness = true;
      this.isBigcompanyName = this.isRedselectedAreaone = this.isRedselectedAreatwo = this.isRedselectedTrade = this.isRedmanagerName = this.isRedmanagerPhone = false;
      this.addCompanyTitle = "编辑子公司";
      this.ParentcompanyName = this.businessName;
      // 获取子公司信息
      var self = this;
      self
        .getChildCompanyInfo({
          oid: self.oid,
          uid: self.uid,
          ocid: self.companyListSlice[index].oId
        })
        .then(data => {
          if (data.code == "000000") {
            self.managerName = data.data.adminName;
            self.managerPhone = data.data.adminMobile;
            self.childOid = data.data.childOId;
            self.adminId = data.data.adminId;
            self.BigcompanyName = data.data.name;
            self.selectedAreaone = data.data.area.split(",")[0];
            self.selectedTrade = data.data.type;
            var area_2 = data.data.area.split(",")[1];
            self
              .getRegionList({
                pid: self.selectedAreaone
              })
              .then(data => {
                if (data.code == "000000") {
                  self.selectedAreatwo = area_2;
                  self.selectedAreatwos = data.data;
                } else {
                  self.$message(data.msg);
                }
              })
              .catch(msg => {
                if (JSON.parse(msg.bodyText).code == "188888") {
                  this.$message({
                    type: "info",
                    message: JSON.parse(msg.bodyText).msg
                  });
                  this.$router.push({
                    path: "/login"
                  });
                } else {
                  this.$message({
                    type: "info",
                    message: "服务器错误!"
                  });
                }
              });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 添加子公司验证规则
    validate_1() {
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      var reg_3 = /^1[3|4|5|8|9|7][0-9]\d{8}$/; //输入手机号码
      if (reg_1.test(this.BigcompanyName)) {
        this.isBigcompanyName = true;
        this.BigcompanyNameText = "请输入子公司名称";
      } else if (!reg_2.test(this.BigcompanyName)) {
        this.isBigcompanyName = true;
        this.BigcompanyNameText = "请输入中文或英文";
      } else {
        this.isBigcompanyName = false;
      }
      if (this.selectedAreaone == 0) {
        this.isRedselectedAreaone = true;
      } else {
        this.isRedselectedAreaone = false;
      }
      if (this.selectedAreatwo == 0) {
        this.isRedselectedAreatwo = true;
      } else {
        this.isRedselectedAreatwo = false;
      }
      if (this.selectedTrade == 0) {
        this.isRedselectedTrade = true;
      } else {
        this.isRedselectedTrade = false;
      }
      if (reg_1.test(this.managerName)) {
        this.isRedmanagerName = true;
        this.managerNameText = "请输入管理员姓名";
      } else if (!reg_2.test(this.managerName)) {
        this.isRedmanagerName = true;
        this.managerNameText = "请输入中文或英文";
      } else {
        this.isRedmanagerName = false;
      }

      if (reg_1.test(this.managerPhone)) {
        this.isRedmanagerPhone = true;
        this.managerPhoneText = "请输入手机号码";
      } else if (!reg_3.test(this.managerPhone)) {
        this.isRedmanagerPhone = true;
        this.managerPhoneText = "请输入正确的手机号码";
      } else {
        this.isRedmanagerPhone = false;
      }

      if (
        this.isBigcompanyName == true ||
        this.isRedselectedAreaone == true ||
        this.isRedselectedAreatwo == true ||
        this.isRedselectedTrade == true ||
        this.isRedmanagerName == true ||
        this.isRedmanagerPhone == true
      ) {
        return false;
      }
    },
    // 添加子公司保存
    addChildSave() {
      var self = this;
      if (self.validate_1() == false) {
        return;
      } else {
        if (self.isOnceAddChild == true) {
          self.isOnceAddChild = false;
          self
            .getaddChildSave({
              oid: self.oid,
              uid: self.uid,
              name: self.BigcompanyName,
              area: self.selectedAreaone + "," + self.selectedAreatwo,
              type: self.selectedTrade,
              adminName: self.managerName,
              adminMobile: self.managerPhone
            })
            .then(data => {
              if (data.code == "000000") {
                self.isOnceAddChild = true;
                self.setChildrenBusiness = false;
                self.getChildCompany();
                self.$message({
                  type: "success",
                  message: "添加子公司成功"
                });
              } else {
                self.isOnceAddChild = true;
                self.$message(data.msg);
              }
            })
            .catch(msg => {
              self.isOnceAddChild = true;
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        }
      }
    },
    // 编辑子公司保存
    editChildSave() {
      var self = this;
      if (self.validate_1() == false) {
        return;
      } else {
        self
          .geteditChildSave({
            oid: self.oid,
            uid: self.uid,
            ocid: self.childOid,
            childUserId: self.adminId,
            name: self.BigcompanyName,
            area: self.selectedAreaone + "," + self.selectedAreatwo,
            type: self.selectedTrade,
            adminName: self.managerName,
            adminMobile: self.managerPhone
          })
          .then(data => {
            if (data.code == "000000") {
              self.setChildrenBusiness = false;
              self.getChildCompany();
              self.$message({
                type: "success",
                message: "编辑子公司成功"
              });
            } else {
              self.$message(data.msg);
            }
          })
          .catch(msg => {
            if (JSON.parse(msg.bodyText).code == "188888") {
              this.$message({
                type: "info",
                message: JSON.parse(msg.bodyText).msg
              });
              this.$router.push({
                path: "/login"
              });
            } else {
              this.$message({
                type: "info",
                message: "服务器错误!"
              });
            }
          });
      }
    },
    // 编辑子公司删除
    childCompanyDel() {
      this.delBoxChildCompany = true;
    },
    selectedAreaoneClick() {
      this.getRegion(this.selectedAreaone);
    },
    selectedAreatwoClick() {},
    selectedTradeClick() {},
    // 点击添加部门按钮
    addBranchClick() {
      var self = this;
      self.branchOpen = false;
      self.setBranch = true;
      self.branchName = "";
      self.isRedbranchName = false;
      self.seekBranchById(self.ztreeDataSource, self.selectDomId);
    },
    // 添加部门保存
    addBranchSave() {
      var self = this;
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      if (reg_1.test(this.branchName)) {
        this.isRedbranchName = true;
        this.branchNameText = "请输入部门名称";
      } else if (!reg_2.test(this.branchName)) {
        this.isRedbranchName = true;
        this.branchNameText = "请输入中文或英文";
      } else {
        this.isRedbranchName = false;
      }
      if (this.isRedbranchName == false) {
        if (self.batchTrue == false) {
          self.batchTrue = true;
          self
            .getaddBranch({
              oid: self.oid,
              uid: self.uid,
              parentId: self.selectDomId,
              name: self.branchName,
              isCreateGroup: self.branchOpen == false ? 0 : 1
            })
            .then(data => {
              self.batchTrue = false;
              if (data.code == "000000") {
                self.setBranch = false;
                this.getOrgTree();
                self.$message({
                  type: "success",
                  message: "添加子部门成功！"
                });
              } else {
                self.$message(data.msg);
              }
            })
            .catch(msg => {
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        }
      }
    },
    // 点击编辑部门编辑部门按钮，获取部门信息
    editBranch() {
      this.listFun(1);
      var self = this;
      self.isRedbranchName = false;
      self.seteditBranch = true;
      self
        .getBranchInfo({
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            if (data.data.admin && data.data.admin != "") {
              self.branchdirectors = data.data.admin;
            } else {
              self.branchdirectors = [];
            }
            if (data.data.deptShow && data.data.deptShow != "") {
              self.visibleMans = data.data.deptShow.map(function(item) {
                return {
                  type: item.type,
                  adminName: item.showName,
                  adminId: item.userDeptId
                };
              });
            } else {
              self.visibleMans = [];
            }
            self.branchName = data.data.deptInfo.name;
            self.seekBranchById(
              self.ztreeDataSource,
              data.data.deptInfo.parentId
            );
            self.branchOpen =
              data.data.deptInfo.isAutoAddUser == 0 ? false : true;
            self.hideBranchOpen = data.data.deptInfo.isHide == 0 ? false : true;
            self.iscreatemsg = data.data.deptInfo.createmsg;
            self.isBranchGroup = data.data.deptInfo.createmsg;
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 编辑部门删除主管
    delbranchDirector(index) {
      this.branchdirectors.splice(index, 1);
      this.selectMembersVal_2 = this.branchdirectors.map(function(data) {
        return data.adminId;
      });
    },
    // 编辑部门删除可见人/部门
    delvisibleMan(index) {
      this.visibleMans.splice(index, 1);
      this.selectMembersVal_3 = this.visibleMans.map(function(data) {
        return { id: data.adminId, type: data.type };
      });
    },
    // 编辑部门保存
    editBranchSave() {
      var self = this;
      var reg_1 = /^[\s]*$/; //输入不能为空
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      // branchNameText
      if (reg_1.test(this.branchName)) {
        this.isRedbranchName = true;
        this.branchNameText = "请输入部门名称";
      } else if (!reg_2.test(this.branchName)) {
        this.isRedbranchName = true;
        this.branchNameText = "请输入中文或英文";
      } else {
        this.isRedbranchName = false;
      }

      // if (this.branchdirectors.length == 0) {
      //     this.isRedbranchdirector = true
      // } else {
      //     this.isRedbranchdirector = false
      // }
      if (this.isRedbranchName == true || this.isRedbranchdirector == true) {
        return;
      } else {
        // 判断如果是返回的数据是已经有群的话，那就是传是否解散；如果没有群的话就是时候创建；
        if (self.isBranchGroup == 1) {
          self.submitData = {
            oid: self.oid,
            uid: self.uid,
            deptId: self.selectDomId,
            deptName: self.branchName,
            admin: self.selectMembersVal_2,
            isAutoAddUser: self.branchOpen == false ? 0 : 1,
            isHide: self.hideBranchOpen == false ? 0 : 1,
            isDisbandGroup: self.iscreatemsg == 1 ? 0 : 1,
            deptShowSetting:
              self.hideBranchOpen == true && self.selectMembersVal_3.length > 0
                ? JSON.stringify(self.selectMembersVal_3)
                : ""
          };
          self
            .getaddBranchInfo(self.submitData)
            .then(data => {
              if (data.code == "000000") {
                self.seteditBranch = false;
                self.getOrgTree();
                self.$message({
                  type: "success",
                  message: "编辑部门成功"
                });
              } else {
                self.$message(data.msg);
              }
            })
            .catch(msg => {
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        } else if (self.isBranchGroup == 0) {
          self.submitData = {
            oid: self.oid,
            uid: self.uid,
            deptId: self.selectDomId,
            deptName: self.branchName,
            admin: self.selectMembersVal_2,
            isAutoAddUser: self.branchOpen == false ? 0 : 1,
            isHide: self.hideBranchOpen == false ? 0 : 1,
            isCreateGroup: self.iscreatemsg == 1 ? 1 : 0,
            deptShowSetting:
              self.hideBranchOpen == true && self.selectMembersVal_3.length > 0
                ? JSON.stringify(self.selectMembersVal_3)
                : ""
          };

          self
            .getaddBranchInfo(self.submitData)
            .then(data => {
              if (data.code == "000000") {
                self.seteditBranch = false;
                self.getOrgTree();
                self.$message({
                  type: "success",
                  message: "编辑部门成功"
                });
              } else {
                self.$message(data.msg);
              }
            })
            .catch(msg => {
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        }
      }
    },
    // 编辑部门删除
    editBranchDel() {
      this.delBoxBranch = true;
    },
    //点击调整排序按钮
    adjustSort() {
      if (this.departmentList.length > 0) {
        this.dragLi = true;
        this.departmentListSlice = this.departmentList;
      } else {
        this.dragLi = false;
      }
    },
    // 点击撤销按钮
    revokeSort() {
      this.dragLi = false;
      this.getOrgTree();
    },
    // 点击排序保存按钮
    sortSave() {
      var self = this;
      var m = [];
      for (var i = 0; i < self.departmentListSlice.length; i++) {
        m.push({ deptId: self.departmentListSlice[i].id, sort: i });
      }
      self
        .getsortBranch({
          oid: self.oid,
          uid: self.uid,
          deptId: self.selectDomId,
          sortArray: JSON.stringify(m)
        })
        .then(data => {
          if (data.code == "000000") {
            self.dragLi = false;
            self.getOrgTree();
            self.$message({
              type: "success",
              message: "排序操作成功"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 点击下级部门出现子部门
    childBranch(item) {
      var self = this;
      // 递归
      var recurFunc = (data, list) => {
        data.forEach(i => {
          if (i.id == item.id) {
            i.clickNode = true;
          } else {
            i.clickNode = false;
          }
          if (i.children) {
            recurFunc(i.children, i);
          }
        });
      };
      recurFunc(this.ztreeDataSource, this.ztreeDataSource);
      sessionStorage.setItem("mClicks", JSON.stringify(item));
      // 刷新树结构才起作用
      self.getOrgTree();
    },
    // 添加成员验证规则
    validate_2() {
      var self = this;
      var reg_1 = /^[\s]*$/; //输入为空
      var reg_2 = /^[\u4e00-\u9fa5a-zA-Z]+$/; //输入中文或英文
      var reg_3 = /^1[3|4|5|8|9|7][0-9]\d{8}$/; //输入手机号码
      var reg_4 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱正则
      var reg_5 = new RegExp("[`~@#$^&*()=|{}\\[\\]<>/@#￥&*；,;（）——|{}【】]"); //特殊字符
      if (reg_1.test(this.memberName)) {
        this.isRedmemberName = true;
        this.addMemberName = "请输入姓名";
      } else if (!reg_2.test(this.memberName)) {
        this.isRedmemberName = true;
        this.addMemberName = "请输入中文或英文";
      } else {
        this.isRedmemberName = false;
      }
      if (this.branchMembers.length == 0) {
        this.isRedbranchMember = true;
      } else {
        this.isRedbranchMember = false;
      }
      // 判断手机号
      // if (reg_1.test(this.memberPhone) || !reg_3.test(this.memberPhone)) {
      //     this.isRedmemberPhone = true
      // } else {
      //     this.isRedmemberPhone = false
      // }
      // 判断邮箱
      if (this.memberEmail != "" && !reg_4.test(this.memberEmail)) {
        this.isRedmemberEmail = true;
      } else {
        this.isRedmemberEmail = false;
      }
      // 判断职位
      // if (this.memberPosition != '' && reg_5.test(this.memberPosition)) {
      //     this.isRedmemberPosition = true
      // } else {
      //     this.isRedmemberPosition = false
      // }
      for (var i = 0; i < self.MobileVisibles.length; i++) {
        if (self.MobileVisibles[i].eKey == "uo_phone") {
          if (
            reg_1.test(self.MobileVisibles[i].value) ||
            !reg_3.test(self.MobileVisibles[i].value)
          ) {
            self.MobileVisibles[i].status = true;
            self.tips = "请输入正确的手机号码";
            self.MobileVisiblesStatus = true;
            break;
          } else {
            self.MobileVisibles[i].status = false;
            self.tips = "不能输入特殊字符";
            self.MobileVisiblesStatus = false;
          }
        } else {
          //   如果没有手机号，先把所有标红清空
          self.MobileVisibles.forEach(function(ele, ind) {
            ele.status = false;
          });
          self.MobileHides.forEach(function(ele, ind) {
            ele.status = false;
          });
          if (reg_5.test(self.MobileVisibles[i].value)) {
            self.MobileVisibles[i].status = true;
            self.tips = "不能输入特殊字符";
            self.MobileVisiblesStatus = true;
            break;
          } else {
            self.MobileVisibles[i].status = false;
            self.MobileVisiblesStatus = false; //是否通过验证的一个状态值
          }
        }
      }
      if (self.MobileVisiblesStatus == false) {
        for (var i = 0; i < self.MobileHides.length; i++) {
          if (self.MobileHides[i].eKey == "uo_phone") {
            if (
              reg_1.test(self.MobileHides[i].value) ||
              !reg_3.test(self.MobileHides[i].value)
            ) {
              self.MobileHides[i].status = true;
              self.tips = "请输入正确的手机号码";
              self.MobileHidesStatus = true;
              break;
            } else {
              self.MobileHides[i].status = false;
              self.tips = "不能输入特殊字符";
              self.MobileHidesStatus = false;
            }
          } else {
            //   如果没有手机号，先把所有标红清空
            self.MobileVisibles.forEach(function(ele, ind) {
              ele.status = false;
            });
            self.MobileHides.forEach(function(ele, ind) {
              ele.status = false;
            });
            if (reg_5.test(self.MobileHides[i].value)) {
              self.MobileHides[i].status = true;
              self.tips = "不能输入特殊字符";
              self.MobileHidesStatus = true;
              break;
            } else {
              self.MobileHides[i].status = false;
              self.MobileHidesStatus = false;
            }
          }
        }
      }

      if (
        this.isRedmemberName == true ||
        this.isRedbranchMember == true ||
        this.isRedmemberPhone == true ||
        this.isRedmemberEmail == true ||
        this.MobileVisiblesStatus == true ||
        this.MobileHidesStatus == true
      ) {
        return false;
      }
    },
    // 点击添加成员按钮
    addMemberClick() {
      this.listFun(0);
      this.setMember = true;
      this.isRedmemberName = this.isRedbranchMember = this.isRedmemberEmail = false;
      this.setMemberTitle = "添加成员";
      this.memberName = "";
      this.memberEmail = "";
      this.branchMembers = [
        // { name: '小李',id:'ff80808159af3f800159b09d9ca90003' },
        { adminName: this.selectDomName, adminId: this.selectDomId }
      ];
      this.selectMembersVal_5 = this.branchMembers.map(function(data) {
        return data.adminId;
      });

      var self = this;
      self
        .getUserAttrTemplateInfo({
          oid: self.oid,
          uid: ""
        })
        .then(data => {
          if (data.code == "000000") {
            var arr = data.data.showAttrList.slice(3);
            for (var i = 0; i < arr.length; i++) {
              arr[i].status = false;
              arr[i].value = "";
            }
            self.MobileVisibles = arr;
            var arrHide = data.data.hideAttrList;
            for (var i = 0; i < arrHide.length; i++) {
              arrHide[i].status = false;
              arrHide[i].value = "";
            }
            self.MobileHides = arrHide;
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    //添加成员保存  或者 编辑成员保存
    addMemberSave() {
      var self = this;
      if (self.validate_2() == false) {
        return;
      } else {
        var arr_1 = [
          { ekey: "uo_name", val: self.memberName },
          { ekey: "uo_email", val: self.memberEmail }
        ];
        for (var i = 0; i < self.MobileVisibles.length; i++) {
          arr_1.push({
            ekey: self.MobileVisibles[i].eKey,
            val: self.MobileVisibles[i].value
          });
          if (self.MobileVisibles[i].eKey == "uo_phone") {
            self.memberPhone = self.MobileVisibles[i].value;
          }
        }
        for (var i = 0; i < self.MobileHides.length; i++) {
          arr_1.push({
            ekey: self.MobileHides[i].eKey,
            val: self.MobileHides[i].value
          });
          if (self.MobileHides[i].eKey == "uo_phone") {
            self.memberPhone = self.MobileHides[i].value;
          }
        }
        var arr_2 = JSON.stringify(arr_1);
        // var arr_3 = self.branchMembers.map(function(data) {
        //   return data.id;
        // });
        var addPostdata = {
          oid: self.oid,
          mobile: self.memberPhone,
          dept: self.selectMembersVal_5.join(","),
          attrArray: arr_2
        };
        if (this.setMemberTitle == "编辑成员") {
          addPostdata.uid = self.selectUserId;
        }
        if (self.addTrue == false) {
          self.addTrue = true;
          self
            .getaddMemberSave(addPostdata)
            .then(data => {
              self.addTrue = false;
              if (data.code == "000000") {
                self.setMember = false;
                self.getOrgTree();
                if (self.setMemberTitle == "编辑成员") {
                  self.$message({
                    type: "success",
                    message: "编辑成员信息成功！"
                  });
                } else {
                  self.$message({
                    type: "success",
                    message: "添加成员信息成功！"
                  });
                }

                // 如果点击了添加成员并保存按钮
                if (self.continueAdd == true) {
                  self.addMemberClick();
                }
                self.continueAdd = false;
              } else {
                self.$message(data.msg);
              }
            })
            .catch(msg => {
              self.addTrue = false;
              if (JSON.parse(msg.bodyText).code == "188888") {
                this.$message({
                  type: "info",
                  message: JSON.parse(msg.bodyText).msg
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "服务器错误!"
                });
              }
            });
        }
      }
    },
    // 点击编辑成员按钮
    editMember(index, item) {
      this.listFun(0);
      this.setMember = true;
      this.isRedmemberName = this.isRedbranchMember = this.isRedmemberEmail = false;
      this.setMemberTitle = "编辑成员";
      this.selectUserId = item.userId;
      this.getMemberInfo(this.selectUserId);
    },
    // 获取要编辑成员的信息
    getMemberInfo(userId) {
      var self = this;
      self
        .geteditMemberInfo({
          oid: self.oid,
          uid: userId
        })
        .then(data => {
          if (data.code == "000000") {
            this.activeTel = data.data.activate;
            for (var i = 0; i < data.data.showAttrList.length; i++) {
              if (data.data.showAttrList[i].eKey == "uo_name") {
                self.memberName = data.data.showAttrList[i].val;
              } else if (data.data.showAttrList[i].eKey == "uo_email") {
                self.memberEmail = data.data.showAttrList[i].val;
              } else if (data.data.showAttrList[i].eKey == "dept") {
                var branchArr = data.data.showAttrList[i].val;
                const arr_3 = JSON.parse(branchArr);
                self.branchMembers = arr_3.map(function(data) {
                  return { adminName: data.name, adminId: data.id };
                });
                self.selectMembersVal_5 = self.branchMembers.map(function(
                  data
                ) {
                  return data.adminId;
                });
              }
            }
            var arr = data.data.showAttrList.slice(3);

            for (var i = 0; i < arr.length; i++) {
              arr[i].status = false;
              if (arr[i].val) {
                arr[i].value = arr[i].val;
              } else {
                arr[i].value = "";
              }
            }
            self.MobileVisibles = arr;
            // for循环查看手机号是否激活
            for (var i = 0; i < self.MobileVisibles.length; i++) {
              if (
                self.MobileVisibles[i].eKey == "uo_phone" &&
                self.activeTel == 1
              ) {
                self.MobileVisibles[i].isPhoneLive = true;
              }
            }
            var arrHide = data.data.hideAttrList;
            for (var i = 0; i < arrHide.length; i++) {
              arrHide[i].status = false;
              if (arrHide[i].val) {
                arrHide[i].value = arrHide[i].val;
              } else {
                arrHide[i].value = "";
              }
            }
            self.MobileHides = arrHide;
            // for循环查看手机号是否激活
            for (var i = 0; i < self.MobileHides.length; i++) {
              if (
                self.MobileHides[i].eKey == "uo_phone" &&
                self.activeTel == 1
              ) {
                self.MobileHides[i].isPhoneLive = true;
              }
            }
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 编辑成员保存
    // editMemberSave() {
    //     var self = this
    //     if (self.validate_2() == false) {
    //         return
    //     } else {
    //         self.addMemberSave()
    //     }
    // },
    // 添加成员保存并添加
    addMemberSaveAndadd() {
      this.continueAdd = true;
      this.addMemberSave();
    },
    // 编辑成员删除
    delMember() {
      this.delBoxMember = true;
    },
    // 点击自定义手机端展示
    custom() {
      this.$router.push({
        path: "/home/set/addresslistInfo"
      });
    },
    // 添加成员删除部门
    delbranchMember(index) {
      this.branchMembers.splice(index, 1);
      this.selectMembersVal_5 = this.branchMembers.map(function(data) {
        return data.adminId;
      });
    },
    hoverLi(index) {
      this.isactiveLi = index;
    },
    noHoverLi(index) {
      this.isactiveLi = 1111111;
    },

    // 点击成员排序保存
    sortSaveMember() {
      var self = this;
      var m = [];
      for (var i = 0; i < self.dataLists.length; i++) {
        m.push({ uid: self.dataLists[i].userId, sort: i });
      }
      self
        .getsortBranchMember({
          oid: self.oid,
          deptId: self.selectDomId,
          sortArray: JSON.stringify(m)
        })
        .then(data => {
          if (data.code == "000000") {
            self.dragLiMember = false;
            self.getBranchMember();
            self.checked = false;
            self.$message({
              type: "success",
              message: "排序操作成功"
            });
          } else {
            self.$message(data.msg);
            self.checked = false;
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 点击成员排序撤销
    revokeSortMember() {
      this.checkList = [];
      this.checked = false;
      this.dragLiMember = false;
      this.getBranchMember();
    },
    // 点击部门人员下的调整排序按钮
    adjustSortMember() {
      if (this.dataLists.length == 0) {
        this.dragLiMember = false;
      } else {
        this.checkList = [];
        this.dragLiMember = true;
      }
    },
    // 点击批量删除按钮
    batchDel() {
      if (this.dataLists.length == 0) {
        return;
      } else {
        if (this.checkList.length == 0) {
          this.$message("请选择部门人员！");
        } else {
          this.delBoxMemberBatch = true;
        }
      }
    },
    // 点击批量删除确定按钮
    okClickMemberBatch() {
      var self = this;
      self.delBoxMemberBatch = false;
      self
        .getBatchDelBranchMember({
          oid: self.oid,
          uid: self.ids,
          deptId: self.selectDomId
        })
        .then(data => {
          if (data.code == "000000") {
            self.getBranchMember();
            self.delBoxMemberBatch = false;
            self.getOrgTree();
            self.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    // 点击批量导入/导出按钮
    batchImport() {
      this.$router.push({
        path: "/home/excelUpload"
      });
    },
    // 团队邀请
    team() {
      this.$router.push({
        path: "/home/team"
      });
    },
    // 公司是否开启自动添加成员
    companyOpenClick() {
      this.companyOpen = !this.companyOpen;
    },
    // 部门是否开启自动添加成员
    branchOpenClick() {
      this.branchOpen = !this.branchOpen;
    },
    // 部门是否隐藏当前部门
    hideBranchOpenClick() {
      this.hideBranchOpen = !this.hideBranchOpen;
    },
    // 点击搜索出来的成员
    searchLiClick() {
      this.listFun(0);
      this.isRedmemberName = this.isRedbranchMember = this.isRedmemberEmail = false;
      if (this.searchDatas.length > 0) {
        this.keyword = this.searchDatas[this.now].name;
        this.keywordId = this.searchDatas[this.now].userId;
        this.selectUserId = this.searchDatas[this.now].userId;
        this.setMember = true;
      }
      this.isSearchList = false;
      this.isnoSearchList = false;
      this.now = -1;
      this.setMemberTitle = "编辑成员";
      this.getMemberInfo(this.keywordId);
    },
    // keyup 发请求
    getRequest(ev) {
      var self = this;
      self.isSearchList = true;
      // 如果按键是上或者下，就不进行ajax
      if (ev.keyCode == 38) {
        self.selectUp();
        return;
      }
      if (ev.keyCode == 40) {
        self.selectDown();
        return;
      }
      if (ev.keyCode == 13) {
        self.isSearchList = self.isnoSearchList = false;
        return;
      }
      if (this.keyword == "") {
        self.isSearchList = self.isnoSearchList = false;
        self.searchDatas = [];
        return;
      }

      self
        .getRequestList({
          oid: self.oid,
          searchKey: self.keyword
        })
        .then(data => {
          if (data.code == "000000") {
            if (data.data) {
              if (data.data.length > 0) {
                self.searchDatas = data.data;
                self.isSearchList = true;
                self.isnoSearchList = false;
              } else {
                self.searchDatas = [];
                self.isSearchList = false;
                self.isnoSearchList = true;
              }
            } else {
              this.$message("获取数据有误");
            }
          } else {
            this.$message(data.msg);
          }
        })
        .catch(msg => {
          if (JSON.parse(msg.bodyText).code == "188888") {
            this.$message({
              type: "info",
              message: JSON.parse(msg.bodyText).msg
            });
            this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              type: "info",
              message: "服务器错误!"
            });
          }
        });
    },
    selectDown() {
      if (this.searchDatas.length > 0) {
        this.now++;
        if (this.now == this.searchDatas.length) {
          this.now = 0;
        }
        this.keyword = this.searchDatas[this.now].name;
      } else {
        return;
      }
    },
    selectUp: function() {
      if (this.searchDatas.length > 0) {
        this.now--;
        //同上
        if (this.now == -1 || this.now == -2) {
          this.now = this.searchDatas.length - 1;
        }
        this.keyword = this.searchDatas[this.now].name;
      } else {
        return;
      }
    },
    selectHover(index) {
      this.now = index;
    },
    // 解散部门群聊
    dissolutionGroupClick() {
      this.iscreatemsg = 0;
      this.branchOpen = false;
    },
    // 创建部门群聊
    createGroupClick() {
      this.iscreatemsg = 1;
      this.branchOpen = true;
    },
    // 解散企业群聊
    dissolutionGroupCompany() {
      this.iscreatemsgCompany = 0;
      this.companyOpen = false;
    },
    // 创建企业群聊
    createGroupCompany() {
      this.iscreatemsgCompany = 1;
      this.companyOpen = true;
    },
    // 清空input内容
    emptyKeyword() {
      this.keyword = "";
      this.isSearchList = this.isnoSearchList = false;
    },
    clearSearchClick() {
      this.searchsmemVal = "";
    },
    ...mapActions([
      "getRequestList",
      "getaddBranch",
      "getOrgTreeList",
      "getDelBranch",
      "getBranchInfo",
      "getaddBranchInfo",
      "getChildCompanylist",
      "getaddChildSave",
      "getBranchMemberlist",
      "getRegionList",
      "getChildCompanyInfo",
      "geteditChildSave",
      "getUserAttrTemplateInfo",
      "getaddMemberSave",
      "geteditMemberInfo",
      "getDelBranchMember",
      "getBatchDelBranchMember",
      "getsortBranch",
      "getsortBranchMember",
      "getDelChildOrg",
      "getdeptstaff",
      "getAdjustBranch",
      "getRequestOnlyPeopleList",
      "getbusiness"
    ])
  }
};
</script>
<!--私有样式-->
<style scoped>
.pantidname {
  margin-left: 30px;
  color: #000;
  font-size: 16px;
  /* border-bottom: 1px solid #303030; */
  margin-right: 60px;
}
#parentOrgName a {
  color: #000 !important;
  cursor: auto !important;
}
#noDelTip {
  margin: 15px;
  text-align: center;
  background: #fcf8e3;
  color: #8a6d3b;
}
.graybutStyle {
  background: lightgray;
  cursor: default !important;
}

#noDelTip {
  margin: 15px;
  text-align: center;
  background: #fcf8e3;
  color: #8a6d3b;
}

.graybutStyle {
  background: lightgray;
  cursor: default !important;
}
.addrest {
  height: 100%;
  position: relative;
}

.mr_10 {
  margin-right: 10px;
}

.sortTipMember {
  margin-left: 18px;
  margin-top: 10px;
  width: 95%;
}

.dataLi {
  cursor: pointer;
}

.activeLi {
  background: #ebebeb;
}

.searchIcon {
  background: url("/static/img/Slice.png") no-repeat 5% 67%;
  width: 24px;
  height: 20px;
  cursor: pointer;
}

.noChildren {
  text-align: center;
  margin: 20px;
  font-size: 12px;
  color: #929292;
}

.selectback {
  background: #f7f2f1;
}

/*删除提示框*/

.delBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 1000000;
}

.delContent {
  width: 340px;
  height: 180px;
  background-color: #fff;
  border: solid 1px #ffd0bf;
  box-shadow: 0 2px 4px 0 #dbdbdb;
  border-radius: 4px;
  margin: calc((100vh - 280px) / 2) auto;
  z-index: 100000;
}

.delStyle {
  border: solid 1px #e55757 !important;
  color: #e55757;
}

.mf_89 {
  margin-left: 89px;
}

.redInput {
  border: 1px solid #fe5371 !important;
}

.redFont {
  font-size: 12px;
  margin-top: 5px;
  color: #fe5371 !important;
}

input {
  padding-left: 10px;
  width: 230px;
  height: 32px;
  border-radius: 3px;
  border: solid 1px #d7d7d7;
}

select {
  margin-left: 5px;
  height: 32px;
  line-height: 32px;
  padding-left: 7px;
  /* color: #8f8e94; */
  border-radius: 3px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("/static/img/hjian.png") 90% 8px no-repeat transparent;
  /*padding-left: 14px;*/
  font-size: 14px;
  color: #97969b;
  border: 1px solid #d1d1d1;
  /*text-align: center;*/
  overflow: hidden;
}

select::-ms-expand {
  display: none;
}

/* .breadcrumbs > li + li:before {
  color: #cccccc;
  content: ">";
  padding: 0 5px;
} */

.breadcrumbs li {
  cursor: pointer;
  color: #e7744a;
}

.breadcrumbs li a {
  text-decoration: none;
  color: #e7744a;
}

.breadcrumbs li:nth-last-child(1) {
  cursor: default;
  color: #000;
}

.sadeNav {
  color: #fff !important;
  background: #e7744a !important;
}

.main_left {
  border-radius: 4px;
  float: left;
  width: 260px;
  height: 100%;
  background: #fffaf9;
  border-right: 1px solid #ccc;
  /*position: relative;*/
  overflow-y: auto;
  /*overflow-x: hidden;*/
}

.main_left li {
  cursor: pointer;
  line-height: 40px;
  color: #000;
  font-size: 14px;
}

.main_left li:nth-child(1) {
  margin-top: 14px;
}

.ztree li:hover {
  background: #f7f2f1;
}

.main_left li div span {
  margin-left: 15px;
}

.main_left > div:nth-child(4) {
  padding: 0 13px;
}

.main_right {
  width: 820px;
  height: 100%;
  float: left;
  overflow-y: auto;
  overflow-x: hidden;
}

.main_right > div:nth-child(1) {
  padding: 32px 38px 0 24px;
  width: 820px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.main_right > div:nth-child(2) {
  margin: 0 24px;
}

.main_right > div:nth-child(2) li {
  align-items: center;
  display: flex;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.main_right > div:nth-child(2) .branchData li > div,
.checkCl div:nth-child(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 175px;
}

.searchInput {
  display: flex;
  align-items: center;
  width: 220px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px #dfdfdf;
  margin: 25px 20px;
}

.searchInput > div:nth-child(2) input {
  height: 34px;
  line-height: 34px;
  width: 100%;
  padding-left: 0;
  border: none;
}

.navTitle {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.navTitle > div:nth-child(1) {
  font-size: 22px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #303030;
}

.navTitle > div:nth-child(1) small {
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 2px;
  background-color: #7cb8f1;
  font-size: 12px;
  line-height: 1.17;
  color: #ffffff;
}

.navTitle > div:nth-child(2) {
  text-align: center;
  width: 60px;
  height: 24px;
  line-height: 24px;
  border-radius: 2px;
  border: solid 1px #636267;
  cursor: pointer;
}

.nav ol {
  margin-top: 21px;
  margin-bottom: 30px;
  padding-left: 5px;
  overflow: hidden;
}

.nav ol li {
  float: left;
}

.smallCompany {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  padding-bottom: 26px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.smallCompany > div {
  display: flex;
  justify-content: center;
}

.font_18 {
  font-size: 18px;
  font-weight: 500;
}

.butStyle {
  width: 80px;
  height: 24px;
  line-height: 24px;
  border-radius: 2px;
  border: solid 1px #636267;
  text-align: center;
  cursor: pointer;
}

.childrenCompanyUl {
  margin: 0 18px;
  width: 720px;
}

.childrenCompanyUl li div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.childrenCompanyUl li div:nth-child(1) {
  width: 140px;
}

.childrenCompanyUl li div:nth-child(2) {
  margin-left: 150px;
  width: 70px;
}

.childrenCompanyUl li div:nth-child(3) {
  margin-left: 63px;
  width: 110px;
}

.childrenCompanyUl li div:nth-child(4) {
  margin-left: 152px;
  cursor: pointer;
}

.lookAll {
  color: #e7744a;
  margin-top: 15px;
  cursor: pointer;
}

.subDepartments {
  margin: 0 18px;
  width: 720px;
}

.subDepartments li {
  justify-content: space-between;
  cursor: pointer;
}
.subDepartments li:hover {
  background: #ebebeb;
}
.angleIcon {
  border-bottom: 1px solid #6b5e5e;
  width: 9px;
  border-right: 1px solid #6b5e5e;
  height: 9px;
  transform: rotate(-45deg);
  margin-right: 15px;
}

.subDepartments li > div:nth-child(1) {
  display: flex;
  align-items: center;
}

.butBox {
  margin-left: 18px;
  display: flex;
}

.butBox > div {
  margin-right: 15px;
}

.butBox > div:nth-child(2) {
  width: 100px;
}

.checkBoxCl,
.checkCl {
  display: flex;
  margin-left: 20px;
  width: 25px !important;
}

.checkBoxCl label,
.checkCl label {
  margin-bottom: 0px !important;
}

.branchData {
  margin: 0 18px;
  width: 720px;
  margin-top: 20px;
}

.firstLi {
  height: 44px !important;
  line-height: 44px !important;
  background-color: #fbecea;
}

/*.branch li>div:nth-child(1) {
        width: 125px;
    }
    
    .branch li>div:nth-child(2) {
        width: 180px;
    }
    
    .branch li>div:nth-child(3) {
        width: 210px;
    }
    
    .branch li>div:nth-child(4) {
        width: 200px;
    }*/

.companyInfo,
.companyGroup {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  background: #fbf4f2;
  height: 40px;
  line-height: 40px;
}

.companyGroup {
  margin-top: 30px;
}

.companyInfoDetail {
  padding-left: 15px;
}

.ChildcompanyInfoDetail > div:nth-child(1),
.ChildcompanyInfoDetail > div:nth-child(2) {
  /*margin: 20px 0px 20px 0px;*/
  height: 32px;
  line-height: 32px;
}

.companyInfoDetail p {
  margin-left: 85px;
  margin-top: 5px;
}

.companyInfoDetail > div,
.branchInfoDetail > div {
  /*margin: 20px 0px 20px 13px;*/
  height: 32px;
  line-height: 32px;
  margin-top: 20px;
}

.branchInfoDetail > div {
  margin-left: 13px;
}

.companyInfoDetail > div:nth-child(2) {
  margin-left: 13px;
}

.directorSelect {
  margin-left: 13px;
  display: flex;
  margin-top: 20px;
  height: 32px;
  line-height: 32px;
}

.directorSelect > div {
  width: 230px;
  height: 32px;
  border-radius: 3px;
  border: solid 1px #d7d7d7;
  padding-left: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 5px;
}

.directorSelect > div ul {
  height: 100%;
}

.directorSelect > div ul li {
  float: left;
  margin-top: 4px;
  position: relative;
  margin-right: 10px;
}

.directorSelect > div ul li div:nth-child(1) {
  font-size: 12px;
  /*width: 34px;*/
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 3px;
  background-color: rgba(221, 87, 37, 0.18);
  padding: 0 5px;
}

.directorSelect > div ul li div:nth-child(2) {
  position: absolute;
  top: -3px;
  right: -14px;
}

.xicon {
  cursor: pointer;
  float: left;
  width: 20px;
  height: 20px;
  background: url("/static/img/Slice.png") no-repeat -61px -153px;
}

.companyInfoDetail input {
  background-color: #ededed;
}

.created {
  border-radius: 2px;
  border: solid 1px #7eb1e0;
  font-size: 10px;
  color: #7eb1df;
  margin-left: 5px;
}

.dissolutionGroup {
  cursor: pointer;
  font-size: 14px;
  color: #e7744a;
}

.companyGroupDetail {
  display: flex;
  padding-left: 28px;
  margin: 25px 0px 10px 0px;
  width: 90%;
  justify-content: space-between;
}

.companyGroupDetail > div:nth-child(2) {
  cursor: pointer;
}

.newcomer {
  padding-left: 28px;
  font-size: 12px;
  color: #a6a2a2;
}

.newcomer a {
  margin-left: 10px;
  cursor: pointer;
}

.modalLeftfootCompany input:nth-child(2) {
  color: #fff;
  margin-right: 16px;
  background-color: #e46a6a;
}

.modalLeftfootCompany input:nth-child(1) {
  color: #fff;
  margin-right: 16px;
  background-color: #e78460;
}

.modalLeftfootCompany input:nth-child(3) {
  margin-right: 16px;
  border: solid 1px #c4bebe;
}

.modalLeftfootChildCompany input:nth-child(1) {
  color: #fff;
  margin-right: 16px;
  background-color: #e78460;
}

.modalLeftfootChildCompany input:nth-child(2) {
  color: #fff;
  margin-right: 16px;
  background-color: #e78460;
}

.modalLeftfootChildCompany input:nth-child(3) {
  color: #fff;
  margin-right: 16px;
  background-color: #e46a6a;
}

.modalLeftfootChildCompany input:nth-child(4) {
  margin-right: 16px;
  border: solid 1px #c4bebe;
}

.modalLeftfootBranch input:nth-child(1) {
  color: #fff;
  margin-right: 16px;
  background-color: #e78460;
}

.modalLeftfootBranch input:nth-child(2) {
  color: #fff;
  margin-right: 16px;
  background-color: #e46a6a;
}

.modalLeftfootBranch input:nth-child(3) {
  margin-right: 16px;
  border: solid 1px #c4bebe;
}

.ChildcompanyInfoDetail > div {
  height: 32px;
  line-height: 32px;
  margin-top: 20px;
}

.ChildcompanyInfoDetail > div:nth-child(3) {
  padding-left: 14px;
  display: flex;
}

.ChildcompanyInfoDetail > div:nth-child(4),
.ChildcompanyInfoDetail > div:nth-child(5) {
  padding-left: 14px;
  display: flex;
}

.managerDetail > div {
  height: 32px;
  line-height: 32px;
  margin-top: 20px;
}

.managerDetail > div:nth-child(3) {
  margin-left: 14px;
}

.managerDetail > div:nth-child(5) {
  width: 366px;
  height: 130px;
  border: 1px dotted #ece1df;
  padding: 19px 20px;
  color: #7e7979;
  font-size: 12px;
  line-height: 20px;
}

.managerDetail > div:nth-child(5) h2 {
  font-size: 14px;
  margin: 0;
}

.sortTip {
  height: 36px;
  line-height: 36px;
  background-color: #e0f0ff;
  text-align: center;
}

.sortTip span:nth-child(2) {
  margin: 0 10px 0 30px;
}

.sortTip span:nth-child(2),
.sortTip span:nth-child(3) {
  color: #e7744a;
  cursor: pointer;
}

/*添加成员样式*/

.MobileDetail p {
  margin-left: 86px;
}

.MobileDetail > div,
.hideLable {
  height: 32px;
  line-height: 32px;
  margin-top: 20px;
  margin-left: 13px;
}

.MobileDetail > div input,
.hideLable input {
  background: #fff;
}

.MobileDetail > div > span,
.hideLable > span {
  float: left;
  width: 53px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hideLable {
  height: auto !important;
}

.hideLable > p {
  height: 10px;
  line-height: 10px;
  margin-left: 70px;
}

.modalLeftfootMember input {
  margin-right: 16px;
}

.modalLeftfootMember input:nth-child(1),
.modalLeftfootMember input:nth-child(2) {
  color: #fff;
  background-color: #e78460;
}

.modalLeftfootMember input:nth-child(3),
.modalLeftfootMember input:nth-child(4) {
  color: #fff;
  background-color: #e46a6a;
}

.modalLeftfootMember input:nth-child(5) {
  margin-right: 16px;
  border: solid 1px #c4bebe;
}

.searchList {
  position: absolute;
  background: #fff;
  z-index: 100;
  top: 61px;
  left: 21px;
  width: 312px;
  border: solid 1px #ececec;
}

.searchList ul {
  height: 435px;
  overflow-y: auto;
}

.searchList ul li {
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  border-bottom: solid 1px #e2e2e2;
  padding-left: 15px;
}
.searchList ul li div:nth-child(1) {
  width: 42px;
  height: 38px;
  border-radius: 50%;
}
.searchList ul li div img {
  width: 100%;
  height: 100%;
  vertical-align: baseline;
}

.searchList ul li div {
  width: 56px;
  text-align: left;
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.searchList ul li div:nth-of-type(4) {
  width: 102px;
  margin: 0;
}

.nosearchList {
  height: 205px;
}

.nosearchList p {
  text-align: center;
  margin-top: 20px;
  color: #aaa;
}
#noAuthority {
  text-align: center;
  border-bottom: none;
  margin-top: 200px;
}
#treeBox {
  width: 244px;
}
#adjustbutStyle {
  margin-right: 15px;
}
.subDepartments-name {
  margin: 0 5px;
}
#smallCompanyBorder {
  border-bottom: none;
}
#directorSelect-right {
  margin-left: 4px;
}
#nogroup {
  margin: 20px;
}
#nogroupBranch {
  margin: 20px;
}
.ml89 {
  margin-left: 89px;
}
#areaSelectTwo {
  margin-left: 20px;
}
.selectWidth {
  width: 100px;
}
#higherBranchBox {
  margin-left: 13px;
}
#branchNameInput {
  background: #fff;
}
#branchNameInputEdit {
  background: #fff;
}
#directorSelect-right {
  margin-left: 4px;
}
.mustIcon {
  color: #e7744a !important;
}
.activityMember {
  color: #e78460;
  font-size: 12px;
  margin-top: 5px;
}
#directorSelect-right {
  margin-left: 4px;
}

/***********************************弹出组件***************************/
/*成员弹出*/

.centerCenter > div {
  width: 30px;
  height: 30px;
  background-color: #fff;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.centerCenter {
  width: 50px;
  height: 100%;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.centerRightBotLiR {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
}

.centerRightBotLiL > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.centerRightBotLiL > div:nth-child(1) {
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: 1px solid #ececec;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.centerRightBotLiL > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.centerRightBotLiL > div:nth-child(2) {
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: 1px solid #ececec;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.centerRightBotLiL > div:nth-child(3) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 250px;
}

.centerRightBotLiL {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerRightBot {
  height: 235px;
  margin-top: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.centerRightBot ul li:hover {
  background-color: #f6f6f6;
}

.centerRightBot ul li:nth-child(1) {
  margin-top: 20px;
}

.centerRightBot ul li {
  display: flex;
  align-items: center;
  height: 27px;
  width: 100%;
  cursor: pointer;
  padding-left: 15px;
  justify-content: space-between;
}

.centerRightBot {
  height: 365px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #fff;
}

.centerLeftBotFourLiR {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
  color: #e7744a;
}

.centerLeftBotFourLiL > div:nth-child(3) {
  width: 17px;
  height: 17px;
  margin-right: 7px;
  margin-top: -6px;
}
.centerLeftBotFourLiL > div:nth-child(3) img {
  width: 100%;
  height: 100%;
}
.centerLeftBotFourLiL > div:nth-child(4) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 250px;
}
.centerLeftBotFourLiL > div:nth-child(1) img,
.centerLeftBotFourLiL > div:nth-child(2) img {
  width: 100%;
  height: 100%;
}

.centerLeftBotFourLiL > div:nth-child(1),
.centerLeftBotFourLiL > div:nth-child(2) {
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: 1px solid #ececec;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotFourLiL {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotFour {
  height: 235px;
  margin-top: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.centerLeftBotFour ul li:hover {
  background-color: #f6f6f6;
}

.centerLeftBotFour ul li {
  display: flex;
  align-items: center;
  height: 27px;
  width: 100%;
  cursor: pointer;
  padding-left: 15px;
  justify-content: space-between;
}

.centerLeftBotThr {
  height: 25px;
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.centerLeftBotThr > div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  margin-top: 5px;
}

.centerLeftBotThr > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.centerLeftBotOne {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotOneL {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLeftBotOneI input {
  height: 30px;
  border: none;
  line-height: 30px;
  vertical-align: baseline;
}

.centerLeftBotOneI {
  width: 310px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  color: #000;
}

.centerLeftBotOne > div {
  width: 370px;
  height: 32px;
  border-radius: 3px;
  border: 1px solid #d1c4b9;
  display: flex;
  align-items: center;
}

.centerLeftBotTwo ul li > div:nth-child(2) {
  color: #e7744a;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
}

.centerLeftBotTwo ul li:nth-child(1) > div:nth-child(2) {
  margin-left: 0px;
}

.centerLeftBotTwo ul {
  margin-left: 15px;
}

.centerLeftBotTwo ul li {
  float: left;
  display: flex;
}

.centerLeftBotTwo {
  min-height: 20px;
}

.centerLeftBot > div {
  width: 100%;
}

.centerLeftBot {
  height: 365px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #fff;
}

.centerLeftTop,
.centerRightTop {
  height: 45px;
  background-color: #f4f4f5;
  line-height: 55px;
  font-size: 16px;
  color: #000;
  padding-left: 5px;
}

.centerLeft {
  width: 400px;
  height: 410px;
  margin-left: 30px;
}

.centerRight {
  width: 400px;
  height: 410px;
  margin-left: 20px;
}

.ModalsmemTop {
  width: 100%;
  height: 66px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #303030;
  line-height: 66px;
}

.ModalsmemCenter {
  width: 100%;
  height: 410px;
  background-color: #f4f4f5;
  display: flex;
}

.ModalsmemBot {
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f5;
}

.ModalsmemBot > div {
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.ModalsmemBot > div:nth-child(1) {
  background-color: #e7744a;
  margin-right: 22px;
}

.ModalsmemBot > div:nth-child(2) {
  background-color: #aeaeae;
  margin-left: 22px;
}

.Modalsmem {
  width: 960px;
  height: 560px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.5);
  animation: madalsBox 0.8s;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
}

@keyframes madalsBox {
  from {
    transform: translateY(-200px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.ModalsmemBox {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 9999;
}

/*成员弹出*/

.set {
  position: relative;
}

.addChildTop {
  width: calc(100%-88px);
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 44px;
  margin-right: 44px;
  padding-top: 20px;
  padding-bottom: 12px;
  color: #303030;
  font-size: 14px;
}

.addChildTop img {
  margin-right: 8px;
}

.addChildBot {
  width: calc(100%-88px);
  height: auto;
  margin-left: 44px;
  margin-right: 44px;
  margin-top: 20px;
}

.member {
  width: 100%;
  height: auto;
  padding-left: 54px;
}

.member input {
  width: 320px;
  height: 30px;
  margin-left: 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 5px;
}

.chainCommand {
  width: 100%;
  height: auto;
  margin-left: 27px;
  margin-top: 20px;
}

.branch {
  margin-left: 90px;
  margin-top: -20px;
}

.branch label {
  margin-left: 10px;
}

#Specific {
  width: 320px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 5px;
}

.privileges {
  width: 100%;
  height: auto;
  margin-left: 29px;
  margin-top: 24px;
}

#bracket {
  margin-left: 8px;
  color: #8f8e94;
  font-size: 14px;
}

#allJurisdiction {
  float: right;
  margin-right: 118px;
  color: #e7744a;
  font-size: 14px;
}

.BasicPermissions {
  width: 75%;
  height: auto;
  margin-left: 108px;
  margin-top: 16px;
}

.BasicPermissions ul li {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #303030;
  font-size: 12px;
}

.BasicPermissions ul li div {
  display: inline-block;
}

#first {
  width: auto;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}

.ato {
  width: auto;
  height: 40px;
  line-height: 40px;
}

.allAA {
  width: auto;
  height: 40px;
  line-height: 40px;
  float: right;
}

.save {
  width: 100px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background-color: #e7744a;
  border-radius: 4px;
  margin: 30px auto;
}

.save a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
}

.radio_inner {
  margin-top: 1px;
  margin-left: -20px;
  float: left;
  width: 14px;
  height: 14px;
  background: url("/static/img/Slice.png") no-repeat -118px -113px;
}

label.checked .radio_inner {
  background-position: -98px -113px;
}

.radio_origins {
  opacity: 0;
  z-index: -1;
  position: absolute;
}
.grayColor {
  color: #ccc;
}
</style>