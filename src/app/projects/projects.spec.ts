import { TestBed } from '@angular/core/testing';
import { Projects } from './projects';

describe('Projects', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();
  });

  function techLabels(card: Element): string[] {
    return Array.from(card.querySelectorAll('.tech')).map(t => t.textContent?.trim() ?? '');
  }

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

  it('should render three project cards', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.card').length).toBe(3);
  });

  it('should render the Dance School card with Angular and Spring Boot tech chips and three external links', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll('.card'));
    const danceSchool = cards.find(c => c.querySelector('h3')?.textContent?.includes('Dance School'));

    expect(danceSchool).toBeTruthy();
    expect(techLabels(danceSchool!)).toEqual(['Angular', 'Spring Boot']);
    expect(danceSchool!.querySelector('.tech-angular')).not.toBeNull();
    expect(danceSchool!.querySelector('.tech-spring')).not.toBeNull();

    const links = Array.from(danceSchool!.querySelectorAll<HTMLAnchorElement>('.card-links a'));
    const hrefs = links.map(a => a.getAttribute('href'));

    expect(hrefs).toContain('https://dance-school.fynn-koch.de');
    expect(hrefs).toContain('https://dance-school.fynn-koch.de/swagger-ui/index.html');
    expect(hrefs).toContain('https://dance-school.fynn-koch.de/v3/api-docs');
  });

  it('should render the Koch Reisen card with a single Angular chip and one UI link', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll('.card'));
    const kochReisen = cards.find(c => c.querySelector('h3')?.textContent?.includes('Koch Reisen'));

    expect(kochReisen).toBeTruthy();
    expect(techLabels(kochReisen!)).toEqual(['Angular']);
    expect(kochReisen!.querySelector('.tech-angular')).not.toBeNull();

    const links = Array.from(kochReisen!.querySelectorAll<HTMLAnchorElement>('.card-links a'));
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://koch-reisen.de');
  });

  it('should render the Shikaku card with Rust, Leptos and WebAssembly chips and a UI plus source link', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll('.card'));
    const shikaku = cards.find(c => c.querySelector('h3')?.textContent?.includes('Shikaku'));

    expect(shikaku).toBeTruthy();
    expect(techLabels(shikaku!)).toEqual(['Rust', 'Leptos', 'WebAssembly']);
    expect(shikaku!.querySelector('.tech-rust')).not.toBeNull();
    expect(shikaku!.querySelector('.tech-leptos')).not.toBeNull();
    expect(shikaku!.querySelector('.tech-wasm')).not.toBeNull();

    const links = Array.from(shikaku!.querySelectorAll<HTMLAnchorElement>('.card-links a'));
    const hrefs = links.map(a => a.getAttribute('href'));
    expect(hrefs).toContain('https://shikaku.fynn-koch.de');
    expect(hrefs).toContain('https://github.com/xK0ch/shikaku');
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
