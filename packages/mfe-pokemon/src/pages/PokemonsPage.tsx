import React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import PokemonList from '@/components/PokemonList/PokemonList'
import { useAllPokemonsQuery, PokemonNodeFragment } from '@/infrastructure/graphql/generated/graphql'
import { ExpandableItemsProvider, SearchBar, SearchableItemsProvider, useSearchableItemsContext } from '@clearq/ui'

const getPokemonId = (pokemon: PokemonNodeFragment) => pokemon.id
type PokemonsPageParams = {
  id?: string
}

const PokemonSearch = () => {
  const [search, setSearch] = useSearchParams()
  const { matches, items, next, previous, current } = useSearchableItemsContext<PokemonNodeFragment>()
  return (
    <SearchBar
      value={search.get('query') || ''}
      matches={matches.length}
      current={current ? matches.indexOf(current) + 1 : 0}
      total={items.length}
      onPrevious={previous}
      onNext={next}
      onSearch={(query) => {
        setSearch({
          current: '',
          query,
        })
      }}
    />
  )
}

const PokemonsPage = () => {
  const { id } = useParams<PokemonsPageParams>()
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const allPokemonsQuery = useAllPokemonsQuery()
  const { data, loading, error } = allPokemonsQuery

  const query = search.get('query')
  const current = search.get('current')

  const onCurrentChange = React.useCallback(
    (nextCurrent: PokemonNodeFragment | undefined) => {
      if (nextCurrent) {
        if (nextCurrent.id !== current) {
          setSearch((search) => ({
            query: search.get('query') || '',
            current: nextCurrent.id,
          }))
        }
      }
    },
    [current, setSearch],
  )

  const match = React.useCallback(
    (pokemon: PokemonNodeFragment) => {
      return query ? pokemon.name.match(query as string) !== null : true
    },
    [query],
  )

  if (loading) {
    return <div>Loading pokemon...</div>
  }
  if (error || !data) {
    return <p>Error loading pokemon...</p>
  }
  return (
    <ExpandableItemsProvider<PokemonNodeFragment>
      items={data.pokemons}
      getItemId={getPokemonId}
      initialExpandedItems={data.pokemons.filter((pokemon) => getPokemonId(pokemon) === id)}
      onToggleItem={(item, isExpanded) => {
        if (isExpanded) {
          navigate(`/${getPokemonId(item)}`)
        } else {
          navigate('/')
        }
      }}
    >
      <SearchableItemsProvider<PokemonNodeFragment>
        items={data.pokemons}
        getItemId={getPokemonId}
        initialCurrentId={search.get('current') as string}
        onCurrentChange={onCurrentChange}
        match={match}
      >
        <PokemonSearch />
        <PokemonList pokemons={data.pokemons} />
      </SearchableItemsProvider>
    </ExpandableItemsProvider>
  )
}

export default PokemonsPage
