<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <a xlink:href="#">
            <circle
                r="40"
                cx="40"
                cy="40"
                stroke="#efe"
                stroke-width="2%"
                stroke-opacity="0.3"
                fill="#fff"
                fill-opacity="0.2" />
            <text
                x="32"
                y="47"
                fill="#9f9"
                stroke="#9f9"
                font-size="25">
                {{ label }}
            </text>
        </a>
    </g>
</template>

<script>
export default {
    components: {
    },
    props: [
        'label',
        'x',
        'y',
    ],
    data: function () {
        return {
        };
    },
    created () {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style>

</style>
