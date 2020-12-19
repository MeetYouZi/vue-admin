<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :unique-opened="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :base-path="route.path" :item="route"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from 'style/variable.scss'

export default {
  components: {
    SidebarItem,
    Logo
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return true
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !!this.sidebar.opened
    }
  },
  data () {
    return {
      permission_routes: [
        {
          path: '/',
          meta: {
            icon: 'el-icon-location',
            title: '首页'
          },
          children: [
            {
              path: '/home',
              meta: {
                title: 'me'
              }
            }, {
              path: '/about',
              meta: {
                title: '关于'
              }
            }
          ]
        }, {
          path: '/about1',
          meta: {
            icon: 'el-icon-location',
            title: '关于1'
          }
        }
      ],
      sidebar: {}
    }
  }
}
</script>
