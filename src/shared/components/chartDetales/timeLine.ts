import { AxisInterval } from 'recharts/types/util/types'

interface ITimeLine {
  [key: string]: string
}

interface ITimeLineInterval {
  [key: string]: AxisInterval
}

export const timeLine: ITimeLine = {
  '1h': 'hh:mm a',
  '24h': 'hh:mm a',
  '7d': 'll',
  '1m': 'MMM Do',
  '3m': 'MMM Do',
  '1y': 'MMM YYYY',
  All: 'MMM YYYY'
}

export const timeLineInterval: ITimeLineInterval = {
  '1h': 0,
  '24h': 28,
  '7d': 24,
  '1m': 71,
  '3m': 216,
  '1y': 'preserveStartEnd',
  All: 'preserveStartEnd'
}
