import React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import PokemonList from '@/components/PokemonList/PokemonList'
import { useAllPokemonsQuery, PokemonNodeFragment } from '@/infrastructure/graphql/generated/graphql'
import { ExpandableItemsProvider, SearchBar, SearchableItemsProvider, useSearchableItemsContext } from '@clearq/ui'
import { PokemonsSortBy } from '@/infrastructure/graphql/generated/graphql'

const getPokemonId = (pokemon: PokemonNodeFragment) => pokemon.id

type PokemonsPageParams = {
  id?: string
}

const PokemonSearch = () => {
  const [search, setSearch] = useSearchParams()
  const { matches, items, next, previous, current } = useSearchableItemsContext<PokemonNodeFragment>()
  const query = search.get('query') || ''
  const sortBy = search.get('sortBy') || ''
  return (
    <SearchBar
      value={search.get('query') || ''}
      matches={matches.length}
      current={current ? matches.indexOf(current) + 1 : 0}
      total={items.length}
      placeholder={`Search pokemons...`}
      onPrevious={previous}
      onNext={next}
      onSearch={(query) => {
        setSearch({
          query,
          sortBy,
          current: '',
        })
      }}
      sortBy={search.get('sortBy') || 'name'}
      onSortBy={(sortBy) => {
        setSearch({
          query,
          sortBy,
          current: current ? getPokemonId(current) : '',
        })
      }}
      sortByOptions={[
        {
          label: 'Name',
          value: 'name',
        },
        {
          label: 'Number',
          value: 'id',
        },
        {
          label: 'HP',
          value: 'hp',
        },
      ]}
    />
  )
}

const PokemonsPage = () => {
  const { id } = useParams<PokemonsPageParams>()
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const allPokemonsQuery = useAllPokemonsQuery({
    variables: {
      sortBy:
        (search.get('sortBy') === 'name' && PokemonsSortBy.Name) ||
        (search.get('sortBy') === 'id' && PokemonsSortBy.Id) ||
        (search.get('sortBy') === 'hp' && PokemonsSortBy.Hp) ||
        PokemonsSortBy.Id,
    },
  })
  const { data, loading, error } = allPokemonsQuery

  const query = search.get('query')
  const current = search.get('current')

  const onCurrentChange = React.useCallback(
    (nextCurrent: PokemonNodeFragment | undefined) => {
      if (nextCurrent) {
        if (nextCurrent.id !== current) {
          setSearch((search) => ({
            query: search.get('query') || '',
            sortBy: search.get('sortBy') || '',
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
          navigate(`/${getPokemonId(item)}?${search.toString()}`)
        } else {
          navigate(-1)
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
