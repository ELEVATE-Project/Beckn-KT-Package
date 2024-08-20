'use strict'
const router = require('express').Router()
const catalogController = require('@controllers/')
/* const { authVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier) */
router.post('/search', catalogController.search)
router.get('/get-fulfillment/:fulfillmentId', catalogController.getFulfillment)
router.get('/get-session/:sessionId', catalogController.getSession)
router.get('/get-status-body/:sessionId/:fulfillmentId', catalogController.getStatusBody)
module.exports = router
