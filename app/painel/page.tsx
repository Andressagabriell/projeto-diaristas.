'use client'

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

type Perfil = {
  id: string
  cidade: string
  biografia: string
  nota_media: number
  usuario_id: string
}

export default function PainelPage(){

  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [user,setUser] = useState<any>(null)
  const [perfil,setPerfil] = useState<Perfil | null>(null)
  const [todosPerfis,setTodosPerfis] = useState<Perfil[]>([])
  const [msg,setMsg] = useState("")

  // buscar usuário
  useEffect(()=>{

    const carregarUsuario = async ()=>{

      const { data } = await supabase.auth.getUser()

      if(!data.user){
        router.push("/login")
        return
      }

      setUser(data.user)

      buscarPerfil(data.user.id)
      buscarTodosPerfis()
    }

    carregarUsuario()

  },[])

  const buscarPerfil = async(userId:string)=>{

    const { data } = await supabase
      .from("perfis_profissionais")
      .select("*")
      .eq("usuario_id",userId)
      .single()

    if(data) setPerfil(data)
  }

  const buscarTodosPerfis = async()=>{

    const { data } = await supabase
      .from("perfis_profissionais")
      .select("*")

    if(data) setTodosPerfis(data)
  }

  const salvarPerfil = async()=>{

    if(!perfil) return

    const { error } = await supabase
      .from("perfis_profissionais")
      .update({
        cidade:perfil.cidade,
        biografia:perfil.biografia
      })
      .eq("id",perfil.id)

    if(error){
      setMsg(error.message)
      return
    }

    setMsg("Perfil atualizado!")
    buscarTodosPerfis()
  }

  const logout = async()=>{

    await supabase.auth.signOut()
    router.push("/login")

  }

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        Plataforma de Profissionais
      </h1>

      {/* PERFIL EDITÁVEL */}

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Meu Perfil (Editável)
        </h2>

        {user && (
          <p className="text-sm mb-4">
            Logado como: <strong>{user.email}</strong>
          </p>
        )}

        <label className="font-semibold">
          Cidade
        </label>

        <input
          type="text"
          value={perfil?.cidade || ""}
          onChange={(e)=>
            setPerfil(prev => prev ? {...prev,cidade:e.target.value} : null)
          }
          className="w-full border p-2 rounded mb-4"
        />

        <label className="font-semibold">
          Biografia
        </label>

        <textarea
          value={perfil?.biografia || ""}
          onChange={(e)=>
            setPerfil(prev => prev ? {...prev,biografia:e.target.value} : null)
          }
          className="w-full border p-2 rounded mb-6"
          rows={4}
        />

        <button
          onClick={salvarPerfil}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded mb-3 hover:bg-blue-700"
        >
          Salvar Alterações
        </button>

        <button
          onClick={logout}
          className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700"
        >
          Sair
        </button>

        {msg && (
          <p className="text-center mt-3">
            {msg}
          </p>
        )}

      </div>

      {/* LISTA DE PROFISSIONAIS */}

      <h2 className="text-3xl font-bold text-center mb-8">
        Profissionais Disponíveis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {todosPerfis.map((p)=>(
          <div
            key={p.id}
            className="bg-white p-5 rounded-lg shadow"
          >

            <h3 className="text-xl font-bold text-blue-800">
              Cidade: {p.cidade}
            </h3>

            <p className="text-gray-600 my-3">
              {p.biografia}
            </p>

            <p className="font-bold text-yellow-600">
              Nota: {p.nota_media}
            </p>

          </div>
        ))}

      </div>

    </div>

  )
}