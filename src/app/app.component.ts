import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faker } from '@faker-js/faker';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText: string = faker.lorem.sentence();
  inputText: string = '';

  onChangeInput(text: string) {
    this.inputText = text;
  }

  compare(letterRandom: string, letterEnter: string | undefined): string {
    if (!letterEnter) return 'pending';
    return letterEnter === letterRandom ? 'correct' : 'incorrect';
  }

  get progress(): number {
    if (!this.randomText) return 0;
    const correctChars = this.inputText
      .split('')
      .filter((ch, i) => ch === this.randomText[i]).length;

    return Math.floor((correctChars / this.randomText.length) * 100);
  }
}
