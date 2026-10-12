export function fmtBRL(n: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
}

export function fmtInt(n: number): string {
  return n.toLocaleString('pt-BR')
}

export function fmtPct(n: number, decimals = 1): string {
  return (
    n.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + '%'
  )
}

export function fmtRoas(n: number): string {
  return (
    n.toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }) + '×'
  )
}

export function convValueUnconfigured(revenue: number, conversions: number): boolean {
  if (conversions <= 0) return false
  return revenue === 0 || Math.abs(revenue - conversions) < 0.01
}
