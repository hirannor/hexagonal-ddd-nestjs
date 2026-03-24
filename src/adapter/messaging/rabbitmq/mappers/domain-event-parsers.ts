import { SerializedValueObject } from './domain-event.types';

export function readUniqueComponent(value: unknown): string | null {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  if (value && typeof value === 'object') {
    const maybe = (value as SerializedValueObject)._uniqueComponent;
    if (typeof maybe === 'string' && maybe.length > 0) {
      return maybe;
    }
  }

  return null;
}

export function parseDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}
