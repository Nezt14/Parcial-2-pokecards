function Boton({ tipo, setTipoSeleccionado, activo }) {
  return (
    <button
      onClick={() => setTipoSeleccionado(tipo)}
      className={activo ? "activo" : ""}
    >
      {tipo}
    </button>
  );
}

export default Boton;