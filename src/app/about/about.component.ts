import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  text = '';
  text2 = '';
  text3 = '';

  constructor() {
  }

  ngOnInit() {
    this.text = lorem.generateSentences(10);
    this.text2 = lorem.generateSentences(10);
    this.text3 = lorem.generateSentences(10);
  }

}
