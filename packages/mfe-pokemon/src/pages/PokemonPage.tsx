import { Link, useParams, useLocation } from "react-router-dom";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

type PokemonPageParams = {
  id: string;
};

const PokemonPage = () => {
  const { id } = useParams<PokemonPageParams>();
  const location = useLocation();
  return (
    <div>
      <h3>Pokemon page</h3>
      {id && (
        <div>
          <button>
            <Link
              to={location.pathname.replace(
                id,
                (parseInt(id, 10) - 1).toString()
              )}
            >
              Previous
            </Link>
          </button>
          <a href="/">Menu</a>
          <button>
            <Link
              to={location.pathname.replace(
                id,
                (parseInt(id, 10) + 1).toString()
              )}
            >
              Next
            </Link>
          </button>
        </div>
      )}
      <PokemonDetails id={id as string} />
    </div>
  );
};

export default PokemonPage;
