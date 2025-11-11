import Hero from './components/Hero'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50">
      <Hero />
      <div className="py-8">
        <Chat />
      </div>
    </div>
  )
}

export default App
