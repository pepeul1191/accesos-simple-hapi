## Accesos Simple con HapiJS y EJDB

Instlación de software y dependencias. Adicionalmente hay que tener instalado NodeJS.

    $ sudo add-apt-repository ppa:adamansky/ejdb
    $ sudo apt-get update
    $ sudo apt-get install ejdb ejdb-dbg gcc clang cmake zlib1g-dev 
    $ git clone https://github.com/Softmotions/ejdb.git
    $ cd ejdb
    $ mkdir build
    $ cd build
    $ cmake -DCMAKE_BUILD_TYPE=Release ../
    $ make 
    $ sudo make install
    $ npm install -g ejdb

### Cliente EJDB en la terminal:

+ Acceder al cliente:

    $ ejdb

+ Abrir base de datos:

    ejdb > db.open('accesos');

+ Obtener la información de colecciones:

    ejdb> db.getDBMeta();

+ Consultar todos los registros:

    ejdb> db.find('colección');

### Formato de Usuarios

    {
        '_id': autogenrado
        'usuario': String,
        'contrasenia': String,
        'correo': String
    }

### Formato de Logs

    {
        '_id': autogenrado
        'usuario_id': String,
        'momento': DateTime
    }

### Javascript Date

The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order:

    var d = new Date(99, 5, 24, 11, 33, 30, 0);

### Pruebas de Comportamiento

Ejecutar

    $ cd test/rspec
    $ rspec spec usuario.rb log.rb

---

Fuentes:

+ https://github.com/davidenq/hapi-routes-loader
+ http://ejdb.org/doc/install/ubuntu.html
+ https://github.com/Softmotions/ejdb-ruby
+ http://ejdb.org/doc/cli.html
+ https://stackoverflow.com/questions/7653080/adding-to-an-array-asynchronously-in-node-js
+ https://www.w3schools.com/js/js_dates.asp