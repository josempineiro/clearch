import { Link } from 'react-router-dom'

const PokemonListItem = ({ pokemon }: { pokemon: any }) => {
  return (
    <li>
      <Link to={`${pokemon.id}`}>
        <h2>{pokemon.id}</h2>
        <p>{pokemon.name}</p>
      </Link>
      {pokemon.abilities && (
        <div>
          {pokemon.abilities.map((ability: any) => (
            <div>{ability.name}</div>
          ))}
        </div>
      )}
    </li>
  )
}

export default PokemonListItem
