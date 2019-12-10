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

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

Run `ng serve --host your-ip` for a dev server. Navigate to `http://your-ip:4200/`.

## Code scaffolding

Run `ng generate component components/component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng g c components/component-folder/component-name --module=name-module` to generate a new component in specific module. The flag **--module=name-module** indicate module and can be replace to **-m=name-module**.

Example:
```
ng g c components/template/view/messages -m=template
```

Run `ng g m components/module-folder/module-name --module app --flat --routing` to generate a new module with own routing module. The flags **--module app** imports module in app.module and **--routing** creates a own routing module.

Example:
```
ng g m components/template/templateModule --module app --flat --routing
```

## Aliases for imports

This template use some aliases. You can edit aliases in `tsconfig.json`,  in section `compilerOptions.paths`.

`@components/*` refers to src/app/components/* . 

`@models/*` refers to src/app/models/* .

`@services/*` refers to src/app/services/* .

`@template/*` refers to src/app/components/template/* .

## Template modules

Angular Material modules

Component `@template/` refers to src/app/components/*.  

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
Angular Material Components [Angular Material](https://material.angular.io/).
Correct example about how to use modules [Understanding Angular modules](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407).

# angular-bootstrap-template
