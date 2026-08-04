export function buildMeta(startTime: number) {
  return {
    fetchTimeMs: Math.round(performance.now() - startTime),
  };
}