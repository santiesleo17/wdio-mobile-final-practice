/**
 * Helpers de gestos (swipe) usando la W3C Actions API.
 * En WebdriverIO v9 los gestos se hacen con driver.action('pointer').
 * Calculamos las coordenadas segun el tamano de la pantalla para que
 * funcione en cualquier resolucion de emulador.
 */
class Gestures {
    /**
     * Devuelve el ancho y alto de la pantalla.
     */
    static async getScreenSize() {
        return driver.getWindowSize();
    }

    /**
     * Swipe generico entre dos puntos (en pixeles).
     */
    static async swipe(from, to) {
        await driver
            .action('pointer')
            .move({ duration: 0, x: from.x, y: from.y })
            .down({ button: 0 })
            .pause(100)
            .move({ duration: 600, x: to.x, y: to.y })
            .up({ button: 0 })
            .perform();

        // Pequena pausa para que termine la animacion del carrusel.
        await driver.pause(500);
    }

    /**
     * Swipe horizontal de derecha a izquierda (avanza a la siguiente tarjeta).
     */
    static async swipeLeft() {
        const { width, height } = await this.getScreenSize();
        const y = Math.round(height * 0.5);
        await this.swipe(
            { x: Math.round(width * 0.85), y },
            { x: Math.round(width * 0.15), y }
        );
    }

    /**
     * Swipe horizontal de izquierda a derecha (retrocede a la tarjeta anterior).
     */
    static async swipeRight() {
        const { width, height } = await this.getScreenSize();
        const y = Math.round(height * 0.5);
        await this.swipe(
            { x: Math.round(width * 0.15), y },
            { x: Math.round(width * 0.85), y }
        );
    }

    /**
     * Swipe vertical de abajo hacia arriba (baja en la pantalla).
     */
    static async swipeUp() {
        const { width, height } = await this.getScreenSize();
        const x = Math.round(width * 0.5);
        await this.swipe(
            { x, y: Math.round(height * 0.7) },
            { x, y: Math.round(height * 0.3) }
        );
    }
}

export default Gestures;
