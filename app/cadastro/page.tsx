'use client'

import { useState } from "react"

type Profissional = {
  id: number
  cidade: string
  biografia: string
  nota: number
}

export default function HomePage() {

  const [email,setEmail] = useState("")
  const [senha,setSenha] = useState("")

  const profissionais:Profissional[] = [
    {
      id:1,
      cidade:"São Paulo",
      biografia:"Sou Ana e trabalho com limpeza residencial.",
      nota:4.5
    },
    {
      id:2,
      cidade:"Rio de Janeiro",
      biografia:"Meu nome é João e atuo como diarista há 5 anos.",
      nota:5
    },
    {
      id:3,
      cidade:"Belo Horizonte",
      biografia:"Carla especialista em organização.",
      nota:0
    }
  ]

  const handleLogin = () => {
    console.log(email,senha)
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* TÍTULO */}
      <h1 className="text-5xl font-bold text-center mb-12">
        Plataforma de Profissionais
      </h1>

      {/* LOGIN */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow mb-12">

        <h2 className="text-2xl font-bold mb-6">
          Acessar meu Painel
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700"
        >
          Entrar
        </button>

      </div>

      {/* LISTA DE PROFISSIONAIS */}

      <h2 className="text-3xl font-bold text-center mb-8">
        Profissionais Disponíveis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {profissionais.map((p)=>(
          <div
            key={p.id}
            className="bg-white p-6 rounded-lg shadow"
          >

            <h3 className="text-xl font-bold text-blue-800">
              Cidade: {p.cidade}
            </h3>

            <p className="text-gray-600 my-3">
              Biografia: {p.biografia}
            </p>

            <p className="font-bold text-yellow-600">
              Nota: {p.nota}
            </p>

          </div>
        ))}

      </div>

    </div>

  )
}