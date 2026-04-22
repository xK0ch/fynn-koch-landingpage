# fynn-koch-landingpage

Landing page for [fynn-koch.de](https://fynn-koch.de) — also acts as the central reverse proxy for all subdomains.

## Architecture

This container has two responsibilities:
1. **Landing page** — Angular app served at `fynn-koch.de`
2. **Reverse proxy** — routes subdomains to their respective app containers

```
Internet (Port 80/443)
        │
        ▼
fynn-koch-landingpage (nginx)
        │
        ├── fynn-koch.de               → Angular landing page (static)
        └── tanzschule.fynn-koch.de    → tanzschule-ui (Docker container)
```

## Local development

```bash
npm install
npm start        # Dev server at http://localhost:4200
npm run build    # Production build
npm run test     # Unit tests
```

## Adding a new project

1. Add a new `server` block in `nginx.conf` (a commented template is at the bottom of the file)
2. Add a CNAME record at your domain provider pointing `myproject` to `fynn-koch.de`
3. Extend the SSL certificate with the new domain (see SSL setup below)
4. Run `docker compose -f docker-compose-fynn-koch-landingpage.yml restart` on the server

## SSL setup & auto-renewal

### Initial certificate (one-time, while the container is stopped)

```bash
docker compose -f docker-compose-fynn-koch-landingpage.yml down

sudo certbot certonly --standalone \
  --cert-name fynn-koch.de \
  -d fynn-koch.de \
  -d tanzschule.fynn-koch.de

docker compose -f docker-compose-fynn-koch-landingpage.yml up -d
```

### Switch to webroot for automatic renewal (nginx must be running)

Run this once to update certbot's saved config so future renewals happen automatically without any manual steps:

```bash
# Create the webroot directory on the host
sudo mkdir -p /var/www/certbot

sudo certbot certonly --webroot -w /var/www/certbot \
  --cert-name fynn-koch.de \
  -d fynn-koch.de \
  -d tanzschule.fynn-koch.de
```

### Set up automatic renewal (cron job)

```bash
sudo crontab -e
```

Add this line — runs every Monday at 3 AM, reloads nginx if the cert was renewed:

```
0 3 * * 1 certbot renew --quiet --deploy-hook "docker exec fynn-koch-landingpage nginx -s reload"
```

Test that renewal works without actually renewing:

```bash
sudo certbot renew --dry-run
```

### Adding a new domain to the certificate

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  --cert-name fynn-koch.de \
  -d fynn-koch.de \
  -d tanzschule.fynn-koch.de \
  -d myproject.fynn-koch.de
```

## Deployment

This is the only container with public ports 80/443. All other project containers run on internal Docker ports only.

```bash
# Create the shared network (once)
docker network create proxy-net

# Create the certbot webroot directory (once)
sudo mkdir -p /var/www/certbot

# Start
docker compose -f docker-compose-fynn-koch-landingpage.yml up --build -d
```

Deployment is handled automatically via Jenkins (see `Jenkinsfile`).
