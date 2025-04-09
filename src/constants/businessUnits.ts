/**
 * Business unit keywords for filtering tables and columns
 * Each unit has an array of keywords that are used to match against table names and column names/comments
 */
export const UNIT_KEYWORDS = {
  "Asset": ["asset", "classcode", "location", "purposecode"], // Water Infrastructure & Asset Management
  "Capital Projects & Engineering": ["approval", "lead time", "project", "technical"],
  "Commercial & Industrial Solutions": ["commercial", "industrial", "orgunit", "systemid"],
  "Customer": ["account", "cohort", "crm", "customer", "service"], // "Customer Water Services"
  "Network Distribution Systems": ["delivery", "distribution", "network", "pressure"],
  "Regulatory Compliance & Risk": ["compliance", "regulation", "risk", "score"],
  "Retail": ["mdms", "retail"],
  "Strategic Finance & Funding": ["capex", "cost", "financial", "funding", "opex"],
  "Wastewater Treatment Operations": ["environment", "sewage", "treatment", "waste"],
};