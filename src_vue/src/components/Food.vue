<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <circle
            :r="radius"
            :fill="color"
            :stroke="color"
            :cx="radius"
            :cy="radius" />
    </g>
</template>

<script>
export default {
    components: {
    },
    props: [
        'x',
        'y',
        'radius',
        'color',
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
