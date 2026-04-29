import { TestBed } from '@angular/core/testing';
import { Projects } from './projects';

describe('Projects', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Projects);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the section heading', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Projects');
  });

  it('should render two project cards', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.card').length).toBe(3);
  });

  it('should render the Tanzschule card with title, tag and three external links', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll('.card'));
    const tanzschule = cards.find(c => c.querySelector('h3')?.textContent?.includes('Tanzschule'));

    expect(tanzschule).toBeTruthy();
    expect(tanzschule?.querySelector('.tag')?.textContent).toContain('Spring Boot');

    const links = Array.from(tanzschule!.querySelectorAll<HTMLAnchorElement>('.card-links a'));
    const hrefs = links.map(a => a.getAttribute('href'));

    expect(hrefs).toContain('https://tanzschule.fynn-koch.de');
    expect(hrefs).toContain('https://tanzschule.fynn-koch.de/swagger-ui/index.html');
    expect(hrefs).toContain('https://tanzschule.fynn-koch.de/v3/api-docs');
  });

  it('should render the Koch Reisen card with a single UI link', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll('.card'));
    const kochReisen = cards.find(c => c.querySelector('h3')?.textContent?.includes('Koch Reisen'));

    expect(kochReisen).toBeTruthy();
    expect(kochReisen?.querySelector('.tag')?.textContent?.trim()).toBe('Angular');

    const links = Array.from(kochReisen!.querySelectorAll<HTMLAnchorElement>('.card-links a'));
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://koch-reisen.de');
  });

  it('should mark all card links as opening in a new tab with rel="noopener noreferrer"', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.card-links a'));

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });
});
