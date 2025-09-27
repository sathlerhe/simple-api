import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from 'supertest'
import app from '../src/app'

describe('Test routes.ts', () => {
  describe('Test /healthcheck', () => {
    it('should return success', async () => {
      const response = await request(app)
        .get('/health-check')

      assert.deepStrictEqual(response.status, 200)
    })
  })

  describe('Test /status', () => {
    it('should return 200', async () => {
      const response = await request(app)
        .post('/status')
        .send({
          status: 200
        })

      assert.deepStrictEqual(response.status, 200)
      assert.deepStrictEqual(response.body, {
        body: {
          status: 200,
        }
      })
    })

    it('should return 500', async () => {
      const response = await request(app)
        .post('/status')
        .send({
          status: 500
        })

      assert.deepStrictEqual(response.status, 500)
      assert.deepStrictEqual(response.body, {
        body: {
          status: 500,
        }
      })
    })

    it('should return 400', async () => {
      const response = await request(app)
        .post('/status')
        .send({
          status: 400
        })

      assert.deepStrictEqual(response.status, 400)
      assert.deepStrictEqual(response.body, {
        body: {
          status: 400,
        }
      })
    })

    it('should return error if status isnt valid', async () => {
      const response = await request(app)
        .post('/status')
        .send({
          status: 100
        })

      assert.deepStrictEqual(response.status, 400)
      assert.deepStrictEqual(response.body.error, 'Invalid parameter "status", must be: 200, 400 or 500.')
    })
  })
})
