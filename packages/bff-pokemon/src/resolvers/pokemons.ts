import fetch from "node-fetch";

export default async (parent, args, context, info) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");

  const data = await response.json();

  return data.results.map((pokemon, index) => ({
    id: parseInt(pokemon.url.split("/").reverse()[1], 10),
    name: pokemon.name,
  }));
};
