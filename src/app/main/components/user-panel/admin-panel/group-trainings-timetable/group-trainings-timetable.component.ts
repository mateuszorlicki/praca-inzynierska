import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, Injectable, SimpleChanges } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarDateFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { Subject, fromEvent } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  endOfWeek,
  addMinutes,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { CustomDateFormatter } from 'src/app/gym-firebase/services/custom-date-formatter.provider';
import { MatDialog } from '@angular/material/dialog';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { Store, select } from '@ngrx/store';
import * as fromGroupTraining from '../../../../../store/group-trainings';
import { GroupTrainingService } from 'src/app/gym-firebase/services/group-trainings.service';
import { GroupTrainingEvent } from 'src/app/shared/models/group-training.model';
import * as moment from 'moment';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'app-group-trainings-timetable',
  templateUrl: './group-trainings-timetable.component.html',
  styleUrls: ['./group-trainings-timetable.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class GroupTrainingsTimetableComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private store$: Store, private groupTrainingService: GroupTrainingService) {}

  ngOnInit() {
    this.store$.pipe(
      select(fromGroupTraining.selectAllGroupTrainingEvents)
    ).subscribe(res => {
      let rruleEvents = this.groupTrainingService.mapGroupTrainingEventsToRRuleEvents(res)
      this.events = [];
      this.events = [...this.groupTrainingService.mapRRuleEventsToCalendarEvents(rruleEvents)];
      this.cdr.detectChanges();
      this.refreshData();
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.openDialog(event);
  }

  openDialog(event: CalendarEvent) {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      data: { event },
      minWidth: 640,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {

      } else {
      this.events = this.events.filter(e => e.title !== 'Nowe zajęcia');

      }
    });
  }

  addEvent(): void {
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }

  private refreshData() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'Nowe zajęcia',
      start: segment.date,
      end: moment(segment.date).add('hour', 1).toDate(),
      draggable: true,
      resizable: {
        afterEnd: true,
        beforeStart: true,
      },
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refreshData();
          this.handleEvent('Test', dragToSelectEvent);
        }),
        takeUntil(fromEvent(document, 'mouseup')),
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refreshData();
      });
  }

  dragEnd(event) {
  }

}
