import { SemaphoreEthers } from "@semaphore-protocol/data"
import { BigNumber, utils } from "ethers"
import getNextConfig from "next/config"
import { useCallback, useState } from "react"
import { SemaphoreContextType } from "../context/SemaphoreContext"


const { publicRuntimeConfig: env } = getNextConfig()

const ethereumNetwork = env.DEFAULT_NETWORK === "localhost" ? "http://localhost:8545" : env.DEFAULT_NETWORK

export default function useSemaphore(): SemaphoreContextType {
    const [_users, setUsers] = useState<any[]>([])
    const [_feedback, setFeedback] = useState<string[]>([])

    const refreshUsers = useCallback(async (): Promise<void> => {
        const semaphore = new SemaphoreEthers(ethereumNetwork, {
            address: env.SEMAPHORE_CONTRACT_ADDRESS
        })
        console.log(semaphore)
        console.log('GROUP_ID:', env.GROUP_ID);
        const groupId = String(env.GROUP_ID || '42');

        const members = await semaphore.getGroupMembers(groupId)
        console.log(members)

        setUsers(members)
    }, [])

    const addUser = useCallback(
        (user: any) => {
            setUsers([..._users, user])
        },
        [_users]
    )

    const refreshFeedback = useCallback(async (): Promise<void> => {
        const semaphore = new SemaphoreEthers(ethereumNetwork, {
            address: env.SEMAPHORE_CONTRACT_ADDRESS
        })
        
        const groupId = String(env.GROUP_ID || '42');


        const proofs = await semaphore.getGroupVerifiedProofs(groupId)

        setFeedback(proofs.map(({ signal }: any) => utils.parseBytes32String(BigNumber.from(signal).toHexString())))
    }, [])

    const addFeedback = useCallback(
        (feedback: string) => {
            setFeedback([..._feedback, feedback])
        },
        [_feedback]
    )

    return {
        _users,
        _feedback,
        refreshUsers,
        addUser,
        refreshFeedback,
        addFeedback
    }
}