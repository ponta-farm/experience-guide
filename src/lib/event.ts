import type { EventConfig } from '../data/event.ts';

export function eventDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00+09:00`);
}

export function formatEventDate(date: string, includeYear = false): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    ...(includeYear ? { year: 'numeric' as const } : {}),
    month: 'long', day: 'numeric', weekday: 'short',
  }).format(eventDateTime(date, '12:00'));
}

export function weatherDecisionDate(config: EventConfig): string {
  const date = new Date(`${config.date}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - config.weather.decisionDaysBefore);
  return date.toISOString().slice(0, 10);
}

export function isEventEnded(config: EventConfig, now: Date): boolean {
  return now.getTime() > eventDateTime(config.date, config.endTime).getTime();
}

export function transitUrl(config: EventConfig): string {
  const [year, month, day] = config.date.split('-');
  const [hour, minute] = config.stationArrivalTime.split(':');
  const params = new URLSearchParams({
    to: config.station.name, y: year, m: month, d: day,
    hh: hour, m1: minute[0], m2: minute[1], type: '4',
  });
  return `https://transit.yahoo.co.jp/?${params}`;
}

export function drivingUrl(place: EventConfig['carMeeting']): string {
  const params = new URLSearchParams({
    api: '1', destination: `${place.name} ${place.address}`, travelmode: 'driving',
  });
  return `https://www.google.com/maps/dir/?${params}`;
}

export function mapUrl(place: EventConfig['carMeeting']): string {
  const params = new URLSearchParams({ api: '1', query: `${place.name} ${place.address}` });
  return `https://www.google.com/maps/search/?${params}`;
}

export function checklistStorageKey(config: Pick<EventConfig, 'date'>): string {
  return `experience-guide:${config.date}:checklist:v1`;
}
