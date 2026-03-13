'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function CadastroPage(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [msg,setMsg] = useState("")

  const handleCadastro = async ()=>{

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      setMsg(error.message)
      return
    }

    setMsg("Usuário criado com sucesso!")
  }

  return(

    <div className="p-10 max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Cadastro
      </h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleCadastro}
        className="bg-green-600 text-white p-2 w-full"
      >
        Criar Conta
      </button>

      <p className="mt-4">{msg}</p>

    </div>
  )
}