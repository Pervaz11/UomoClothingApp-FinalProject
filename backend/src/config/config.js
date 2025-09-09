import dotenv from 'dotenv';
dotenv.config();

function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Environment variable "${key}" is missing`);
    }
    return value;
}
export const PORT = getEnvVar('PORT');
export const DB_URL = getEnvVar('DB_URL');
export const DB_PASSWORD = getEnvVar('DB_PASSWORD');
export const DB_USERNAME = getEnvVar('DB_USERNAME');
