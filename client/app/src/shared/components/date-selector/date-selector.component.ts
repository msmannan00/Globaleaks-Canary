
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'ngbd-datepicker-range',
	standalone: true,
	imports: [NgbDatepickerModule, FormsModule, JsonPipe],
	templateUrl: './date-selector.component.html',
})
export class DateRangeSelectorComponent {
	hoveredDate: NgbDate | null = null;
	@Output() emitDateSelection: EventEmitter<{ fromDate: NgbDate | null; toDate: NgbDate | null }> = new EventEmitter();
	@Input() currentDates: any;
	fromDate: NgbDate | null = null;
  	toDate: NgbDate | null = null;

	
	constructor(calendar: NgbCalendar) {
		
	}

	ngOnInit(){
		if(this.currentDates){
			this.fromDate = this.currentDates.fromDate
			this.toDate = this.currentDates.toDate
			console.log(this.currentDates.fromDate)
		}
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
	resetDatepicker() {
		this.fromDate = null;
		this.toDate = null;
		this.emitDateSelection.emit({ fromDate: this.fromDate, toDate: this.toDate });
		alert('date is reset');
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
