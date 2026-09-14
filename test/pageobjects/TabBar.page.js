/**
 * Page Object de la barra de navegacion inferior.
 * Los botones de la barra usan accessibility id (~Home, ~Login, etc).
 */
class TabBar {
    get home() { return $('~Home'); }
    get webView() { return $('~Webview'); }
    get login() { return $('~Login'); }
    get forms() { return $('~Forms'); }
    get swipe() { return $('~Swipe'); }
    get drag() { return $('~Drag'); }

    async openHome() { await this.home.click(); }
    async openWebView() { await this.webView.click(); }
    async openLogin() { await this.login.click(); }
    async openForms() { await this.forms.click(); }
    async openSwipe() { await this.swipe.click(); }
    async openDrag() { await this.drag.click(); }

    /**
     * Verifica que la barra inferior este visible (todos sus iconos).
     */
    async isDisplayed() {
        return (
            (await this.home.isDisplayed()) &&
            (await this.login.isDisplayed()) &&
            (await this.forms.isDisplayed()) &&
            (await this.swipe.isDisplayed()) &&
            (await this.drag.isDisplayed())
        );
    }
}

export default new TabBar();
