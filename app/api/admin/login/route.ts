import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const token = btoa(process.env.ADMIN_PASSWORD ?? '')
  const res = Response.json({ ok: true })

  res.headers.set(
    'Set-Cookie',
    `admin_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  )

  return res
}
