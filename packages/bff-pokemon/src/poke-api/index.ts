export async function getPokemons({ limit = 10, offset = 0 }) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then((res) => res.json())
}

export async function getPokemonById(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
}

export async function getPokemonsByIds(ids) {
  return Promise.all(ids.map((id) => getPokemonById(id)))
}
