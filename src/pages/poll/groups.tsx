import { Box, Button, Divider, Heading, HStack, Link, Text, useBoolean, VStack } from "@chakra-ui/react"
import { Identity } from "@semaphore-protocol/identity"
import getNextConfig from "next/config"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"
import Feedback from "../../contract-artifacts/contracts/Feedback.sol/Feedback.json"
import Stepper from "../../components/Stepper"
import LogsContext from "../../context/LogsContext"
import SemaphoreContext from "../../context/SemaphoreContext"
import IconAddCircleFill from "../../icons/IconAddCircleFill"
import IconRefreshLine from "../../icons/IconRefreshLine"
import useSemaphore from "../../hooks/useSemaphore"



const { publicRuntimeConfig: env } = getNextConfig()

export default function GroupsPage() {
    const router = useRouter()
    const { pollId } = router.query; // Access the pollId query parameter

    const { setLogs } = useContext(LogsContext)
    const [_logs, sLogs] = useState<string>("")

    const { _users, refreshUsers, addUser } = useContext(SemaphoreContext)
    console.log("refreshed users.............................",_users.length)
    const [_loading, setLoading] = useBoolean()
    const [_identity, setIdentity] = useState<Identity>()

    // const getAllLocalStorageKeys = () => {
    //     const keys = [];

    //     for (let i = 0; i < localStorage.length; i++) {
    //         keys.push(localStorage.key(i));
    //     }
    //     return keys;
    // };

    // const localStorageKeys = getAllLocalStorageKeys();
    // console.log("these are the keys available........",localStorageKeys);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const semaphore = useSemaphore()
    console.log("semapphoer ,,,,,,,,,,, users.......................",semaphore._users)

    useEffect(() => {
        semaphore.refreshUsers();
    }, []); // Dependency array might include specific triggers to refresh users




    useEffect(() => {
        if (pollId) {
            // Fetch or reference the poll data using pollId
            // Update state or context with the fetched poll data
        }
    }, [pollId]); // Re-run this effect if pollId changes



    useEffect(() => {
        if (isClient) {
        const identityString = localStorage.getItem("identity")
        console.log("xxx........................x............x.............",identityString)
        
        if (!identityString) {
            router.push("/")
            return
        }
    

        setIdentity(new Identity(identityString))
    }}, [isClient])

    useEffect(() => {
        if (_users.length > 0) {
            setLogs(`${_users.length} user${_users.length > 1 ? "s" : ""} retrieved from the group`)
        }
    }, [_users])

    useEffect(() => {
        semaphore.refreshUsers()
        semaphore.refreshFeedback()
    }, [])



    useEffect(() => {
        console.log("Updated _users:", semaphore._users);
    }, [semaphore._users]);




    const joinGroup = useCallback(async () => {
        if (!_identity) {
            return
        }

        setLoading.on()
        setLogs(`Joining the Feedback group...`)

        let response: any

        if (env.OPENZEPPELIN_AUTOTASK_WEBHOOK) {
            response = await fetch(env.OPENZEPPELIN_AUTOTASK_WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    abi: Feedback.abi,
                    address: env.FEEDBACK_CONTRACT_ADDRESS,
                    functionName: "joinGroup",
                    functionParameters: [_identity.commitment.toString()]
                })
            })
        } else {
            // console.log("call ",response.status)
            response = await fetch("../api/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identityCommitment: _identity.commitment.toString()
                })
            })
        }


 

        

        if (response.status === 200) {
            console.log("asdfasdfsdfsadf...............", _identity.commitment.toString())
            addUser(_identity.commitment.toString())
            // console.log(".............................",test)

            setLogs(`You joined the Feedback group event Share your feedback anonymously!`)
        } else {
            setLogs("Some error occurred, please try again!")
        }

        setLoading.off()
    }, [_identity])

    // const userHasJoined = useCallback((identity: Identity) => _users.includes(identity.commitment.toString()), [_users])
    const userHasJoined = useCallback((identity: Identity) => {
        console.log('Current _users:', semaphore._users);
        console.log('Checking commitment:', identity.commitment.toString());
        return semaphore._users.includes(identity.commitment.toString());
    }, [semaphore._users]);

    // if (!_identity || typeof _identity.commitment.toString() !== 'string') {
    //     console.error("Invalid identity or commitment.");
    //     return;
    // }


    // useEffect(() => {
    //     if (_identity) {
    //         setHasJoined(userHasJoined(_identity));
    //     }
    // }, [_users, _identity, userHasJoined]);

    return (
        <>
            <Heading as="h2" size="xl">
                Groups
            </Heading>

            <Text pt="2" fontSize="md">
                Semaphore{" "}
                <Link href="https://semaphore.pse.dev/docs/guides/groups" color="primary.500" isExternal>
                    groups
                </Link>{" "}
                are binary incremental Merkle trees in which each leaf contains an identity commitment for a user.
                Groups can be abstracted to represent events, polls, or organizations.
            </Text>

            <Divider pt="5" borderColor="gray.500" />

            <HStack py="5" justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                    Feedback users ({semaphore._users.length})
                </Text>
                <Button leftIcon={<IconRefreshLine />} variant="link" color="text.700" onClick={semaphore.refreshUsers}>
                    Refresh
                </Button>
            </HStack>

            <Box pb="5">
                <Button
                    w="100%"
                    fontWeight="bold"
                    justifyContent="left"
                    colorScheme="primary"
                    px="4"
                    onClick={joinGroup}
                    isDisabled={_loading || !_identity || userHasJoined(_identity)}
                    leftIcon={<IconAddCircleFill />}
                >
                    Join group
                </Button>
            </Box>

 
              

   

            {semaphore._users.length > 0 && (
                <VStack spacing="3" px="3" align="left" maxHeight="300px" overflowY="scroll">
                    {semaphore._users.map((user, i) => (
                        <HStack key={i} p="3" borderWidth={1} whiteSpace="nowrap">
                            <Text textOverflow="ellipsis" overflow="hidden">
                                {user}
                            </Text>
                        </HStack>
                    ))}
                </VStack>
            )}

            <Divider pt="6" borderColor="gray" />
            {/* {&& userHasJoined(_identity) } */}
            <Stepper
                step={2}
                onPrevClick={() => router.push("/poll/identity")}
                onNextClick={_identity && userHasJoined(_identity) ? () => router.push("/poll/proofs") : undefined}
            />
        </>
    )
}
