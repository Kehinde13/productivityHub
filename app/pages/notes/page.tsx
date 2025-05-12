"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('multiNotes');
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);
  
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('multiNotes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newNote: Note = {
      id: editingId || crypto.randomUUID(),
      title,
      content,
    };

    if (editingId) {
      setNotes(notes.map((n) => (n.id === editingId ? newNote : n)));
    } else {
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    setTitle(note.title);
    setContent(note.content);
    setEditingId(id);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) {
      setTitle("");
      setContent("");
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 relative min-h-screen bg-yellow-50">
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4"
      >
      <i className="fa fa-long-arrow-left text-2xl" aria-hidden="true"></i>
      </button>
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-800">
        Sticky Notes
      </h1>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-yellow-200 p-4 rounded-lg shadow-lg transform rotate-[-1deg] relative font-[Comic_Sans_MS,cursive,sans-serif] hover:scale-105 transition-all"
          >
            <h2 className="text-xl font-bold mb-2 text-yellow-900">
              {note.title}
            </h2>
            <p className="text-yellow-800 whitespace-pre-line mb-6">
              {note.content}
            </p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(note.id)}
                className="text-yellow-900 hover:text-yellow-700 text-xl"
                title="Edit"
              >
                🖊️
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 hover:text-red-500 text-xl"
                title="Delete"
              >
                ✖️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Pen Icon Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-white p-4 rounded-full shadow-xl hover:bg-yellow-600"
        title="Add Note"
      >
        ✏️
      </button>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-yellow-900 bg-opacity-70 flex items-center justify-center">
          <div className="bg-yellow-100 p-6 rounded-lg shadow-2xl w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-900">
              {editingId ? "Edit Note" : "Add New Note"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border-2 border-yellow-300 rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 bg-yellow-50 text-yellow-900"
                required
              />
              <textarea
                placeholder="Write your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border-2 border-yellow-300 rounded focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 bg-yellow-50 text-yellow-900"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  {editingId ? "Update Note" : "Add Note"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setEditingId(null);
                    setShowModal(false);
                  }}
                  className="px-6 py-2 bg-orange-700 text-white rounded hover:bg-orange-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
