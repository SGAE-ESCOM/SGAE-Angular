import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarData } from './interfaces/calendar-data';

interface Day {
  value: any;
  idEvent?: string;
}

interface Month {
  name: string;
  weeks?: string[][];
  lastDate?: Date;
  totalDays?: number;
}

const ESPACES = [
  { add: (week) => { week.push({ value: '' }) } },
  { add: (week) => { week.push({ value: '' }); week.push({ value: '' }) } },
  { add: (week) => { week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }) } },
  { add: (week) => { week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }) } },
  { add: (week) => { week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }) } },
  { add: (week) => { week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }); week.push({ value: '' }) } },
]

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, OnChanges {

  currentYear = new Date().getFullYear();
  weekdays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  months: Month[] = [
    { name: 'Enero' }, { name: 'Febrero' }, { name: 'Marzo' }, { name: 'Abril' },
    { name: 'Mayo' }, { name: 'Junio' }, { name: 'Julio' }, { name: 'Agosto' },
    { name: 'Septiembre' }, { name: 'Octubre' }, { name: 'Noviembre' }, { name: 'Diciembre' }
  ];

  @Input() dataSource: CalendarData[];

  constructor() { }

  ngOnInit(): void {
    this.initCalendar();
    this.renderData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && this.dataSource != null) {
      this.initCalendar();
      this.renderData();
    }
  }

  getEvent(idEvent) {
    return this.dataSource.filter(event => event.id == idEvent)[0];
  }

  getTotalDays(firstDate: Date, lastDate: Date) {
    let diffreenceTime = lastDate.getTime() - firstDate.getTime();
    return diffreenceTime / (1000 * 3600 * 24);
  }

  selectEvent(startDate: Date, endDate: Date, idEvent) {
    let startDay = startDate.getDate();
    let startMonth = startDate.getMonth();
    let weeks: any[] = this.months[startMonth].weeks;
    let rangeDays = endDate.getDate() - startDay;
    let firstDay = new Date(this.currentYear, startMonth, startDay);
    let weekday = firstDay.getDay();
    let startWeek;
    for (let i = 0; i < weeks.length; i++) {
      if (weeks[i][weekday].value == firstDay.getDate()) {
        startWeek = i;
        break;
      }
    }
    for (let currentWeek = startWeek, currentWeekday = weekday, r = 0; r <= rangeDays; r++ , currentWeekday++) {
      weeks[currentWeek][currentWeekday].idEvent = idEvent;
      if (currentWeekday == 6) {
        currentWeekday = -1;
        currentWeek++;
      }
    }
  }

  //Other implementation
  renderData() {
    if (this.dataSource != null && this.dataSource.length > 0) {
      this.dataSource.forEach((data: CalendarData) => {
        let startMonth = data.startDate.getMonth();
        let endMonth = data.endDate.getMonth();
        //Same month
        if (startMonth == endMonth) {
          this.selectEvent(data.startDate, data.endDate, data.id);
        } else {
          let months = endMonth - startMonth;
          let currentMonth = data.startDate;
          let endCurrentMonth = new Date(this.currentYear, startMonth, this.months[startMonth].totalDays);
          for (let i = 0; i <= months; i++) {
            if (currentMonth.getMonth() != endMonth) {
              this.selectEvent(currentMonth, endCurrentMonth, data.id);
              currentMonth.setDate(endCurrentMonth.getDate() + 1);
              endCurrentMonth = new Date(this.currentYear, startMonth + i + 1, this.months[startMonth + i + 1].totalDays);
            } else {
              this.selectEvent(currentMonth, data.endDate, data.id);
            }
          }
        }
      });
    }
  }

  initCalendar() {
    this.months.forEach((month, currentMonth) => {
      /*Logic*/
      let firstDate = new Date(this.currentYear, currentMonth, 1);
      let lastDate = new Date(this.currentYear, currentMonth + 1, 1);
      let totalDays = Math.round(this.getTotalDays(firstDate, lastDate));
      //First week
      var firstDay = firstDate.getDay();
      let currentDay = 1;
      let weeks = [];
      let week: Day[] = [];

      if (firstDay != 0) {
        ESPACES[firstDay - 1].add(week);
        for (let auxWeekday = firstDay; auxWeekday <= 6; auxWeekday++ , currentDay++) {
          week.push({ value: currentDay });
        }
        weeks.push(week);
        week = [];
      }

      let beforeLastWeek = totalDays - 7;
      for (; currentDay <= beforeLastWeek; currentDay += 7) {
        weeks.push(
          [
            { value: currentDay }, { value: currentDay + 1 }, { value: currentDay + 2 },
            { value: currentDay + 3 }, { value: currentDay + 4 }, { value: currentDay + 5 },
            { value: currentDay + 6 }
          ]
        )
      }

      if (currentDay <= totalDays) {
        for (; currentDay <= totalDays; currentDay++)
          week.push({ value: currentDay });
        weeks.push(week);
      }
      //DEBUG
      //console.log("================>")
      //console.log(`totalDays ${totalDays}`);
      //console.log(`currentDay ${currentDay}`);
      //console.log(weeks);
      month['weeks'] = weeks;
      month['totalDays'] = totalDays;
    });
  }

}