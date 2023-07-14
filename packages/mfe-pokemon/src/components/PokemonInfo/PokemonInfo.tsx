import { ListItem, Tag, Container, List, Text, Tooltip, FlexBox } from '@clearq/ui'
import { PokemonFragment } from '@/infrastructure/graphql/generated/graphql'

interface PokemonInfoProps {
  pokemon: PokemonFragment
}

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  return (
    <FlexBox direction="column" gap="s" padding={['m', 'none']}>
      <FlexBox>
        <Text transform="capitalize">abilities:</Text>
        <List direction="row">
          {pokemon.details?.abilities?.map((ability) => (
            <Tooltip
              key={ability.id}
              trigger="hover"
              width="content"
              target={
                <Tag key={ability.id} variant="primary">
                  {ability.name}
                </Tag>
              }
            >
              <List>
                {ability.effects.map((effect) => (
                  <ListItem key={effect}>
                    <Text variant="caption">{effect}</Text>
                  </ListItem>
                ))}
              </List>
            </Tooltip>
          ))}
        </List>
      </FlexBox>
      <Container>
        <Text transform="capitalize">height:</Text>
        <Tag variant="primary">{pokemon.details?.height}</Tag>
      </Container>
      <Container>
        <Text transform="capitalize">weight:</Text>
        <Tag variant="primary">{pokemon.details?.weight}</Tag>
      </Container>
    </FlexBox>
  )
}
