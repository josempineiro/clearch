export default async (parent, args, context, info) => {
  const pokemon = await context.loaders.pokemons.load(args.id)
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
  }
}

export async function details(parent, args, context, info) {
  console.log('Resolvers::pokemon::details', parent.id)
  const pokemon = await context.loaders.pokemons.load(parent.id)
  return {
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
  }
}

export async function abilities(parent, args, context, info) {
  console.log('Resolvers::pokemon::abilities', parent.id)
  const pokemon = await context.loaders.pokemons.load(parent.id)
  console.log(pokemon.id)
  console.log('Resolvers::pokemon::abilities->pokemon', pokemon.id)
  console.log(
    'Resolvers::pokemon::abilities->abilities',
    pokemon.abilities.map(({ ability }) => ability?.name),
  )
  const abilitiesDto = await Promise.all(
    pokemon.abilities.map((ability) => context.loaders.abilities.load(ability.ability?.name || ability.name)),
  )
  console.log(
    'Resolvers::pokemon::abilities->abilitiesDto',
    abilitiesDto.map(({ id }) => id),
  )
  return abilitiesDto.map(({ id, name, effect_entries }) => ({
    id,
    name,
    effects: effect_entries.filter(({ language }) => language.name === 'en').map(({ effect }) => effect),
  }))
}

export async function images(parent, args, context) {
  console.log('Resolvers::pokemon::images', parent.id)
  const pokemon = await context.loaders.pokemons.load(parent.id)
  return Object.values(pokemon.sprites).filter((value) => value && typeof value === 'string')
}

export async function stats(parent, args, context) {
  console.log('Resolvers::pokemon::stats', parent.id)
  const pokemon = await context.loaders.pokemons.load(parent.id)
  return pokemon.stats.map(({ base_stat, effort, stat }) => ({
    value: base_stat,
    effort,
    id: stat.url.split('/').reverse()[1],
    name: stat.name,
  }))
}
