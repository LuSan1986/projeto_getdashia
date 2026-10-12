import { Resend } from 'resend'

// Emails de teste/admin — sem alertas para evitar ruído
const SKIP_EMAILS = new Set(['lucianosantana48@gmail.com', 'teste@getdashia.com.br'])

export async function sendAdminAlert(
  subject: string,
  lines: string[],
  userEmail?: string
): Promise<void> {
  if (userEmail && SKIP_EMAILS.has(userEmail.toLowerCase())) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.ADMIN_ALERT_EMAIL ?? 'luciano@getdashia.com.br'

  const timestamp = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date())

  const text = [...lines, `Horário: ${timestamp} (Brasília)`].join('\n')

  await resend.emails.send({
    from:    'GetDashia <luciano@getdashia.com.br>',
    to,
    subject: `[GetDashia] ${subject}`,
    text,
  })
}
