launch MariaDB docker image

```shell
docker network create node-network
docker run --detach --network node-network --name node-mariadb --env MARIADB_USER=node-user --env MARIADB_PASSWORD=my_cool_secret --env MARIADB_ROOT_PASSWORD=my-secret-pw  mariadb:latest
```