import {
  AlgoAddress,
  CollectibleId,
  CollectibleListQuerystring,
  CollectiblesByAlgoAddressQuerystring,
  CollectibleShowcaseQuerystring,
  PublicCollectibleQuerystring,
  TransferCollectibleToEscrow,
} from '@algomart/schemas'
import { FastifyReply, FastifyRequest } from 'fastify'

import CollectiblesService from './collectibles.service'

export async function getCollectibles(
  request: FastifyRequest<{
    Querystring: CollectibleListQuerystring
  }>,
  reply: FastifyReply
) {
  const collectibles = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)

  if (!(request.query.ownerExternalId || request.query.ownerUsername)) {
    reply.badRequest('ownerUsername or ownerExternalId must be set')
    return
  }

  const collectiblesForAccount = await collectibles.getCollectibles(
    request.query
  )

  if (!collectiblesForAccount) {
    reply.notFound()
  } else {
    reply.send(collectiblesForAccount)
  }
}

export async function getCollectiblesByAlgoAddress(
  request: FastifyRequest<{
    Params: AlgoAddress
    Querystring: CollectiblesByAlgoAddressQuerystring
  }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)

  const result = await collectiblesService.getCollectiblesByAlgoAddress(
    request.params.algoAddress,
    request.query
  )

  reply.send(result)
}

export async function getShowcaseCollectibles(
  request: FastifyRequest<{ Querystring: CollectibleShowcaseQuerystring }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)

  const result = await collectiblesService.getShowcaseCollectibles(
    request.query
  )

  reply.send(result)
}

export async function addCollectibleShowcase(
  request: FastifyRequest<{
    Querystring: CollectibleShowcaseQuerystring
    Body: CollectibleId
  }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)

  await collectiblesService.addShowcaseCollectible(
    {
      ...request.body,
      ...request.query,
    },
    request.transaction
  )

  reply.status(204).send()
}

export async function removeCollectibleShowcase(
  request: FastifyRequest<{
    Querystring: CollectibleShowcaseQuerystring
    Body: CollectibleId
  }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)

  await collectiblesService.removeShowcaseCollectible(
    {
      ...request.body,
      ...request.query,
    },
    request.transaction
  )

  reply.status(204).send()
}

export async function getPublicCollectibles(
  request: FastifyRequest<{ Querystring: PublicCollectibleQuerystring }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)

  const result = await collectiblesService.getPublicCollectibles(request.query)

  reply.send(result)
}

export async function transferCollectibleToEscrow(
  request: FastifyRequest<{ Body: TransferCollectibleToEscrow }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)
  await collectiblesService.transferCollectibleToEscrow(
    request.body,
    request.transaction
  )
  reply.status(204).send()
}

export async function transferCollectibleToEscrowStatus(
  request: FastifyRequest<{ Params: PackId }>,
  reply: FastifyReply
) {
  const collectiblesService = request
    .getContainer()
    .get<CollectiblesService>(CollectiblesService.name)
  const result = await collectiblesService.transferCollectibleToEscrowStatus(
    request.params.packId
  )
  reply.send(result)
}
