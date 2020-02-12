### Development
Several modifications were made to the configuration files found in `app/config/env`.

To begin the installation:

1. Comment out `command: "./node_modules/.bin/sequelize db:migrate"` in the `docker-compose.yml`
2. Make sure no `test.db.connection.js` file is located in the `app/config/env/` folder
3. Comment out `CMD ["npm", "start"]` in the `Dockerfile`
4. Run `docker-compose up --build --remove-orphans`
5. In a new terminal run `docker-compose run app bash` and run `npm start` at the bash prompt
6. Fill in the required database information that you will use in the `docker-compose.yml`
7. Run `npm start` again **no errors should be seen about magoware.settings table missing`**
8. Shutdown the `docker-compose` with `ctrl+c` and copy the `tmp/db.connection.js` to `config/env/` **adjust your settings**
9. Uncomment `command: "./node_modules/.bin/sequelize db:migrate"` in the `docker-compose.yml`
10. Uncomment out `CMD ["npm", "start"]` in the `Dockerfile`
11. Run `docker-compose up --build --remove-orphans` again
12. Migrations will occur, some errors will be seen
13. Shutdown the `docker-compose` with `ctrl+c`
14. Comment out `command: "./node_modules/.bin/sequelize db:migrate"` in the `docker-compose.yml`
15. Run `docker-compose up --build --remove-orphans` again or with the `-d` as detached
16. Login as `superadmin` or create a new account

Access site `http://localhost:80/admin` - superadmin/superadmin.
Adminer `http://localhost:8080/`.
