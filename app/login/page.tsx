'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [msg,setMsg] = useState("")

  const handleLogin = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setMsg(error.message)
      return
    }

    router.push("/painel")
  }

  return (

    <div className="p-10 max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 w-full"
      >
        Entrar
      </button>

      <p className="mt-4 text-red-500">{msg}</p>

    </div>
  )
}