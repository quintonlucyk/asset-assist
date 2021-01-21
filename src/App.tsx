import React from "react";
import { Tabs, Tab, TextField, Button } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import QuintonContent from "./tabs/QuintonContent";
import EllenContent from "./tabs/EllenContent";
import "./App.css";
import { SampleAppleData } from "./sample-responses/AppleData";
import { SampleATATData } from "./sample-responses/ATATData";
import { SampleFMPIncomeGrowth } from "./sample-responses/FMPIncomeGrowth";
import { SampleFMPCashGrowth } from "./sample-responses/FMPCashGrowth";
import { SampleFMPBalanceGrowth } from "./sample-responses/FMPBalanceGrowth";
import { SampleFMPKeyMetrics } from "./sample-responses/FMPKeyMetrics";

const inDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default function App() {
  const [input, setInput] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [data, setData] = React.useState({});
  const [fmpIncomeGrowth, setFMPIncomeGrowth] = React.useState([{}]);
  const [fmpKeyMetrics, setFMPKeyMetrics] = React.useState([{}]);
  const [fmpCashGrowth, setFMPCashGrowth] = React.useState([{}]);
  const [fmpBalanceGrowth, setFMPBalanceGrowth] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchEllenHistoricalData = async (symbol: string) => {
      const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || "";
      setIsLoading(true);
      try {
        if (inDev) {
          setIsLoading(false);
          setData(
            Math.floor(Math.random() * 10 + 1) % 2 === 0
              ? SampleAppleData
              : SampleATATData
          );
          setIsError(false);
          return;
        }

        const res = await fetch(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&region=US`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            },
          }
        );

        const json = await res.json();
        setIsLoading(false);
        setData(json);
        setIsError(false);
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        setData({});
      }
    };

    const fetchQuintonHistoricalData = async (symbol: string) => {
      const FMPAPI_KEY = process.env.REACT_APP_FMPAPI_KEY || "";
      setIsLoading(true);
      if (inDev) {
        setIsLoading(false);
        setFMPIncomeGrowth(SampleFMPIncomeGrowth);
        setFMPBalanceGrowth(SampleFMPBalanceGrowth);
        setFMPCashGrowth(SampleFMPCashGrowth);
        setFMPKeyMetrics(SampleFMPKeyMetrics);
        setIsError(false);
        return;
      }

      const fmpRequests = [
        fetch(
          `https://fmpcloud.io/api/v3/income-statement-growth/${symbol}?limit=10&apikey=${FMPAPI_KEY}`
        ),
        fetch(
          `https://fmpcloud.io/api/v3/key-metrics/${symbol}?limit=11&apikey=${FMPAPI_KEY}`
        ), //Need 11 roic data points to be able to calculate 10 columns of growth
        fetch(
          `https://fmpcloud.io/api/v3/balance-sheet-statement-growth/${symbol}?limit=10&apikey=${FMPAPI_KEY}`
        ),
        fetch(
          `https://fmpcloud.io/api/v3/cash-flow-statement-growth/${symbol}?limit=10&apikey=${FMPAPI_KEY}`
        ),
      ];

      Promise.all(fmpRequests)
        // map array of responses into an array of response.json() to read their content
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        // all JSON answers are parsed: "jsonResponses" is the array of them
        .then((jsonResponses) => {
          setIsLoading(false);
          setIsError(false);
          setFMPIncomeGrowth(jsonResponses[0]);
          setFMPKeyMetrics(jsonResponses[1]);
          setFMPBalanceGrowth(jsonResponses[2]);
          setFMPCashGrowth(jsonResponses[3]);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setFMPIncomeGrowth([{}]);
          setFMPKeyMetrics([{}]);
          setFMPBalanceGrowth([{}]);
          setFMPCashGrowth([{}]);
          console.error(error.message);
        });
    };

    if (!!symbol) {
      if (window.location.hash.includes("ellen")) {
        fetchEllenHistoricalData(symbol);
      } else {
        fetchQuintonHistoricalData(symbol);
      }
    }
  }, [symbol]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input !== symbol) {
      setSymbol(input.toUpperCase());
    }
  };

  return (
    <Router>
      <Route
        path="/"
        render={({ location }) => (
          <>
            <Tabs
              value={location.pathname === "/ellen" ? 1 : 0}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Quinton" component={Link} to="/" />
              <Tab label="Ellen" component={Link} to="/ellen" />
            </Tabs>
            <div className="symbolInput">
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  onChange={handleInputChange}
                  name="symbolInput"
                  placeholder="Symbol"
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
            <Switch>
              <Route
                path="/ellen"
                render={() => (
                  <EllenContent
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                  />
                )}
              />
              <Route
                path="/"
                render={() => (
                  <QuintonContent
                    fmpIncomeGrowth={fmpIncomeGrowth}
                    fmpBalanceGrowth={fmpBalanceGrowth}
                    fmpCashGrowth={fmpCashGrowth}
                    fmpKeyMetrics={fmpKeyMetrics}
                    isLoading={isLoading}
                    isError={isError}
                  />
                )}
              />
            </Switch>
          </>
        )}
      />
    </Router>
  );
}
