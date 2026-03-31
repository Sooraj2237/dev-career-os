import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import PageHeader from "./PageHeader"

function Notes() {
    const location = useLocation();

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
        const newNote = {
            id: crypto.randomUUID(),
            title: "New Note",
            content: "",
            date: new Date().toLocaleString()
        }
        setNotes([newNote, ...notes])
        setActiveNoteId(newNote.id) 
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
        if (activeNoteId === id) {
            setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null)
        }
    }

    const updateNote = (id, field, val) => {
        setNotes(currentNotes => {
            const targetNote = currentNotes.find(note => note.id === id);
            if (!targetNote) return currentNotes;
            const updatedNote = { 
                ...targetNote, 
                [field]: val, 
                date: new Date().toLocaleString() 
            };
            const otherNotes = currentNotes.filter(note => note.id !== id);
            return [updatedNote, ...otherNotes];
        });
    }

    const activeNote = notes.find(n => n.id === activeNoteId)

    return (
        <>
            <PageHeader title="Notes"/>
            <div className="flex gap-6 mt-6 h-[600px]">
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-xl text-gray-800">Notes</h2>
                        <button onClick={addNote} className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1 rounded-xl text-sm font-bold hover:bg-blue-100 transition">
                            + Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {notes.map(note => (
                            <div 
                                key={note.id} 
                                onClick={() => setActiveNoteId(note.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition ${activeNoteId === note.id ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                            >
                                <h3 className="font-bold text-sm text-gray-900 truncate">{note.title}</h3>
                                <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                            </div>
                        ))}
                        {notes.length === 0 && (
                            <p className="text-sm text-gray-500 italic text-center mt-4">No notes yet.</p>
                        )}
                    </div>
                </div>
                <div className="w-2/3 border border-gray-200 rounded-xl bg-white flex flex-col shadow-sm overflow-hidden">
                    {activeNote ? (
                        <>
                            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                                <input 
                                    type="text" 
                                    value={activeNote.title} 
                                    onChange={(e) => updateNote(activeNote.id, 'title', e.target.value)} 
                                    className="font-bold text-gray-800 bg-transparent outline-none w-full border-b border-transparent focus:border-gray-300 mr-4" 
                                />
                                <button 
                                    onClick={() => deleteNote(activeNote.id)} 
                                    className="text-sm font-bold text-gray-600 bg-white hover:bg-red-50 hover:text-red-500 px-4 py-1 rounded-lg border transition"
                                >
                                    Delete
                                </button>
                            </div>
                            <textarea 
                                value={activeNote.content} 
                                onChange={(e) => updateNote(activeNote.id, 'content', e.target.value)} 
                                className="flex-1 p-6 outline-none resize-none w-full text-gray-700" 
                                placeholder="Start typing..."
                            ></textarea>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
                            Select or create a note.
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default Notes