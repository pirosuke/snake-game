<template>
  <v-container>
    <v-row>
      <v-col>
        <SnakeGame
          areaHeight="400px"
          areaWidth="400px" />
      </v-col>
    </v-row>
  </v-container>
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