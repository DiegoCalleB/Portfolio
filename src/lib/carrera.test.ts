import { describe, expect, it } from 'vitest';
import { alturaBarra } from './carrera';

describe('alturaBarra', () => {
  const n = 20;
  const alturas = Array.from({ length: n }, (_, i) => alturaBarra(i, n));

  it('empieza baja y termina en el 100 %', () => {
    expect(alturas[0]).toBeCloseTo(16, 5);
    expect(alturas[n - 1]).toBeCloseTo(100, 5);
  });

  it('cada barra es más alta que la anterior (sin mesetas)', () => {
    for (let i = 1; i < n; i++) expect(alturas[i]).toBeGreaterThan(alturas[i - 1]);
  });

  it('se acelera: los saltos del final son mayores que los del principio', () => {
    expect(alturas[n - 1] - alturas[n - 2]).toBeGreaterThan(alturas[1] - alturas[0]);
  });

  it('no se sale de 0-100 y admite una sola barra', () => {
    expect(Math.min(...alturas)).toBeGreaterThan(0);
    expect(Math.max(...alturas)).toBeLessThanOrEqual(100);
    expect(alturaBarra(0, 1)).toBeCloseTo(100, 5);
  });
});
