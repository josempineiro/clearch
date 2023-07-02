import fetch from 'node-fetch'
import graphqlFields from 'graphql-fields'

export default async (parent, args, context, info) => {
  const fields = graphqlFields(info)
  console.log('pokemon required fields', fields)
  return fetch('https://pokeapi.co/api/v2/pokemon/' + args.id).then((res) => res.json())
}

export async function abilities(parent, args, context, info) {
  const abilities = await Promise.all(
    parent.abilities.map((ability) =>
      fetch('https://pokeapi.co/api/v2/ability/' + ability.name).then((res) => res.json()),
    ),
  )
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return abilities.map(({ id, name, effect_entries }) => ({
    id,
    name,
    effects: effect_entries.filter(({ language }) => language.name === 'en').map(({ effect }) => effect),
  }))
}
