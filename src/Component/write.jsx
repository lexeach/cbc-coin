import { useEffect, useState } from "react";
import { Button, Form, Input, Card } from "antd";
import contractConn from "../utils/contract";
import initWeb3 from "../utils/web3";

const Write = () => {
  const [icoContract, setIcoContract] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [cbcLoading, setCbcLoading] = useState(false);
  const [topLoading, setTopLoading] = useState(false);
  useEffect(() => {
    const getContract = async () => {
      await initWeb3();
      await contractConn();
      const contrt = await window.ICO;
      setIcoContract(contrt);
    };
    getContract();
  }, []);

  // register
  const onFinishRegister = async (values) => {
    setRegLoading(true);
    const result = await icoContract.methods
      .Registration(values.refferrer, values.amount)
      .send({ from: accounts[0], value: values.registration });
    setRegLoading(false);

  };
  const onFinishFailedRegister = (errorInfo) => {
    setRegLoading(false);
  };

  // stack CBC
  const onFinishStack = async (values) => {
    setCbcLoading(true);
    const result = await icoContract.methods
      .stakeCBC(values.month, values.amount)
      .send({ from: accounts[0] });
    setCbcLoading(false);

  };
  const onFinishFailedStack = (errorInfo) => {
    setCbcLoading(false);
  };

  // TOP
  const onFinishTop = async(values) => {
    setTopLoading(true);
    const result = await icoContract.methods
      .topUp( values.amount)
      .send({ from: accounts[0] });
    setTopLoading(false);
  };
  const onFinishFailedTop = (errorInfo) => {
    setTopLoading(false);
  };

  const withDrawAllIncome = async (values) => {
    setLoading(true)
    const result = await icoContract.methods
      .withdrawAllIncome()
      .send({ from: accounts[0] });
      setLoading(flase)
  };

  return (
    <>
      <Card className="mt-4">
        <Card type="inner" style={{ marginBottom: "20px" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={withDrawAllIncome}
          >
            WithDrawAllIncome
          </Button>
        </Card>

        <Card type="inner" title="Register">
          <Form
            name="registration"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishRegister}
            onFinishFailed={onFinishFailedRegister}
            autoComplete="off"
          >
            <Form.Item
              label="Registration"
              name="registration"
              rules={[
                {
                  required: true,
                  message: "Please input your payable amount!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Referrer ID"
              name="refferrer"
              rules={[
                {
                  required: true,
                  message: "Please input your referrer id!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input your amount",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" loading={regLoading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Stack CBC">
          <Form
            name="stackcbc"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishStack}
            onFinishFailed={onFinishFailedStack}
            autoComplete="off"
          >
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input your payable amount!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Month"
              name="month"
              rules={[
                {
                  required: true,
                  message: "Please input your month",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" loading={cbcLoading}>
                Stack CBC
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Top Up">
          <Form
            name="topup"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishTop}
            onFinishFailed={onFinishFailedTop}
            autoComplete="off"
          >
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input your payable amount!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" loading={topLoading}>
                Top Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Card>
    </>
  );
};

export default Write;
