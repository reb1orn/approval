<template>
    <div id="app" class="views" style="height: 100%;">
        <router-view class="view" keep-alive></router-view>
    </div>
</template>

<script>
export default {
  created: function() {
    this.fetchDate();
  },
  watch: {
    $route: "fetchDate"
  },
  methods: {
    //  根据路径匹配标记导航
    fetchDate: function() {
      var paths = this.$route.path.split("/");
      var onepathStr = paths[1] || "login";
      var twopathStr = paths[2];
      if (onepathStr == "login") {
        // sessionStorage.removeItem("orgId");
        // sessionStorage.removeItem("userId");
        // sessionStorage.removeItem("orgName");
        // sessionStorage.removeItem("aaaaa");
      } else {
        var oidStr = sessionStorage.getItem("orgId");
        var sss = sessionStorage.getItem("aaaaa");
        if (oidStr) {
        } else {
          if (sss) {
            if (sss == "aaaaa") {
              this.$router.push({
                path: "/registration_1"
              });
            } else if (sss == "bbbbb") {
              this.$router.push({
                path: "/registration_2"
              });
            } else if (sss == "ccccc") {
              this.$router.push({
                path: "/registration_3"
              });
            } else {
              this.$router.push({
                path: "/login"
              });
            }
          } else {
            this.$router.push({
              path: "/login"
            });
          }
        }
      }
    }
  }
};
</script>

<style>
.view {
  background-color: #f4f4f4;
  height: 100%;
}

@import "./assets/css/base.css";
</style>
