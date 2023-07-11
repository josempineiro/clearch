import React from 'react'
import cn from 'classnames'
import styles from './RadarChart.module.css'

const RadarChartAxes = ({ labels }: { labels: Array<string> }) => {
  const indexXPosition = (index: number) => {
    const indexCos = Math.round((Math.cos(((2 * Math.PI) / labels.length) * index) + Number.EPSILON) * 100) / 100
    if (indexCos === 0) {
      return 'center'
    } else if (indexCos < 0) {
      return 'left'
    } else {
      return 'right'
    }
  }

  const indexYPosition = (index: number) => {
    const indexSin = Math.round((Math.sin(((2 * Math.PI) / labels.length) * index) + Number.EPSILON) * 100) / 100
    if (indexSin === 0) {
      return 'center'
    } else if (indexSin < 0) {
      return 'top'
    } else {
      return 'bottom'
    }
  }

  return (
    <div className={styles.RadarChartAxes}>
      {labels.map((label, index) => (
        <div
          key={index}
          className={styles.RadarChartAxis}
          style={
            {
              ['--axis-angle']: `${((2 * Math.PI) / labels.length) * index}rad`,
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
              {label.split('-').join(' ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RadarChartAxes

// Estilos en archivo CSS aparte
