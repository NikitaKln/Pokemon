import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PokePage() {
  const params = useParams();
  const [isTextLoaded, setIsTextLoaded] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [cry, setCry] = useState();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
    setIsTextLoaded(false);
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let poketypes = [];
        for (let i = 0; i < data.types.length; i++) {
          poketypes.push(data.types[i].type.name);
        }
        const type = poketypes.join(", ");
        setPokemon({
          sprite: data.sprites.front_default,
          name: data.name,
          height: data.height,
          weight: data.weight,
          type,
        });
        setIsTextLoaded(true);
        setCry(new Audio(data.cries.latest));
      });
  }, [params.pokemonName]);

  function handleCry() {
    cry.volume = 0.05;
    cry.play();
  }

  return (
    <div id="pokeCard" className="pokeCard">
      {isImageLoaded || !isTextLoaded ? null : (
        <p style={{ padding: "1rem" }}>Loading...</p>
      )}

      <img
        className="image"
        style={isImageLoaded ? {} : { display: "none" }}
        src={pokemon.sprite}
        alt="pokemon image goes here"
        onLoad={() => setIsImageLoaded(true)}
      />

      {isTextLoaded ? null : <p style={{ padding: "1rem" }}>Loading...</p>}

      <div
        className="paraWrapper"
        style={isTextLoaded ? {} : { display: "none" }}
      >
        <p>Name: {pokemon.name}</p>
        <p>Type: {pokemon.type}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>
      <div className="buttonWrapper">
        <button
          className="cryButton"
          style={isImageLoaded && isTextLoaded ? {} : { display: "none" }}
          onClick={handleCry}
        >
          CRY
        </button>
      </div>
    </div>
  );
}
