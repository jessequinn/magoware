![Magoware Logo](https://github.com/MAGOWARE/backoffice-administration/blob/master/public/admin/images/github-mago-logo.png)

MAGOWARE is an IPTV/OTT solution for Pay Tv Businesses. The administration portal is build on Sequelize, Express, ng-admin, and Node.js

### Installation

### Before you start, make sure you have these prerequisites installed:

- PostgreSQL 9.4 or MySQL, MariaDB, SQLite and MSSQL
- Redis Server
- Node.js 10.0.0 and up
- node-gyp (Nodejs module used to compile native code)
- Python 2 (node-gyp dependency)

### Install the node modules
```$bash
$ npm install
```

### Running in Production mode

To run your application with _production_ environment configuration, change the NODE_ENV variable at server.js and star the server with:

```bash
$ npm start
```

- explore `config/env/production.js` for production environment configuration options

### Starting in development mode

```bash
$ npm start
```

or

```bash
$ node server.js
```

### Running with TLS (SSL)

Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ sh ./scripts/generate-ssl-certs.sh
```

### Database migration

\$ sequelize migration:create # Generates a new migration file.

To upgrade the database with the latest changes run the following:

```bash
$ sequelize db:migrate
```

- explore `config/env/production.js` for production environment configuration options

### Running with TLS (SSL)

Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ sh ./scripts/generate-ssl-certs.sh
```

Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the _config/sslcerts_ folder.

Finally, execute grunt's prod task `grunt prod`

- enable/disable SSL mode in production environment change the `secure` option in `config/env/production.js`

## API Documentation

Run the following command to generate APIDOC folder

```
apidoc -i modules/deviceapiv2/server/controllers/ modules/streams/server/controllers/ -o public/apidoc/
```

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
