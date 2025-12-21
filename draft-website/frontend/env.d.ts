/// <reference types="vite/client" />

// import env variables by using things like
// const url = import.meta.env.VITE_API_URL

interface ImportMetaEnv {
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}