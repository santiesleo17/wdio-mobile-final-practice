import TabBar from '../pageobjects/TabBar.page.js';
import LoginPage from '../pageobjects/Login.page.js';
import { randomEmail, TEST_PASSWORD } from '../helpers/utils.js';

/**
 * Escenario 3: Login exitoso.
 * Precondicion: el usuario esta en Login y YA existe un usuario creado.
 *
 * Para que el test sea totalmente independiente, primero registramos un usuario
 * (reutilizando el metodo signUp del page object) y luego iniciamos sesion con el.
 * Asi el login NO depende de que el test de signup haya corrido antes.
 */
describe('3. Inicio de sesion (Login) exitoso', () => {
    let credentials;

    beforeEach(async () => {
        await TabBar.openLogin();
        await LoginPage.signUpTab.waitForDisplayed({ timeout: 15000 });

        // Precondicion: crear el usuario que luego usaremos para el login.
        credentials = { email: randomEmail(), password: TEST_PASSWORD };
        await LoginPage.signUp(credentials.email, credentials.password);
        await LoginPage.getAlertMessageAndClose();
    });

    it('inicia sesion con un usuario existente y muestra la alerta de exito', async () => {
        await LoginPage.login(credentials.email, credentials.password);

        const message = await LoginPage.getAlertMessageAndClose();
        expect(message).toContain('You are logged in!');
    });
});
