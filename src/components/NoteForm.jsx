import { useState } from 'react'

/**
 * NoteForm — Formulario para crear una nota
 *
 * Props:
 *  - onAgregar(nota): función recibida desde App para agregar la nota al estado global
 *
 * Estado local:
 *  - titulo       : string (opcional)
 *  - descripcion  : string (obligatorio)
 *  - importante   : boolean
 *  - error        : string | null  → mensaje de validación
 */
function NoteForm({ onAgregar }) {

  const [titulo,      setTitulo]      = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [importante,  setImportante]  = useState(false)
  const [error,       setError]       = useState(null)

  // ── Validación y envío ────────────────────────────────────────────────────
  const handleAgregar = () => {
    // La descripción es el único campo obligatorio según la actividad
    if (descripcion.trim() === '') {
      setError('La descripción es obligatoria.')
      return
    }

    // Limpiamos el error y llamamos al padre
    setError(null)
    onAgregar({ titulo, descripcion, importante })

    // Resetear el formulario
    setTitulo('')
    setDescripcion('')
    setImportante(false)
  }

  // Limpiar error en tiempo real cuando el usuario escribe en descripción
  const handleDescChange = (e) => {
    setDescripcion(e.target.value)
    if (error) setError(null)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="form-nota">

        {/* Campo: Título (opcional) */}
        <input
          type="text"
          className="form-control input-titulo"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          maxLength={60}
        />

        {/* Campo: Descripción (obligatorio) */}
        <input
          type="text"
          className={`form-control input-desc ${error ? 'is-invalid' : ''}`}
          placeholder="Descripción"
          value={descripcion}
          onChange={handleDescChange}
          maxLength={200}
        />

        {/* Checkbox: Importante */}
        <label className="check-importante">
          <input
            type="checkbox"
            checked={importante}
            onChange={e => setImportante(e.target.checked)}
          />
          Importante!
        </label>

        {/* Botón Agregar */}
        <button className="btn-agregar" onClick={handleAgregar}>
          Agregar
        </button>

      </div>

      {/* Mensaje de error justo debajo del formulario */}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default NoteForm
