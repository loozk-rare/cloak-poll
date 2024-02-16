import { SemaphoreEthers } from "@semaphore-protocol/data"
import { BigNumber, utils } from "ethers"
import getNextConfig from "next/config"
import { useCallback, useState } from "react"
import { SemaphoreContextType } from "../context/SemaphoreContext"


const { publicRuntimeConfig: env } = getNextConfig()

const ethereumNetwork = "http://localhost:8545"

export default function useSemaphore(): SemaphoreContextType {
    const [_users, setUsers] = useState<any[]>([])
    const [_feedback, setFeedback] = useState<string[]>([])

    // const refreshUsers = useCallback(async (): Promise<void> => {
    //     const semaphore = new SemaphoreEthers(ethereumNetwork, {
    //         address: env.SEMAPHORE_CONTRACT_ADDRESS
    //     })
    //     console.log("l,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,l",semaphore)
    //     console.log('GROUP_ID:', env.GROUP_ID);
    //     const groupId = String(env.GROUP_ID || '42');

    //     const members = await semaphore.getGroupMembers(groupId)
    //     console.log(members)

    //     setUsers(members)
    // }, [])

    const refreshUsers = useCallback(async (): Promise<void> => {
        try {
            console.log("Ethereum Network:", ethereumNetwork);
            console.log("Contract Address:", env.SEMAPHORE_CONTRACT_ADDRESS);

            const semaphore = new SemaphoreEthers(ethereumNetwork, {
                address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
            });

            console.log("Semaphore Instance:", semaphore);
            const groupId = String(env.GROUP_ID || '42');
            console.log('Group ID:', groupId);

            const members = await semaphore.getGroupMembers(groupId);
            console.log("Members...............:", members);

            setUsers(members);
        } catch (error) {
            console.error("Error fetching group members:", error);
        }
    }, []);

    const addUser = useCallback((user: any) => {
        console.log("Adding user:", user);
        console.log("Current _users before adding:", _users);
        setUsers([..._users, user]);
        console.log("After adding user (note: this won't reflect the update immediately):", _users);
    }, [_users]);

    const refreshFeedback = useCallback(async (): Promise<void> => {
        const semaphore = new SemaphoreEthers(ethereumNetwork, {
            address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
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
