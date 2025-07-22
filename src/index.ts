import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { identifyRoute } from './api/identify'

const app = new Hono()
app.route('/identify', identifyRoute)

serve(app)
