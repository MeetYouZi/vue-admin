<template>
  <div class="home">
    9999dsafjshdfjas
  </div>
</template>

<script>

import { getToplist } from '@/api'
export default {
  name: 'Home',
  components: {},
  methods: {

  },
  mounted () {
    let config = { hidden: false }
    getToplist({ name: 1 }).then(res => {

    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  font-size: $font-size-small;
}
</style>
