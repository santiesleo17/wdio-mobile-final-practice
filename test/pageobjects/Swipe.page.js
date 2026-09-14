import Gestures from '../helpers/Gestures.js';

/**
 * Page Object de la seccion Swipe (carrusel horizontal + logo escondido abajo).
 */
class SwipePage {
    // Titulos reales de la primera y ultima tarjeta del carrusel (van en mayuscula).
    static FIRST_CARD = 'FULLY OPEN SOURCE';
    static LAST_CARD = 'COMPATIBLE';

    get screen() { return $('~Swipe-screen'); }

    // Cada tarjeta del carrusel se identifica por el texto/titulo de su slide.
    card(name) {
        return $(`//android.widget.TextView[@text="${name}"]`);
    }

    get firstCard() { return this.card(SwipePage.FIRST_CARD); }
    get lastCard() { return this.card(SwipePage.LAST_CARD); }

    // Texto escondido que aparece al hacer swipe vertical sobre la tarjeta.
    get foundMeText() {
        return $('//android.widget.TextView[@text="You found me!!!"]');
    }

    async waitForIsShown() {
        await this.screen.waitForDisplayed({ timeout: 15000 });
    }

    async swipeLeft() { await Gestures.swipeLeft(); }
    async swipeRight() { await Gestures.swipeRight(); }

    /**
     * Hace swipe vertical hacia arriba hasta encontrar el texto "You found me!!!".
     * Reintenta un numero maximo de veces para no quedarse en bucle infinito.
     */
    async swipeUntilFoundMe(maxSwipes = 8) {
        let attempts = 0;
        while (!(await this.foundMeText.isDisplayed()) && attempts < maxSwipes) {
            await Gestures.swipeUp();
            attempts += 1;
        }
        return this.foundMeText.isDisplayed();
    }
}

export default new SwipePage();
