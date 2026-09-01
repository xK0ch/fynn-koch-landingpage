// Font Awesome SVG bootstrap
// Only the icons used in index.html are bundled; dom.watch() replaces the
// <i class="fa-..."> placeholders with inline SVG on initial DOM scan.
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faGear, faCode, faFilePdf, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faGlobe, faGear, faCode, faFilePdf, faPaperPlane, faGithub, faLinkedin);
dom.watch();

// Profile photo lightbox: click the avatar to view it enlarged.
const avatarButton = document.querySelector<HTMLButtonElement>('.avatar-button');
const lightbox = document.querySelector<HTMLElement>('#lightbox');

if (avatarButton && lightbox) {
  const openLightbox = () => {
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  avatarButton.addEventListener('click', openLightbox);
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

// Contact form: posts to the mail-service via the same-origin /api path
// (nginx proxies /api/ to the mail-service container; see nginx.conf).
const contactForm = document.querySelector<HTMLFormElement>('#contact-form');
const contactStatus = document.querySelector<HTMLElement>('#contact-status');
const contactSubmit = document.querySelector<HTMLButtonElement>('.contact-submit');

if (contactForm && contactStatus && contactSubmit) {
  const setStatus = (message: string, variant: '' | 'is-success' | 'is-error') => {
    contactStatus.className = variant ? `contact-status ${variant}` : 'contact-status';
    contactStatus.textContent = message;
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    contactSubmit.disabled = true;
    setStatus('Sending...', '');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('Thanks! Your message has been sent.', 'is-success');
        contactForm.reset();
      } else {
        setStatus('Something went wrong. Please try again later.', 'is-error');
      }
    } catch {
      setStatus('Could not reach the server. Please try again later.', 'is-error');
    } finally {
      contactSubmit.disabled = false;
    }
  });
}
