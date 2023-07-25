import React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import PokemonList from '@/components/PokemonList/PokemonList'
import { useAllPokemonsQuery, PokemonNodeFragment } from '@/infrastructure/graphql/generated/graphql'
import {
  Button,
  ExpandableItemsProvider,
  SearchBar,
  SearchableItemsProvider,
  useSearchableItemsContext,
  GroupedButtons,
} from '@clearq/ui'
import { PokemonsSortBy, PokemonsSortDirection } from '@/infrastructure/graphql/generated/graphql'
import {
  PokemonsSortingDropdownMenuButton,
  usePokemonSortingOptions,
} from '@/components/PokemonsSortingDropdownMenuButton'

const getPokemonId = (pokemon: PokemonNodeFragment) => pokemon.id

type PokemonsPageParams = {
  id?: string
}

const PokemonSearch = () => {
  const [search, setSearch] = useSearchParams()
  const { matches, items, next, previous, current } = useSearchableItemsContext<PokemonNodeFragment>()
  const query = search.get('query') || ''
  const sortBy = search.get('sortBy') || ''
  const direction = search.get('direction') || ''
  const handleToggleSortDirection = React.useCallback(() => {
    setSearch({
      query,
      sortBy,
      current: '',
      direction: direction === 'ASC' ? 'DESC' : 'ASC',
    })
  }, [query, sortBy, direction, setSearch])
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
          direction,
          current: '',
        })
      }}
    >
      <GroupedButtons>
        <PokemonsSortingDropdownMenuButton
          activeSortBy={sortBy}
          onSortBy={(sortBy) => {
            setSearch({
              query,
              sortBy,
              direction,
              current: '',
            })
          }}
        />
        <Button onClick={handleToggleSortDirection}>
          <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              style={{
                fill: direction === 'DESC' ? 'currentColor' : 'var(--text-color-tertiary)',
              }}
              d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
            />
            <path
              style={{
                fill: direction === 'ASC' ? 'currentColor' : 'var(--text-color-tertiary)',
              }}
              d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
            />
          </svg>
        </Button>
      </GroupedButtons>
    </SearchBar>
  )
}

const PokemonsPage = () => {
  const { id } = useParams<PokemonsPageParams>()
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const allPokemonsQuery = useAllPokemonsQuery({
    variables: {
      sortDirection: search.get('direction') === 'DESC' ? PokemonsSortDirection.Desc : PokemonsSortDirection.Asc,
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
  const direction = search.get('direction')

  const onCurrentChange = React.useCallback(
    (nextCurrent: PokemonNodeFragment | undefined) => {
      if (nextCurrent) {
        if (nextCurrent.id !== current) {
          setSearch((search) => ({
            query: search.get('query') || '',
            sortBy: search.get('sortBy') || '',
            current: nextCurrent.id,
            direction: search.get('direction') || '',
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
