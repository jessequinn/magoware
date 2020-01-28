### Development
Several modifications were made to the configuration files found in `app/config/env`.

To begin the installation:

1. Comment out `command: "./node_modules/.bin/sequelize db:migrate"` in the `docker-compose.yml`
2. Run `docker-compose up --build --remove-orphans`
3. Login as `superadmin`
4. Uncomment `command: "./node_modules/.bin/sequelize db:migrate"` in the `docker-compose.yml`
5. Run `docker-compose up --build --remove-orphans` again
6. Comment out `command: "./node_modules/.bin/sequelize db:migrate"` in the `docker-compose.yml`
7. Run `docker-compose up --build --remove-orphans` again

Access site `http://localhost:80/admin` - superadmin/superadmin.
Adminer `http://localhost:8080/`.
