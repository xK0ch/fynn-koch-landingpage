import { Component } from '@angular/core';

interface TimelineEntry {
  period: string;
  title: string;
  subtitle: string;
  details: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly experience: TimelineEntry[] = [
    {
      period: '03/2023 - Present',
      title: 'Your role here',
      subtitle: 'Company name',
      details: [
        'Describe a key responsibility or accomplishment',
        'Another notable task or project',
        'Technologies and methods you worked with'
      ]
    },
    {
      period: '01/2021 - 02/2023',
      title: 'Previous role',
      subtitle: 'Previous company',
      details: [
        'What you did here',
        'Highlights and impact'
      ]
    }
  ];

  protected readonly education: TimelineEntry[] = [
    {
      period: '09/2018 - 07/2021',
      title: 'Degree name',
      subtitle: 'University or school name',
      details: [
        'Focus area or thesis topic',
        'Relevant coursework or achievements'
      ]
    }
  ];
}
