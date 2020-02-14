import { Component, OnInit, Inject } from '@angular/core';
import CalendarDataSourceElement from './interfaces/CalendarDataSourceElement';
import Calendar from './interfaces/Calendar';
import CalendarOptions from './interfaces/Calendar';
import { DOCUMENT } from '@angular/common';
import $ from 'jquery';

interface CalendarData extends CalendarDataSourceElement {
  id?: number;
  location?: string;
}

interface Day {
  value: any;
  class?: string;
}

interface Month {
  name: string;
  weeks?: string[][];
  weekdays?: string[];
  firstDate?: Date;
  currentDate?: Date;
  lastDate?: Date;
  totalDays?: number;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  /**
   * 
   */
  currentYear = new Date().getFullYear();
  startYear = new Date().getFullYear();
  weekdays: string[] = ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'];
  months: Month[] = [
    { name: 'Enero' }, { name: 'Febrero' }, { name: 'Marzo' }, { name: 'Abril' },
    { name: 'Mayo' }, { name: 'Junio' }, { name: 'Julio' }, { name: 'Agosto' },
    { name: 'Septiembre' }, { name: 'Octubre' }, { name: 'Noviembre' }, { name: 'Diciembre' }
  ];

  dataSource: CalendarData[] = [
    {
      id: 0,
      name: 'Google I/O',
      location: 'San Francisco, CA',
      startDate: new Date(this.currentYear, 4, 14),
      endDate: new Date(this.currentYear, 4, 29)
    },
    {
      id: 1,
      name: 'Microsoft Convergence',
      location: 'New Orleans, LA',
      startDate: new Date(this.currentYear, 2, 16),
      endDate: new Date(this.currentYear, 2, 19)
    },
    {
      id: 2,
      name: 'Microsoft Build Developer Conference',
      location: 'San Francisco, CA',
      startDate: new Date(this.currentYear, 5, 29),
      endDate: new Date(this.currentYear, 6, 15)
    },
    {
      id: 3,
      name: 'Microsoft Build Developer Conference',
      location: 'San Francisco, CA',
      startDate: new Date(this.currentYear, 7, 15),
      endDate: new Date(this.currentYear, 10, 15)
    },
  ];

  // Other variables 
  element: any;
  calendarData: CalendarDataSourceElement[];
  opciones: CalendarOptions<CalendarData>;
  calendar: Calendar<CalendarData>;

  constructor(@Inject(DOCUMENT) document) {

  }

  ngOnInit(): void {
    this.initCalendar();
    this.renderData();
  }

  //
  getTotalDays(firstDate: Date, lastDate: Date) {
    let diffreenceTime = lastDate.getTime() - firstDate.getTime();
    return diffreenceTime / (1000 * 3600 * 24);
  }

  selectEvent(startDate: Date, endDate: Date) {
    let startDay = startDate.getDate();
    let endDay = endDate.getDate();
    let startMonth = startDate.getMonth();
    let weeks: any[] = this.months[startMonth].weeks;
    let rangeDays = endDay - startDay;
    let firstDay = new Date(this.currentYear, startMonth, startDay);
    let weekday = firstDay.getDay();
    let startWeek;
    for (let i = 0; i < weeks.length; i++) {
      if (weeks[i][weekday].value == firstDay.getDate()) {
        startWeek = i;
        break;
      }
    }
    //console.log(firstDay);
    //console.log(weekday);
    //console.log(startWeek);
    console.log(weeks[startWeek][weekday]);
    console.log('----' + rangeDays)
    for (let currentWeek = startWeek, currentWeekday = weekday, r = 0; r <= rangeDays; r++ , currentWeekday++) {
      weeks[currentWeek][currentWeekday].class = 'event';
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
        console.log("==========>");
        console.log(`startMonth ${startMonth}`);
        //console.log(`startDay ${startDay}`);
        console.log(`endMonth ${endMonth}`);
        //console.log(`endDay ${endDay}`);

        if (startMonth == endMonth) {
          this.selectEvent(data.startDate, data.endDate);
        } else {
          let months = endMonth - startMonth;
          console.log('Total Months = ' + months);
          let currentMonth = data.startDate;
          let endCurrentMonth = new Date(this.currentYear, startMonth, this.months[startMonth].totalDays );
          for (let i = 0; i <= months; i++) {
            //console.log(this.months[startMonth+i]);
            console.log(currentMonth);
            console.log(endCurrentMonth);
            if (currentMonth.getMonth() != endMonth) {
              this.selectEvent(currentMonth, endCurrentMonth);
              currentMonth.setDate(endCurrentMonth.getDate()+1);
              endCurrentMonth = new Date(this.currentYear, startMonth+i+1, this.months[startMonth+i+1].totalDays );
            } else {
              console.log(currentMonth);
              console.log(data.endDate);
              this.selectEvent(currentMonth, data.endDate);
            }
          }
          //this.selectEvent(data.startDate, data.endDate);
        }
      });
    }
  }

  initCalendar() {
    this.months.forEach((month, currentMonth) => {
      /*Logic*/
      let firstDate = new Date(this.startYear, currentMonth, 1);
      let lastDate = new Date(this.startYear, currentMonth + 1, 1);
      let totalDays = this.getTotalDays(firstDate, lastDate);

      //First week
      var firstDay = firstDate.getDay();
      let currentDay = 1;
      let auxWeekday = 0;
      let weeks = [];
      let week: Day[] = [];

      //console.log(`Total days: ${totalDays}`);
      //console.log(`First day: ${firstDay}`);
      if (firstDay != 0) {
        for (let empty = 0; empty != firstDay; empty++) {
          week.push({ value: '' });
        }
        for (auxWeekday = firstDay; auxWeekday <= 6; auxWeekday++ , currentDay++) {
          week.push({ value: currentDay });
        }
        weeks.push(week);
        week = [];
      }
      //console.log(`First day before first week: ${currentDay}`);
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
      //console.log(`First day before last week: ${currentDay}`);
      if (currentDay <= totalDays) {
        let someDay = 0;
        for (; currentDay <= totalDays; currentDay++) {
          week.push({ value: currentDay });
          someDay++;
        }
        someDay = 7 - someDay;
        for (let empty = 0; empty != someDay; empty++) {
          week.push({ value: '' });
        }
        weeks.push(week);
        week = [];
      }
      //console.log("=========");
      month['weekdays'] = this.weekdays;
      month['firstDate'] = firstDate;
      month['lastDate'] = lastDate;
      month['weeks'] = weeks;
      month['totalDays'] = totalDays;
    });
  }



  /**
   * Other implementacion
   */
  renderCalendar() {
    this.element = document.getElementById('divCalendario');
    var currentYear = new Date().getFullYear();

    function editEvent(event) {
      $('#event-modal input[name="event-index"]').val(event ? event.id : '');
      $('#event-modal input[name="event-name"]').val(event ? event.name : '');
      $('#event-modal input[name="event-location"]').val(event ? event.location : '');
      $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
      $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
      $('#event-modal').modal();
    }

    function deleteEvent(event) {
      var dataSource = this.calendar.getDataSource();

      this.calendar.setDataSource(dataSource.filter(item => item.id == event.id));
    }


    this.calendar = new Calendar(this.element,
      {
        loadingTemplate: this.element,
        enableContextMenu: true,
        enableRangeSelection: true,
        contextMenuItems: [
          {
            text: 'Update',
            click: editEvent
          },
          {
            text: 'Delete',
            click: deleteEvent
          }
        ],
        selectRange: function (e) {
          editEvent({ startDate: e.startDate, endDate: e.endDate });
        },
        mouseOnDay: function (e: any) {
          if (e.events.length > 0) {

            var content = '';

            for (var i in e.events) {
              content += '<div class="event-tooltip-content">'
                + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
                + '<div class="event-location">' + e.events[i].location + '</div>'
                + '</div>';
            }
            /*$(e.element).popover({
              trigger: 'manual',
              container: 'body',
              html: true,
              content: content
            });

            $(e.element).popover('show'); */
          }
        },
        mouseOutDay: function (e) {
          if (e.events.length > 0) {
            //$(e.element).popover('hide');
          }
        },
        dayContextMenu: function (e) {
          $(e.element).popover('hide');
        },
        dataSource: [
          {
            id: 0,
            name: 'Google I/O',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 4, 28),
            endDate: new Date(currentYear, 4, 29)
          },
          {
            id: 1,
            name: 'Microsoft Convergence',
            location: 'New Orleans, LA',
            startDate: new Date(currentYear, 2, 16),
            endDate: new Date(currentYear, 2, 19)
          },
          {
            id: 2,
            name: 'Microsoft Build Developer Conference',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 3, 29),
            endDate: new Date(currentYear, 4, 1)
          },
          {
            id: 3,
            name: 'Apple Special Event',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 8, 1),
            endDate: new Date(currentYear, 8, 1)
          },
          {
            id: 4,
            name: 'Apple Keynote',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 8, 9),
            endDate: new Date(currentYear, 8, 9)
          },
          {
            id: 5,
            name: 'Chrome Developer Summit',
            location: 'Mountain View, CA',
            startDate: new Date(currentYear, 10, 17),
            endDate: new Date(currentYear, 10, 18)
          },
          {
            id: 6,
            name: 'F8 2015',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 2, 25),
            endDate: new Date(currentYear, 2, 26)
          },
          {
            id: 7,
            name: 'Yahoo Mobile Developer Conference',
            location: 'New York',
            startDate: new Date(currentYear, 7, 25),
            endDate: new Date(currentYear, 7, 26)
          },
          {
            id: 8,
            name: 'Android Developer Conference',
            location: 'Santa Clara, CA',
            startDate: new Date(currentYear, 11, 1),
            endDate: new Date(currentYear, 11, 4)
          },
          {
            id: 9,
            name: 'LA Tech Summit',
            location: 'Los Angeles, CA',
            startDate: new Date(currentYear, 10, 17),
            endDate: new Date(currentYear, 10, 17)
          }
        ]
      });
  }
}