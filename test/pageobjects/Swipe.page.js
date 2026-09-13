import Gestures from '../helpers/Gestures.js';

/**
 * Page Object de la seccion Swipe (carrusel horizontal + logo escondido abajo).
 */
class SwipePage {
    get screen() { return $('~Swipe-screen'); }

    // Cada tarjeta del carrusel se identifica por su texto/titulo.
    // Estos son los titulos que muestra la app demo en cada slide.
    card(name) {
        return $(`//android.widget.TextView[@text="${name}"]`);
    }

    // Texto escondido que aparece al hacer swipe vertical hasta el final.
    get foundMeText() {
        return $('//android.widget.TextView[@text="You found me!!!"]');
    }

    // Logo de WebdriverIO (ultima tarjeta del carrusel).
    get wdioLogo() { return $('~WebdriverIO logo'); }

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
