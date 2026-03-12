// Local: app/perfil/page.tsx

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function PerfilPage() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // 1. Busca os dados do usuário logado
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Busca o perfil correspondente no banco de dados
  const { data: perfil, error } = await supabase
    .from('perfis_profissionais')
    .select('*')
    .eq('usuario_id', user?.id) // Filtra pelo ID do usuário logado
    .single() // Espera apenas um resultado

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Meu Perfil</h1>

      {user ? (
        <div className="p-6 bg-white border rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Cidade:</label>
            <input 
              type="text" 
              defaultValue={perfil?.cidade || ''} 
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Biografia:</label>
            <textarea 
              defaultValue={perfil?.biografia || ''} 
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Salvar Alterações
          </button>
        </div>
      ) : (
        <p>Você precisa estar logado para ver seu perfil.</p>
      )}
    </main>
  )
}
