export default {
    generateStarPoints(baseX, baseY, innerRadius, outerRadius, pointNum) {
        const angle = Math.PI / pointNum
        let points = []

        for (let i = 0; i < pointNum * 2; i++) {
            const radius = i & 1 ? innerRadius : outerRadius
            points.push({
                x: baseX + radius * Math.sin(i * angle),
                y: baseY - radius * Math.cos(i * angle),
            })
        }

        return points.map(point => point.x + "," + point.y).join(" ")
    },
}