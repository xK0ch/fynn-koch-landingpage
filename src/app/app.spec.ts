import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should compose the hero, projects and cv child components inside <main>', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const main = compiled.querySelector('main');

    expect(main).not.toBeNull();
    expect(main!.querySelector('app-hero')).not.toBeNull();
    expect(main!.querySelector('app-projects')).not.toBeNull();
    expect(main!.querySelector('app-cv')).not.toBeNull();
  });

  it('should render the child components in the order hero → projects → cv', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const childTags = Array.from(compiled.querySelectorAll('main > *')).map(el =>
      el.tagName.toLowerCase()
    );

    expect(childTags).toEqual(['app-hero', 'app-projects', 'app-cv']);
  });

  it('should render a footer with the copyright line', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');

    expect(footer).not.toBeNull();
    expect(footer!.textContent).toContain('Fynn Koch');
  });
});
