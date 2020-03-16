# Sistema de Gestión de Admisión Escolar

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3. Actualizado a la version 9.0.5.

## Indice

1. [Entorno](#entorno)
1. [Uso del proyecto](#uso-del-proyecto)
1. [Deploy del proyecto](#deploy)
1. [Guia de Github](#guia-de-Github)

## Entorno

### Preinstalación

1. Instalar node js en Linux
```
  sudo apt update
  sudo apt install nodejs
  sudo apt install npm
```

o en Windows descargar instalable en su página oficial [Node JS](https://nodejs.org/es/)

2. Instalar angular cli
```
npm install -g @angular/cli
```

3. Instalar Git
```
  sudo apt update
  sudo apt install git
```

o en Windows descargar instalable en su página oficial [Git](https://git-scm.com/download/)

### Dependencias para correr el proyecto

1. Instalar dependencias
```
npm install
```
## Actualizar el CLI y Proyecto

1. Actualizar CLI de manera globlal
```
npm uninstall -g @angular/cli
npm cache verify
```
1. Actualizar CLI dependencias del proyecto
```
ng update @angular/core @angular/cli
ng update @angular/cdk @angular/material
```


### Configurar alias para git

1. Agregar alias para ver log `git config --global alias.lod 'log --oneline --decorate --color'`
1. Agregar alias para hacer push en branch develope `git config --global alias.pud 'push origin develope'`
1. Agregar alias para hacer pull en branch develope `git config --global alias.pod 'pull origin develope'`
1. Mostrar alias creados `git config --global --get-regexp alias`
1. Eliminar alias `git config --global --unset alias.nombre_alias`

### Errores de instalación

1. An unhandled exception occurred: Could not find module "@angular-devkit/build-angular" from ".../TT/SGAE-Angular".
See "/tmp/ng-tK5npU/angular-errors.log" for further details.

2. found 3 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details

## Uso del proyecto

### Correr el proyecto

En terminal usar `ng serve` para deplegar el server. Navegar a `http://localhost:4200/`.

En terminal usar `ng serve --host your-ip` para desplegar el server. Navegar a `http://your-ip:4200/`.

Ejemplo: Remplaza los valores de x por tu dirección de ip, en otro caso evita el flag --host
```
ng serve --host 192.182.x.x
```

### Creación de elementos

Ejecuta `ng g c modules/module-folde/component-name --module=name-module` para generar un nuevo componente en un modulo especifico. El flag **--module=name-module** indica el modulo; puedes remplazarlo por la versión corta con **-m=name-module**.

Ejemplo: Se generara un componente en la ubicación de `components/template/view/` llamado **messages** dentro del module llamado **template**
```
ng g c modules/template/view/messages -m=template
```

Ejecuta `ng g m modules/module-folder/module-name -m=app --flat --routing` para generar un nuevo module con su propio routing-module. Las banderas **-m=app** importa el module en app.module y **--routing** crea su proprio routing module.

Ejemplo: Se genera un modulo ubicado en `components/template/` con nombre de **templateModule** dentro del module **app** y con su propio routing module.
```
ng g m modules/template/templateModule -m=app --flat --routing
```

También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module` utilizando los flags que se usaron anteriormente.

### Alias  para importaciones

Esta plantilla usa alias. Puedes editar nuevas alias en el archivo `tsconfig.json`,  en la sección de `compilerOptions.paths`.

1. `@components/*` hace referencia al fichero `src/app/components/*`. 
1. `@models/*` hace referencia al fichero `src/app/models/*`.
1. `@modules/*` hace referencia al fichero `src/app/modules/*`.
1. `@services/*` hace referencia al fichero `src/app/services/*`.
1. `@pipes/*` hace referencia al fichero `src/app/pipes/*`
1. `@shared/*` hace referencia al fichero `src/app/shared/*`
1. `@breadcrumb/*` hace referencia al fichero `src/app/shared/breadcrumb/*`
1. `@template/*` hace referencia al fichero `src/app/modules/template/*`

## Deploy

### Construccion del proyecto angular

1. Ejecutar en terminal `ng build --aot` construir el proyecto. The build artifacts will be stored in the `dist/` directory. Usa la bandera `--prod` para una contrucción para producción.
1. Copiar el contenido de la carpeta `dist/` en `public/`.

### Deploy en Firebase Hosting

1. Si no has instalado las herramientas de firebase usa `npm install -g firebase-tools`.
1. Logear en la app con `firebase login`.
1. Inicializar la acción `firebase init`. Dentro de las opciones seleccionar la opción de `Hosting` con espacio, y después pulsar enter.
1. Desplegar `firebase deploy`.

## Guia de Github

### Esencial con Github

1. Mostrar los archivos y directorios modificados o creados `git status`.
1. Agregar todos los cambios realizados `git add . `, si se desea agregar uno en especifico `git add nombre_archivo` si esta al mismo nivel, sino especificar la ruta `git add ruta/nombre_archivo`
1. Crear un commit  `git commit -m "mensaje del commit"` agrega una descripcion de los cambios que se hicieron. Vea referencia de [como hacer un commit](#como-hacer-un-commit).
1. Para subir los cambios hacer un push `git push origin develope` despues de la palabra  `origin` agrega el branch en el que se encuntra, por lo regular ocuparemos la rama de  `develope`. Si deseas hacer un push a otra branch cambia el nombre del branch.
1. Para descargar los cambios hacer un pull  `git pull origin develope` despues de la palabra  `origin` agrega el branch en el que se encuntra, por lo regular ocuparemos la rama de  `develope`. Si deseas hacer un pull a otra branch cambia el nombre del branch.
1. Si te equivocaste usa `git checkout nombre_archivo` para revertir todos los cambios sobre el arvhico. Si deseas volver por completo a la última version a la que hiciste pull usa `git checkout -- .` esto eliminara todos los cambios que hayas hecho.

### Como hacer un commit

1. Usar notacion `add():`, `update():`, `fix():` o `delete():` para indicar el tipo de commit.
2. Dentro del paréntesis indicar el modulo que se está actualizando, seguido del Caso de Uso.
3. Posterior a los dos puntos escribir una descripción de lo que se realizó.

Ejemplo:
```
  git commit -m "add(evaluacion): Se agreago el modulo de evaluacion"
```

## Uso de Branch (ramas)

1. Mostrar ramas y señala rama actual `git branch`.
1. Crear una rama `git branch nombre_rama`.
1. Crear y cambiar a rama `git checkout -b nombre_nueva_rama`.
1. Cambiar nombre de rama `git branch -m nombre_anterior nombre_nuevo`.
1. Eliminar rama `git branch -d nombre_rama`.
1. Cambiar de rama `git checkout nombre_rama`.

## Control de Cambios

1. Mostrar los commit completos realizados `git log`.
1. Mostrar los commit solo la descripcion `git log --oneline`.
1. Mostrar los commit solo la descripcion con apuntador a HEAD y branch `git log --oneline --decorate`.
1. Mostrar los commit de todas las ramas  `git log --all`.
1. Fucionar una rama con otra. Cambiarse a la rama destino con `git checkout rama_destino` posteriormente usar `git merge nombre_rama_a_fucionar`.
1. Fucionar la rama master
Windows
```
  git merge --no-ff --no-commit develope
  git reset HEAD .\src\app\app-routing.module.ts
  git checkout -- .\src\app\app-routing.module.ts
  git reset HEAD .\src\app\components\sidenav\
  git checkout -- .\src\app\components\sidenav\
  git commit -m "merged <fecha-del-merge>"
```
Linux
```
  git merge --no-ff --no-commit develope
  git reset HEAD /src/app/app-routing.module.ts
  git checkout -- /src/app/app-routing.module.ts
  git reset HEAD /src/app/components/sidenav/
  git checkout -- /src/app/components/sidenav/
  git commit -m "merged <fecha-del-merge>"
```

# Actualizar dependencias y versión local de CLI-Angular

Ejecuta los comando en el orden para actualizar la versión global de angular:
```
npm uninstall -g angular-cli
npm cache clean or npm cache verify #(if npm > 5)
npm install -g @angular/cli@latest
```
Posteriormente entrar a la carpeta del proyecto y ejecutar 
```
ng update
```
Indicara los comando de ng para actualizar las dependencias correspondientes.

# Ayuda extra API

## Capacitacion 

1. Tutorial Angular Básico [Angular Básico](https://www.youtube.com/watch?v=zp-fvJdZXNk&list=PL_9MDdjVuFjE6Ob7pd1SKwQGULUikXn6J)
1. Tutoriales Angular con Firebase [Curso Angular 7, Bootstrap 4 & Firebase Firestore](https://www.youtube.com/watch?v=UiA8QQ5modE&list=PL_9MDdjVuFjHgSCW7_15yoCAFUE5NAEjm)
1. Github [Tutorial de github](https://www.youtube.com/watch?v=jSJ8xhKtfP4&list=PLTd5ehIj0goMCnj6V5NdzSIHBgrIXckGU)

## Links referencias extra

1. Para más ayuda para Angular CLI usa `ng help` o revisa la página [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
1. Angular Material Components [Angular Material](https://material.angular.io/).
1. Ejemplo de como crear modulos [Understanding Angular modules](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407).
1. Como usar Lazy Loading en angular 8 [Manually Lazy load Components in Angular 8](https://dev.to/binarysort/manually-lazy-load-components-in-angular-8-ffi)
1. Definir estructura escalable para un proyecto en Angular [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
1. Ejemplo de formularios en Angular [Angular - FormControl y FormGroup](https://codingpotions.com/angular-formularios)
1. Validar formilarios [Validators](https://www.positronx.io/angular-7-reactive-forms-validation-tutorial/)
1. Validación dinámica [Three Ways to Dynamically Alter your Form Validation in Angular](https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946)
1. Obtener valores dentro de FormGroup  [Angular Form Fundamentals: Reactive Forms](https://ultimatecourses.com/blog/angular-2-forms-reactive)
1. Ciclos de vida en Angular [Ciclos de vida en Angular: La guía definitiva](http://blog.enriqueoriol.com/2018/10/ciclos-de-vida-en-angular-la-guia-definitiva.html)

## Firebase Avanzado
1. Realiza consultas simples y compuestas en Cloud Firestore [Realiza consultas simples y compuestas en Cloud Firestore](https://firebase.google.com/docs/firestore/query-data/queries?hl=es)
1. Querying Collections in AngularFirestore [Querying Collections in AngularFirestore](https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md)

# angular-bootstrap-template
