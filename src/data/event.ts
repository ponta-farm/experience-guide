export const event = {
  date: '2026-11-15',
  startTime: '09:00',
  endTime: '16:00',
  stationArrivalTime: '11:15',
  activities: ['さつまいも掘り', 'さといも掘り'],
  bootRentalDeadline: { date: '2026-11-14', period: '午前中' },
  station: { name: '土浦', meetingPoint: '土浦駅西口ロータリー' },
  carMeeting: {
    name: 'ファミリーマート土浦木田余西台店',
    address: '茨城県土浦市木田余西台2909-1',
  },
  contact: {
    lineUrl: 'https://lin.ee/JrVZfta',
    lineId: '@200vnywh',
    addFriendImage: 'https://scdn.line-apps.com/n/line_add_friends/btn/ja.png',
  },
  weather: {
    decisionDaysBefore: 2,
    decisionTime: '17:00',
    nhkUrl: 'https://www.nhk.or.jp/kishou-saigai/city/weather/08203000820300/',
  },
};

export type EventConfig = typeof event;
