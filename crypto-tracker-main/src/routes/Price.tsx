import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ItemsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface PriceProps {
  coinId: string;
}


function Price({ coinId }:PriceProps) {
  const { isLoading, data } = useQuery(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
  );
    return ( 
      <>
        { isLoading ? ("Loading Price...") : (
        <>
        <Items>
          <ItemsItem>High Price :  {(data?.quotes.USD?.ath_price).toFixed(2)} $ </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>Current Price : {(data?.quotes.USD?.price).toFixed(2)} $ </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>market_cap_change_24h: {data?.quotes.USD?.market_cap_change_24h} % </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>percent_change_15m: {data?.quotes.USD?.percent_change_15m} % </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>percent_change_30m: {data?.quotes.USD?.percent_change_30m} % </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>percent_change_1h: {data?.quotes.USD?.percent_change_1h} % </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>percent_change_12h: {data?.quotes.USD?.percent_change_12h} % </ItemsItem>
        </Items>
        <Items>
          <ItemsItem>percent_change_24h: {data?.quotes.USD?.percent_change_24h} % </ItemsItem>
        </Items>
        </>
        )
        
        }
        </>
        
      
      
      )}


export default Price
