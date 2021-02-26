<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <circle
            :r="radius"
            fill="#F00"
            stroke="#F00"
            cx="5"
            cy="5" />
    </g>
</template>

<script>
export default {
    components: {
    },
    props: [
        'x',
        'y',
    ],
    data: function () {
        return {
            radius: 5,
        };
    },
    created () {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        isPointHittingFood(point_tl, point_br) {
            let isHitting = false

            const minX = this.x
            const maxX = this.x + this.radius * 2
            const minY = this.y
            const maxY = this.y + this.radius * 2

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
    }
}
</script>

<style>

</style>
