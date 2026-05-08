import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname

  // getUser() faz chamada à rede para validar o JWT com o servidor do Supabase.
  // O try-catch garante fail-closed: se falhar por qualquer motivo
  // (env ausente, timeout, erro de rede), trata como não autenticado.
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    user = null
  }

  const rotaProtegida =
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/onboarding'

  if (!user && rotaProtegida) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  // Matcher duplo para /dashboard: o ':path+' não cobre o caminho raiz exato.
  // '/dashboard'       → cobre GET /dashboard
  // '/dashboard/:path+' → cobre GET /dashboard/qualquer/coisa
  matcher: ['/dashboard', '/dashboard/:path+', '/onboarding'],
}
