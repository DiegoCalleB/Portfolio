/**
 * Altura (en %) de la barra `i` de `n` en la gráfica de trayectoria.
 * Una curva que sube en todas las barras y se acelera un poco hacia el final (crescendo):
 * mezcla de tramo lineal y cuadrático, de 16 % la primera a 100 % la última.
 */
export function alturaBarra(i: number, n: number): number {
  const t = n > 1 ? i / (n - 1) : 1;
  return 16 + 84 * (0.55 * t + 0.45 * t * t);
}
