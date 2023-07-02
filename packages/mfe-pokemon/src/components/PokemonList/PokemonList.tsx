import { Link } from 'react-router-dom'
import { usePokemonsQuery } from '../../infrastructure/graphql/generated/graphql'
import styles from './PokemonList.module.css'
import { Button } from '@clearq/ui'

const PokemonList = () => {
  const pokemonsQuery = usePokemonsQuery({
    variables: {},
    onError: (error) => {
      console.log(error)
    },
    onCompleted: (data) => {
      console.log(data)
    },
  })
  const { data, loading, error, fetchMore, variables } = pokemonsQuery

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        offset: (variables?.offset ?? 0) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }
        return {
          pokemons: [...prev.pokemons, ...fetchMoreResult.pokemons],
        }
      },
    })
  }
  if (loading) {
    return <div>Loading pokemon...</div>
  }
  if (error || !data) {
    return <p>Error loading pokemon...</p>
  }
  return (
    <div className={styles.root}>
      <ul>
        {data.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link to={`${pokemon.id}`}>
              <h2>{pokemon.id}</h2>
              <p>{pokemon.name}</p>
            </Link>
            {pokemon.abilities && (
              <div>
                {pokemon.abilities.map((ability) => (
                  <div key={ability.id}>{ability.name}</div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <Button onClick={() => handleFetchMore()}>Load more</Button>
    </div>
  )
}

export default PokemonList
