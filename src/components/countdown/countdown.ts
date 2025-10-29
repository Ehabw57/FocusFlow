import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css'
})
export class CountdownComponent implements OnDestroy {
  // Timer state
  minutes = signal(1);
  seconds = signal(0);
  isRunning = signal(false);
  isBreak = signal(true);
  level = signal(5);
  raduis:number = 110;
  
  // Session tracking
  workSessions = signal(1);
  totalSessions = signal(4);
  notesCount = signal(0);
  totalNotes = signal(3);
  dailyProgress = signal(1); // percentage

  private intervalId: any = null;
  private totalSeconds = 1 * 60; // 25 minutes in seconds
  private currentSeconds = 1 * 60;

  constructor() {}

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  start() {
    if (!this.isRunning()) {
      this.isRunning.set(true);
      this.intervalId = setInterval(() => {
        if (this.currentSeconds > 0) {
          this.currentSeconds--;
          this.updateDisplay();
        } else {
          this.complete();
        }
      }, 1000);
    }
  }

  pause() {
    if (this.isRunning()) {
      this.isRunning.set(false);
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }

  reset() {
    this.pause();
    this.currentSeconds = this.totalSeconds;
    this.updateDisplay();
  }

  private complete() {
    this.pause();
    // Handle session completion logic here
    if (!this.isBreak()) {
      // Work session completed
      this.workSessions.update(count => count + 1);
    }
    // You can add break/work session switching logic here
  }

  private updateDisplay() {
    const mins = Math.floor(this.currentSeconds / 60);
    const secs = this.currentSeconds % 60;
    this.minutes.set(mins);
    this.seconds.set(secs);
  }

  get progressPercentage(): number {
    return  this.currentSeconds / this.totalSeconds
  }

  get circumference(): number {
    return 2 * Math.PI * this.raduis;
  }

  get strokeDashoffset(): number {
    return this.progressPercentage * this.circumference - this.circumference
  }

  get displayTime(): string {
    const mins = this.minutes().toString().padStart(2, '0');
    const secs = this.seconds().toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  get sessionType(): string {
    return this.isBreak() ? 'Break Time!' : 'Time to Focus!';
  }

  get badgeTitle(): string {
    return this.isBreak() ? 'Break Master' : 'Focus Master';
  }
}