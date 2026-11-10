import test from 'node:test';
import assert from 'node:assert/strict';
import { seasonAt, restoreChecklist, saveChecklist } from '../src/lib/packing.ts';

test('日本時間の6月・10月・年越しで季節を判定する', () => {
  for (const [instant, expected] of [
    ['2026-05-31T14:59:59Z', 'winter'], ['2026-05-31T15:00:00Z', 'summer'],
    ['2026-09-30T14:59:59Z', 'summer'], ['2026-09-30T15:00:00Z', 'winter'],
    ['2026-12-31T14:59:59Z', 'winter'], ['2026-12-31T15:00:00Z', 'winter'],
  ] as const) assert.equal(seasonAt(new Date(instant)), expected, instant);
});

test('保存と復元は開催日別で、未知ID・破損・保存拒否でも継続できる', () => {
  const values = new Map<string, string>();
  const storage = () => ({ getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } });
  const key = 'experience-guide:2026-11-15:checklist:v1';
  const allowed = ['hat', 'boots'];
  assert.deepEqual(restoreChecklist(storage, key, allowed), { checked: [], issue: null });
  assert.equal(saveChecklist(storage, key, ['hat', 'boots']), true);
  assert.deepEqual(restoreChecklist(storage, key, allowed), { checked: ['hat', 'boots'], issue: null });
  assert.deepEqual(restoreChecklist(storage, 'experience-guide:2026-11-22:checklist:v1', allowed).checked, []);
  values.set(key, '["hat","hat","unknown",null,1]');
  assert.deepEqual(restoreChecklist(storage, key, allowed), { checked: ['hat'], issue: null });
  for (const broken of ['{', '{}', 'null', '123']) {
    values.set(key, broken);
    assert.deepEqual(restoreChecklist(storage, key, allowed), { checked: [], issue: 'corrupt' });
  }
  const denied = () => { throw new Error('保存拒否'); };
  assert.deepEqual(restoreChecklist(denied, key, allowed), { checked: [], issue: 'unavailable' });
  assert.equal(saveChecklist(denied, key, ['hat']), false);
  const quota = () => ({ getItem: () => null, setItem: () => { throw new Error('容量不足'); } });
  assert.equal(saveChecklist(quota, key, ['hat']), false);
  assert.equal(saveChecklist(storage, key, []), true);
  assert.deepEqual(restoreChecklist(storage, key, allowed).checked, []);
});
