import React from "react";
import "../styles/global.css";
// Only here I can do global styles
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
