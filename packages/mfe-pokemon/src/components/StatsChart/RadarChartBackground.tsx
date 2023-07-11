import styles from './RadarChart.module.css'

export const RadarChartBackground = ({ labels }: { labels: Array<string> }) => {
  const style = {
    clipPath: `polygon(${labels
      .map((_, index, labels) => {
        const valueAngle = ((2 * Math.PI) / labels.length) * index
        return [50 + 50 * Math.cos(valueAngle), 50 + 50 * Math.sin(valueAngle)]
      })
      .map(([x, y]) => `${x}% ${y}%`)
      .join(',')})`,
  }

  return <div className={styles.RadarChartBackground} style={style}></div>
}

export default RadarChartBackground

// Estilos en archivo CSS aparte
