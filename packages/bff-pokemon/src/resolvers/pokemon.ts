import fetch from "node-fetch";

export default async (parent, args, context, info) => {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + args.id).then((res) =>
    res.json()
  );
};
