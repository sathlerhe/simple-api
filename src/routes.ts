import { Router } from 'express'

export const router = Router()

router.get('/health-check', (_, res) => {
  res.status(200).send('OK')
})

router.post('/status', (req, res) => {
  const { status } = req.body
  const validStatus = [200, 400, 500]

  if (!validStatus.includes(status))
    return res.status(400).json({ error:'Invalid parameter "status", must be: 200, 400 or 500.' })

  return res.status(status).json({
    body: req.body
  })
})
