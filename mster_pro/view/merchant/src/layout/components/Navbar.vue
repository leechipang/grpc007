<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <header-notice/>
        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <div class="platformLabel">{{ label.mer_name }}</div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <span class="el-dropdown-link fontSize">
          {{ adminInfo }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="goUser">
            <span style="display:block;">个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="goPassword">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { editFormApi, passwordFormApi, getBaseInfo } from "@/api/user";
import Breadcrumb from "@/components/breadCrumb";
import Hamburger from "@/components/hamBurger";
import Screenfull from "@/components/screenFull";
import HeaderNotice from '@/components/headerNotice';
import Search from "@/components/headerSearch";
import { roterPre } from "@/settings";
import Cookies from "js-cookie";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    HeaderNotice,
    Search
  },
  data() {
    return {
      roterPre: roterPre,
      adminInfo: Cookies.set("MerName"),
      label: ""
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"])
  },
  mounted() {
    getBaseInfo()
      .then(res => {
        this.label = res.data
      })
      .catch(({ message }) => {
        this.$message.error(message);
      });
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    goUser() {
      this.$modalForm(editFormApi());
    },
    goPassword() {
      this.$modalForm(passwordFormApi());
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`${roterPre}/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.fontSize {
  font-size: 14px !important;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .platformLabel {
    display: inline-block;
    background: #6395fa;
    color: #fff;
    vertical-align: text-bottom;
    font-size: 12px;
    padding: 0 8px;
    height: 26px;
    line-height: 26px;
    border-radius: 10px;
    position: relative;
    top: -11px;

  }
}
</style>
