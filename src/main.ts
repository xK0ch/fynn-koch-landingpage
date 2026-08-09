// Font Awesome SVG bootstrap
// Only the icons used in index.html are bundled; dom.watch() replaces the
// <i class="fa-..."> placeholders with inline SVG on initial DOM scan.
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faGear, faCode, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faGlobe, faGear, faCode, faFilePdf, faGithub, faLinkedin);
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
