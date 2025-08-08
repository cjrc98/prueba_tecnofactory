# PruebaTecnofactory

# 📄 Documentación Técnica – Marvel Comics App

---


**Título:** Documentación Técnica – Marvel Comics App  
**Autor:** Camilo Redondo  
**Fecha:** 08/08/2025  
**Correo:** camilored30@gmail.com  

![Marvel Logo](https://res.cloudinary.com/superlikers/image/upload/v1754632260/Marvel_Logo_kitdot.svg)

---

## Índice

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.15.


## 1. Instalar dependencias
npm install

## 2. Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en funcionamiento, abra su navegador y navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar cualquier archivo fuente.

## 3. Herramientas y tecnologías

- Angular 19+ con Standalone Components
- TailwindCSS
- Firebase / Firestore
- RxJS Signals
- Angular Router



## 4. Requerimientos
- Node.js v18+
- npm v9+
- Angular CLI v19+
- Navegador moderno
- Editor de código.

## 5. Diagrama de arquitectura

```plaintext
┌──────────┐       ┌───────────┐       ┌──────────┐
│  Domain  │       │   Core    │       │ Features │
│ (Modelos)│◄─────►│Servicios  │◄─────►│Component │
└──────────┘       └───────────┘       └──────────┘
                       ▲
                       │
                 ┌─────┴─────┐
                 │  Shared   │
                 │Componentes│
                 └───────────┘