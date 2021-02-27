<template>
  <SnakeGame />
</template>

<script>
  import SnakeGame from '../components/SnakeGame'
  import { mapGetters, mapState } from 'vuex'

  export default {
    components: {
      SnakeGame,
    },
    data () {
      return {
      }
    },

    watch: {
    },

    async mounted() {
    },
    computed: {
        ...mapState({
        }),
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>