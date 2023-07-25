import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ability = {
  __typename?: 'Ability';
  effects: Array<Maybe<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Pokemon = {
  __typename?: 'Pokemon';
  details: PokemonDetails;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type PokemonDetails = {
  __typename?: 'PokemonDetails';
  abilities: Array<Ability>;
  height: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  stats: Array<Stat>;
  weight: Scalars['Int']['output'];
};

export type PokemonEdge = {
  __typename?: 'PokemonEdge';
  cursor: Scalars['String']['output'];
  node: Pokemon;
};

export type PokemonsConnection = {
  __typename?: 'PokemonsConnection';
  edges: Array<PokemonEdge>;
  pageInfo: PageInfo;
};

export enum PokemonsSortBy {
  Hp = 'HP',
  Id = 'ID',
  Name = 'NAME'
}

export enum PokemonsSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  allPokemons: Array<Pokemon>;
  pokemon: Pokemon;
  pokemons: PokemonsConnection;
  pokemonsByIds: Array<Pokemon>;
  trainers: Array<Trainer>;
};


export type QueryAllPokemonsArgs = {
  sortBy?: InputMaybe<PokemonsSortBy>;
  sortDirection?: InputMaybe<PokemonsSortDirection>;
};


export type QueryPokemonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPokemonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPokemonsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type Stat = {
  __typename?: 'Stat';
  characteristics: Array<Scalars['String']['output']>;
  effort: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type Trainer = {
  __typename?: 'Trainer';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pokemons: Array<Pokemon>;
};

export type AllPokemonsQueryVariables = Exact<{
  sortBy?: InputMaybe<PokemonsSortBy>;
  sortDirection?: InputMaybe<PokemonsSortDirection>;
}>;


export type AllPokemonsQuery = { __typename?: 'Query', pokemons: Array<{ __typename?: 'Pokemon', id: string, name: string, image?: string | null }> };

export type StatFragment = { __typename?: 'Stat', id: string, name: string, value: number, characteristics: Array<string> };

export type StatsFragment = { __typename?: 'PokemonDetails', stats: Array<{ __typename?: 'Stat', id: string, name: string, value: number, characteristics: Array<string> }> };

export type AbilitiesFragment = { __typename?: 'PokemonDetails', abilities: Array<{ __typename?: 'Ability', name: string, id: string, effects: Array<string | null> }> };

export type DetailsFragment = { __typename?: 'Pokemon', details: { __typename?: 'PokemonDetails', weight: number, height: number, images: Array<string> } & ({ __typename?: 'PokemonDetails', abilities: Array<{ __typename?: 'Ability', name: string, id: string, effects: Array<string | null> }> } | { __typename?: 'PokemonDetails', abilities?: never }) & ({ __typename?: 'PokemonDetails', stats: Array<{ __typename?: 'Stat', id: string, name: string, value: number, characteristics: Array<string> }> } | { __typename?: 'PokemonDetails', stats?: never }) };

export type PokemonFragment = { __typename?: 'Pokemon', id: string, name: string, image?: string | null } & ({ __typename?: 'Pokemon', details: { __typename?: 'PokemonDetails', weight: number, height: number, images: Array<string> } & ({ __typename?: 'PokemonDetails', abilities: Array<{ __typename?: 'Ability', name: string, id: string, effects: Array<string | null> }> } | { __typename?: 'PokemonDetails', abilities?: never }) & ({ __typename?: 'PokemonDetails', stats: Array<{ __typename?: 'Stat', id: string, name: string, value: number, characteristics: Array<string> }> } | { __typename?: 'PokemonDetails', stats?: never }) } | { __typename?: 'Pokemon', details?: never });

export type PokemonQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PokemonQuery = { __typename?: 'Query', pokemon: { __typename?: 'Pokemon', id: string, name: string, image?: string | null, details: { __typename?: 'PokemonDetails', weight: number, height: number, images: Array<string> } & ({ __typename?: 'PokemonDetails', abilities: Array<{ __typename?: 'Ability', name: string, id: string, effects: Array<string | null> }> } | { __typename?: 'PokemonDetails', abilities?: never }) & ({ __typename?: 'PokemonDetails', stats: Array<{ __typename?: 'Stat', id: string, name: string, value: number, characteristics: Array<string> }> } | { __typename?: 'PokemonDetails', stats?: never }) } };

export type PokemonByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type PokemonByIdsQuery = { __typename?: 'Query', pokemonsByIds: Array<{ __typename?: 'Pokemon', id: string, name: string } & ({ __typename?: 'Pokemon', details: { __typename?: 'PokemonDetails', height: number, weight: number } & ({ __typename?: 'PokemonDetails', abilities: Array<{ __typename?: 'Ability', name: string, id: string, effects: Array<string | null> }> } | { __typename?: 'PokemonDetails', abilities?: never }) } | { __typename?: 'Pokemon', details?: never })> };

export type PokemonNodeFragment = { __typename?: 'Pokemon', id: string, name: string };

export type PokemonsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type PokemonsQuery = { __typename?: 'Query', pokemons: { __typename?: 'PokemonsConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'PokemonEdge', cursor: string, node: { __typename?: 'Pokemon', id: string, name: string } }> } };

export const AbilitiesFragmentDoc = gql`
    fragment Abilities on PokemonDetails {
  abilities {
    name
    id
    effects
  }
}
    `;
export const StatFragmentDoc = gql`
    fragment Stat on Stat {
  id
  name
  value
  characteristics
}
    `;
export const StatsFragmentDoc = gql`
    fragment Stats on PokemonDetails {
  stats {
    ...Stat
  }
}
    ${StatFragmentDoc}`;
export const DetailsFragmentDoc = gql`
    fragment Details on Pokemon {
  details {
    weight
    height
    images
    ...Abilities @defer
    ...Stats @defer
  }
}
    ${AbilitiesFragmentDoc}
${StatsFragmentDoc}`;
export const PokemonFragmentDoc = gql`
    fragment Pokemon on Pokemon {
  id
  name
  image
  ...Details @defer
}
    ${DetailsFragmentDoc}`;
export const PokemonNodeFragmentDoc = gql`
    fragment PokemonNode on Pokemon {
  id
  name
}
    `;
export const AllPokemonsDocument = gql`
    query allPokemons($sortBy: PokemonsSortBy, $sortDirection: PokemonsSortDirection) {
  pokemons: allPokemons(sortBy: $sortBy, sortDirection: $sortDirection) {
    id
    name
    image
  }
}
    `;

/**
 * __useAllPokemonsQuery__
 *
 * To run a query within a React component, call `useAllPokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPokemonsQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useAllPokemonsQuery(baseOptions?: Apollo.QueryHookOptions<AllPokemonsQuery, AllPokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPokemonsQuery, AllPokemonsQueryVariables>(AllPokemonsDocument, options);
      }
export function useAllPokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPokemonsQuery, AllPokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPokemonsQuery, AllPokemonsQueryVariables>(AllPokemonsDocument, options);
        }
export type AllPokemonsQueryHookResult = ReturnType<typeof useAllPokemonsQuery>;
export type AllPokemonsLazyQueryHookResult = ReturnType<typeof useAllPokemonsLazyQuery>;
export type AllPokemonsQueryResult = Apollo.QueryResult<AllPokemonsQuery, AllPokemonsQueryVariables>;
export const PokemonDocument = gql`
    query pokemon($id: ID!) {
  pokemon(id: $id) {
    ...Pokemon
  }
}
    ${PokemonFragmentDoc}`;

/**
 * __usePokemonQuery__
 *
 * To run a query within a React component, call `usePokemonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePokemonQuery(baseOptions: Apollo.QueryHookOptions<PokemonQuery, PokemonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonQuery, PokemonQueryVariables>(PokemonDocument, options);
      }
export function usePokemonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonQuery, PokemonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonQuery, PokemonQueryVariables>(PokemonDocument, options);
        }
export type PokemonQueryHookResult = ReturnType<typeof usePokemonQuery>;
export type PokemonLazyQueryHookResult = ReturnType<typeof usePokemonLazyQuery>;
export type PokemonQueryResult = Apollo.QueryResult<PokemonQuery, PokemonQueryVariables>;
export const PokemonByIdsDocument = gql`
    query pokemonByIds($ids: [ID!]!) {
  pokemonsByIds(ids: $ids) {
    id
    name
    ... @defer {
      details {
        height
        weight
        ... @defer {
          abilities {
            name
            id
            effects
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePokemonByIdsQuery__
 *
 * To run a query within a React component, call `usePokemonByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePokemonByIdsQuery(baseOptions: Apollo.QueryHookOptions<PokemonByIdsQuery, PokemonByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonByIdsQuery, PokemonByIdsQueryVariables>(PokemonByIdsDocument, options);
      }
export function usePokemonByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonByIdsQuery, PokemonByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonByIdsQuery, PokemonByIdsQueryVariables>(PokemonByIdsDocument, options);
        }
export type PokemonByIdsQueryHookResult = ReturnType<typeof usePokemonByIdsQuery>;
export type PokemonByIdsLazyQueryHookResult = ReturnType<typeof usePokemonByIdsLazyQuery>;
export type PokemonByIdsQueryResult = Apollo.QueryResult<PokemonByIdsQuery, PokemonByIdsQueryVariables>;
export const PokemonsDocument = gql`
    query pokemons($first: Int, $after: String) {
  pokemons(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        ...PokemonNode
      }
    }
  }
}
    ${PokemonNodeFragmentDoc}`;

/**
 * __usePokemonsQuery__
 *
 * To run a query within a React component, call `usePokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePokemonsQuery(baseOptions?: Apollo.QueryHookOptions<PokemonsQuery, PokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
      }
export function usePokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonsQuery, PokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonsQuery, PokemonsQueryVariables>(PokemonsDocument, options);
        }
export type PokemonsQueryHookResult = ReturnType<typeof usePokemonsQuery>;
export type PokemonsLazyQueryHookResult = ReturnType<typeof usePokemonsLazyQuery>;
export type PokemonsQueryResult = Apollo.QueryResult<PokemonsQuery, PokemonsQueryVariables>;