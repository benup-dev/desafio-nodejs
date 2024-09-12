import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import credentialsRoutes from './credentials'

const app = new Hono()

app.route('/', credentialsRoutes)

export default app;


