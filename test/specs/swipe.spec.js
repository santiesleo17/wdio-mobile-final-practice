import TabBar from '../pageobjects/TabBar.page.js';
import SwipePage from '../pageobjects/Swipe.page.js';

/**
 * Escenario 4: Swipe de tarjetas.
 * Precondicion: el usuario esta en la seccion Swipe.
 */
const APP_ID = 'com.wdiodemoapp';

describe('4. Swipe en el carrusel', () => {
    beforeEach(async () => {
        // Reinicia la app para que cada test parta de un estado limpio
        // (carrusel en la primera slide) y sea independiente de los demas.
        await driver.execute('mobile: terminateApp', { appId: APP_ID });
        await driver.execute('mobile: activateApp', { appId: APP_ID });

        // Esperar a que la barra inferior vuelva a renderizarse tras reactivar.
        await TabBar.swipe.waitForDisplayed({ timeout: 20000 });
        await TabBar.openSwipe();
        await SwipePage.waitForIsShown();
    });

    it('al hacer swipe la tarjeta anterior deja de verse', async () => {
        // La primera tarjeta del carrusel se ve al inicio.
        await expect(SwipePage.firstCard).toBeDisplayed();

        // Swipe a la izquierda -> avanza a la siguiente tarjeta.
        await SwipePage.swipeLeft();

        // La tarjeta anterior ya no debe estar visible.
        await expect(SwipePage.firstCard).not.toBeDisplayed();
    });

    it('llega a la ultima tarjeta y solo esa queda visible', async () => {
        // El carrusel tiene 6 slides; avanzamos hasta la ultima (COMPATIBLE).
        for (let i = 0; i < 5; i++) {
            await SwipePage.swipeLeft();
        }

        await expect(SwipePage.lastCard).toBeDisplayed();

        // La primera tarjeta ya no debe verse (solo la ultima queda visible).
        await expect(SwipePage.firstCard).not.toBeDisplayed();
    });

    it('hace swipe vertical hasta encontrar "You found me!!!"', async () => {
        const found = await SwipePage.swipeUntilFoundMe();

        expect(found).toBe(true);
        await expect(SwipePage.foundMeText).toBeDisplayed();
        await expect(SwipePage.foundMeText).toHaveText('You found me!!!');
    });
});
