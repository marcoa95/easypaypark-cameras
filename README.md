# Easy Pay Park Cámaras
Servidor para el proyecto de Easy Pay Park integración con cámaras.

## Clonar/Descargar el proyecto
Para tener acceso al código del proyecto será necesario descargarlo desde esta página de Github, o bien, clonando el repositorio:
```
git clone https://github.com/marcoa95/easypaypark-cameras.git
```

## Prerequisitos
Este proyecto esta construido utilizando el entorno de ejecución de `Node.js` y su gestor de paquetes `npm` o `yarn` utilizando el lenguaje de `JavaScript`.

### Creación de la base de datos en MySQL
Antes de arrancar el proceso por primera vez, es necesario que la base de datos ya exista.

Para crear la base de datos se puede usar cualquier cliente de MySQL como MySQL Workbench, phpmyadmin, etc.

Es importante recordar que el nombre de la base de datos debe coincidir con la variable de entorno `DB_NAME`.

**No es necesario crear las tablas, sólo la base de datos, una vez iniciado el programa este se encargará de generar las tablas de manera automática**.

### Instalación de **Node.js**
Para obtener el software de `Node.js` será necesario seguir las instrucciones de descarga e instalación de la [página oficial de Node.js](https://nodejs.org/es/download/) para el sistema operativo específico.

### Instalación de **npm**
El gestor de paquetes de `npm` está incluido en el paquete de instalación de `Node.js`, por lo que sólo faltará el seguir el paso anterior para obtenerlo.

### Instalación de **yarn**
Al igual que `npm`, `yarn` es una alternativa como gestor de paquetes para `Node.js`, a diferencia del primero este gestor instala y compila las dependencias de manera concurrente, por lo que los tiempos de instalación y construcción del proyecto se ven reducidos drásticamente. para instalarlo será necesario contar con `npm` primero y luego ejecutar el siguiente comando:
```
npm install -g yarn
```

# Instalación mediante el scirpt setup.bat (sólo windows)
Para realizar la instalación en sistemas operativos de tipo Windows primero será necesario contar con **`Node.js`** y **`npm`** (prerequisitos).

Una vez que estén cumplidos estos requisitos sólo bastará con ejecutar el archivo `setup.bat`.

### Posibles errores
En caso de presentar errores de permisos ejecutar el archivo `setup.exe` como administrador.

En caso de presentar errores de restricción de scripts, se deberá ejecutar el siguiente comando como administrador en el PowerShell de Windows:
```
Set-ExecutionPolicy Unrestricted
```

# Instalación manual
## Instalar dependencias
Antes de compilar el proyecto deberán instalarse las dependencias del mismo, por lo que será necesario ejecutar el siguiente comando en el directorio del proyecto:
```
npm install
```
o
```
yarn install
```

## Ejecución del software del servidor
### Alternativa 1. Gestor de procesos pm2 (recomendado)
Para ejecutar el software de una manera más eficiente se recomienda utilizar el gestor de procesos `pm2`, este gestor ofrece una interfaz que facilita el control y acceso a los procesos de Node.js que se requieran instanciar. Para más información consultar la [documentación oficial de pm2](https://pm2.keymetrics.io/docs/usage/quick-start/).

#### Instalación de pm2
pm2 es un gestor de procesos para software de `JavaScript`, este se encarga de mantener activo el software sin necesidar de estar anclado a la consola y es capaz de mantener el programa activo aún después de reinicios del equipo así como reiniciar automaticamente el proceso en caso de errores.
Para instalarlo será necesario ejecutar el siguiente comando:
```
npm install -g pm2
```

#### Archivo **ecosystem.config.js**
El archvio de ecosistema del proyecto es utilizado por el gestor `pm2` para ejecutar el proceso con una configuración predefinida, se pude encontrar un esta configuración en el archivo `ecosystem.config.js`.

#### Confiuración de las variables de entorno
Para configurar las variables de entorno será necesario definirlas dentro del archivo `ecosystem.config.js`, en el apartado de `env` podremos definir las variables de entorno mediante notación `JSON`, ejemplo:
```
env: {
  NODE_ENV: 'development',
  HTTP_PORT: 8080,
  ...
}
```

### Ejecución con pm2
Para arrancar el proceso con el gestor de `pm2` sólo hará falta ejecutar el siguiente comando:
```
pm2 start ecosystem.config.js
```

### Sincronizar la lista de procesos de pm2 para el arranque
Para sincronizar la lista de procesos con el arranque de pm2 se deberán ejecutar los siguientes comandos:

Para sincronizar la lista de procesos:
```
pm2 save
```

Para configurar el arranque de pm2 al reiniciar el equipo:
```
pm2 startup
```

### Estado del proceso de pm2
Para revisar el estado de los procesos gestionados por pm2, se debe ejecutar el comando:
```
pm2 status
```
Aquí podremos ver algunos de los siguientes parámetros importantes del proceso:
* id: ID del proceso de pm2
* name: Nombre del proceso (definido en el ecosystem.config.js)
* pid: ID del proceso a nivel del sistema operativo
* uptime: Tiempo de ejecución del proceso
* status: Estado del proceso
* cpu: Porcentaje de uso del CPU
* mem: Cantidad de memoria RAM que usa el proceso

### Logs de la consola con pm2
Para observar el texto de salida a la consola del proceso gestionado por pm2, se deberá ejecutar el comando:
```
pm2 logs <ID del proceso de pm2>
```

### Detener el proceso de pm2
Para detener un proceso con pm2 es necesario ejecutar el comando:
```
pm2 stop <ID del proceso de pm2>
```

### Borrar el proceso de pm2
Para borrar un proceso gestionado por pm2 se deberá ejecutar el comando:
```
pm2 del <ID del proceso de pm2>
```

### Alternativa 2. Ejecución directa en Node.js
Para ejecutar el software es necesario contar con un motor de ejecución de `JavaScript` como `Node.js` (instalación en pasos anteriores).
#### Configuración de variables de entorno
Para que el programa funcione correctamente será necesario configurar las variables de entorno del equipo, para esto será necesario seguir las instrucciones del tipo de sistema operativo utilizado.
- Windows: https://www.profesionalreview.com/2018/11/20/variables-entorno-windows-10/
- Linux: https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-linux-es

#### Ejecución con Node.js
Para iniciar la ejecución del programa será necesario utilizar el siguiente comando dentro del directorio `dist`:
```
node server.js
```

## Variables de entorno
Las variables de entorno disponibles para configurar el proceso del servidor son las siguientes

### NODE_ENV
Entorno de ejecución del proceso (no es necesario cambiarla).

### HTTP_PORT
Puerto del equipo a utilizar para el servicio de HTTP.

### JWT_SECRET_OR_KEY
Palabra secreta para firmar los tokens de sesión de los usuarios.

### HASH_SALT
Salt criptográfico para encriptar las contraseñas de los usuarios.

### DEFAULT_ADMIN_USERNAME
Nombre de usuario del usuario administrador default del servidor.

### DEFAULT_ADMIN_PASSWORD
Contraseña  del usuario administrador default del servidor.

### DEFAULT_ADMIN_EMAIL
Correo del usuario administrador default del servidor.

### DB_HOST
Dominio/Dirección IP/Host en el que se encuentra el sistema gestor de base de datos MySQL.

### DB_USER
Usuario de acceso a la base de datos.

### DB_PASSWORD
Contraseña del usuario de acceso a la base de datos.

### DB_NAME
Nombre de la base de datos.

## Script de reinicio del proceso
En caso de que el proceso requiera ser reiniciado (Se desconecto el Arduino, ocurre algún problema), bastará con ejecutar el script `restart.bat` desde cualquier terminal.
