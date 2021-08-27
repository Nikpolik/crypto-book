import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Header from "./Components/Header";
import Actions from "./Components/Actions";
import { createConnectMessage } from "./lib/levelsFeed";
import Feed from "./Components/Feed";
import ConnectionStatus from "./Components/ConnectionStatus";

const worker = new Worker("lib/worker.js");

function App() {
  useEffect(() => {
    worker.onmessage = (m) => {
      store.dispatch(m.data);
    };
    worker.postMessage(createConnectMessage());

    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <ConnectionStatus />
        <Header />
        <Feed />
        <Actions />
      </Provider>
    </ThemeProvider>
  );
}

export { worker };
export default App;
