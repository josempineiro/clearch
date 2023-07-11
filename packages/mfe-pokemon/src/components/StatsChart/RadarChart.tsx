import RadarChartAxes from './RadarChartAxes'
import RadarChartBackground from './RadarChartBackground'
import RadarChartArea from './RadarChartArea'
import styles from './RadarChart.module.css'

const RadarChart = ({ labels, dataset }: { labels: Array<string>; dataset: Array<Array<number>> }) => {
  return (
    <div className={styles.RadarChart}>
      <RadarChartAxes labels={labels} />
      <RadarChartBackground labels={labels} />
      <div>
        {dataset.map((statsValues, index) => (
          <RadarChartArea
            key={index}
            data={{
              values: statsValues,
              color: `hsl(${(360 / dataset.length) * index}, 100%, 50%)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default RadarChart

// Estilos en archivo CSS aparte
