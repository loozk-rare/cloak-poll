import * as fs from "fs"

async function main() {
    const contractArtifactsPath = "../../contracts/build/contracts/contracts/Feedback.sol"
    const webAppArtifactsPath = "../contract-artifacts"

    await fs.promises.copyFile(`${contractArtifactsPath}/Feedback.json`, `${webAppArtifactsPath}/Feedback.json`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
