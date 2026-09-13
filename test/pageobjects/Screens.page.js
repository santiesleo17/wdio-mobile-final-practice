/**
 * Page Object con los contenedores principales de cada seccion.
 * Se usa en el test de navegacion para verificar que la pantalla correcta
 * quedo visible y con sus elementos.
 *
 * Los accessibility id de los contenedores en la app demo son:
 *   ~Home-screen, ~Webview-screen, ~Login-screen, ~Forms-screen,
 *   ~Swipe-screen, ~Drag-screen
 */
class Screens {
    get homeScreen() { return $('~Home-screen'); }
    get webViewScreen() { return $('~Webview-screen'); }
    get loginScreen() { return $('~Login-screen'); }
    get formsScreen() { return $('~Forms-screen'); }
    get swipeScreen() { return $('~Swipe-screen'); }
    get dragScreen() { return $('~Drag-screen'); }

    // Algunos elementos internos para reforzar las aserciones de la seccion Home.
    get homeTitle() {
        return $('//android.widget.TextView[@text="You are viewing the Home screen"]');
    }
}

export default new Screens();
