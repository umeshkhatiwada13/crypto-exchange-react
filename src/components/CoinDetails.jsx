import { Badge, Box, Container, HStack, Text, VStack } from '@chakra-ui/layout'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import { BASE_URL } from '../index';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Image } from '@chakra-ui/image';
import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import { Progress } from '@chakra-ui/progress';
import Chart from './Chart';
import { Button } from '@chakra-ui/button';

const CoinDetails = () => {
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('usd');
    const [days, setDays] = useState('24h');
    const [chartArray, setChartArray] = useState([]);
    const params = useParams();
    const currencySymbol = currency === "cad" ? "C$" : currency === "eur" ? "€" : "$";
    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

    const switchChartDuration = (key) => {
        switch (key) {
            case "24h":
                setDays("24h");
                setLoading(true);
                break;
              case "7d":
                setDays("7d");
                setLoading(true);
                break;
              case "14d":
                setDays("14d");
                setLoading(true);
                break;
              case "30d": 
                setDays("30d");
                setLoading(true);
                break;
              case "60d":
                setDays("60d");
                setLoading(true);
                break;
              case "200d":
                setDays("200d");
                setLoading(true);
                break;
              case "1y":
                setDays("365d");
                setLoading(true);
                break;
              case "max":
                setDays("max");
                setLoading(true);
                break;
        
              default:
                setDays("24h");
                setLoading(true);
                break;
        }
    }
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/coins/${params.id}`);
                setCoin(data);

                const { data: chartData } = await axios.get(`${BASE_URL}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
                console.log(chartData);
                setChartArray(chartData.prices);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }
        fetchCoins();
    }, [params.id, currency, days]);

    if (error) return <ErrorComponent message={"Error while fetching Coin Details!"} />

    return (
        <Container maxW={"container.xl"}>
            {loading ? <Loader /> : (
                <>
                    <Box width={"full"} borderWidth={1}>
                        <Chart array={chartArray} currency={currencySymbol} days={days} />
                    </Box>

                    <HStack p="4" overflowX={"auto"}>
                        {
                            btns.map((i) => (
                                <Button key={i} onClick={() => switchChartDuration(i)}>{i}</Button>
                            ))
                        }
                    </HStack>

                    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                        <HStack spacing={"4"}>
                            <Radio value={"cad"}>CAD</Radio>
                            <Radio value={"usd"}>USD</Radio>
                            <Radio value={"eur"}>EUR</Radio>
                        </HStack>
                    </RadioGroup>

                    <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
                        <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                            Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
                        </Text>

                        <Image src={coin.image.large}
                            w={"16"}
                            h={"16"}
                            objectFit={"contain"} />

                        <Stat>
                            <StatLabel>{coin.name}</StatLabel>
                            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                            <StatHelpText>
                                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                                {coin.market_data.price_change_percentage_24h}%
                            </StatHelpText>
                        </Stat>

                        <Badge fontSize={"2xl"}
                            bgColor={"blackAlpha.800"}
                            color={"white"}>#{coin.market_cap_rank}
                        </Badge>

                        <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                            low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

                        <Box w={"full"} p="4">
                            <Item
                                item={'Max Supply'} value={coin.market_data.max_supply} />
                            <Item
                                item={'Circulating Supply'} value={coin.market_data.circulating_supply} />
                            <Item
                                item={"Market Cap"}
                                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                            />
                            <Item
                                item={"All Time Low"}
                                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                            />
                            <Item
                                item={"All Time High"}
                                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                            />
                        </Box>
                    </VStack>
                </>
            )}
        </Container>)
}

const Item = ({ item, value }) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
            {item}
        </Text>
        <Text>{value}</Text>
    </HStack>
)
const CustomBar = ({ high, low }) => (
    <VStack>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme={"red"} />
            <Text fontSize={"sm"}>24H Range</Text>
            <Badge children={high} colorScheme={"green"} />
        </HStack>
    </VStack>
)

export default CoinDetails;