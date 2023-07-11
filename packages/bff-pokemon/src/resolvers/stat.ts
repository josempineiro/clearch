export async function characteristics(parent, args, context) {
  context.logger.info(`Resolvers::stat::${parent.id}::characteristics`)
  const stat = await context.loaders.stats.load(parent.id)
  const ids = stat.characteristics.map(({ url }) => url.split('/').reverse()[1])
  context.logger.info(`Resolvers::stat::${parent.id}::characteristics::${ids.join(',')}`)
  const characteristics = await Promise.all(ids.map((id) => context.loaders.characteristics.load(id)))
  return characteristics
    .map(({ descriptions }) =>
      descriptions.filter(({ language }) => language.name === 'en').map(({ description }) => description),
    )
    .flat()
}
