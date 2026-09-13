import TabBar from '../pageobjects/TabBar.page.js';
import SwipePage from '../pageobjects/Swipe.page.js';

/**
 * Escenario 4: Swipe de tarjetas.
 * Precondicion: el usuario esta en la seccion Swipe.
 */
describe('4. Swipe en el carrusel', () => {
    beforeEach(async () => {
        await TabBar.openSwipe();
        await SwipePage.waitForIsShown();
    });

    it('al hacer swipe la tarjeta anterior deja de verse', async () => {
        // La primera tarjeta del carrusel se ve al inicio.
        const firstCard = SwipePage.card('Fully Open Source');
        await expect(firstCard).toBeDisplayed();

        // Swipe a la izquierda -> avanza a la siguiente tarjeta.
        await SwipePage.swipeLeft();

        // La tarjeta anterior ya no debe estar visible.
        await expect(firstCard).not.toBeDisplayed();
    });

    it('llega a la ultima tarjeta y solo esa queda visible', async () => {
        // Avanzamos por todo el carrusel hasta la ultima tarjeta (el logo WDIO).
        for (let i = 0; i < 4; i++) {
            await SwipePage.swipeLeft();
        }

        await expect(SwipePage.wdioLogo).toBeDisplayed();

        // Las tarjetas anteriores ya no deben verse.
        await expect(SwipePage.card('Fully Open Source')).not.toBeDisplayed();
    });

    it('hace swipe vertical hasta encontrar "You found me!!!"', async () => {
        const found = await SwipePage.swipeUntilFoundMe();

        expect(found).toBe(true);
        await expect(SwipePage.foundMeText).toBeDisplayed();
        await expect(SwipePage.foundMeText).toHaveText('You found me!!!');
    });
});
