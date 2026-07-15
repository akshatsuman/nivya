/**
 * AMC list + logos sourced from Pocketful:
 * https://www.pocketful.in/mutual-funds/amc
 * Logos: public/assets/amc/{slug}.png (cms-resources.pocketful.in)
 * SIF products excluded — mutual fund houses only.
 */
export type AmcEntry = {
  slug: string;
  name: string;
  page: string;
  logoId: string;
};

export const AMCS: AmcEntry[] = [
  {
    slug: "360-one-mutual-fund",
    name: "360 ONE Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/360-one-mutual-fund",
    logoId: "400047",
  },
  {
    slug: "abakkus-mutual-fund",
    name: "Abakkus Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/abakkus-mutual-fund",
    logoId: "400075",
  },
  {
    slug: "aditya-birla-sun-life-mutual-fund",
    name: "Aditya Birla Sun Life Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/aditya-birla-sun-life-mutual-fund",
    logoId: "400004",
  },
  {
    slug: "angel-one-mutual-fund",
    name: "Angel One Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/angel-one-mutual-fund",
    logoId: "400064",
  },
  {
    slug: "axis-mutual-fund",
    name: "Axis Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/axis-mutual-fund",
    logoId: "400040",
  },
  {
    slug: "bajaj-finserv-mutual-fund",
    name: "Bajaj Finserv Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/bajaj-finserv-mutual-fund",
    logoId: "400060",
  },
  {
    slug: "bandhan-mutual-fund",
    name: "Bandhan Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/bandhan-mutual-fund",
    logoId: "400028",
  },
  {
    slug: "bank-of-india-mutual-fund",
    name: "Bank of India Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/bank-of-india-mutual-fund",
    logoId: "400034",
  },
  {
    slug: "baroda-bnp-paribas-mutual-fund",
    name: "Baroda BNP Paribas Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/baroda-bnp-paribas-mutual-fund",
    logoId: "400001",
  },
  {
    slug: "canara-robeco-mutual-fund",
    name: "Canara Robeco Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/canara-robeco-mutual-fund",
    logoId: "400006",
  },
  {
    slug: "capitalmind-mutual-fund",
    name: "Capitalmind Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/capitalmind-mutual-fund",
    logoId: "400067",
  },
  {
    slug: "choice-mutual-fund",
    name: "Choice Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/choice-mutual-fund",
    logoId: "400072",
  },
  {
    slug: "dsp-mutual-fund",
    name: "DSP Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/dsp-mutual-fund",
    logoId: "400009",
  },
  {
    slug: "edelweiss-mutual-fund",
    name: "Edelweiss Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/edelweiss-mutual-fund",
    logoId: "400035",
  },
  {
    slug: "franklin-templeton-mutual-fund",
    name: "Franklin Templeton Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/franklin-templeton-mutual-fund",
    logoId: "400012",
  },
  {
    slug: "groww-mutual-fund",
    name: "Groww Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/groww-mutual-fund",
    logoId: "400048",
  },
  {
    slug: "hdfc-mutual-fund",
    name: "HDFC Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/hdfc-mutual-fund",
    logoId: "400013",
  },
  {
    slug: "helios-mutual-fund",
    name: "Helios Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/helios-mutual-fund",
    logoId: "400061",
  },
  {
    slug: "hsbc-mutual-fund",
    name: "HSBC Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/hsbc-mutual-fund",
    logoId: "400014",
  },
  {
    slug: "icici-prudential-mutual-fund",
    name: "ICICI Prudential Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/icici-prudential-mutual-fund",
    logoId: "400015",
  },
  {
    slug: "invesco-mutual-fund",
    name: "Invesco Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/invesco-mutual-fund",
    logoId: "400021",
  },
  {
    slug: "iti-mutual-fund",
    name: "ITI Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/iti-mutual-fund",
    logoId: "400056",
  },
  {
    slug: "jm-financial-mutual-fund",
    name: "JM Financial Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/jm-financial-mutual-fund",
    logoId: "400017",
  },
  {
    slug: "kotak-mahindra-mutual-fund",
    name: "Kotak Mahindra Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/kotak-mahindra-mutual-fund",
    logoId: "400019",
  },
  {
    slug: "lic-mutual-fund",
    name: "LIC Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/lic-mutual-fund",
    logoId: "400020",
  },
  {
    slug: "mahindra-manulife-mutual-fund",
    name: "Mahindra Manulife Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/mahindra-manulife-mutual-fund",
    logoId: "400054",
  },
  {
    slug: "mirae-asset-mutual-fund",
    name: "Mirae Asset Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/mirae-asset-mutual-fund",
    logoId: "400033",
  },
  {
    slug: "motilal-oswal-mutual-fund",
    name: "Motilal Oswal Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/motilal-oswal-mutual-fund",
    logoId: "400042",
  },
  {
    slug: "navi-mutual-fund",
    name: "Navi Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/navi-mutual-fund",
    logoId: "400041",
  },
  {
    slug: "nippon-india-mutual-fund",
    name: "Nippon India Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/nippon-india-mutual-fund",
    logoId: "400025",
  },
  {
    slug: "nj-mutual-fund",
    name: "NJ Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/nj-mutual-fund",
    logoId: "400058",
  },
  {
    slug: "old-bridge-mutual-fund",
    name: "Old Bridge Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/old-bridge-mutual-fund",
    logoId: "400063",
  },
  {
    slug: "pgim-india-mutual-fund",
    name: "PGIM India Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/pgim-india-mutual-fund",
    logoId: "400044",
  },
  {
    slug: "ppfas-mutual-fund",
    name: "PPFAS Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/ppfas-mutual-fund",
    logoId: "400049",
  },
  {
    slug: "quant-mutual-fund",
    name: "Quant Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/quant-mutual-fund",
    logoId: "400010",
  },
  {
    slug: "quantum-mutual-fund",
    name: "Quantum Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/quantum-mutual-fund",
    logoId: "400024",
  },
  {
    slug: "samco-mutual-fund",
    name: "Samco Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/samco-mutual-fund",
    logoId: "400059",
  },
  {
    slug: "sbi-mutual-fund",
    name: "SBI Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/sbi-mutual-fund",
    logoId: "400027",
  },
  {
    slug: "shriram-mutual-fund",
    name: "Shriram Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/shriram-mutual-fund",
    logoId: "400052",
  },
  {
    slug: "sundaram-mutual-fund",
    name: "Sundaram Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/sundaram-mutual-fund",
    logoId: "400029",
  },
  {
    slug: "tata-mutual-fund",
    name: "Tata Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/tata-mutual-fund",
    logoId: "400030",
  },
  {
    slug: "taurus-mutual-fund",
    name: "Taurus Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/taurus-mutual-fund",
    logoId: "400031",
  },
  {
    slug: "the-wealth-company-mutual-fund",
    name: "The Wealth Company Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/the-wealth-company-mutual-fund",
    logoId: "400068",
  },
  {
    slug: "trust-mutual-fund",
    name: "Trust Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/trust-mutual-fund",
    logoId: "400057",
  },
  {
    slug: "unifi-mutual-fund",
    name: "Unifi Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/unifi-mutual-fund",
    logoId: "400065",
  },
  {
    slug: "union-mutual-fund",
    name: "Union Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/union-mutual-fund",
    logoId: "400045",
  },
  {
    slug: "uti-mutual-fund",
    name: "UTI Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/uti-mutual-fund",
    logoId: "400032",
  },
  {
    slug: "whiteoak-capital-mutual-fund",
    name: "WhiteOak Capital Mutual Fund",
    page: "https://www.pocketful.in/mutual-funds/amc/whiteoak-capital-mutual-fund",
    logoId: "400055",
  },
];

/** Even indices → top strip (LTR), odd indices → bottom strip (RTL) */
export const AMC_ROW_LTR = AMCS.filter((_, i) => i % 2 === 0);
export const AMC_ROW_RTL = AMCS.filter((_, i) => i % 2 === 1);
