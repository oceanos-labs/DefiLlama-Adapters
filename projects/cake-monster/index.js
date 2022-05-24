const sdk = require("@defillama/sdk");
const { transformBscAddress } = require("../helper/portedTokens");
const CM_TOKEN_CONTRACT = "0x8A5d7FCD4c90421d21d30fCC4435948aC3618B2f";
const CM_STAKING_CONTRACT = "0xF7CDDF60CD076d4d64c613489aA00dCCf1E518F6";

async function staking(timestamp, block, chainBlocks) {
  const balances = {};
  const transform = await transformBscAddress();

  const stakingBalance = (
    await sdk.api.abi.call({
      abi: "erc20:balanceOf",
      chain: "bsc",
      target: CM_TOKEN_CONTRACT,
      params: [CM_STAKING_CONTRACT],
      block: chainBlocks["bsc"],
    })
  ).output;

  await sdk.util.sumSingleBalance(
    balances,
    transform(CM_TOKEN_CONTRACT),
    stakingBalance
  );

  return balances;
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology:
    "counts the number of $MONSTA tokens in the Cake Monster Staking contract.",
  start: 15765654,
  bsc: {
    tvl: () => ({}),
    staking,
  },
};
