import { useState } from "react";
import PayPalButton from "./PayPalButton";

const TYPE_COLORS = {
    fire: "#ff6b35",
    water: "#4fc3f7",
    grass: "#66bb6a",
    electric: "#ffee58",
    psychic: "#f06292",
    ice: "#80deea",
    dragon: "#7e57c2",
    dark: "#546e7a",
    fairy: "#f48fb1",
    normal: "#bcaaa4",
    fighting: "#ef5350",
    flying: "#90caf9",
    poison: "#ab47bc",
    ground: "#ffca28",
    rock: "#8d6e63",
    bug: "#aed581",
    ghost: "#5c6bc0",
    steel: "#78909c",
};

export function PokemonCard({ pokemon, comprado, onClick }) {
    const types = pokemon.types?.map((t) => t.type.name) || [];
    const mainColor = TYPE_COLORS[types[0]] || "#bcaaa4";

    const sprite =
        pokemon.sprites.other?.["official-artwork"]?.front_default ||
        pokemon.sprites.front_default;

    return (
        <div
            className={`pokemon-card ${!comprado ? "bloqueado" : ""}`}
            style={{ "--card-color": mainColor }}
            onClick={onClick}
        >
            <img src={sprite} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>

            <div className="types">
                {types.map((type) => (
                    <span
                        key={type}
                        className="type-badge"
                        style={{ backgroundColor: TYPE_COLORS[type] }}
                    >
                        {type}
                    </span>
                ))}
            </div>

            {comprado && <span className="comprado">✔ Comprado</span>}
        </div>
        
    );
}