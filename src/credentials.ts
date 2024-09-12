import mongo from './mongo'
import z from 'zod';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const credentialsPostSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

const credentialsPostResponseSchema = z.object({
  status: z.string()
})

const createCredentials = createRoute({
  method: 'post',
  path: '/credentials',
  request: {
    body: {
      content: {
        "application/json": {
          schema: credentialsPostSchema
        },
      }
    }
  },

  responses: {
    201: {
      content: {
        'application/json': {
          schema: credentialsPostResponseSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

app.openapi(createCredentials, async (c) => {
  await mongo.connect();
  const doc = c.req.valid('json')

  await mongo.db().collection("credentials").insertOne(doc)

  return c.json({ status: 'success' }, 201)
})


export default app;
