import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Chat() {
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/conversations`).then(r => r.json()).then(setConversations).catch(() => setConversations([]))
  }, [])

  const newChat = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' })
      })
      const data = await res.json()
      setConversations(prev => [{ id: data.id, title: data.title }, ...prev])
      setActiveId(data.id)
      setMessages([])
    } catch (e) { /* no-op */ }
  }

  const loadMessages = async (id) => {
    setActiveId(id)
    const res = await fetch(`${API_BASE}/api/conversations/${id}/messages`)
    const data = await res.json()
    setMessages(data)
  }

  const send = async () => {
    if (!activeId || !input.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/conversations/${activeId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, data.user, data.assistant])
      setInput('')
    } catch (e) { /* no-op */ }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <aside className="md:col-span-1 bg-white/70 backdrop-blur rounded-xl border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Chats</h3>
          <button onClick={newChat} className="text-sm px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">New</button>
        </div>
        <ul className="space-y-2 max-h-[50vh] overflow-auto pr-1">
          {conversations.map(c => (
            <li key={c.id}>
              <button onClick={() => loadMessages(c.id)} className={`w-full text-left text-sm px-3 py-2 rounded transition ${activeId===c.id? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
                {c.title || 'Untitled'}
              </button>
            </li>
          ))}
          {conversations.length===0 && (
            <p className="text-xs text-gray-500">No chats yet. Create one!</p>
          )}
        </ul>
      </aside>

      <section className="md:col-span-3 bg-white/70 backdrop-blur rounded-xl border border-gray-200 flex flex-col h-[60vh]">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow ${m.role==='user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {messages.length===0 && (
            <p className="text-sm text-gray-500">Start a conversation by creating a new chat.</p>
          )}
        </div>
        <div className="border-t border-gray-200 p-3 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder="Type your message..." className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button onClick={send} disabled={!activeId || loading} className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">{loading? 'Sending...' : 'Send'}</button>
        </div>
      </section>
    </div>
  )
}

export default Chat
