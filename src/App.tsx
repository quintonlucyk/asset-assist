import React from "react";
import { Tabs, Tab, TextField, Button } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import QuintonContent from "./tabs/QuintonContent";
import EllenContent from "./tabs/EllenContent";
import "./App.css";
import { SampleAppleData } from "./sample-responses/AppleData";
import { SampleATATData } from "./sample-responses/ATATData";

const inDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default function App() {
  const [input, setInput] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [data, setData] = React.useState({});
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
    if (!!symbol && window.location.hash.includes("ellen")) {
      fetchEllenHistoricalData(symbol);
    }
  }, [symbol]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input !== symbol) {
      setSymbol(input);
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
              <Route path="/" render={() => <QuintonContent />} />
            </Switch>
          </>
        )}
      />
    </Router>
  );
}
