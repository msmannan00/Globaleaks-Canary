import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.css']
})
export class IdleComponent implements OnInit {
  idleState = "NOT_STARTED";
  countdown?: number;
  lastPing?: Date;

  constructor(private idle: Idle, keepalive: Keepalive, cd: ChangeDetectorRef) {

    idle.setIdle(5);
    idle.setTimeout(5);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleStart.subscribe(() => {
      this.idleState = "IDLE";
    });

    idle.onIdleEnd.subscribe(() => {
      this.idleState = "NOT_IDLE";
      console.log(`${this.idleState} ${new Date()}`)
      this.countdown = 0;
      cd.detectChanges();
    });

    idle.onTimeout.subscribe(() => this.idleState = "TIMED_OUT");
    idle.onTimeoutWarning.subscribe(seconds => this.countdown = seconds);

    keepalive.interval(15);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  reset() {
    this.idle.watch();
    this.idleState = "NOT_IDLE";
    this.countdown = 0;
    this.lastPing = new Date();
  }

  ngOnInit(): void {
    this.reset();
  }
}
