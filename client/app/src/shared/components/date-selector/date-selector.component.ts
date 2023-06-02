
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'ngbd-datepicker-range',
	standalone: true,
	imports: [NgbDatepickerModule, FormsModule, JsonPipe],
	templateUrl: './date-selector.component.html',
	styles: [
		`
			.custom-day {
				text-align: center;
				padding: 0.185rem 0.25rem;
				display: inline-block;
				height: 2rem;
				width: 2rem;
			}
			.custom-day.focused {
				background-color: #e6e6e6;
			}
			.custom-day.range,
			.custom-day:hover {
				background-color: rgb(2, 117, 216);
				color: white;
			}
			.custom-day.faded {
				background-color: rgba(2, 117, 216, 0.5);
			}
		`,
	],
})
export class DateRangeSelectorComponent {
	hoveredDate: NgbDate | null = null;
	@Output() emitDateSelection: EventEmitter<{ fromDate: NgbDate | null; toDate: NgbDate | null }> = new EventEmitter();

	fromDate: NgbDate | null = null;
  	toDate: NgbDate | null = null;

	constructor(calendar: NgbCalendar) {
		
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
		if (this.fromDate && this.toDate) {
			this.emitDateSelection.emit({ fromDate: this.fromDate, toDate: this.toDate });
		  }
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
}
