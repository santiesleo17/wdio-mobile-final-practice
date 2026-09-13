/**
 * Page Object de la seccion Login / Sign Up.
 * Login y Signup comparten pantalla (dos pestanas), por eso viven en el mismo
 * page object y el test de login puede reutilizar el metodo de signup.
 */
class LoginPage {
    // Pestanas superiores para alternar entre Login y Sign up.
    get loginTab() { return $('~button-login-container'); }
    get signUpTab() { return $('~button-sign-up-container'); }

    // Campos del formulario.
    get email() { return $('~input-email'); }
    get password() { return $('~input-password'); }
    get repeatPassword() { return $('~input-repeat-password'); }

    // Botones de envio (accessibility id en mayuscula tal como los expone la app).
    get loginButton() { return $('~button-LOGIN'); }
    get signUpButton() { return $('~button-SIGN UP'); }

    /**
     * Alerta nativa que aparece tras login/signup exitoso.
     * En Android es un dialogo con texto y un boton OK.
     */
    get alertTitle() { return $('android=new UiSelector().resourceId("android:id/alertTitle")'); }
    get alertMessage() { return $('android=new UiSelector().resourceId("android:id/message")'); }
    get alertOkButton() { return $('android=new UiSelector().resourceId("android:id/button1")'); }

    async openLoginTab() {
        await this.loginTab.click();
    }

    async openSignUpTab() {
        await this.signUpTab.click();
    }

    /**
     * Rellena y envia el formulario de registro.
     * Devuelve las credenciales usadas para poder reutilizarlas (ej: en login).
     */
    async signUp(emailValue, passwordValue) {
        await this.openSignUpTab();
        await this.email.setValue(emailValue);
        await this.password.setValue(passwordValue);
        await this.repeatPassword.setValue(passwordValue);
        // Cerramos el teclado para que el boton sea clickeable.
        await driver.hideKeyboard().catch(() => {});
        await this.signUpButton.click();
        return { email: emailValue, password: passwordValue };
    }

    /**
     * Rellena y envia el formulario de login.
     */
    async login(emailValue, passwordValue) {
        await this.openLoginTab();
        await this.email.setValue(emailValue);
        await this.password.setValue(passwordValue);
        await driver.hideKeyboard().catch(() => {});
        await this.loginButton.click();
    }

    /**
     * Espera la alerta de exito, devuelve su mensaje y la cierra.
     */
    async getAlertMessageAndClose() {
        await this.alertMessage.waitForDisplayed({ timeout: 15000 });
        const message = await this.alertMessage.getText();
        await this.alertOkButton.click();
        return message;
    }
}

export default new LoginPage();
