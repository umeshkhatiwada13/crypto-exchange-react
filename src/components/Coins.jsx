import {
    Button,
    Container,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../index'
import Loader from './Loader';
import ErrorComponent from './ErrorComponent'
import CoinCard from "./CoinCard";

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("usd")
    const currencySymbol = currency === "cad" ? "c$" : currency === "eur" ? "€" : "$";

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/coins/markets?vs_currency=${currency}&page=${page}`);
                console.log(data);
                setCoins(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }
        fetchCoins();
    }, [currency, page])

    if (error) return <ErrorComponent message={"Error while fetching Coins!"} />
    return (
        <Container maxW={"container.xl"}>
            {loading ? (<Loader />) : (<>
                <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                    {
                        coins.map((i) => (
                            <CoinCard id={i.id} key={i.id}
                                name={i.name} img={i.image}
                                price={i.current_price} symbol={i.symbol}
                                url={i.url} currencySymbol={currencySymbol} />
                        ))
                    }
                </HStack>

            </>)}
        </Container>
    )
};

export default Coins;