import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: '../server/public',
        emptyOutDir: true
    },
    server: {
        proxy: {
            '/destinations': {
                target: 'http://localhost:3001'
            }
        }
    }
})

/*
When trying to access the /destinations endpoint from the client, the server accesses this route at http://localhost:3001
*/