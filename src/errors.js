export function getErrorString(e) {
  // Check if the exactly matching code
  const message = ERROR_MESSAGES[e?.message] || ERROR_MESSAGES[e?.reason];
  if (message) {
    return message;
  }

  // Fallback to check if message contains any key
  for (const key in ERROR_MESSAGES) {
    if (
      (e?.message && e.message.includes(key)) ||
      (e?.reason && e.reason.includes(key))
    ) {
      return ERROR_MESSAGES[key];
    }
  }

  // Fallback to throw a raw error message
  return (
    e?.error?.message ||
    e?.data?.message ||
    e?.message ||
    e?.name ||
    e?.reason ||
    e?.code ||
    e
  );
}

const ERROR_MESSAGES = {
  UNSUPPORTED_CHAIN:
    "This chain is currently not supported. Please connect to Binance Smart Chain (BSC) network on your wallet.",
  PROVIDER_ERROR:
    "The wallet extension is not installed. Please install Metamask (or Binance Chain Wallet) to continue.",
  AUTHORIZATION_ERROR: "Please authorize to access your account.",
  DUPLICATED_SYMBOL: "Symbol already exists. Please try a different symbol.",
  CONNECTOR_CONFIG: "The connector config is wrong.",
  CHANGE_TO_BSC: "Please change your network to BSC Mainnet and try again.",
  INVALID_SESSION: "Invalid session. Please try logging in again.",
  INVALID_SIGNATURE: "Invalid session. Please try logging in again.",
  EXCEEDED_MAX_SUPPLY:
    "May supply limit is exceeded. Please enter a smaller amount.",
  INVALID_CATEGORIES:
    "Invalid tag. You can only use alphabet, numbers, and dashes on tags.",
  CATEGORY_MAX_COUNT_LIMIT: "You can only add up to 5 tags.",
  CATEGORY_MAX_CHARACTER_LIMIT:
    "Invalid tag. Tag must not be longer than 20 characters.",
  DESCRIPTION_BLANK: "Description can not be blank",
  RESERVE_TOKEN_TRANSFER_FAILED:
    "You do not have enough balance to complete the transaction.",
  MAX_SUPPLY_MUST_BE_POSITIVE: "You can not set the max supply over 1M tokens.",
  BLOCKED_WORDS_ON_NAME:
    "Your token title/symbol/description violates Mint.club creation standards.",
  SLIPPAGE_LIMIT_EXCEEDED:
    "Your transaction has cancelled because a transaction occurred earlier than yours. Please try again (you may need to increase your slippage tolerance).",
  "transaction underpriced":
    "Transaction failed due to low gas price. Please try with a higher gas price.",
  "transaction failed":
    "Your transaction has cancelled due a transaction occurring earlier than yours. Please try again (you may need to increase your slippage tolerance).",
  INVALID_WEBSITE: "Invalid website URL. Please enter your own site URL.",
  INVALID_TOKEN:
    "Token not found. If you created a token and want to publish it, try navigating to https://mint.club/SYMBOL",
  NETWORK_ERROR:
    "Please connect to Binance Smart Chain (BSC) network on your wallet.",
  UNSUPPORTED_IMAGE_FORMAT: "Invalid image or unsupported image format.",
  NOT_ENOUGH_MINTDAO_BALANCE: "You need at least 1 MINTDAO token to rate.",
  WATCH_UNSUPPORTED: "Your wallet does not support watchAsset function.",
  SERVER_ERROR:
    "There is a temporary connection issue with the RPC server we use. Please try again later.",
};

export default ERROR_MESSAGES;
