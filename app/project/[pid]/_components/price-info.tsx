import Image from "next/image";

async function fetchCoinGeckoData(platformId: string) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${platformId}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}

const formatNumber = (
  num: number | undefined,
  decimals: number = 8,
  fallback: string = "-",
) => (num !== undefined ? num.toFixed(decimals) : fallback);

const formatLargeNumber = (num: number | undefined, fallback: string = "-") =>
  num !== undefined
    ? num <= 0
      ? fallback
      : num
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : fallback;

export default async function PriceInfo({
  tokenInfo,
  name,
}: {
  tokenInfo: any;
  name: string;
}) {
  if (!tokenInfo?.platform?.coingecko) return null;

  let data;
  try {
    data = await fetchCoinGeckoData(tokenInfo.platform.coingecko);
  } catch (error) {
    console.log(error);
    return (
      <div className="rounded-sm border border-border-default bg-bg-surface p-4">
      <h3 className="text-sm text-text-secondary uppercase tracking-widest font-bold mb-3">{name} Token</h3>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center gap-2 mt-2">
            <Image
              alt={name}
              src={tokenInfo.icon.small}
              className="rounded-md object-cover border border-border-default/50 shadow-sm"
              width={32}
              height={32}
            />
            <span>
              <b>{tokenInfo.symbol}</b>
            </span>
          </div>
        </div>

        

        <small className="mt-2">
        <a
          target="_blank"
          style={{ color: "inherit" }}
          rel="nofollow"
          href={`https://www.coingecko.com/en/coins/${tokenInfo.platform.coingecko}`}
          className="flex items-center gap-1 hover:text-accent-primary transition-colors inline-flex opacity-70 hover:opacity-100"
        >
          View detail on CoinGecko <i className="bi bi-box-arrow-up-right text-[10px]"></i>
        </a>
        </small>
      </div>
      </div>
    );
  }

  if (Object.keys(data).length === 0) return <></>;

  const {
    market_data: {
      current_price = {},
      price_change_percentage_24h_in_currency = {},
      ath = {},
      high_24h = {},
      low_24h = {},
      total_volume = {},
      market_cap = {},
      circulating_supply = {},
    } = {},
  } = data;

  const priceChangeClassName =
    (price_change_percentage_24h_in_currency?.usd ?? 0) < 0
      ? "text-red-500"
      : "text-green-500";

  return (
    <div className="rounded-sm border border-border-default bg-bg-surface p-4">
      <h3 className="text-sm text-text-secondary uppercase tracking-widest font-bold mb-3">{name} Token</h3>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <Image
              alt={name}
              src={tokenInfo.icon.small}
              className="rounded-md object-cover border border-border-default/50"
              width={24}
              height={24}
            />
            <span>
              <b className="font-bold">{tokenInfo.symbol}</b>
              <small className="text-text-secondary">/usd</small>
            </span>
          </div>
            <h4 className="text-3xl font-medium cyber-mono text-text-primary">
            ${
              current_price?.usd !== undefined
              ? (() => {
                const v = current_price.usd;
                if (v === 0) return "0";
                if (Math.abs(v) < 1e-6)
                  return v.toFixed(12).replace(/0+$/,"").replace(/\.$/,"");
                if (Math.abs(v) < 1)
                  return v.toFixed(10).replace(/0+$/,"").replace(/\.$/,"");
                return v.toFixed(4).replace(/0+$/,"").replace(/\.$/,"");
                })()
              : "-"
            }
            <small
              className={`ml-2 text-sm font-medium ${priceChangeClassName}`}
            >
              {formatNumber(
              price_change_percentage_24h_in_currency?.usd,
              2,
              "-",
              )}
              %
            </small>
            </h4>
        </div>
        <div className="flex flex-col flex-wrap gap-4 lg:flex-row">
          {[
            { label: "ATH", value: formatNumber(ath?.usd, 8) },
            { label: "24h high", value: formatNumber(high_24h?.usd, 8) },
            {
              label: "Volume 24h",
              value: formatLargeNumber(total_volume?.usd),
            },
            { label: "24h low", value: formatNumber(low_24h?.usd, 8) },
            { label: "Market Cap", value: formatLargeNumber(market_cap?.usd)  },
            {
              label: "Circulating Supply",
              value: formatLargeNumber(circulating_supply),
            },
          ].map((item) => (
            <div className="flex flex-col p-1 w-1/3 min-w-[120px]" key={item.label}>
              <p className="text-xs text-text-secondary uppercase">{item.label}</p>
              <p
                className={`${item.label === "ATH" ? "text-accent-primary" : "text-text-primary"} text-sm font-bold cyber-mono`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <small className="mt-2">
        <a
          target="_blank"
          style={{ color: "inherit" }}
          rel="nofollow"
          href={`https://www.coingecko.com/en/coins/${tokenInfo.platform.coingecko}`}
          className="flex items-center gap-1 hover:text-accent-primary transition-colors inline-flex opacity-70 hover:opacity-100"
        >
          View on CoinGecko <i className="bi bi-box-arrow-up-right text-[10px]"></i>
        </a>
      </small>
    </div>
  );
}
