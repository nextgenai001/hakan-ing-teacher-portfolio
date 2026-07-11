# How to deploy a simple front-end app on Hostinger VPS using Docker Manager Panel of Hostinger

**NOTE:** This tutorial is for Public GitHub Repositories and for private repositories, it might be different!


We need 2 things:

1. First is a GitHub Action workflow to build the Docker Image on GitHub. It should be in this directory: `.github\workflows\deploy.yml`
2. A `docker-compose.yml` file so Hostinger knows how to deploy it


Docker compose file example for fast and simple deployment for projects without multiple containers or database:

```yaml
services:
  web:
    container_name: hakan-portfolio
    image: ghcr.io/nextgenai001/hakan-ing-teacher-portfolio:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
```


After setting these 2 up and Project Image is built on GitHub Actions, we can go to Docker Manager Panel and click on "Compose via URL" option and paste the Repository URL so the Docker Image is pulled and container is built on Hostinger.


Then we can edit the docker YAML file to something like so it uses our domain `hakan-eng.nexoden.ai` instead of internal port which is insecure:

```yaml
services:
  web:
    image: ghcr.io/nextgenai001/hakan-ing-teacher-portfolio:latest
    container_name: hakan-portfolio
    restart: unless-stopped
    labels:
      - traefik.enable=true
      - traefik.http.routers.hakan-portfolio.rule=Host(`hakan-eng.nexoden.ai`)
      - traefik.http.routers.hakan-portfolio.entrypoints=websecure
      - traefik.http.routers.hakan-portfolio.tls.certresolver=letsencrypt
      - traefik.http.services.hakan-portfolio.loadbalancer.server.port=3000

networks:
  traefik-proxy:
    external: true
```


Also we can add **www** as a second host in the Traefik rule, and create a DNS record for it.

Use this:

```yaml
services:
  web:
    image: ghcr.io/nextgenai001/hakan-ing-teacher-portfolio:latest
    restart: unless-stopped
    labels:
      - traefik.enable=true
      - traefik.http.routers.hakan-portfolio.rule=Host(`hakan-eng.nexoden.ai`) || Host(`www.hakan-eng.nexoden.ai`)
      - traefik.http.routers.hakan-portfolio.entrypoints=websecure
      - traefik.http.routers.hakan-portfolio.tls.certresolver=letsencrypt
      - traefik.http.services.hakan-portfolio.loadbalancer.server.port=3000

networks:
  traefik-proxy:
    external: true
```

Then in Cloudflare, add:

- `hakan-eng` → A record to your VPS IP
- `www.hakan-eng.nexoden.ai` → CNAME to `hakan-eng.nexoden.ai`

Keep Cloudflare on **DNS only** until SSL is issued, then test both:

- `https://hakan-eng.nexoden.ai`
- `https://www.hakan-eng.nexoden.ai`



## Common Mistakes

Things like`image: ghcr.io/${GITHUB_REPOSITORY}:latest` uses a  **GitHub Actions variable** , and Docker Manager on Hostinger does **not** know that variable, so it can’t pull the image.
