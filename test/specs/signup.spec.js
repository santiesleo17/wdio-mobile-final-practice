import TabBar from '../pageobjects/TabBar.page.js';
import LoginPage from '../pageobjects/Login.page.js';
import { randomEmail, TEST_PASSWORD } from '../helpers/utils.js';

/**
 * Escenario 2: Sign Up exitoso.
 * Precondicion: el usuario esta en la seccion Login.
 * Se usa un email aleatorio para que el test pueda correr multiples veces.
 */
describe('2. Registro (Sign Up) exitoso', () => {
    beforeEach(async () => {
        // Precondicion independiente: ir a la seccion Login.
        await TabBar.openLogin();
        await LoginPage.signUpTab.waitForDisplayed({ timeout: 15000 });
    });

    it('registra un nuevo usuario y muestra la alerta de exito', async () => {
        const email = randomEmail();

        await LoginPage.signUp(email, TEST_PASSWORD);

        const message = await LoginPage.getAlertMessageAndClose();
        expect(message).toContain('You successfully signed up!');
    });
});
