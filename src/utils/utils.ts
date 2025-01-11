function getSignal(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`;
}

export { getSignal };
