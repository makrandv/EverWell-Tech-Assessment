export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "prod" | "uat" | "sit",
            BASEURL: string,
            HEAD: "true" | "false"
        }
    }
}