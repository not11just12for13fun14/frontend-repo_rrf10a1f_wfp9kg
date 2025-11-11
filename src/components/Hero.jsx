import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full h-[340px] sm:h-[420px] overflow-hidden bg-gradient-to-b from-white to-purple-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-orange-500">
          AI Chat Assistant
        </h1>
        <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-gray-700">
          A minimal, futuristic chat experience powered by a lightweight backend.
        </p>
      </div>
    </section>
  )
}

export default Hero
