<template>
  <div>
    <p>{{ a }}</p>
  </div>
</template>

<script>

export default {
  name: 'Rule',

  data () {
    return {
      a: 'rule'
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
