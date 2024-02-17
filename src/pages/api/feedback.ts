import { Contract, providers, Wallet } from "ethers"
import type { NextApiRequest, NextApiResponse } from "next"
import Feedback from "../../contract-artifacts/contracts/Feedback.sol/Feedback.json"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (typeof process.env.FEEDBACK_CONTRACT_ADDRESS !== "string") {
        throw new Error("Please, define FEEDBACK_CONTRACT_ADDRESS in your .env file")
    }

    if (typeof process.env.DEFAULT_NETWORK !== "string") {
        throw new Error("Please, define DEFAULT_NETWORK in your .env file")
    }

    if (typeof process.env.INFURA_API_KEY !== "string") {
        throw new Error("Please, define INFURA_API_KEY in your .env file")
    }

    if (typeof process.env.ETHEREUM_PRIVATE_KEY !== "string") {
        throw new Error("Please, define ETHEREUM_PRIVATE_KEY in your .env file")
    }
    const ethereumPrivateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
    const ethereumNetwork = "http://localhost:8545"
    const infuraApiKey = process.env.INFURA_API_KEY
    const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
    console.log("contract address is ...............", contractAddress)

    const provider = new providers.JsonRpcProvider("http://127.0.0.1:8545")

    const signer = new Wallet(ethereumPrivateKey, provider)
    const contract = new Contract(contractAddress, Feedback.abi, signer)

    const { feedback, merkleTreeRoot, nullifierHash, proof } = req.body

    try {
        const transaction = await contract.sendFeedback(feedback, merkleTreeRoot, nullifierHash, proof)

        await transaction.wait()

        res.status(200).end()
    } catch (error: any) {
        console.error(error)

        res.status(500).end()
    }
}
