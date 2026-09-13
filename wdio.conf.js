import { join } from 'node:path';

export const config = {
    runner: 'local',

    // ====================
    // Specs a ejecutar
    // ====================
    specs: ['./test/specs/**/*.js'],
    exclude: [],

    // ====================
    // Capacidades del dispositivo
    // ====================
    // Un solo dispositivo/emulador a la vez.
    maxInstances: 1,
    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',

            // Nombre del emulador (AVD) tal como aparece en Android Studio > Device Manager.
            // Si usas un dispositivo fisico puedes borrar esta linea y conectar por USB.
            'appium:deviceName': 'Pixel_6_API_33',

            // Ruta ABSOLUTA al .apk descargado desde:
            // https://github.com/webdriverio/native-demo-app/releases
            'appium:app': join(process.cwd(), './app/android-demo.apk'),

            'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
            'appium:newCommandTimeout': 240,
            'appium:autoGrantPermissions': true,

            // Timeouts amplios: en emuladores lentos (GPU por software) la
            // instalacion del server de uiautomator2 y los comandos adb pueden
            // tardar mas que el default de 20s.
            'appium:uiautomator2ServerInstallTimeout': 120000,
            'appium:uiautomator2ServerLaunchTimeout': 120000,
            'appium:adbExecTimeout': 120000,
            'appium:androidInstallTimeout': 180000,
            'appium:appWaitDuration': 40000,
            'appium:avdLaunchTimeout': 300000,
            'appium:avdReadyTimeout': 300000,
        },
    ],

    // ====================
    // Configuracion general
    // ====================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 300000,
    connectionRetryCount: 3,

    // Levanta el servidor de Appium automaticamente al correr los tests.
    // Requiere que Appium este instalado (npm i -g appium && appium driver install uiautomator2).
    services: ['appium'],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 90000,
    },
};
