import { List, ListItem, Container, RadarChart } from '@clearq/ui'
import { StatsFragment } from '@/infrastructure/graphql/generated/graphql'

interface PokemonStatsProps {
  stats: StatsFragment['stats']
}

export const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <Container padding={['m', 'none']}>
      <Container padding={'xl'}>
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
      </Container>
    </Container>
  )
}
