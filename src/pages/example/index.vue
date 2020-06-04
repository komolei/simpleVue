<template>
  <div>
    <p @click="changeLogInStatus">{{ a }}</p>
    <p>{{ logInStatus }}</p>
    <router-link to="/index">Home</router-link>|
    <router-link to="/goods">goods</router-link>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from './store/index'
export default {
  name: 'Example',
  data () {
    return {
      a: 'Example'
    }
  },
  computed: {
    ...mapGetters({
      logInStatus: 'getLogInStatus'
    })
  },
  mounted () {
    console.log(process.env)
  },
  methods: {
    ...mapActions(['changeIsLogInStatus']),
    getLogInStatus () {
      console.log('this.logIn status is1:', this.logInStatus)
      console.log('this.logIn status is2:', this.$store.getters.getLogInStatus)
    },
    changeLogInStatus () {
      store.dispatch('changeIsLogInStatus', true)
      console.log('this.logIn status is:', this.logInStatus)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: #ccc;
  filter: alpha(0.8);
}
</style>
