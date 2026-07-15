/**
 * AMC list sourced from BSE StAR MF:
 * https://beta.bseindia.com/Static/Markets/MutualFunds/listOfAmc.aspx
 * Logos: public/assets/amc/{slug}.png (transparent PNGs)
 */
export type AmcEntry = {
  slug: string;
  name: string;
  website: string;
};

export const AMCS: AmcEntry[] = [
  {
    slug: "aditya-birla-sun-life",
    name: "Aditya Birla Sun Life Mutual Fund",
    website: "https://mutualfund.adityabirlacapital.com/",
  },
  {
    slug: "angel-one",
    name: "Angel One Mutual Fund",
    website: "https://angelonemf.com/",
  },
  {
    slug: "axis",
    name: "Axis Mutual Fund",
    website: "https://www.axismf.com/",
  },
  {
    slug: "bajaj-finserv",
    name: "Bajaj Finserv Mutual Fund",
    website: "https://www.bajajamc.com/",
  },
  {
    slug: "baroda-bnp-paribas",
    name: "Baroda BNP Paribas Mutual Fund",
    website: "https://www.barodabnpparibasmf.in/",
  },
  {
    slug: "bank-of-india",
    name: "Bank of India Mutual Fund",
    website: "https://www.boimf.in/",
  },
  {
    slug: "bandhan",
    name: "Bandhan Mutual Fund",
    website: "https://bandhanmutual.com/",
  },
  {
    slug: "canara-robeco",
    name: "Canara Robeco Mutual Fund",
    website: "https://www.canararobeco.com/",
  },
  {
    slug: "capitalmind",
    name: "Capitalmind Mutual Fund",
    website: "https://www.capitalmindmf.com/",
  },
  {
    slug: "dsp",
    name: "DSP Mutual Fund",
    website: "https://www.dspim.com/",
  },
  {
    slug: "edelweiss",
    name: "Edelweiss Mutual Fund",
    website: "https://www.edelweissmf.com/",
  },
  {
    slug: "franklin-templeton",
    name: "Franklin Templeton Mutual Fund",
    website: "https://www.franklintempletonindia.com",
  },
  {
    slug: "groww",
    name: "Groww Mutual Fund",
    website: "https://www.growwmf.in/",
  },
  {
    slug: "hdfc",
    name: "HDFC Mutual Fund",
    website: "https://www.hdfcfund.com/",
  },
  {
    slug: "helios",
    name: "Helios Mutual Fund",
    website: "https://www.heliosmf.in/",
  },
  {
    slug: "hsbc",
    name: "HSBC Mutual Fund",
    website: "https://www.assetmanagement.hsbc.co.in/en/mutual-funds",
  },
  {
    slug: "icici-prudential",
    name: "ICICI Prudential Mutual Fund",
    website: "https://www.icicipruamc.com/",
  },
  {
    slug: "iti",
    name: "ITI Mutual Fund",
    website: "https://www.itiamc.com/",
  },
  {
    slug: "invesco",
    name: "Invesco Mutual Fund",
    website: "https://invescomutualfund.com/",
  },
  {
    slug: "jio-blackrock",
    name: "Jio BlackRock Mutual Fund",
    website: "https://www.jioblackrockamc.com/",
  },
  {
    slug: "jm-financial",
    name: "JM Financial Mutual Fund",
    website: "https://www.jmfinancialmf.com/",
  },
  {
    slug: "kotak-mahindra",
    name: "Kotak Mahindra Mutual Fund",
    website: "https://www.kotakmf.com/",
  },
  {
    slug: "lic",
    name: "LIC Mutual Fund",
    website: "https://www.licmf.com/",
  },
  {
    slug: "mahindra-manulife",
    name: "Mahindra Manulife Mutual Fund",
    website: "https://www.mahindramanulife.com/",
  },
  {
    slug: "mirae-asset",
    name: "Mirae Asset Mutual Fund",
    website: "https://www.miraeassetmf.co.in/",
  },
  {
    slug: "motilal-oswal",
    name: "Motilal Oswal Mutual Fund",
    website: "https://www.motilaloswalmf.com",
  },
  {
    slug: "navi",
    name: "Navi Mutual Fund",
    website: "https://navi.com/mutual-fund",
  },
  {
    slug: "nippon-india",
    name: "Nippon India Mutual Fund",
    website: "https://mf.nipponindiaim.com/",
  },
  {
    slug: "nj",
    name: "NJ Mutual Fund",
    website: "https://www.njmutualfund.com/",
  },
  {
    slug: "old-bridge",
    name: "Old Bridge Mutual Fund",
    website: "https://oldbridgemf.com/",
  },
  {
    slug: "pgim-india",
    name: "PGIM India Mutual Fund",
    website: "https://www.pgimindiamf.com",
  },
  {
    slug: "ppfas",
    name: "PPFAS Mutual Fund",
    website: "https://amc.ppfas.com/",
  },
  {
    slug: "quant",
    name: "Quant Mutual Fund",
    website: "https://quantmutual.com/",
  },
  {
    slug: "quantum",
    name: "Quantum Mutual Fund",
    website: "https://www.quantumamc.com/",
  },
  {
    slug: "samco",
    name: "Samco Mutual Fund",
    website: "https://www.samcomf.com/",
  },
  {
    slug: "sbi",
    name: "SBI Mutual Fund",
    website: "https://www.sbimf.com/",
  },
  {
    slug: "shriram",
    name: "Shriram Mutual Fund",
    website: "https://www.shriramamc.in/",
  },
  {
    slug: "sundaram",
    name: "Sundaram Mutual Fund",
    website: "https://www.sundarammutual.com/",
  },
  {
    slug: "trust",
    name: "Trust Mutual Fund",
    website: "https://www.trustmf.com/",
  },
  {
    slug: "tata",
    name: "Tata Mutual Fund",
    website: "https://www.tatamutualfund.com/",
  },
  {
    slug: "taurus",
    name: "Taurus Mutual Fund",
    website: "https://www.taurusmutualfund.com/",
  },
  {
    slug: "unifi",
    name: "Unifi Mutual Fund",
    website: "https://unifimf.com/",
  },
  {
    slug: "union",
    name: "Union Mutual Fund",
    website: "https://www.unionmf.com/",
  },
  {
    slug: "uti",
    name: "UTI Mutual Fund",
    website: "https://www.utimf.com/",
  },
  {
    slug: "whiteoak-capital",
    name: "WhiteOak Capital Mutual Fund",
    website: "https://mf.whiteoakamc.com/",
  },
  {
    slug: "zerodha",
    name: "Zerodha Mutual Fund",
    website: "https://www.zerodhafundhouse.com/",
  },
  {
    slug: "360-one",
    name: "360 ONE Mutual Fund",
    website: "https://www.360.one/",
  },
];

/** Even indices → top strip (LTR), odd indices → bottom strip (RTL) */
export const AMC_ROW_LTR = AMCS.filter((_, i) => i % 2 === 0);
export const AMC_ROW_RTL = AMCS.filter((_, i) => i % 2 === 1);
