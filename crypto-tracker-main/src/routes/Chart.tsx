import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart 
        type="candlestick"
        series={[
            {
                name: "price",
                data: data?.map(price =>({
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close]
                }))
            }
        ]}
        options={{
          chart:
          {
            height: 400,
            width: 400,
            toolbar:{
              show: false
            }
          },
          theme:{
              mode: isDark ? "dark" : "light" 
          },
                stroke: {
                    width:1,
                },
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(1)}` 
                    }
                },
                yaxis:{
                    show:false,         
                },
                xaxis:{
                    type:"datetime",
                    labels:{
                        style:{
                            colors: isDark ? "#f5f6fa" : "#fbc531",
                        }
                    },
                    axisTicks: { show: false },
                    categories: data?.map(price => price.time_close),
                },
                colors: ["#9c88fe"],
            fill: {
              type: "gradient",
              gradient: {
                type: "horizontal",
                gradientToColors: ["#9c88fe"],
                stops: [0, 100],
              },
            },

            }}
        /> 
        )}
    </div>
)}


export default Chart;
