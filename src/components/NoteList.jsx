import NoteCard from './NoteCard'

/**
 * NoteList — Renderiza la grilla de todas las notas
 *
 * Props:
 *  - notas     : array de objetos nota
 *  - onEliminar: función para eliminar una nota por id
 */
function NoteList({ notas, onEliminar }) {

  // Estado vacío
  if (notas.length === 0) {
    return (
      <p className="notas-vacias">
        No hay notas todavía. ¡Agrega tu primera nota arriba!
      </p>
    )
  }

  return (
    <div className="notas-grid">
      {notas.map((nota, index) => (
        <NoteCard
          key={nota.id}
          nota={nota}
          indice={index}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}

export default NoteList
