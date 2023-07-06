import { lazy, Suspense } from 'react'

const Pokemons = lazy(() => import('remotePokemon/Pokemons'))

function RemotePokemons() {
  return (
    <Suspense fallback={<div>Preparing pokemons</div>}>
      <Pokemons />
    </Suspense>
  )
}

export default RemotePokemons
