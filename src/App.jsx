import { useState, useEffect } from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeapi, setPokeapi] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();

  useEffect(() => {
    fetch(pokeapi)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPokemon(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      });
  }, [pokeapi]);

  function handleNextClick() {
    setPokeapi(next);
  }

  function handlePreviousClick() {
    if (previous) {
      setPokeapi(previous);
    }
  }

  return (
    <>
      <div className="listContainer">
        {pokemon.map((elem) => (
          <Link
            className="pokeButton"
            key={elem.name}
            to={`/pokemon/${elem.name}`}
          >
            {elem.name}{" "}
          </Link>
        ))}
      </div>
      <div className="buttonHolder">
        <button className="navButton" onClick={handlePreviousClick}>
          Previous
        </button>
        <button className="navButton" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <Outlet />
    </>
  );
}

export default App;
