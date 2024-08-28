//NPM Library which loads environment variables from a .env file into process.env

import * as dotenv from 'dotenv'

//Selecting the appropriate environment file to load test configuration parameters
export const getEnv = () => {
    if (process.env.ENV) {
        dotenv.config({
            override: true,
            //Environment file to be selected (Prod, UAT, SIT) is passed from command prompt
            path: `environments/.env.${process.env.npm_config_ENVIRONMENT}`
        })
    } else {
        console.error("NO ENV PASSED!")
    }

}