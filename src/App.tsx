import React from "react";
import { Tabs, Tab, TextField, Button } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import QuintonContent from "./tabs/QuintonContent";
import EllenContent from "./tabs/EllenContent";
import "./App.css";
import { fetchHistoricalData } from "./requests/historicalData";
import { HISTORICAL_DATA } from "./constants";

const queryCache = new QueryCache();

export default function App() {
  const [input, setInput] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const { data, isLoading, isError, refetch } = useQuery(
    [HISTORICAL_DATA, symbol],
    fetchHistoricalData,
    { enabled: false }
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (input !== symbol) {
      setSymbol(input);
      refetch();
    }
  };

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
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
    </ReactQueryCacheProvider>
  );
}
