<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <a xlink:href="#">
            <rect
                x="0"
                y="0"
                width="180"
                height="40"
                stroke="#000"
                fill="#fff"
                rx="5"
                ry="5" />
            <text
                x="10"
                y="30"
                width="180"
                fill="#000"
                stroke="#000"
                font-size="25">
                {{ scoreFormatted }}
            </text>
        </a>
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
            score: 0,
        };
    },
    created () {
    },
    mounted() {
    },
    computed: {
        scoreFormatted() {
            return this.score.toString().padStart(10, '0')
        }
    },
    methods: {
        addScore(newScore) {
            this.score += newScore
        },

        resetScore() {
            this.score = 0
        },
    }
}
</script>

<style>

</style>
