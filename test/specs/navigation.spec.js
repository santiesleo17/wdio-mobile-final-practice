import TabBar from '../pageobjects/TabBar.page.js';
import Screens from '../pageobjects/Screens.page.js';

/**
 * Escenario 1: Navegacion en la barra de menu inferior.
 * Precondicion: el usuario esta en la pantalla Home (la app abre ahi).
 * Se navega a cada seccion y se verifica que sus elementos esten visibles.
 */
describe('1. Navegacion en la barra inferior', () => {
    beforeEach(async () => {
        // Precondicion: partir siempre desde Home para que el test sea independiente.
        await TabBar.openHome();
        await Screens.homeScreen.waitForDisplayed({ timeout: 15000 });
    });

    it('la pantalla Home se muestra correctamente', async () => {
        await expect(Screens.homeScreen).toBeDisplayed();
        await expect(Screens.homeTitle).toBeDisplayed();
        await expect(await TabBar.isDisplayed()).toBe(true);
    });

    it('navega a WebView y muestra su contenido', async () => {
        await TabBar.openWebView();
        await expect(Screens.webViewScreen).toBeDisplayed();
    });

    it('navega a Login y muestra el formulario', async () => {
        await TabBar.openLogin();
        await expect(Screens.loginScreen).toBeDisplayed();
    });

    it('navega a Forms y muestra sus campos', async () => {
        await TabBar.openForms();
        await expect(Screens.formsScreen).toBeDisplayed();
    });

    it('navega a Swipe y muestra el carrusel', async () => {
        await TabBar.openSwipe();
        await expect(Screens.swipeScreen).toBeDisplayed();
    });

    it('navega a Drag y muestra su pantalla', async () => {
        await TabBar.openDrag();
        await expect(Screens.dragScreen).toBeDisplayed();
    });
});
