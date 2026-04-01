import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import PageHeader from "./PageHeader"

function Notes() {
    const location = useLocation()

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('devOS_notes')
        return savedNotes ? JSON.parse(savedNotes) : []
    })

    const [activeNoteId, setActiveNoteId] = useState(
        location.state?.noteId || (notes.length > 0 ? notes[0].id : null)
    )

    useEffect(() => {
        localStorage.setItem('devOS_notes', JSON.stringify(notes))
    }, [notes])

    const addNote = () => {
        const newNote = { id: crypto.randomUUID(), title: "New Note", content: "", date: new Date().toLocaleString() }
        setNotes([newNote, ...notes])
        setActiveNoteId(newNote.id)
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
        if (activeNoteId === id) setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null)
    }

    const updateNote = (id, field, val) => {
        setNotes(currentNotes => {
            const targetNote = currentNotes.find(note => note.id === id)
            if (!targetNote) return currentNotes
            const updatedNote = { ...targetNote, [field]: val, date: new Date().toLocaleString() }
            const otherNotes = currentNotes.filter(note => note.id !== id)
            return [updatedNote, ...otherNotes]
        })
    }

    const activeNote = notes.find(n => n.id === activeNoteId)

    return (
        <>
            <PageHeader title="Notes" />
            <div className="flex gap-5 h-[600px]">
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-base" style={{color: '#2d3a28'}}>Journal</h2>
                        <button onClick={addNote} className="px-4 py-1.5 rounded-xl text-sm font-bold transition-all" style={{background: 'linear-gradient(135deg, #6b8f5e 0%, #4a7260 100%)', color: '#f5f0e8'}}>+ Add</button>
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => setActiveNoteId(note.id)}
                                className="p-4 rounded-xl border cursor-pointer transition-all"
                                style={activeNoteId === note.id
                                    ? {background: '#e8f0e2', borderColor: '#b4cca8', borderLeft: '3px solid #6b8f5e'}
                                    : {background: '#fafcf8', borderColor: '#d6e0cc', borderLeft: '3px solid transparent'}
                                }
                            >
                                <h3 className="font-bold text-sm truncate" style={{color: '#2d3a28'}}>{note.title}</h3>
                                <p className="text-xs mt-1.5" style={{color: '#9aaa8e'}}>{note.date}</p>
                            </div>
                        ))}
                        {notes.length === 0 && (
                            <p className="text-sm italic text-center mt-6" style={{color: '#9aaa8e'}}>No entries yet. Start writing 🍃</p>
                        )}
                    </div>
                </div>

                <div className="w-2/3 border rounded-2xl flex flex-col overflow-hidden shadow-sm" style={{borderColor: '#cddcc5', background: '#fdfcf9'}}>
                    {activeNote ? (
                        <>
                            <div className="flex justify-between items-center px-5 py-3.5 border-b" style={{borderColor: '#dde8d5', background: '#f5f8f2'}}>
                                <input
                                    type="text"
                                    value={activeNote.title}
                                    onChange={e => updateNote(activeNote.id, 'title', e.target.value)}
                                    className="font-bold bg-transparent outline-none w-full border-b border-transparent focus:border-gray-300 mr-4"
                                    style={{color: '#2d3a28', fontSize: '1rem'}}
                                />
                                <button onClick={() => deleteNote(activeNote.id)} className="text-xs font-bold px-4 py-1.5 rounded-xl border transition-all shrink-0" style={{borderColor: '#e0b8b0', color: '#7a3028', background: '#fdf0ee'}}>Delete</button>
                            </div>
                            <textarea
                                value={activeNote.content}
                                onChange={e => updateNote(activeNote.id, 'content', e.target.value)}
                                className="flex-1 px-6 py-5 outline-none resize-none w-full text-sm leading-relaxed bg-transparent"
                                style={{color: '#3a4e30'}}
                                placeholder="Write freely here..."
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-sm" style={{color: '#9aaa8e'}}>
                            Select or create a note 🍃
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Notes
