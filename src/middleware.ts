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

  // Valida e renova a sessão a partir dos cookies.
  // Não faz queries ao banco — apenas verifica o JWT.
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Sem sessão ativa: bloqueia /dashboard e /onboarding
  if (!user && (pathname.startsWith('/dashboard') || pathname === '/onboarding')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // A checagem de organização fica a cargo das próprias páginas
  // (dashboard/page.tsx e onboarding/page.tsx), que rodam no servidor
  // com acesso completo ao banco via supabase-server.

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding'],
}
