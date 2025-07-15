import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

Deno.serve(async () => {
  const { data: queue, error } = await supabase
    .from('request_queue')
    .select('*')
    .eq('status', 'pending')
    .limit(10)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  for (const req of queue) {
    // Exemplo de processamento: consultar um dado relacionado ao user_id
    const { data, error: processError } = await supabase
      .from('users')
      .select('email')
      .eq('id', req.user_id)
      .single()

    // Atualiza status na fila
    await supabase
      .from('request_queue')
      .update({
        status: processError ? 'error' : 'processed',
        payload: { ...req.payload, result: data || null }
      })
      .eq('id', req.id)
  }

  return new Response(JSON.stringify({ processed: queue.length }), { status: 200 })
})
