<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <a xlink:href="#">
            <rect
                x="0"
                y="0"
                width="100"
                height="40"
                rx="5"
                ry="5" />
            <text
                x="40"
                y="30"
                fill="#FFF"
                stroke="#FFF"
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
