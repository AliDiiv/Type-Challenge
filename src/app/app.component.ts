import { Component } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText: string = faker.lorem.sentence();
  inputText: string = '';

  // Game statistics
  timeLeft: number = 60;
  timer: any;
  mistakes: number = 0;
  correctChars: number = 0;
  wpm: number = 0;

  constructor() {
    this.startGame();
  }


  // Start Game
  startGame() {
    this.resetStats();
    this.startTimer();
  }

  // Reset variables
  resetStats() {
    this.inputText = '';
    this.mistakes = 0;
    this.correctChars = 0;
    this.wpm = 0;
    this.timeLeft = 60;
    this.randomText = faker.lorem.sentence();
    if (this.timer) clearInterval(this.timer);
  }

  // Timer
  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.calculateWPM();
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  // Receive user input
  onChangeInput(text: string) {
    this.inputText = text;
    this.updateStats();
  }

  // True/False Calculation
  updateStats() {
    this.correctChars = 0;
    this.mistakes = 0;

    for (let i = 0; i < this.inputText.length; i++) {
      if (this.inputText[i] === this.randomText[i]) {
        this.correctChars++;
      } else {
        this.mistakes++;
      }
    }

    // If the text is complete → Timer stops.
    if (this.inputText === this.randomText) {
      clearInterval(this.timer);
      this.calculateWPM();
    }
  }

  // WPM calculation
  calculateWPM() {
    const timeSpent = 60 - this.timeLeft;
    if (timeSpent > 0) {
      this.wpm = Math.round((this.correctChars / 5) / (timeSpent / 60));
    }
  }

  // Comparison for letter coloring
  compare(letterRandom: string, letterEnter: string | undefined): string {
    if (!letterEnter) return 'pending';
    return letterEnter === letterRandom ? 'correct' : 'incorrect';
  }

  // progress
  get progress(): number {
    if (!this.randomText) return 0;
    const correctChars = this.inputText
      .split('')
      .filter((ch, i) => ch === this.randomText[i]).length;
    return Math.floor((correctChars / this.randomText.length) * 100);
  }

  // accuracy calculation
  get accuracy(): number {
    if (this.inputText.length === 0) return 0;
    return Math.floor((this.correctChars / this.inputText.length) * 100);
  }


  // Restart the game
  restartGame() {
    this.startGame();
  }
}
