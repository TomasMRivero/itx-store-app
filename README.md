# ITX-STORE React App

SAP desarrollada con React y Vite.
Se utilizan las siguientes bibliotecas:
    - [Material UI](https://mui.com/): Componentes para la UI.
    - [React Router](https://reactrouter.com/): Ruteado dentro de la Aplicación.
    - [Redux Toolkit](https://redux-toolkit.js.org/) para la gestión del estado.

Se requiere tener Node instalado para poder instalar la aplicación

## Instalación

### 1- Clonar el repositorio
```
git clone https://github.com/TomasMRivero/itx-store-app.git
```

### 2- Instalar dependencias

En la carpeta del proyecto (cd path/al/repositorio) ejecutar el comando
```
npm install
```

### 3- Iniciar el servidor local

Ejecutar en la raiz del proyecto:
```
npm run dev
```

La dirección por defecto es  http://localhost:5173/

Para salir, en el terminal donde se esté ejecutando la aplicación, presionar *q + enter*.

### 4- Compilar para producción

Ejecutar en la raiz del proyecto:
```
npm run build
```

Con esto se creará la carpeta /dist.
También se puede previsualizar la build cion el comando
```
npm run preview
```

### 5- Ejecutar pruebas

Ejecutar en la raiz del proyecto:
```
npm test
```

### 6- Ejecutar linter

Ejecutar en la raiz del proyecto:
```
npm run lint
```