export const validateResults = (actual, expected) => {
  const TrimmedActual = actual.trim();
  return TrimmedActual === expected;
};
