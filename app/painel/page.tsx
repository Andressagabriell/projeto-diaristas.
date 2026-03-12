// Local: app/painel/page.tsx
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

type Perfil = {
  id: string
  cidade: string
  biografia: string
  nota_media: number
}

export default function PainelFuncional() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [todosPerfis, setTodosPerfis] = useState<Perfil[]>([])
  const [mensagem, setMensagem] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const buscarTodosPerfis = async () => {
    const { data } = await supabase
      .from('perfis_profissionais')
      .select('*')

    if (data) setTodosPerfis(data as Perfil[])
  }

  const buscarMeuPerfil = async (userId: string) => {
    const { data } = await supabase
      .from('perfis_profissionais')
      .select('*')
      .eq('usuario_id', userId)
      .single()

    if (data) setPerfil(data as Perfil)
  }

  useEffect(() => {
    buscarTodosPerfis()
  }, [])

  useEffect(() => {
    if (user) buscarMeuPerfil(user.id)
  }, [user])

  const handleLogin = async () => {

    setMensagem('Entrando...')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMensagem('Erro: Credenciais inválidas.')
      return
    }

    if (data.user) {
      setUser(data.user)
      setMensagem('Login bem-sucedido!')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setPerfil(null)
    setMensagem('Você saiu.')
  }

  const handleSalvarPerfil = async () => {

    if (!perfil) return

    setMensagem('Salvando...')

    const { error } = await supabase
      .from('perfis_profissionais')
      .update({
        cidade: perfil.cidade,
        biografia: perfil.biografia
      })
      .eq('id', perfil.id)

    if (error) {
      setMensagem('Erro ao salvar: ' + error.message)
      return
    }

    setMensagem('Perfil salvo com sucesso!')
    buscarTodosPerfis()
  }

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Plataforma de Profissionais
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10">

        {!user ? (

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Acessar meu Painel
            </h2>

            <div className="space-y-3">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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

        ) : (

          <div>

            <h2 className="text-2xl font-bold mb-4">
              Meu Perfil (Editável)
            </h2>

            <div className="space-y-3">

              <p className="text-sm">
                Logado como: <strong>{user.email}</strong>
              </p>

              <div>
                <label className="font-semibold">Cidade:</label>

                <input
                  type="text"
                  value={perfil?.cidade || ''}
                  onChange={(e)=>
                    setPerfil(prev =>
                      prev ? {...prev, cidade:e.target.value} : null
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="font-semibold">Biografia:</label>

                <textarea
                  value={perfil?.biografia || ''}
                  onChange={(e)=>
                    setPerfil(prev =>
                      prev ? {...prev, biografia:e.target.value} : null
                    )
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSalvarPerfil}
                className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
              >
                Salvar Alterações
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 mt-2"
              >
                Sair
              </button>

            </div>

          </div>

        )}

        {mensagem && (
          <p className="text-center mt-4 font-medium">
            {mensagem}
          </p>
        )}

      </div>

      <div>

        <h2 className="text-3xl font-bold mb-6 text-center">
          Profissionais Disponíveis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {todosPerfis.map((p)=>(
            <div key={p.id} className="bg-white p-5 rounded-lg shadow">

              <h3 className="text-xl font-bold text-blue-800">
                {p.cidade}
              </h3>

              <p className="text-gray-600 my-2">
                {p.biografia}
              </p>

              <p className="font-bold text-yellow-500">
                Nota: {p.nota_media}
              </p>

            </div>
          ))}

        </div>
      </div>

    </div>
  )
}