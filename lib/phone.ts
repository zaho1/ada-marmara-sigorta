/** Türkiye cep / sabit hat: +90, 90, 0 veya 5xx ile yazılan numaraları normalize eder. */

export function nationalTrDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('90')) {
    const rest = digits.slice(2);
    if (
      rest.startsWith('0') ||
      rest.startsWith('2') ||
      rest.startsWith('3') ||
      rest.startsWith('4') ||
      rest.startsWith('5') ||
      digits.length > 10
    ) {
      digits = rest;
    }
  }
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatTrPhone(raw: string): string {
  const national = nationalTrDigits(raw);
  if (!national) {
    const d = raw.replace(/\D/g, '');
    if (d === '0' || d.startsWith('90')) return '0';
    return '';
  }
  const withTrunk = `0${national}`;
  if (withTrunk.length <= 4) return withTrunk;
  if (withTrunk.length <= 7) return `${withTrunk.slice(0, 4)} ${withTrunk.slice(4)}`;
  if (withTrunk.length <= 9) {
    return `${withTrunk.slice(0, 4)} ${withTrunk.slice(4, 7)} ${withTrunk.slice(7)}`;
  }
  return `${withTrunk.slice(0, 4)} ${withTrunk.slice(4, 7)} ${withTrunk.slice(7, 9)} ${withTrunk.slice(9, 11)}`;
}

export function isValidTrPhone(raw: string): boolean {
  const national = nationalTrDigits(raw);
  // Cep: 5xx xxx xx xx | Sabit: 2xx–4xx (ör. 264 Sakarya)
  return /^[2-5]\d{9}$/.test(national);
}

export function toE164Tr(raw: string): string {
  return `+90${nationalTrDigits(raw)}`;
}
