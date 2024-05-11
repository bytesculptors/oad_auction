import { DotenvParseOutput, config } from 'dotenv';
import path from 'path';

export interface ENV_VAL extends DotenvParseOutput {
    FRONTEND: string;
    PORT: string;
    MG_HOST: string;
    MG_DB: string;
    ACCESS_SECRET_TOKEN: string;
    REFRESH_SECRET_TOKEN: string;
    VNP_PAY_URL: string;
    VNP_TMN_CODE: string;
    VNP_HASH_SECRET: string;
    VNP_RETURN_URL: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_SECRET: string;
}

const data = config({
    path: path.resolve(process.cwd(), '.env'),
}).parsed;

const envConfig = {
    ...data,
} as ENV_VAL;
export default envConfig;
