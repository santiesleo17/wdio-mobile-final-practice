/**
 * Page Object con los contenedores principales de cada seccion.
 * Se usa en el test de navegacion para verificar que la pantalla correcta
 * quedo visible y con sus elementos.
 *
 * Los accessibility id de los contenedores en la app demo son:
 *   ~Home-screen, ~Login-screen, ~Forms-screen, ~Swipe-screen,
 *   ~Drag-drop-screen. La seccion Webview NO tiene contenedor con
 *   accessibility id: carga una WebView nativa (android.webkit.WebView).
 */
class Screens {
    get homeScreen() { return $('~Home-screen'); }
    // Webview no expone contenedor con accessibility id; validamos la WebView.
    get webViewScreen() { return $('//android.webkit.WebView'); }
    get loginScreen() { return $('~Login-screen'); }
    get formsScreen() { return $('~Forms-screen'); }
    get swipeScreen() { return $('~Swipe-screen'); }
    get dragScreen() { return $('~Drag-drop-screen'); }

    // Elemento interno para reforzar la asercion de la seccion Home.
    get homeTitle() {
        return $('//android.widget.TextView[@text="Demo app for the appium-boilerplate"]');
    }
}

export default new Screens();
