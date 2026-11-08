import { test } from 'node:test';
import assert from 'node:assert/strict';
import { event } from '../src/data/event.ts';
import type { EventConfig } from '../src/data/event.ts';
import { checklistStorageKey, drivingUrl, transitUrl } from '../src/lib/event.ts';

test('開催設定の変更が乗換の到着日時と保存キーへ反映され、出発地を付けない', () => {
  const cases: [EventConfig, Record<string, string>, string][] = [
    [event, { to: '土浦', y: '2026', m: '11', d: '15', hh: '11', m1: '1', m2: '5', type: '4' },
      'experience-guide:2026-11-15:checklist:v1'],
    [{ ...event, date: '2027-06-02', stationArrivalTime: '08:05' },
      { to: '土浦', y: '2027', m: '06', d: '02', hh: '08', m1: '0', m2: '5', type: '4' },
      'experience-guide:2027-06-02:checklist:v1'],
  ];
  for (const [config, expected, expectedKey] of cases) {
    const url = new URL(transitUrl(config));
    assert.equal(url.origin + url.pathname, 'https://transit.yahoo.co.jp/');
    assert.deepEqual(Object.fromEntries(url.searchParams), expected);
    assert.equal(checklistStorageKey(config), expectedKey);
  }
});

test('車の経路には集合先と車移動のみを指定し、出発地や座標を付けない', () => {
  const url = new URL(drivingUrl(event.carMeeting));
  assert.equal(url.origin + url.pathname, 'https://www.google.com/maps/dir/');
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    api: '1', destination: 'ファミリーマート土浦木田余西台店 茨城県土浦市木田余西台2909-1', travelmode: 'driving',
  });
});
