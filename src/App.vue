<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    this.theme = JSON.parse(localStorage.getItem('theme'))
  },
  data () {
    return {
      theme: ''
    }
  },
  watch: {
    theme () {
      localStorage.setItem('theme', JSON.stringify(this.theme))
    }
  }
}
</script>
