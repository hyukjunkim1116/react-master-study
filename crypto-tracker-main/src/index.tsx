import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    </RecoilRoot>,
  document.getElementById("root")
);
