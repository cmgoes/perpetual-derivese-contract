import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, catchUnknownSigner } = deployments

    const { deployer, proxyOwner } = await getNamedAccounts()

    await catchUnknownSigner(
        deploy("ClearingHouseConfig", {
            from: deployer,
            proxy: {
                // owner: proxyOwner,
                proxyContract: "OpenZeppelinTransparentProxy",
                execute: {
                    init: {
                        methodName: "initialize",
                        args: [],
                    },
                },
            },
            log: true,
        }),
    )
}
export default func
func.tags = ["ClearingHouseConfig"]
