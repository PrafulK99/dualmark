export {
  parseAcceptHeader,
  mediaTypeMatches,
  negotiateFormat,
  registerFormat,
  getRegisteredFormats,
  type ParsedMediaType,
} from "./negotiation.js";

export {
  estimateTokens,
  setTokenEstimator,
  resetTokenEstimator,
} from "./tokens.js";

export {
  normalizeUnicode,
  cleanBody,
  stripImages,
  slugToTitle,
  fmtDate,
  joinLines,
  type CleanBodyOptions,
} from "./text.js";

export {
  markdownResponse,
  injectMarkdownAlternateLink,
  renderLinkAlternateHeader,
  type MarkdownResponseOptions,
} from "./markdown.js";

export {
  AI_BOTS,
  detectAIBot,
  type AIBotEntry,
  type AIBotInfo,
  type BotPurpose,
} from "./bots.js";

export {
  listingToMarkdown,
  renderRelatedLinks,
  renderFAQSection,
  renderPlatformFooter,
  type ListingItem,
  type ListingOptions,
  type RelatedLinks,
  type RelatedLinksGroup,
  type FAQItem,
  type PlatformFooter,
} from "./composition.js";

export {
  renderLlmsTxt,
  type LlmsTxtSection,
  type LlmsTxtOptions,
} from "./llms-txt.js";

export const AEO_SPEC_VERSION = "1.0";
