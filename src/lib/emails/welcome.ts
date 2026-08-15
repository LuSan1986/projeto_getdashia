import { Resend } from 'resend'

export async function sendWelcomeEmail(email: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /></head>
<body style="font-family:sans-serif;background:#fff;color:#111;max-width:600px;margin:0 auto;padding:32px 24px;line-height:1.6">
  <p>Oi, tudo bem?</p>

  <p>Seja bem-vindo(a) ao <strong>GetDashia</strong>! Muito obrigado por se cadastrar.</p>

  <p>Queremos ser transparentes: o produto ainda está em <strong>fase beta</strong>, em desenvolvimento ativo. Hoje já dá pra conectar sua conta de <strong>Google Ads</strong> e ver dados reais no painel — a integração com Meta Ads ainda está em processo de aprovação e deve liberar nas próximas semanas.</p>

  <p>Como é fase de testes, seu acesso é <strong>gratuito por tempo limitado</strong>, sem necessidade de cartão.</p>

  <p>Qualquer dúvida, sugestão ou problema que encontrar, me chama direto pelo WhatsApp: <strong>(11) 94320-4940</strong>. Seu feedback é muito importante nessa fase.</p>

  <p>Abraço,<br /><strong>Luciano</strong> — fundador do GetDashia</p>
</body>
</html>
`

  await resend.emails.send({
    from:    'GetDashia <luciano@getdashia.com.br>',
    to:      email,
    subject: 'Bem-vindo ao GetDashia — estamos em fase beta 🚀',
    html,
  })
}
