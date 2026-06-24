/**
 * NoteCard — Nota adhesiva individual
 *
 * Props:
 *  - nota      : { id, titulo, descripcion, importante }
 *  - indice    : número de posición en el arreglo (para asignar color rotativo)
 *  - onEliminar: función para eliminar esta nota
 *
 * Lógica de color:
 *  - Si la nota es importante → clase "importante" (rojo)
 *  - Si no → clase "color-N" donde N = indice % 5
 *    Colores: 0=amarillo, 1=verde menta, 2=celeste, 3=naranja, 4=lila
 */
function NoteCard({ nota, indice, onEliminar }) {

  const { id, titulo, descripcion, importante } = nota

  // Determinamos la clase de color
  const claseColor = importante
    ? 'importante'
    : `color-${indice % 5}`

  return (
    <div className={`nota-card ${claseColor}`}>

      {/* Botón eliminar — parte superior derecha */}
      <button
        className="btn-eliminar"
        onClick={() => onEliminar(id)}
        title="Eliminar nota"
        aria-label="Eliminar nota"
      >
        X
      </button>

      {/* Título (puede estar vacío si el usuario no lo ingresó) */}
      {titulo && (
        <p className="nota-titulo">{titulo}</p>
      )}

      {/* Descripción (siempre presente, es obligatoria) */}
      <p className="nota-desc">{descripcion}</p>

    </div>
  )
}

export default NoteCard
