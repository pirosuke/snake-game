<template>
    <v-container style="height: 100%;">
        <StartDialog
            :open.sync="isDialogOpened"
            :message="message" />
        <svg
            id="snake-game"
            ref="snakeGame"
            style="width:100%; height: 80%;" >
            <Snake
                :start_direction="snake_direction"
                start_size="3"
                ref="snake" />
            <Foods
                :max-x="maxX"
                :max-y="maxY"
                ref="foods" />
            <CtrlBtn
                @click.native="turnSnakeLeft"
                x="10"
                :y="maxY - 90"
                label="L" />
            <CtrlBtn
                @click.native="turnSnakeRight"
                :x="maxX - 90"
                :y="maxY - 90"
                label="R" />
            <Score
                x="10"
                y="10"
                ref="score" />
        </svg>
    </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import StartDialog from './StartDialog'
import Snake from './Snake'
import Foods from './Foods'
import CtrlBtn from './ControlButton'
import Score from './Score'

export default {
    components: {
        StartDialog,
        Snake,
        Foods,
        CtrlBtn,
        Score,
    },
    props: [
    ],
    data: function () {
        return {
            snake_direction: 'left',
            isGameOver: false,
            isDialogOpened: true,
            maxX: 0,
            maxY: 0,

            snakeFps: 10,
            snakeLastTs: null,
        };
    },
    created () {
    },
    mounted() {
        this.resetArea()
        window.addEventListener('keyup', this.handleKeyup)
    },
    watch: {
        isDialogOpened: function(val) {
            if (!val) {
                this.$refs.snakeGame.focus()
                this.resetGame()
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

        snakeFpsInterval() {
            return 1000 / this.snakeFps
        }
    },
    methods: {
        resetArea() {
            const rect = this.$refs.snakeGame.getBoundingClientRect()
            this.maxX = rect.width
            this.maxY = rect.height
        },

        resetGame() {
            this.$refs.snake.reset()
            this.$refs.foods.reset()
            this.$refs.score.resetScore()
            this.snake_direction = 'left'
            this.isGameOver = false
            this.snakeFps = 10
            for (let i = 0; i < 5; i++) {
                this.$refs.foods.addFood()
            }
            this.lastTs = Date.now()
            this.gameLoop()
        },

        gameLoop() {

            const now = Date.now()
            const elapsed = now - this.snakeLastTs
            if (elapsed > this.snakeFpsInterval) {
                this.snakeLastTs = now - (elapsed % this.snakeFpsInterval)

                this.$refs.snake.updatePosition()
                this.$refs.score.addScore(this.$refs.snake.body_points.length)
                if (!this.isSnakeAlive()) {
                    this.isGameOver = true
                    this.isDialogOpened = true
                }

                const foodEaten = this.$refs.foods.checkEating(this.$refs.snake.head_br, this.$refs.snake.head_tl)
                if (foodEaten !== null) {
                    switch (foodEaten.type) {
                        case 'speedup':
                            this.snakeFps += 8
                            break
                        case 'grow':
                            for (let i = 0; i < 10; i++) {
                                this.$refs.snake.addBody()
                            }
                            break
                        case 'more_food':
                            this.$refs.foods.addFoods(5)
                            break
                    }
                    this.$refs.snake.addBody()
                    this.$refs.foods.addFood()
                }
            }

            if (!this.isGameOver) {
                this.raf = requestAnimationFrame(this.gameLoop)
            }
        },

        handleKeyup(e) {
            switch (e.keyCode) {
                case 76:
                    this.turnSnakeLeft()
                    break
                case 82:
                    this.turnSnakeRight()
                    break
            } 
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
    }
}
</script>

<style>
#snake-game {
    border: 1px solid #000;
    background-color: #000;
}
</style>
