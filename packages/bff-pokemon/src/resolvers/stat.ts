export async function characteristics(parent, args, context) {
  const stat = await context.loaders.stats.load(parent.id)
  return 'characteristic'
}
