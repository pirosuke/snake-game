<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <defs>
            <filter id="glow" height="300%" width="300%" x="-75%" y="-75%">
                <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="THICKEN" />
                <feGaussianBlur in="THICKEN" stdDeviation="10" result="BLURRED" />
                <feFlood :flood-color="color" result="GLOW_COLOR" />
                <feComposite in="GLOW_COLOR" in2="BLURRED" operator="in" result="SOFT_GLOW_COLORED" />
                <feMerge>
                    <feMergeNode in="SOFT_GLOW_COLORED"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <polygon
            :points="starPoints"
            :fill="color"
            :stroke="color"
            filter="url(#glow)" />
    </g>
</template>

<script>
import SVGUtils from '../utils/svg'
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
        starPoints() {
            return SVGUtils.generateStarPoints(this.radius, this.radius, 5, 10, 7)
        },
    },
    methods: {
    }
}
</script>

<style>

</style>
