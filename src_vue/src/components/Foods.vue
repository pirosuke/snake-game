<template>
    <g transform="translate(1, 1)">
        <Food
            v-for="food in foods"
            :key="food.id"
            :x="food.x"
            :y="food.y"
            :color="food.color"
            :radius="food.radius" />
    </g>
</template>

<script>
import Food from './Food'

export default {
    components: {
        Food,
    },
    props: [
        'maxX',
        'maxY',
    ],
    data: function () {
        return {
            food_id_seq: 1,
            foods: [],
            foodTypes: [
                {
                    name: "normal",
                    color: "#666",
                },
                {
                    name: "speedup",
                    color: "#F00",
                },
                {
                    name: "grow",
                    color: "#0F0",
                },
                {
                    name: "more_food",
                    color: "#00F",
                },
            ],
        };
    },
    created () {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        reset() {
            this.foods = []
        },

        checkEating(point_tl, point_br) {
            let foodEaten = null
            for (const food of this.foods) {
                if (this.isPointHittingFood(food, point_tl, point_br)) {
                    foodEaten = food
                    break
                }
            }

            if (foodEaten !== null) {
                this.foods = this.foods.filter(food => food.id !== foodEaten.id)
            }

            return foodEaten
        },

        isPointHittingFood(food_point, point_tl, point_br) {
            let isHitting = false

            const minX = food_point.x
            const maxX = food_point.x + food_point.radius * 2
            const minY = food_point.y
            const maxY = food_point.y + food_point.radius * 2

            if ((
                    point_tl.x <= maxX
                    && point_tl.x >= minX
                    && point_tl.y <= maxY
                    && point_tl.y >= minY
                ) || (
                    point_br.x >= minX
                    && point_br.x <= maxX
                    && point_br.y >= minY
                    && point_br.y <= maxY
                ) || (
                    point_tl.x === minX
                    && point_tl.y === minY
                    && point_br.x === maxX
                    && point_br.y === maxY
                )) {
                isHitting = true
            }

            return isHitting
        },

        addFood() {
            const foodType = this.getRandomFoodType()
            const food = {
                id: this.food_id_seq,
                x: this.generateRandomPoint(this.maxX, 20, 20),
                y: this.generateRandomPoint(this.maxY, 50, 50),
                radius: 5,
                color: foodType.color,
                type: foodType.name,
            }
            this.foods.push(food)
            this.food_id_seq += 1
        },

        addFoods(num) {
            for (let i = 0; i < num; i++) {
                this.addFood()
            }
        },

        generateRandomPoint(max, minPadding, maxPadding) {
            return Math.floor(Math.random() * Math.floor(max - maxPadding * 2)) + minPadding
        },

        getRandomFoodType() {
            const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)
            const shuffledTypes = shuffleArray(this.foodTypes)
            return shuffledTypes[0]
        },
    }
}
</script>

<style>

</style>
