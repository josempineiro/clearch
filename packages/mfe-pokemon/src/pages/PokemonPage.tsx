import { Link, useParams, useLocation } from 'react-router-dom'
import PokemonDetails from '../components/PokemonDetails/PokemonDetails'
import { Button } from '@clearq/ui'

type PokemonPageParams = {
  id: string
}

const PokemonPage = () => {
  const { id } = useParams<PokemonPageParams>()
  const location = useLocation()
  return (
    <div>
      <h3>Pokemon page</h3>
      {id && (
        <div>
          <Link to={'/'}>
            <Button variant="primary">Return</Button>
          </Link>
          <Link to={location.pathname.replace(id, (parseInt(id, 10) - 1).toString())}>
            <Button variant="secondary">Previous</Button>
          </Link>
          <Link to={location.pathname.replace(id, (parseInt(id, 10) + 1).toString())}>
            <Button variant="secondary">Next</Button>
          </Link>
        </div>
      )}
      <PokemonDetails id={id as string} />
    </div>
  )
}

export default PokemonPage
