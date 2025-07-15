export const enqueueRequest = async (user_id, action, payload) => {

  try {
    const response = await fetch('https://xksrxlmeekvxsggreoot.supabase.co/functions/v1/enqueue-request', {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        action,
        payload
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  
    const result = await response.json()
    console.log(result)

  } catch (error) {
    console.error("Error in reqQueue:", error);
    return;
  }
}
