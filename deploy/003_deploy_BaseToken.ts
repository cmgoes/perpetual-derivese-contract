import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, catchUnknownSigner, get } = deployments

    const { deployer, proxyOwner } = await getNamedAccounts()
    const chainlinkPriceFeedV2 = await get("ChainlinkPriceFeedV2")

    await catchUnknownSigner(
        deploy("BaseToken", {
            from: deployer,
            proxy: {
                // owner: proxyOwner,
                proxyContract: "OpenZeppelinTransparentProxy",
                execute: {
                    init: {
                        methodName: "initialize",
                        args: ["RandomTestToken0", "RandomTestToken0", chainlinkPriceFeedV2.address],
                    },
                },
            },
            log: true,
        }),
    )
}
export default func
func.tags = ["BaseToken"]
