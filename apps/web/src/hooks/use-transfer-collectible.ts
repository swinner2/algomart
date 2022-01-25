import {
  AlgorandTransactionStatus,
  TransferPackStatusList,
} from '@algomart/schemas'
import { useCallback, useEffect, useState } from 'react'

import { useInterval } from './use-interval'

import { useAuth } from '@/contexts/auth-context'
import collectibleService from '@/services/collectible-service'

export enum TransferPackStatus {
  Idle = 'idle',
  Transferring = 'transferring',
  Success = 'success',
  Error = 'error',
}

function hasError({ status }: TransferPackStatusList): boolean {
  return status.some(
    ({ status }) => status === AlgorandTransactionStatus.Failed
  )
}

function isConfirmed({ status }: TransferPackStatusList): boolean {
  return status.every(
    ({ status }) => status === AlgorandTransactionStatus.Confirmed
  )
}

export function useTransferCollectible(
  collectibleId: string | null | false
): [(passphrase: string) => Promise<void>, TransferPackStatus, () => void] {
  const [status, setStatus] = useState(TransferPackStatus.Idle)
  const auth = useAuth()

  const transfer = useCallback(
    async (passphrase: string) => {
      if (!collectibleId) return

      if (status !== TransferPackStatus.Idle) {
        return
      }

      setStatus(TransferPackStatus.Transferring)

      const result = await collectibleService.transferToEscrow(
        collectibleId,
        passphrase
      )

      if (!result) {
        setStatus(TransferPackStatus.Error)
        return
      }
    },
    [collectibleId, status]
  )

  const reset = useCallback(() => {
    setStatus(TransferPackStatus.Idle)
  }, [])

  const checkStatus = useCallback(async () => {
    if (!packId) return

    const result = await collectibleService.transferStatus(packId)
    if (hasError(result)) {
      // One or more failed
      setStatus(TransferPackStatus.Error)
    }

    if (isConfirmed(result)) {
      // All succeeded
      setStatus(TransferPackStatus.Success)
    }
  }, [packId])

  useInterval(
    checkStatus,
    status === TransferPackStatus.Transferring ? 1000 : null
  )

  useEffect(() => {
    if (!auth.user) return
    checkStatus()
  }, [auth.user, checkStatus])

  return [transfer, status, reset]
}
