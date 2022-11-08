<template>
  <v-navigation-drawer
    permanent
    :mini-variant.sync="mini"
    expand-on-hover
    app
  >
    <v-list>
      <v-list-item class="px-2" to="/setting/profile">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link to="/setting/profile">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Sandra Adams
          </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list
      nav
      dense
    >
      <template
        v-for="(item,id) in menus"
      >
        <v-divider v-if="item.header && !item.items" :key="id" inset />

        <v-list-group
          v-else-if="item.items"
          :key="id"
          :prepend-icon="item.icon"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            dense
            :to="child.action"
          >
            <v-list-item-icon><v-icon>{{ child.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title>
              {{ child.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="id" :to="item.action">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import menus from '@/utils/menu'
export default {
  data () {
    return {
    //   menus: [
    //     { title: 'Home', icon: 'mdi-home-city', action: '/' },
    //     { title: 'Branch', icon: 'mdi-home-city', action: '/branches' },
    //     { title: 'Staffs', icon: 'mdi-account', action: '/staffs' },
    //     { title: 'Providers', icon: 'mdi-account-group-outline', action: '/providers' },
    //     { title: 'Products', icon: 'mdi-account-group-outline', action: '/products' },
    //     { title: 'Orders', icon: 'mdi-account-group-outline', action: '/orders' }
    //   ],
      menus,
      mini: true
    }
  }
}
</script>
