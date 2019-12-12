# Angular Material with Bootstrap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

Update to version 8.3.19.

## Preinstalación

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

## Instalación

1. Instalar @angular-devkit/build-angular como dev dependency.
```
npm install --save-dev @angular-devkit/build-angular
```

## Errores de instalación

1. An unhandled exception occurred: Could not find module "@angular-devkit/build-angular" from ".../TT/SGAE-Angular".
See "/tmp/ng-tK5npU/angular-errors.log" for further details.

2. found 3 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details

## Correr el proyecto

En terminal usar `ng serve` para deplegar el server. Navegar a `http://localhost:4200/`.

En terminal usar `ng serve --host your-ip` para desplegar el server. Navegar a `http://your-ip:4200/`.

Ejemplo: Remplaza los valores de x por tu dirección de ip, en otro caso evita el parametro --host
```
ng serve --host 192.182.x.x
```

## Commit en proyecto

1. Usar notacion `add():`, `update():`, `fix():` o `delete():` para indicar el tipo de commit.
2. Dentro del paréntesis indicar el modulo que se está actualizando.
3. Posterior a los dos puntos escribir una descripción de lo que se realizó

## Code scaffolding

Ejecuta `ng g c components/component-folder/component-name --module=name-module` para generar un nuevo componente en un modulo especifico. El flag **--module=name-module** indica el module; puedes remplazarlo por la versión corta con **-m=name-module**.

Example: Se generara un componente en la ubicación de `components/template/view/` llamado **messages** dentro del module llamado **template**
```
ng g c components/template/view/messages -m=template
```

Ejecuta `ng g m components/module-folder/module-name --module app --flat --routing` para generar un nuevo module con su propio routing-module. Las banderas **--module app** importa el module en app.module y **--routing** crea su proprio routing module.

Example: Se genera un modulo ubicado en `components/template/` con nombre de **templateModule** dentro del module **app** y con su propio routing module.
```
ng g m components/template/templateModule --module app --flat --routing
```

También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Aliases para importaciones

Esta plantilla usa alias. Puedes editar nuevas alias en el archivo `tsconfig.json`,  en la sección de `compilerOptions.paths`.

1. `@components/*` hace referencia al fichero `src/app/components/*`. 
1. `@models/*` hace referencia al fichero `src/app/models/*`.
1. `@modules/*` hace referencia al fichero `src/app/modules/*`.
1. `@services/*` hace referencia al fichero `src/app/services/*`.
1. `@pipes/*` hace referencia al fichero `src/app/pipes/*`
1. `@shared/*` hace referencia al fichero `src/app/shared/*`
1. `@breadcrumb/*` hace referencia al fichero `src/app/shared/breadcrumb/*`
1. `@template/*` hace referencia al fichero `src/app/modules/template/*`

## Template modules

Angular Material modules

Component `@template/` refers to src/app/components/*.  

## Build

Run `ng build aot` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Ayuda extra API

1. Para más ayuda para Angular CLI usa `ng help` o revisa la página [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
1. Angular Material Components [Angular Material](https://material.angular.io/).
1. Ejemplo de como crear modulos [Understanding Angular modules](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407).
1. Como usar Lazy Loading en angular 8 [Manually Lazy load Components in Angular 8](https://dev.to/binarysort/manually-lazy-load-components-in-angular-8-ffi)
1. Definir estructura escalable para un proyecto en Angular [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)

# angular-bootstrap-template
