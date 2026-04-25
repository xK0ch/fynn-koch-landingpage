import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Hero);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name in an h1', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Fynn Koch');
  });

  it('should render the tagline', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tagline')?.textContent).toContain('Software developer');
  });

  it('should render the avatar placeholder with the initials', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.avatar')?.textContent?.trim()).toBe('FK');
  });

  it('should render an "about" paragraph with non-empty content', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const about = compiled.querySelector('.about')?.textContent?.trim() ?? '';
    expect(about.length).toBeGreaterThan(0);
  });

  it('should render GitHub and LinkedIn social links with correct hrefs', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.social a'));

    expect(links.length).toBe(2);

    const github = links.find(a => a.textContent?.includes('GitHub'));
    expect(github?.getAttribute('href')).toBe('https://github.com/xK0ch');

    const linkedin = links.find(a => a.textContent?.includes('LinkedIn'));
    expect(linkedin?.getAttribute('href')).toBe('https://www.linkedin.com/in/fynn-koch-913516311/');
  });

  it('should mark all social links as opening in a new tab with rel="noopener noreferrer"', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.social a'));

    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });
});
