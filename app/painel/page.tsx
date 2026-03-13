'use client'

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function PainelPage(){

  const router = useRouter()
  const [user,setUser] = useState<any>(null)

  useEffect(()=>{

    const checkUser = async()=>{

      const { data } = await supabase.auth.getUser()

      if(!data.user){
        router.push("/login")
      }else{
        setUser(data.user)
      }
    }

    checkUser()

  },[])

  const logout = async()=>{

    await supabase.auth.signOut()
    router.push("/login")

  }

  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Painel do Usuário
      </h1>

      {user && (
        <p>Logado como: {user.email}</p>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white p-2 mt-6"
      >
        Sair
      </button>

    </div>
  )
}