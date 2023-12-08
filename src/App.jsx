import { useEffect } from "react";
import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setCurrentAccount } from "./features/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Component/navbar";
import Read from "./Component/read";
import initWeb3 from "./utils/web3";
import contractConn from "./utils/contract";
import Footer from "./Component/Footer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((state) => state.account);

  useEffect(() => {
    const initializeApp = async () => {
      if (!currentAccount) {
        await initWeb3();
        const web3 = window.web3;
        if (web3) {
          const accounts = await web3.eth.getAccounts();
          const newCurrentAccount = accounts[0];
          dispatch(setCurrentAccount(newCurrentAccount));
        }
        await contractConn();
      }
    };

    initializeApp();
  }, [dispatch, currentAccount]);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <Layout>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Read />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
