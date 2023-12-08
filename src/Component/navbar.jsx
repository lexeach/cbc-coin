// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const { currentAccount} = useSelector(state => state.account)

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <h4 className="navbar-brand">LEXEACH</h4>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">

//             <li className="nav-item">
//               <Link to="/contract" className="nav-link active" aria-current="page">
//                 Contract
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="read" className="nav-link">
//                 All Post
//               </Link>
//             </li>
//           </ul>

//           <div className="">
//          {currentAccount}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const { currentAccount } = useSelector((state) => state.account);
  return (
    <>
      <Header>
        <div className="demo-logo" />
        <Menu
          className='className="custom-menu"'
          theme="dark"
          mode="horizontal"
          style={{ color: "white" }}
          defaultSelectedKeys={["2"]}
          items={[
            {
              label: " LEXEACH",
              key: "home",
              style: {
                background: "#00152a",
              },
            },
            {
              label: currentAccount,
              key: "account",
              style: {
                marginLeft: "auto",
                background: "#00152a",
                paddingRight: "24px",
              },
            },
          ]}
        />
      </Header>
    </>
  );
};
export default Navbar;
