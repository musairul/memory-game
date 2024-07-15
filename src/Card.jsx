import { useEffect, useState } from "react";
import "./styles/card.css";

function Card({ id, onclick }) {
  const [imageLink, setImageLink] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImageLink(data.sprites.front_default);
        setName(data.name);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  return (
    <div className="card" onClick={onclick}>
      <img src={imageLink} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default Card;
