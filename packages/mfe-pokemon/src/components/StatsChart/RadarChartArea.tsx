import styles from './RadarChart.module.css'

export function RadarChartArea({
  data,
}: {
  data: {
    values: number[]
    color: string
  }
}) {
  const svgPath = data.values
    .map((value, index, values) => {
      const valueAngle = ((2 * Math.PI) / values.length) * index
      return [50 + 50 * Math.cos(valueAngle) * value, 50 + 50 * Math.sin(valueAngle) * value]
    })
    .map(([x, y]) => `${x} ${y}`)
    .join(' L ')

  const svgStyles = {
    stroke: data.color,
    fill: data.color,
    d: `path("m ${svgPath} z")`,
  }

  return (
    <svg className={styles.RadarCharArea} viewBox="0 0 100 100">
      <path style={svgStyles} />
    </svg>
  )
}

export default RadarChartArea

// Estilos en archivo CSS aparte
