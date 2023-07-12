import { List, ListItem } from '@clearq/ui'
import RadarChart from './RadarChart'

interface Stat {
  id: string
  name: string
  value: number
  characteristics: Array<string>
}

interface StatsChartProps {
  stats: Array<Stat>
}

export const StatsChart = ({ stats }: StatsChartProps) => {
  console.log([stats.map((stat) => stat.value)])
  return (
    <RadarChart
      dataset={stats.map((stat) => {
        return {
          value: stat.value,
          label: stat.name.replace('-', ' '),
          description: (
            <List>
              {stat.characteristics.map((characteristic) => (
                <ListItem key={characteristic}>{characteristic}</ListItem>
              ))}
            </List>
          ),
        }
      })}
    />
  )
}
