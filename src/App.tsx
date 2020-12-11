import React from "react";
import { Tabs, Tab, TextField, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import QuintonContent from "./tabs/QuintonContent";
import EllenContent from "./tabs/EllenContent";
import "./App.css";
import { fetchHistoricalData } from "./requests/historicalData";
import { BASE_PATH, HISTORICAL_DATA } from "./constants";

const queryCache = new QueryCache();

export default function App() {
  const [input, setInput] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const { data, isLoading, isError } = useQuery(
    [HISTORICAL_DATA, symbol],
    fetchHistoricalData,
    { enabled: !!symbol }
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSymbol(input);
  };

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <Route
          path={BASE_PATH}
          render={({ location }) => (
            <>
              <Tabs
                value={location.pathname === BASE_PATH + "/ellen" ? 1 : 0}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Quinton" component={Link} to={BASE_PATH + "/"} />
                <Tab label="Ellen" component={Link} to={BASE_PATH + "/ellen"} />
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
                  path={BASE_PATH + "/ellen"}
                  render={() => (
                    <EllenContent
                      data={data}
                      isLoading={isLoading}
                      isError={isError}
                    />
                  )}
                />
                <Route
                  path={BASE_PATH + "/"}
                  render={() => <QuintonContent />}
                />
              </Switch>
            </>
          )}
        />
      </Router>
    </ReactQueryCacheProvider>
  );
}
