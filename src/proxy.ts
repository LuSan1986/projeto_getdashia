import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
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

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Sem sessão: bloqueia rotas protegidas
  if (!user) {
    if (pathname.startsWith('/dashboard') || pathname === '/onboarding') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  // Com sessão: verifica se o usuário tem alguma organização
  const { count } = await supabase
    .from('organization_members')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const temOrg = (count ?? 0) > 0

  // No /dashboard sem org → vai para onboarding
  if (pathname.startsWith('/dashboard') && !temOrg) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  // No /onboarding com org já criada → vai para dashboard
  if (pathname === '/onboarding' && temOrg) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding'],
}
