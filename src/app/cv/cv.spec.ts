import { TestBed } from '@angular/core/testing';
import { Cv } from './cv';

describe('Cv', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cv],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Cv);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render an Experience and an Education section heading', async () => {
    const fixture = TestBed.createComponent(Cv);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = Array.from(compiled.querySelectorAll('h2')).map(h => h.textContent?.trim());

    expect(headings).toContain('Experience');
    expect(headings).toContain('Education');
  });

  it('should render two timelines', async () => {
    const fixture = TestBed.createComponent(Cv);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.timeline').length).toBe(2);
  });

  it('should render one timeline-item per experience entry', async () => {
    const fixture = TestBed.createComponent(Cv);
    const cv = fixture.componentInstance as unknown as { experience: unknown[] };
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const timelines = compiled.querySelectorAll('.timeline');
    const experienceItems = timelines[0].querySelectorAll('.timeline-item');

    expect(experienceItems.length).toBe(cv.experience.length);
  });

  it('should render one timeline-item per education entry', async () => {
    const fixture = TestBed.createComponent(Cv);
    const cv = fixture.componentInstance as unknown as { education: unknown[] };
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const timelines = compiled.querySelectorAll('.timeline');
    const educationItems = timelines[1].querySelectorAll('.timeline-item');

    expect(educationItems.length).toBe(cv.education.length);
  });

  it('should render period, title and subtitle for every entry', async () => {
    const fixture = TestBed.createComponent(Cv);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = Array.from(compiled.querySelectorAll('.timeline-item'));

    for (const item of items) {
      expect(item.querySelector('.timeline-period')?.textContent?.trim().length ?? 0).toBeGreaterThan(0);
      expect(item.querySelector('h3')?.textContent?.trim().length ?? 0).toBeGreaterThan(0);
      expect(item.querySelector('.timeline-subtitle')?.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it('should render a bullet list for entries that have details', async () => {
    const fixture = TestBed.createComponent(Cv);
    const cv = fixture.componentInstance as unknown as {
      experience: { details?: string[] }[];
    };
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceItems = Array.from(
      compiled.querySelectorAll('.timeline')[0].querySelectorAll('.timeline-item')
    );

    experienceItems.forEach((item, i) => {
      const entry = cv.experience[i];
      const ul = item.querySelector('ul');

      if (entry.details && entry.details.length > 0) {
        expect(ul).not.toBeNull();
        expect(ul!.querySelectorAll('li').length).toBe(entry.details.length);
      } else {
        expect(ul).toBeNull();
      }
    });
  });

  it('should NOT render an empty bullet list for entries without details', async () => {
    const fixture = TestBed.createComponent(Cv);
    const cv = fixture.componentInstance as unknown as {
      education: { details?: string[] }[];
    };
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const educationItems = Array.from(
      compiled.querySelectorAll('.timeline')[1].querySelectorAll('.timeline-item')
    );

    educationItems.forEach((item, i) => {
      const entry = cv.education[i];
      const hasDetails = !!entry.details && entry.details.length > 0;
      const ul = item.querySelector('ul');
      expect(!!ul).toBe(hasDetails);
    });
  });
});
