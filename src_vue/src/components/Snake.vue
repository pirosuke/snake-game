<template>
    <g transform="translate(1, 1)">
        <circle
            :r="parts_radius"
            fill="#C00"
            stroke="#C00"
            :cx="head_point.x"
            :cy="head_point.y" />
        <circle
            v-for="body_point in body_points"
            :key="body_point.id"
            :r="parts_radius"
            fill="#000"
            stroke="#000"
            :cx="body_point.x"
            :cy="body_point.y" />
    </g>
</template>

<script>
export default {
    components: {
    },
    props: [
        'start_direction',
        'start_size',
    ],
    data: function () {
        return {
            parts_radius: 5,
            head_point: {
                x: 0,
                y: 0,
            },
            body_points: [],
            pxPerInterval: 10,
            direction: 'left',
        };
    },
    created () {
    },
    mounted() {
        this.direction = this.start_direction
        this.reset()
    },
    computed: {
        head_tl() {
            return {
                x: this.head_point.x - this.parts_radius,
                y: this.head_point.y - this.parts_radius,
            }
        },
        head_br() {
            return {
                x: this.head_point.x + this.parts_radius,
                y: this.head_point.y + this.parts_radius,
            }
        },
    },
    methods: {
        reset() {
            this.head_point = {
                x: 200,
                y: 200,
            }
            this.body_points = []
            for (let i = 0; i < this.start_size; i++) {
                this.addBody()
            }
        },

        updatePosition() {
            let prePoint = Object.assign({}, this.head_point)
            switch (this.direction) {
                case 'left':
                    this.head_point.x -= this.pxPerInterval
                    break
                case 'right':
                    this.head_point.x += this.pxPerInterval
                    break
                case 'up':
                    this.head_point.y -= this.pxPerInterval
                    break
                case 'down':
                    this.head_point.y += this.pxPerInterval
                    break
            }

            // update body points
            for (const [i, bodyPoint] of this.body_points.entries()) {
                const curPoint = bodyPoint
                if (curPoint.x !== prePoint.x || curPoint.y !== prePoint.y) {
                    this.body_points[i] = prePoint
                }
                prePoint = curPoint
            }
        },

        turnLeft() {
            switch (this.direction) {
                case 'left':
                    this.direction = 'down'
                    break
                case 'down':
                    this.direction = 'right'
                    break
                case 'right':
                    this.direction = 'up'
                    break
                case 'up':
                    this.direction = 'left'
                    break
            }
        },

        turnRight() {
            switch (this.direction) {
                case 'left':
                    this.direction = 'up'
                    break
                case 'up':
                    this.direction = 'right'
                    break
                case 'right':
                    this.direction = 'down'
                    break
                case 'down':
                    this.direction = 'left'
                    break
            }
        },

        addBody() {
            let lastBodyPoint = {
                x: 0,
                y: 0,
            }
            if (this.body_points.length === 0) {
                switch (this.direction) {
                    case 'left':
                        lastBodyPoint = {
                            x: this.head_point.x + this.pxPerInterval,
                            y: this.head_point.y,
                        }
                        break
                    case 'right':
                        lastBodyPoint = {
                            x: this.head_point.x - this.pxPerInterval,
                            y: this.head_point.y,
                        }
                        break
                    case 'up':
                        lastBodyPoint = {
                            x: this.head_point.x,
                            y: this.head_point.y + this.pxPerInterval,
                        }
                        break
                    case 'down':
                        lastBodyPoint = {
                            x: this.head_point.x,
                            y: this.head_point.y - this.pxPerInterval,
                        }
                        break
                }
            } else {
                lastBodyPoint = this.body_points[this.body_points.length - 1]
            }

            this.body_points.push({
                id: this.body_points.length + 1,
                x: lastBodyPoint.x,
                y: lastBodyPoint.y,
            })

        },

        isPointHittingSnake(point_tl, point_br) {
            let isHitting = false

            for (const bodyPoint of this.body_points) {
                const minX = bodyPoint.x - this.parts_radius
                const maxX = bodyPoint.x + this.parts_radius
                const minY = bodyPoint.y - this.parts_radius
                const maxY = bodyPoint.y + this.parts_radius

                if ((
                        point_tl.x < maxX
                        && point_tl.x > minX
                        && point_tl.y < maxY
                        && point_tl.y > minY
                    ) || (
                        point_br.x > minX
                        && point_br.x < maxX
                        && point_br.y > minY
                        && point_br.y < maxY
                    ) || (
                        point_tl.x === minX
                        && point_tl.y === minY
                        && point_br.x === maxX
                        && point_br.y === maxY
                    )) {
                    isHitting = true
                    break
                }
            }

            return isHitting
        },
    }
}
</script>

<style>

</style>
