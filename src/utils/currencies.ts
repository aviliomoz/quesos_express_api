const currencies = [
  {
    "code": "USD",
    "country": "United States",
    "name": "Dollar",
    "symbol": "$",
    "flag": "🇺🇸"
  },
  {
    "code": "CAD",
    "country": "Canada",
    "name": "Dollar",
    "symbol": "$",
    "flag": "🇨🇦"
  },
  {
    "code": "MXN",
    "country": "Mexico",
    "name": "Peso",
    "symbol": "$",
    "flag": "🇲🇽"
  },
  {
    "code": "BRL",
    "country": "Brazil",
    "name": "Real",
    "symbol": "R$",
    "flag": "🇧🇷"
  },
  {
    "code": "ARS",
    "country": "Argentina",
    "name": "Peso",
    "symbol": "$",
    "flag": "🇦🇷"
  },
  {
    "code": "COP",
    "country": "Colombia",
    "name": "Peso",
    "symbol": "$",
    "flag": "🇨🇴"
  },
  {
    "code": "CLP",
    "country": "Chile",
    "name": "Peso",
    "symbol": "$",
    "flag": "🇨🇱"
  },
  {
    "code": "PEN",
    "country": "Peru",
    "name": "Sol",
    "symbol": "S/",
    "flag": "🇵🇪"
  },
  {
    "code": "VEF",
    "country": "Venezuela",
    "name": "Bolivar",
    "symbol": "Bs",
    "flag": "🇻🇪"
  },
  {
    "code": "UYU",
    "country": "Uruguay",
    "name": "Peso",
    "symbol": "$",
    "flag": "🇺🇾"
  },
  {
    "code": "PYG",
    "country": "Paraguay",
    "name": "Guarani",
    "symbol": "₲",
    "flag": "🇵🇾"
  },
  {
    "code": "BOB",
    "country": "Bolivia",
    "name": "Boliviano",
    "symbol": "Bs.",
    "flag": "🇧🇴"
  },
  {
    "code": "DOP",
    "country": "Dominican Republic",
    "name": "Peso",
    "symbol": "RD$",
    "flag": "🇩🇴"
  },
  {
    "code": "GTQ",
    "country": "Guatemala",
    "name": "Quetzal",
    "symbol": "Q",
    "flag": "🇬🇹"
  },
  {
    "code": "HNL",
    "country": "Honduras",
    "name": "Lempira",
    "symbol": "L",
    "flag": "🇭🇳"
  },
  {
    "code": "NIO",
    "country": "Nicaragua",
    "name": "Cordoba",
    "symbol": "C$",
    "flag": "🇳🇮"
  },
  {
    "code": "CRC",
    "country": "Costa Rica",
    "name": "Colon",
    "symbol": "₡",
    "flag": "🇨🇷"
  },
  {
    "code": "PAB",
    "country": "Panama",
    "name": "Balboa",
    "symbol": "B/.",
    "flag": "🇵🇦"
  },
]


export const getCurrencyByCode = (code: string) => {
  return currencies.find((currency) => currency.code === code);
};

export const getCurrencies = () => {
  return currencies;
};
