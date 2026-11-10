import type { Season } from '../data/packing.ts';

export function seasonAt(now: Date): Season {
  const month = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', month: 'numeric' }).format(now));
  return month >= 6 && month <= 9 ? 'summer' : 'winter';
}

type ChecklistStorage = Pick<Storage, 'getItem' | 'setItem'>;
type StorageSource = () => ChecklistStorage;

export function restoreChecklist(source: StorageSource, key: string, allowed: readonly string[]): {
  checked: string[];
  issue: 'unavailable' | 'corrupt' | null;
} {
  let raw: string | null;
  try { raw = source().getItem(key); }
  catch { return { checked: [], issue: 'unavailable' }; }
  if (raw === null) return { checked: [], issue: null };
  try {
    const values: unknown = JSON.parse(raw);
    if (!Array.isArray(values)) return { checked: [], issue: 'corrupt' };
    return {
      checked: [...new Set(values.filter((value): value is string => typeof value === 'string' && allowed.includes(value)))],
      issue: null,
    };
  } catch { return { checked: [], issue: 'corrupt' }; }
}

export function saveChecklist(source: StorageSource, key: string, checked: readonly string[]): boolean {
  try { source().setItem(key, JSON.stringify(checked)); return true; }
  catch { return false; }
}
