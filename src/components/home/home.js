import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Web3 from "web3";
import { ICU, USDT } from "../../utils/web3.js";

const Dashboard = () => {
  window.Buffer = Buffer;

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  const [account, setAccount] = useState();
  const [registration_Free, setRegistrationFee] = useState();
  const [lastTopUp, setLastTopUp] = useState();
  const [realWithdrawableRoi, setRealWithdrawableRoi] = useState();
  const [realWithdrawableStakingRoi, setRealWithdrawableStakingRoi] =
    useState();
  const [stakeUser, setStakeUser] = useState();
  const [totalIncomeTaken, setTotalIncomeTaken] = useState();
  const [totalWithdrawable, setTotalWithdrawable] = useState();
  const [users, setUsers] = useState();
  const [withdrawableIncome, setWithdrawableIncome] = useState();

  const [referrerId, setReferrerId] = useState();
  // const [topupVal, setTopupVal] = useState();
  const [stakeAmount, setStakeAmount] = useState();
  const [stakeMonths, setStakeMonths] = useState("24");

  function roundToFour(num) {
    return +(Math.round(num + "e+4") + "e-4");
  }

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.requestAccounts();
      if (!accounts) {
        alert("please install metamask");
      }

      setAccount(accounts[0]);
      console.log("Account is ", account);
      // let BEP20_ = new web3.eth.Contract(BEP20.ABI, BEP20.address);
      let NEW_CBC_ROI = new web3.eth.Contract(ICU.ABI, ICU.address);
      let RegistrationFee = await NEW_CBC_ROI.methods
        .withdrawableROI(accounts[0])
        .call();
      console.log("Accounts of zero is :", accounts[0]);

      const convert_regfee = web3.utils.fromWei(RegistrationFee, "ether");
      setRegistrationFee(convert_regfee);

      console.log("NEW_CBC_ROI: ", NEW_CBC_ROI);
      console.log("account[0] ", accounts[0]);
      // set Last TopUp:
      const lastTopsup = await NEW_CBC_ROI.methods
        .lastTopup(accounts[0])
        .call();
      setLastTopUp(lastTopsup);
      // Set Real Withdrawable ROI
      const realROI = await NEW_CBC_ROI.methods
        .realWithdrableROI(accounts[0])
        .call();
      setRealWithdrawableRoi(realROI);
      console.log("Is it here:");
      // Set Real Withdrawable Staking ROI
      const realStakingRoi = await NEW_CBC_ROI.methods
        .realWithdrawableStakingROI(accounts[0])
        .call();
      setRealWithdrawableStakingRoi(realStakingRoi);
      // Set Stacke
      const stakeUse = await NEW_CBC_ROI.methods.stakeUser(accounts[0]).call();
      setStakeUser(stakeUse.totalStaked);
      // Set Total Token Taken
      const totalTokenTaken = await NEW_CBC_ROI.methods
        .totalIncomeTaken(accounts[0])
        .call();
      setTotalIncomeTaken(totalTokenTaken);
      // Set Total Withdrawable
      const totalWithdrawa = await NEW_CBC_ROI.methods
        .totalWithdrawable(accounts[0])
        .call();
      setTotalWithdrawable(totalWithdrawa);
      // Set users data
      const user = await NEW_CBC_ROI.methods.users(accounts[0]).call();
      setUsers(user.id);
      // set withdrawable Income
      const withdrawableInc = await NEW_CBC_ROI.methods
        .withdrawableIncome(accounts[0])
        .call();
      setWithdrawableIncome(withdrawableInc);
    }

    load();
  }, []);

  // handle change for registration
  const handleChange = (event) => {
    // let { name, value } = event.target;
    // setReferrerID({ ...referrerID, [name]: value });
    setReferrerId(event.target.value);
  };

  // Function to handle changes in the dropdowns
  const handleChangeDropdownStake = (event) => {
    // Update the selectedValues state based on the dropdown ID
    console.log("Event target", event.target);
    setStakeMonths(event.target.value);
  };
  const handleChangeStakeAmount = (event) => {
    console.log("Stake Amount", event.target.value);
    setStakeAmount(event.target.value);
  };
  // Check condition of Value for Stacke CBC
  function isValidValue(value) {
    // Check if the value is a number
    if (typeof value !== "number") {
      return false;
    }

    // Check if the value is not less than 100 and not more than 2400
    if (value < 100 || value > 2400) {
      return false;
    }

    // Check if the value is a multiple of 100
    if (value % 100 !== 0) {
      return false;
    }

    // If all conditions are met, the value is valid
    return true;
  }

  // registration
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let id = referrerId;

      let amount = registration_Free; //web3.utils.toWei(amount, "ether") / 10000000000000000;
      if (id === "0") {
        id = "50000";
      }
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);

      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, reg_user;
      if (isAllowance < amount) {
        isApprove = await USDT_.methods
          .approve(ICU.address, amount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            reg_user = await ICU_.methods
              .Registration(id, amount)
              .send({ from: account, value: 0 });
            console.log("****** native coin accepting condtion", reg_user);
            if (reg_user.status) {
              alert("Registerd Success");
            } else {
              alert("Registerd Failed !!!!");
            }
          });
      } else {
        reg_user = await ICU_.methods
          .Registration(id, amount)
          .send({ from: account, value: 0 });
        console.log("****** native coin accepting condtion", reg_user);
        if (reg_user.status) {
          alert("Registerd Success");
        } else {
          alert("Registerd Failed !!!!");
        }
      }
    } catch (e) {
      alert("Error is catched");
    }
  };

  // Top Up
  const handleSubmitTopUP = async (event) => {
    event.preventDefault();
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let topUpamount;
      let amount = await ICU_.methods.lastTopup(account).call();
      if (amount == 0) {
        topUpamount = 50;
      } else if (amount == 400) {
        topUpamount = 400;
      } else {
        topUpamount = amount * 2;
      }
      // the approve currentTokenAccepting ERC20-Token-Accepting

      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, user_topup;
      if (isAllowance < topUpamount) {
        isApprove = await USDT_.methods
          .approve(ICU.address, amount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            user_topup = await ICU_.methods
              .topUp(topUpamount)
              .send({ from: account });
            console.log("****** native coin accepting condtion", user_topup);
            if (user_topup.status) {
              alert("Top UP Success");
            } else {
              alert("Top UP Failed !!!!");
            }
          });
      } else {
        user_topup = await ICU_.methods
          .topUp(topUpamount)
          .send({ from: account });
        console.log("****** native coin accepting condtion", user_topup);
        if (user_topup.status) {
          alert("Top UP Success");
        } else {
          alert("Top UP Failed !!!!");
        }
      }
    } catch (e) {
      alert("Error is catched");
    }
  };

  const handleSubmitWithdraw = async (event) => {
    event.preventDefault();
    try {
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      await ICU_.methods.withdrawAllIncome().send({ from: account });
    } catch (e) {
      alert("Error Trigered");
    }
  };
  // Handle Submin on StackeCBC
  const handleSubmitStake = async (event) => {
    event.preventDefault();
    try {
      if (!isValidValue) {
        alert(
          "Stake CBC Amount should be multiple of >=100 && <2400 and multiple of 100 "
        );
        return;
      }
      let ICU_ = new web3.eth.Contract(ICU.ABI, ICU.address);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);

      let isAllowance = await USDT_.methods
        .allowance(account, ICU.address)
        .call();
      let isApprove, reg_user;
      if (isAllowance < stakeAmount) {
        isApprove = await USDT_.methods
          .approve(ICU.address, stakeAmount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            reg_user = await ICU_.methods
              .stakeCBC(stakeAmount, stakeMonths)
              .send({ from: account });
            if (reg_user.status) {
              alert("Stake CBC Success");
            } else {
              alert("Stake CBC Failed !!!!");
            }
          });
      } else {
        reg_user = await ICU_.methods
          .stakeCBC(stakeAmount, stakeMonths)
          .send({ from: account });
        console.log("****** native coin accepting condtion", reg_user);
        if (reg_user.status) {
          alert("Stake CBC Success");
        } else {
          alert("Stake CBC Failed !!!!");
        }
      }
    } catch (e) {
      alert("Error is catch");
    }
  };

  return (
    <div className="home-container">
      <div className="row">
        {/* token balance  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Registration Fee</h5>
              <h4 className="mb-0">
                {registration_Free ? registration_Free : 0} (UPC)
              </h4>
            </div>
          </div>
        </div>

        {/* metamask balance  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Last TopUP</h5>

              <h4 className="mb-0">{lastTopUp ? lastTopUp : 0}</h4>
            </div>
          </div>
        </div>
        {/* reg fee  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Real Withdrawable ROI</h5>
              <h4 className="mb-0">
                {realWithdrawableRoi ? realWithdrawableRoi : 0}
              </h4>
            </div>
          </div>
        </div>

        {/* token price  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Real Withdrawable Staking ROI</h5>

              <h4 className="mb-0">
                {realWithdrawableStakingRoi ? realWithdrawableStakingRoi : 0}{" "}
              </h4>
            </div>
          </div>
        </div>

        {/* is exist  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Stake User</h5>
              <h4 className="mb-0">{stakeUser ? stakeUser : 0}</h4>
            </div>
          </div>
        </div>

        {/* id  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Total Income Taken</h5>
              <h4 className="mb-0">
                {totalIncomeTaken ? totalIncomeTaken : 0}
              </h4>
            </div>
          </div>
        </div>
        {/* reffer id  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Total Withdrawable</h5>
              <h4 className="mb-0">
                {totalWithdrawable ? totalWithdrawable : 0}
              </h4>
            </div>
          </div>
        </div>

        {/* reffered user  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Users</h5>
              <h4 className="mb-0">{users ? users : 0}</h4>
            </div>
          </div>
        </div>

        {/* income  */}
        <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Withdrawable Income</h5>
              <h4 className="mb-0">
                {withdrawableIncome ? withdrawableIncome : 0}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">
              Write Functionality Is Below
            </div>
          </div>
        </div>
        {/* Registration function  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Registration</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="form-group w-100">
                      <input
                        className="form-control mt-2"
                        type="number"
                        required
                        name="id"
                        onChange={handleChange}
                        value={referrerId || ""}
                        placeholder="Referral ID"
                      />

                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Registration"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TopUP function  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Top Up</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form className="forms-sample" onSubmit={handleSubmitTopUP}>
                    <div className="form-group w-100">
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Top Up"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stake CBC function  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Stake CBC</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form className="forms-sample" onSubmit={handleSubmitStake}>
                    <div className="form-group w-100">
                      <input
                        className="form-control mt-2"
                        type="number"
                        required
                        name="stakeAmount"
                        onChange={handleChangeStakeAmount}
                        value={stakeAmount || ""}
                        placeholder="Amount Range 100-2400"
                      />

                      <label htmlFor="myDropdown">
                        Select Month from dropdown:
                      </label>

                      <select
                        id="stakeMonths"
                        className="form-control"
                        onChange={handleChangeDropdownStake}
                        value={stakeMonths}
                      >
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                        <option value="60">60</option>
                      </select>

                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Stacked"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WithDraw All Income  */}
        <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>WithDraw All Income</h5>
              <div className="row">
                <div className="col-sm-12 my-auto">
                  <form
                    className="forms-sample"
                    onSubmit={handleSubmitWithdraw}
                  >
                    <div className="form-group w-100">
                      <input
                        className="btn mt-3 submitbtn_"
                        type="submit"
                        value="Withdraw Income"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
