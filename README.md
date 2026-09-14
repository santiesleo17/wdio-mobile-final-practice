# Automatizacion movil - Practica final (WebdriverIO + Appium)

Suite de pruebas automatizadas sobre la app demo de WebdriverIO en Android.

## Escenarios automatizados

1. **Navegacion en la barra inferior** - navega a cada seccion y verifica sus elementos.
2. **Sign Up exitoso** - registro con email aleatorio (repetible) + alerta de exito.
3. **Login exitoso** - crea su propio usuario y luego inicia sesion (test independiente).
4. **Swipe** - carrusel horizontal + swipe vertical hasta "You found me!!!".

Cada test es **independiente**: no depende del orden ni de que otro test haya corrido antes.

## Requisitos (instalar una sola vez)

- Node.js 18+
- Java JDK 17 (con `JAVA_HOME`)
- Android Studio (SDK + un emulador/AVD)
- Appium 2 y el driver de Android:

```bash
npm install -g appium
appium driver install uiautomator2
```

Verifica el entorno:

```bash
npx appium-doctor --android
```

## Puesta en marcha

1. Instala dependencias del proyecto:

```bash
npm install
```

2. Descarga el `.apk` desde https://github.com/webdriverio/native-demo-app/releases,
   ponlo en la carpeta `app/` y renombralo a `android-demo.apk`
   (o cambia la ruta en `wdio.conf.js`).

3. Arranca el emulador desde Android Studio (Device Manager) y confirma que aparece:

```bash
adb devices
```

4. Ajusta `appium:deviceName` en `wdio.conf.js` con el nombre real de tu AVD.

## Ejecutar

Todos los tests:

```bash
npm test
```

Un escenario individual:

```bash
npm run test:nav
npm run test:signup
npm run test:login
npm run test:swipe
```

## Estructura

```
wdio.conf.js              Configuracion de WebdriverIO + Appium
test/
  helpers/
    Gestures.js           Gestos de swipe (W3C Actions API)
    utils.js              Email aleatorio y datos de prueba
  pageobjects/
    TabBar.page.js        Barra de navegacion inferior
    Screens.page.js       Contenedores de cada seccion
    Login.page.js         Login + Sign Up (comparten pantalla)
    Swipe.page.js         Carrusel
  specs/
    navigation.spec.js
    signup.spec.js
    login.spec.js
    swipe.spec.js
```

## Nota sobre los selectores

Los selectores usan los `accessibility id` de la app demo (verificados contra
la version **v1.0.8**). Como pueden cambiar entre versiones del `.apk`, si algun
test no encuentra un elemento abre **Appium Inspector** y verifica el id real.

## Verificacion y consejos de entorno

La suite se valido con exito (4 specs / 11 tests) sobre un emulador Android 33.
Recomendaciones si la corres localmente:

- **JDK 17** (no 8): Appium 2 y las herramientas de Android lo requieren.
- **Imagen de sistema AOSP** (`system-images;android-33;default;x86_64`) en vez
  de `google_apis`: evita ANRs de las apps de Google que tapan la pantalla.
- Suprime los dialogos de error del sistema en el emulador (evitan que un ANR
  bloquee un test):

  ```bash
  adb shell settings put global hide_error_dialogs 1
  ```

- En maquinas lentas, arranca el emulador con GPU por hardware:
  `emulator -avd Pixel_6_API_33 -gpu auto -cores 4 -memory 4096`.

### Ejecutar contra un servidor Appium ya iniciado (opcional)

Por defecto el servicio de WDIO levanta Appium solo. Si prefieres iniciarlo
aparte (util para depurar), arranca `npx appium` y crea un `wdio.local.conf.js`
que extienda la config base con `services: []` y `hostname/port/path` hacia
`127.0.0.1:4723`.
