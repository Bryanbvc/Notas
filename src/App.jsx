import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

// Clave usada para guardar las notas en el Local Storage
const LS_KEY = 'sticky_notes'

/**
 * App — Componente raíz
 *
 * Responsabilidades:
 *  - Mantener el estado global del arreglo de notas (useState)
 *  - Sincronizar notas con Local Storage (useEffect)
 *  - Proveer las funciones agregar y eliminar a los componentes hijos (props)
 */
function App() {

  // ── Estado: arreglo de notas ──────────────────────────────────────────────
  // Se inicializa leyendo Local Storage; si no hay datos previos, comienza vacío.
  const [notas, setNotas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(LS_KEY)
      return guardadas ? JSON.parse(guardadas) : []
    } catch {
      // Si el JSON está corrupto, empezamos con arreglo vacío
      return []
    }
  })

  // ── Efecto: guardar en Local Storage cada vez que cambian las notas ───────
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(notas))
  }, [notas])

  // ── Agregar nota ──────────────────────────────────────────────────────────
  // Recibe el objeto { titulo, descripcion, importante } desde NoteForm
  const agregarNota = ({ titulo, descripcion, importante }) => {
    // Integridad: descripción no puede estar vacía (doble validación)
    const descLimpia = descripcion.trim()
    if (!descLimpia) return

    const nuevaNota = {
      id: Date.now(),           // ID único basado en timestamp
      titulo: titulo.trim(),
      descripcion: descLimpia,
      importante,
    }

    setNotas(prev => [nuevaNota, ...prev])
  }

  // ── Eliminar nota ─────────────────────────────────────────────────────────
  // Filtra el arreglo dejando fuera la nota con el id recibido
  const eliminarNota = (id) => {
    setNotas(prev => prev.filter(nota => nota.id !== id))
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Encabezado con título y formulario */}
      <header className="app-header">
        <h1 className="app-title">Post It Simulator!</h1>
        <NoteForm onAgregar={agregarNota} />
      </header>

      {/* Área principal con la grilla de notas */}
      <main className="notas-area">
        <NoteList notas={notas} onEliminar={eliminarNota} />
        {notas.length > 0 && (
          <p className="notas-contador">{notas.length} nota(s) guardada(s)</p>
        )}
      </main>
    </div>
  )
}

export default App
