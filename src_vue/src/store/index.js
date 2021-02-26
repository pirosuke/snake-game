import Vue from "vue";
import Vuex from "vuex";
import snakeGame from './modules/snake_game'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snakeGame,
  }
});
