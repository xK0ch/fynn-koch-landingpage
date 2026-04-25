import { Component } from '@angular/core';

interface TimelineEntry {
  period: string;
  title: string;
  subtitle: string;
  details?: string[];
}

@Component({
  selector: 'app-cv',
  templateUrl: './cv.html',
  styleUrl: './cv.scss'
})
export class Cv {
  protected readonly experience: TimelineEntry[] = [
    {
      period: '08/2025 - Present',
      title: 'IT Consultant',
      subtitle: 'ojuto consulting GmbH',
      details: [
        'Consulting clients in the customer service domain',
        'Developing custom software solutions tailored to client needs',
        'Migrating a legacy help center platform to a modern system',
        'Introducing automated processes to streamline internal operations'
      ]
    },
    {
      period: '04/2025 - 07/2025',
      title: 'Software Engineer',
      subtitle: 'T2med',
      details: [
        'Developed software for medical practice management',
        'Implemented legally mandated features such as the electronic patient record (ePA)',
        'Built backend functionality in Java'
      ]
    },
    {
      period: '05/2023 - 03/2025',
      title: 'Software Engineer',
      subtitle: 'EWERK Digital GmbH',
      details: [
        'Technical lead of an international team building a Software Development Kit (SDK), including a two-week on-site trip to Vietnam to set up the team',
        'Translated customer requirements into technical concepts and aligned on priorities and future features',
        'Conducted code reviews across frontend and backend and mentored team members as technical point of contact',
        'Took on the role of training lead for IT specialist apprentices in application development'
      ]
    },
    {
      period: '08/2021 - 04/2023',
      title: 'Junior Software Engineer',
      subtitle: 'EWERK Digital GmbH',
      details: [
        'Full-stack development of multiple web applications in the KRITIS (critical infrastructure) sector using a microservice architecture',
        'Backend with Spring Boot, Hibernate, Flyway, PostgreSQL and JUnit; frontend with Angular, RxJS and NgRx',
        'Designed and rolled out a unified, company-wide Java code formatting standard',
        'Organized multiple hackathons for the software crew and supported apprentices on technical questions'
      ]
    }
  ];

  protected readonly education: TimelineEntry[] = [
    {
      period: '06/2023',
      title: 'Vocational Trainer Qualification (AEVO)',
      subtitle: 'IHK Leipzig'
    },
    {
      period: '07/2019 - 07/2021',
      title: 'Apprenticeship: IT Specialist for Application Development',
      subtitle: 'EWERK Digital GmbH'
    },
    {
      period: '08/2018 - 06/2019',
      title: 'Apprenticeship: IT Specialist for System Integration',
      subtitle: 'alpha2000 GmbH'
    },
    {
      period: '07/2016',
      title: 'Abitur (German university entrance qualification)',
      subtitle: 'Gymnasium Kronshagen'
    }
  ];
}
