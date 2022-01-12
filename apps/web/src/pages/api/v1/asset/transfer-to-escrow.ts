import { BadRequest } from 'http-errors'
import { NextApiResponse } from 'next'

import { ApiClient } from '@/clients/api-client'
import createHandler, { NextApiRequestApp } from '@/middleware'
import authMiddleware from '@/middleware/auth-middleware'
import userMiddleware from '@/middleware/user-middleware'
import validateBodyMiddleware, {
  ExtractBodyType,
} from '@/middleware/validate-body-middleware'
import { validateTransferAssetToEscrow } from '@/utils/asset-validation'

const handler = createHandler()

handler.use(authMiddleware()).use(userMiddleware())

type BodyType = ExtractBodyType<typeof validateTransferAssetToEscrow>

handler.post(
  validateBodyMiddleware(validateTransferAssetToEscrow),
  async (request: NextApiRequestApp<BodyType>, response: NextApiResponse) => {
    const body = request.validResult.value as BodyType
    const collectibleId = body.collectibleId
    const passphrase = body.passphrase

    await ApiClient.instance.transferCollectibleToEscrow({
      collectibleId,
      passphrase,
      externalId: request.user.externalId,
    })
    response.status(204).end()
  }
)

handler.get(async (request: NextApiRequestApp, response: NextApiResponse) => {
  const collectibleId = request.query.collectibleId
  if (!collectibleId || typeof collectibleId !== 'string')
    throw new BadRequest('Missing collectibleId')
  response.json(
    await ApiClient.instance.transferCollectibleToEscrowStatus(collectibleId)
  )
})

export default handler
