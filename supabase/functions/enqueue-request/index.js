import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_ANON_KEY')
)

Deno.serve(async (req) => {
  const { method } = req

  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    })
  }

  if (method === 'POST') {

    const { user_id, action, payload } = await req.json()

    if (!user_id || !action || !payload) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 })
    }

    const { error } = await supabase
      .from('request_queue')
      .insert({ user_id, payload })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
})