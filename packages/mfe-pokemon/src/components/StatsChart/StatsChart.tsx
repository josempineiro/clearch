import RadarChart from './RadarChart'

interface Stat {
  name: string
  value: number
  characteristics: Array<string>
}

interface StatsChartProps {
  stats: Array<Stat>
}

export const StatsChart = ({ stats }: StatsChartProps) => {
  console.log([stats.map((stat) => stat.value)])
  return <RadarChart labels={stats.map((stat) => stat.name)} dataset={[stats.map((stat) => stat.value / 250)]} />
}
