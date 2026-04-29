# fynn-koch-landingpage

Landing page for [fynn-koch.de](https://fynn-koch.de). It also acts as the central reverse proxy for all subdomains.

## Architecture

This container has two responsibilities:
1. **Landing page**: Angular app served at `fynn-koch.de`
2. **Reverse proxy**: routes subdomains to their respective app containers

```
Internet (Port 80/443)
        │
        ▼
fynn-koch-landingpage (nginx)
        │
        ├── fynn-koch.de               → Angular landing page (static)
        ├── dance-school.fynn-koch.de  → dance-school-ui (Docker container)
        └── shikaku.fynn-koch.de       → shikaku (Docker container)
```

## Local development

```bash
npm install
npm start        # Dev server at http://localhost:4200
npm run build    # Production build
npm run test     # Unit tests
```

## Adding a new project

### 1. DNS
Add a CNAME record at your domain provider pointing `myproject` to `fynn-koch.de`. Wait until `ping myproject.fynn-koch.de` resolves to your server IP before continuing.

### 2. Configure the new project
The new project's container must:
- Be on the external `proxy-net` Docker network
- **Not** expose any ports to the host (no `ports:` entry in docker-compose)
- Have a container name matching the `proxy_pass` target you'll set in step 4 (e.g. `myproject-ui`)

Example `docker-compose.yml` snippet:
```yaml
services:
  myproject-ui:
    build: .
    container_name: myproject-ui
    networks:
      - proxy-net
    restart: unless-stopped

networks:
  proxy-net:
    name: proxy-net
    external: true
```

### 3. Extend the SSL certificate
```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  --cert-name fynn-koch.de \
  -d fynn-koch.de \
  -d dance-school.fynn-koch.de \
  -d shikaku.fynn-koch.de \
  -d myproject.fynn-koch.de
```

### 4. Add a server block to `nginx.conf`
A commented template is at the bottom of `nginx.conf`. Set `server_name` to the new subdomain and `proxy_pass` to the container name from step 2.

### 5. Deploy
```bash
# Start the new project
cd ~/myproject
docker compose -f docker-compose-myproject.yml up --build -d

# Rebuild the landing page so nginx picks up the new config
cd ~/fynn-koch-landingpage
git pull
docker compose -f docker-compose-fynn-koch-landingpage.yml up --build -d
```

## SSL setup & auto-renewal

### Initial certificate (one-time, while the container is stopped)

```bash
docker compose -f docker-compose-fynn-koch-landingpage.yml down

sudo certbot certonly --standalone \
  --cert-name fynn-koch.de \
  -d fynn-koch.de \
  -d dance-school.fynn-koch.de \
  -d shikaku.fynn-koch.de

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
  -d dance-school.fynn-koch.de \
  -d shikaku.fynn-koch.de
```

### Set up automatic renewal (cron job)

```bash
sudo EDITOR=vim crontab -e
```

Add this line (runs every Monday at 3 AM, reloads nginx if the cert was renewed):

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
  -d dance-school.fynn-koch.de \
  -d shikaku.fynn-koch.de \
  -d myproject.fynn-koch.de
```
