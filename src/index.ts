import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { router as identifyRouter } from './api/identify'

const app = new Hono()
app.route('/identify', identifyRouter)

serve(app)