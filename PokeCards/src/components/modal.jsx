import PayPalButton from "./PayPalButton";

function Modal({ pokemon, cerrar, onComprar }) {
  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const precio = (pokemon.base_experience || 50).toString();

  return (
    <div className="modal-fondo" onClick={cerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{pokemon.name}</h2>

        <img src={sprite} alt={pokemon.name} />

        <p>
          <strong>Tipo:</strong>{" "}
          {pokemon.types.map(t => t.type.name).join(", ")}
        </p>

        <p><strong>Precio:</strong> ${precio}</p>

        {/* 💳 PAYPAL */}
        <PayPalButton
          monto={precio}
          onSuccess={() => {
            onComprar(pokemon.id); // 👈 guardar compra
            cerrar();
          }}
        />

        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;