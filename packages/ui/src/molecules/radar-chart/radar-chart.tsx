import cn from 'classnames'
import { Tooltip } from '@/molecules/tooltip'
import styles from './radar-chart.module.css'

export interface RadarData {
  value: number
  label: React.ReactNode
  description: React.ReactNode
}

export function RadarChart({ dataset }: { dataset: Array<RadarData> }) {
  const indexXPosition = (index: number) => {
    const indexCos = Math.round((Math.cos(((2 * Math.PI) / dataset.length) * index) + Number.EPSILON) * 100) / 100
    if (indexCos === 0) {
      return 'center'
    } else if (indexCos < 0) {
      return 'left'
    } else {
      return 'right'
    }
  }

  const indexYPosition = (index: number) => {
    const indexSin = Math.round((Math.sin(((2 * Math.PI) / dataset.length) * index) + Number.EPSILON) * 100) / 100
    if (indexSin === 0) {
      return 'center'
    } else if (indexSin < 0) {
      return 'top'
    } else {
      return 'bottom'
    }
  }
  const style = {
    clipPath: `polygon(${dataset
      .map((_, index) => {
        const valueAngle = ((2 * Math.PI) / dataset.length) * index
        return [50 + 50 * Math.cos(valueAngle), 50 + 50 * Math.sin(valueAngle)]
      })
      .map(([x, y]) => `${x}% ${y}%`)
      .join(',')})`,
  }
  const svgPath = dataset
    .map(({ value }) => value)
    .map((value, index) => {
      const valueAngle = ((2 * Math.PI) / dataset.length) * index
      return [50 + (50 * Math.cos(valueAngle) * value) / 250, 50 + (50 * Math.sin(valueAngle) * value) / 250]
    })
    .map(([x, y]) => `${x} ${y}`)
    .join(' L ')

  const svgStyles = {
    stroke: 'var(--color-primary)',
    fill: 'var(--color-secondary)',
    d: `path("m ${svgPath} z")`,
  }

  return (
    <div className={styles.RadarChart}>
      <div className={styles.RadarChartBackground} style={style}></div>
      <svg className={styles.RadarCharArea} viewBox="0 0 100 100">
        <path style={svgStyles} />
      </svg>
      <div className={styles.RadarChartAxes}>
        {dataset.map((data, index) => (
          <div
            key={index}
            className={styles.RadarChartAxis}
            style={
              {
                ['--axis-angle']: `${((2 * Math.PI) / dataset.length) * index}rad`,
              } as React.CSSProperties
            }
          >
            <div className={styles.RadarChartAxisPoint}>
              <div
                className={cn([
                  styles.RadarChartAxisLabel,
                  {
                    [styles.RadarChartAxisLabel_x_left]: indexXPosition(index) === 'left',
                    [styles.RadarChartAxisLabel_x_center]: indexXPosition(index) === 'center',
                    [styles.RadarChartAxisLabel_x_right]: indexXPosition(index) === 'right',
                    [styles.RadarChartAxisLabel_y_top]: indexYPosition(index) === 'top',
                    [styles.RadarChartAxisLabel_y_center]: indexYPosition(index) === 'center',
                    [styles.RadarChartAxisLabel_y_bottom]: indexYPosition(index) === 'bottom',
                  },
                ])}
              >
                <Tooltip
                  trigger="hover"
                  target={
                    <span
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      {data.label}
                    </span>
                  }
                >
                  {data.description}
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
