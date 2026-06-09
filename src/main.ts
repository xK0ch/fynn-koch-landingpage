// Font Awesome SVG bootstrap
// Only the icons used in index.html are bundled; dom.watch() replaces the
// <i class="fa-..."> placeholders with inline SVG on initial DOM scan.
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faGear, faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faGlobe, faGear, faCode, faGithub, faLinkedin);
dom.watch();
