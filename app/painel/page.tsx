'use client'

import { useState } from "react"

export default function PainelPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log("login")
  }

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Plataforma de Profissionais
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">Acessar meu Painel</h2>

          <div className="space-y-3">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <button
              onClick={handleLogin}
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
            >
              Entrar
            </button>

          </div>
        </div>

      </div>

    </div>
  )
}