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
     * `duration` controla la velocidad del arrastre: un valor bajo produce un
     * "fling" (util para el carrusel horizontal), uno alto un arrastre lento y
     * controlado (necesario para desplazar el ScrollView vertical sin rebote).
     */
    static async swipe(from, to, duration = 600, settle = 500) {
        await driver
            .action('pointer')
            .move({ duration: 0, x: from.x, y: from.y })
            .down({ button: 0 })
            .pause(100)
            .move({ duration, x: to.x, y: to.y })
            .up({ button: 0 })
            .perform();

        // Pausa para que termine la animacion.
        await driver.pause(settle);
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
     * Recorrido amplio (85% -> 15%) para desplazar el ScrollView y revelar
     * el contenido escondido de la seccion Swipe ("You found me!!!").
     */
    static async swipeUp() {
        const { width, height } = await this.getScreenSize();
        const x = Math.round(width * 0.5);
        // El punto de inicio (88%) queda POR DEBAJO del carrusel horizontal para
        // que el gesto lo reciba el ScrollView y no lo intercepte el carrusel.
        // Arrastre lento (1000ms) para desplazar sin que rebote.
        await this.swipe(
            { x, y: Math.round(height * 0.88) },
            { x, y: Math.round(height * 0.12) },
            1000,
            800
        );
    }
}

export default Gestures;
