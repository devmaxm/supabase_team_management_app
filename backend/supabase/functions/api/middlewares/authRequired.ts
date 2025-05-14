import { createClient } from 'https://esm.sh/@supabase/supabase-js'

export function authRequiredMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).send('Unauthorized')
    console.log(token)
  const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'), {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  return supabase.auth.getUser()
    .then(({ data: { user }, error }) => {
      if (error || !user) {
        console.log(error)
        res.status(403).send('Forbidden')
        return
      }
      // Attach the user to the request
      req.user = user
      next()
    })
    .catch(err => {
      res.status(500).send('Internal Server Error')
    })

    
  return supabase.auth.getUser()
    .then(({ data: { user }, error }) => {
      if (error || !user) {
        console.log(error)
        res.status(403).send('Forbidden')
        return
      }
      // Attach the user to the request
      req.user = user
      next()
    })
    .catch(err => {
      res.status(500).send('Internal Server Error')
    })
}