export function timeToSeconds(hours: number, minutes: number, seconds: number): number {
  return seconds + minutes * 60 + hours * 3600;
}

export function secondsToTime(totalSeconds: number): string {
  let hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  totalSeconds = totalSeconds % 3600;
  let minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  let seconds = Math.round(totalSeconds % 60)
    .toString()
    .padStart(2, '0');

  if (hours === '00') {
    return minutes + ':' + seconds;
  } else {
    return hours + ':' + minutes + ':' + seconds;
  }
}
