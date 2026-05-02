import { useState } from "react";
import { usePokemon } from "./hooks/usePokemon";
import { PokemonCard } from "./components/pokemonCard";
import { SearchBar } from "./components/searchBar";
import Boton from "./components/buttonInteract";
import PayPalButton from "./components/PayPalButton";
import "./App.css";

function App() {
  const { pokemonList, loading, error } = usePokemon(25);
  const [ultimaCompra, setUltimaCompra] = useState(null);
  const [search, setSearch] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [compradas, setCompradas] = useState(() => {
    const saved = localStorage.getItem("compradas");
    return saved ? JSON.parse(saved) : [];
  });

  const agregarCompra = (id) => {
    if (!compradas.includes(id)) {
      const nuevas = [...compradas, id];
      setCompradas(nuevas);
      localStorage.setItem("compradas", JSON.stringify(nuevas));
    }
  };

  const tipos = [
    "todos", "fire", "water", "grass", "electric", "psychic", "ice", "dragon",
    "dark", "fairy", "normal", "fighting", "flying", "poison", "ground",
    "rock", "bug", "ghost", "steel"
  ];

  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (tipoSeleccionado === "todos" ||
      p.types.some((t) => t.type.name === tipoSeleccionado))
  );

  if (error) return <p className="error">Error: {error}</p>;


  return (
    <div className="app">
      <header>
        <h1>PokéCards Market</h1>
        <SearchBar value={search} onChange={setSearch} />
        {mensaje && <div className="mensaje-exito">{mensaje}</div>}
      </header>

      <div className="filtros">
        {tipos.map((tipo) => (
          <Boton
            key={tipo}
            tipo={tipo}
            setTipoSeleccionado={setTipoSeleccionado}
            activo={tipoSeleccionado === tipo}
          />
        ))}
      </div>

      {loading ? (
        <div className="loading">Cargando Pokémon...</div>
      ) : (
        <main className="grid">
          {filtered.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              comprado={compradas.includes(pokemon.id)}
              onClick={() => setPokemonSeleccionado(pokemon)}
            />
          ))}
        </main>
      )}

      {pokemonSeleccionado && (
        <div className="panel-compra">

          <h2>{pokemonSeleccionado.name}</h2>

          <p>
            Tipo:{" "}
            {pokemonSeleccionado.types?.map(t => t.type.name).join(", ")}
          </p>

          <p>
            Precio: ${pokemonSeleccionado.base_experience || 50}
          </p>

          <div className="acciones-compra">
            {!compradas.includes(pokemonSeleccionado.id) ? (
              <div className="paypal-wrapper">
                <PayPalButton
                  monto={(pokemonSeleccionado.base_experience || 50).toFixed(2)}
                  onSuccess={() => {
                    agregarCompra(pokemonSeleccionado.id);
                    setPokemonSeleccionado(null);

                    setMensaje("✅ Pago exitoso");

                    setTimeout(() => {
                      setMensaje("");
                    }, 3000);
                  }}
                />
              </div>
            ) : (
              <span className="comprado">✔ Ya comprado</span>
            )}

            <button
              className="btn-cerrar"
              onClick={() => setPokemonSeleccionado(null)}
            >
              Cerrar
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;