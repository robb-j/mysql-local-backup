# Local Mysql Backup

Regularly run a `mysqldump` of your database to a local drive using this handy docker image.
Setup with [robb-j/node-base](https://github.com/robb-j/node-base/).

## Sample Usage

```bash
docker run -it --rm \
  -e SQL_HOST=mysql \
  -e SQL_USER="root" \
  -e SQL_PASS="secret" \
  -e SCHEDULE="* * * * *" \
  -v "/my_massive_drive:/data" \
  --link mysql \
  -p 8080:80 \
  robb-j/mysql-local-backup
```

### or

```yml
backup:
  image: robb-j/mysql-local-backup
  restart: unless-stopped
  environment:
    SCHEDULE: 20 4 5 * *
  env_file:
    - secrets.env
  volumes:
    - ./my_massive_drive:/data
  ports:
    - 8080:80
```

> Where `secrets.env` has SQL_HOST, SQL_USER & SQL_PASS in it

## Variables

| Name | Usage |
| ---- | ----- |
| SQL_HOST | The hostname of your `mysql` container |
| SQL_USER | The username of your `mysql` user |
| SQL_PASS | The password of your `mysql` user |
| SCHEDULE | The cron to run the backup on  |

## Dev Commands

```bash

# Build & publish the image (from node-9:alpine)
# -> uses REGISTRY file & the npm version to tag image
npm run push-image

# Update version (builds & pushes a new docker image)
npm version ... # --help

# Lint the web & test directories
npm run lint

# Run the unit tests
npm test

# Generate coverage
npm run coverage          # outputs to coverage/
npm run coverage-summary  # outputs to terminal

# Watch code with nodemon (restarts on file changes)
npm run watch

```
