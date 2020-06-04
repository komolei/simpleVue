<template>
  <div>
    <p>{{ a }}</p>
    <Rule />
  </div>
</template>

<script>
import Rule from '../../components/rule/index.vue'

export default {
  name: 'Example',
  components: {
    Rule
  },
  data () {
    return {
      a: 'goods'
    }
  },
  mounted () {
    console.log(process.env)
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
