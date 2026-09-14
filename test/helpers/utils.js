/**
 * Utilidades varias para los tests.
 */

/**
 * Genera un email aleatorio para que el signup pueda ejecutarse varias veces
 * sin chocar con un usuario ya existente.
 */
export function randomEmail() {
    const stamp = Date.now();
    const rand = Math.floor(Math.random() * 10000);
    return `test.user.${stamp}${rand}@example.com`;
}

/**
 * Password de prueba valida para el formulario (minimo 8 caracteres).
 */
export const TEST_PASSWORD = 'Password123!';
