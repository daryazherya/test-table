import {  defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

const { VITE_AUTH_TOKEN} = process.env;

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api':{
                target: 'https://localhost:3000', 
                changeOrigin: true,
                secure: false,
            }
        },
        headers: {
            Authorization: `${VITE_AUTH_TOKEN}`,
        },            
    }, 
    preview: {  
        port: 3000,
        proxy: {
            '/api':{
                target: 'https://localhost:3000', 
                changeOrigin: true,
                secure: false,
            }
        },
        headers: {
            Authorization: `${VITE_AUTH_TOKEN}`,
        },  
    } ,
    plugins: [react()],
    base: '/test-table'
})


