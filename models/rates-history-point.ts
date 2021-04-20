import { LinearChartPoint } from '@models/linear-char-point';
import { DateHelper } from '@logic/date.helper';

export interface IRatesHistoryPoint {
  providerTime: string;
  value: string;
}

export class RatesHistoryPoint {
  public readonly time: Date;
  private readonly value: number;

  constructor(data: IRatesHistoryPoint) {
    this.value = Number(data.value);
    this.time = new Date(data.providerTime);
  }

  public toLineChartPoint(): LinearChartPoint {
    return new LinearChartPoint({
      y: this.value,
      label: DateHelper.getSimpleDay(this.time),
      time: this.time,
    });
  }
}
