<template xmlns:v-on="http://www.w3.org/1999/xhtml">
<div>
    <div class="minapplication defaultPage" v-show="imgahg">
    
    </div>

    <div class="set" id="setMain" v-show="noimg">
        <div class="main_left">
            <ul>
                <li v-for="(list,index) in chidlists" :class="{sadeNav:isSadeNav == index}" @click="sadeNavClick(index)">
                    <div>
                        <span>{{list.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main_right">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "set",
  data() {
    return {
      imgahg: false,
      noimg: true,
      isSadeNav: 0,
      chidlists: [
        {
          name: "应用管理",
          push: "applicationmanage"
        }
      ]
    };
  },

  created: function() {
    if (sessionStorage.getItem("orgId") == undefined) {
      return;
    }
    sessionStorage.removeItem("youindex");
  },
  watch: {},
  methods: {
    sadeNavClick(index) {
      this.isSadeNav = index;
      var pathStr = this.chidlists[index].push;
      var url = "/home/minapplication/" + pathStr;
      this.$router.push({
        path: url
      });
    }
  }
};
</script>
<!--私有样式-->
<style scoped>
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

.main_left li:hover {
  background: #f7f2f1;
}

.main_left li div span {
  margin-left: 15px;
}

.main_right {
  width: 820px;
  height: 100%;
  float: left;
  overflow-y: hidden;
  overflow-x: hidden;
}
#setMain {
  height: 100%;
}
.defaultPage {
  width: 100%;
  height: calc(100vh - 200px);
  background: url("/static/img/defaultPage.png") no-repeat;
  background-size: 100% 100%;
  overflow-y: hidden;
}
</style>