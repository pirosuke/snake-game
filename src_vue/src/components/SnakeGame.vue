<template>
    <v-container>
        <StartDialog
            :open.sync="isDialogOpened"
            :message="message" />
        <v-layout
            text-xs-center
        >
            <svg
                id="app"
                :width="areaWidth"
                :height="areaHeight"
                style="border: 1px solid #000;">
                <Snake
                    :start_direction="snake_direction"
                    start_size="3"
                    ref="snake" />
                <Food
                    :x="food.x"
                    :y="food.y"
                    ref="food" />
                <CtrlBtn
                    @click.native="turnSnakeLeft"
                    x="10"
                    y="350"
                    label="L" />
                <CtrlBtn
                    @click.native="turnSnakeRight"
                    x="290"
                    y="350"
                    label="R" />
                <Score
                    x="10"
                    y="10"
                    ref="score" />
            </svg>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import StartDialog from './StartDialog'
import Snake from './Snake'
import Food from './Food'
import CtrlBtn from './ControlButton'
import Score from './Score'

export default {
    components: {
        StartDialog,
        Snake,
        Food,
        CtrlBtn,
        Score,
    },
    props: [
        'areaHeight',
        'areaWidth',
    ],
    data: function () {
        return {
            snake_direction: 'left',
            speed: 10,
            interval: null,
            isGameOver: false,
            isDialogOpened: true,
            food: {
                x: -10,
                y: -10,
            },
        };
    },
    created () {
    },
    mounted() {
    },
    watch: {
        isDialogOpened: function(val) {
            if (!val) {
                this.resetGame()
                this.startGame()
            }
        }
    },
    computed: {
        message() {
            if (this.isGameOver) {
                return "Game Over!"
            }

            return ""
        },

        maxX() {
            return this.areaWidth.replace("px", "") - 0
        },

        maxY() {
            return this.areaHeight.replace("px", "") - 0
        }
    },
    methods: {
        resetGame() {
            this.$refs.snake.reset()
            this.$refs.score.resetScore()
            this.snake_direction = 'left'
            this.putFood()
        },

        startGame() {
            this.interval = setInterval(() => {
                this.$refs.snake.updatePosition()
                this.$refs.score.addScore(this.$refs.snake.body_points.length)
                if (!this.isSnakeAlive()) {
                    this.isGameOver = true
                    clearInterval(this.interval)
                    this.isDialogOpened = true
                }

                if (this.isEating()) {
                    this.$refs.snake.addBody()
                    this.putFood()
                }
            }, 1000 / this.speed)
        },

        sleep() {
            return new Promise(requestAnimationFrame)
        },

        turnSnakeLeft() {
            this.$refs.snake.turnLeft()
        },

        turnSnakeRight() {
            this.$refs.snake.turnRight()
        },

        isSnakeAlive() {
            // check wall hit
            if (this.$refs.snake.head_tl.x < 0
                || this.$refs.snake.head_br.x > this.maxX
                || this.$refs.snake.head_tl.y < 0
                || this.$refs.snake.head_br.y > this.maxY) {
                return false
            }

            // check snake hit
            if (this.$refs.snake.isPointHittingSnake(this.$refs.snake.head_tl, this.$refs.snake.head_br)) {
                return false
            }

            return true
        },

        isEating() {
            if (this.$refs.food.isPointHittingFood(this.$refs.snake.head_tl, this.$refs.snake.head_br)) {
                return true
            }

            return false
        },

        putFood() {
            this.food.x = this.generateRandomPoint(this.maxX, 20, 20)
            this.food.y = this.generateRandomPoint(this.maxY, 20, 100)
        },

        generateRandomPoint(max, minPadding, maxPadding) {
            return Math.floor(Math.random() * Math.floor(max - maxPadding * 2)) + minPadding
        },
    }
}
</script>

<style>

</style>
