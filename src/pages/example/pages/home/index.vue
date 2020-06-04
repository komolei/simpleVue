<template>
  <div>
    <p>{{ a }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      a: 'Home'
    }
  },
  mounted () {
    console.log(process.env)
  }
}
</script>
