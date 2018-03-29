#!/usr/bin/env bash
CONTAINER_NAME=backup-test
MYSQL_CONTAINER=mysql

docker build -t $CONTAINER_NAME .

docker run -it --rm \
  -e SQL_HOST=$MYSQL_CONTAINER \
  -e SQL_USER="root" \
  -e SQL_PASS="secret" \
  -e SCHEDULE="* * * * *" \
  -v "`pwd`/data:/data" \
  --link $MYSQL_CONTAINER \
  -p 8080:80 \
  $CONTAINER_NAME ${1:cron}
