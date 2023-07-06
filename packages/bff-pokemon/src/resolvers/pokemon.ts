export default async (parent, args, context, info) => {
  return context.loaders.pokemons.load(args.id)
}

export async function abilities(parent, args, context, info) {
  console.log('Resolvers::pokemon::abilities', parent)
  const abilitiesDto = await Promise.all(
    parent.abilities.map((ability) => context.loaders.abilities.load(ability.ability?.name || ability.name)),
  )
  return abilitiesDto.map(({ id, name, effect_entries }) => ({
    id,
    name,
    effects: effect_entries.filter(({ language }) => language.name === 'en').map(({ effect }) => effect),
  }))
}

export async function images(parent, args, context) {
  const pokemon = await context.loaders.pokemons.load(parent.id)
  return {
    main: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${parent.id}.svg`,
    all: Object.values(pokemon.sprites).filter((value) => value && typeof value === 'string'),
  }
}
