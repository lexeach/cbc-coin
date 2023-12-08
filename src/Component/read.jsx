import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme, Card, Col, Row, Divider, Tabs } from "antd";
import contractConn from "../utils/contract";
import initWeb3 from "../utils/web3";
import Write from "./write";

function Read() {
  const [levelPrice, setLevelPrice] = useState();
  const [lastTopUP, setLastTopUp] = useState();
  const [rwa, setRwa] = useState();
  const [rwas, setRwas] = useState();
  const [stakeUser, setStakeUser] = useState({});
  const [tit, setTit] = useState([]);
  const [twa, setTwa] = useState([]);
  const [users, setUsers] = useState([]);
  const [wab, setWab] = useState([]);

  useEffect(() => {
    const contract = async () => {
      await initWeb3();
      await contractConn();
      const contrt = await window.ICO;
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      try {
        const levelPrice = await contrt.methods.LEVEL_PRICE(accounts[0]).call();
        setLevelPrice(levelPrice);
        const lastTopUp = await contrt.methods.lastTopup(accounts[0]).call();
        setLastTopUp(lastTopUp);
        const realWithdrawable = await contrt.methods
          .realWithdrableROI(accounts[0])
          .call();
        setRwa(realWithdrawable);
        const realWithdrawableStaking = await contrt.methods
          .realWithdrawableStakingROI(accounts[0])
          .call();
        setRwas(realWithdrawableStaking);
        const stakeUser = await contrt.methods.stakeUser(accounts[0]).call();
        setStakeUser(stakeUser);
        const totalIncomeTaken = await contrt.methods
          .totalIncomeTaken(accounts[0])
          .call();
        setTit(totalIncomeTaken);
        const totalWithdrawable = await contrt.methods
          .totalWithdrawable(accounts[0])
          .call();
        setTwa(totalWithdrawable);
        const users = await contrt.methods.users(accounts[0]).call();
        setUsers(users);
        const withdrawableIncome = await contrt.methods
          .withdrawableIncome(accounts[0])
          .call();
        console.log("withdrawableIncome", withdrawableIncome);
        setWab(withdrawableIncome);
      } catch (error) {
        console.log("error ==>>", error);
      }
    };

    contract();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dynamicHeadStyle = {
    background: "#37a9ff",
    color: "#fff",
  };

  const dynamicCardBodyStyle = {
    background: "#ebebeb",
  };

  const initialItems = [
    {
      label: "Public Values",
      children: (
        <div
          style={{
            padding: "0 50px",
            minHeight: "100%",
            background: colorBgContainer,
          }}
        >
          <div className="site-card-wrapper">
            <Row
              gutter={[16, 16]}
              style={{ paddingTop: "30px", textAlign: "center" }}
            >
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Level Price"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {levelPrice ? levelPrice : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Last Top Up"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {lastTopUP ? lastTopUP : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Real Withdraw Able"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {rwa ? rwa : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Real Withdraw Able Staking"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {rwas ? rwas : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Stack User"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {stakeUser.totalStaked ? stakeUser.totalStaked : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Total Income Taken"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {tit ? "On" : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="WithDrable Income"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {wab ? "On" : "Null"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="isExist"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.isExist ? "Yes" : "No"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Referrer ID"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.referrerID ? users.referrerID : "No"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Topup Amount"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.topupAmount ? users.topupAmount : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Referred Users"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.referredUsers ? users.referredUsers : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Capping"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.capping ? users.capping : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Income"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.income ? users.income : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Root Balance"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.rootBalance ? users.rootBalance : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Assured Reward"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.assuredReward ? users.assuredReward : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Level Income Received"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.levelIncomeReceived ? users.levelIncomeReceived : "No"}
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Income Taken"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.incomeTaken ? users.incomeTaken : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Taken ROI"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.takenROI ? users.takenROI : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Stake Times"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.stakeTimes ? users.stakeTimes : "No"}
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  title="Income Missed"
                  headStyle={dynamicHeadStyle}
                  bodyStyle={dynamicCardBodyStyle}
                >
                  {users.incomeMissed ? users.incomeMissed : "No"}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ),
      key: "1",
    },
    { label: "Private Values", children: <Write />, key: "2" },
  ];

  const [items, setItems] = useState(initialItems);

  return (
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
      <Layout.Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Public</Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
        <Tabs items={items} />
      </Layout.Content>
    </div>
  );
}

export default Read;
