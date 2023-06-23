import Product from "@Assets/images/Outline.png";
import LogoText from "@Assets/images/WaysFood.png";
import Cart from "@Assets/images/cart.png";
import Log from "@Assets/images/logout.png";
import Logo from "@Assets/images/messenger 1.png";
import Profile from "@Assets/images/user 2 (1).png";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../ModalLogin";
import ModalRegister from "../ModalRegister";
import { Logout } from "@Config/redux/actions/authAction";
import DefaultIMG from "@Assets/images/default.png";
import { GetOrder } from "../../config/redux/actions/orderAction";

export default function Navigation() {
  const [openL, setOpenL] = React.useState(false);
  const [openR, setOpenR] = React.useState(false);

  const d = useDispatch();
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const handleOpen = () => {
    setOpenL(!openL);
    setOpenR(false);
  };
  const handleOpenR = () => {
    setOpenR(!openR);
    setOpenL(false);
  };
  useEffect(() => {
    d(GetOrder(auth?.token))
  },[])
 
  return (
    <div className="w-full bg-primary">
      <Navbar className="mx-auto w-full  bg-primary shadow-none border border-primary ">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium flex items-center"
          >
            <img src={LogoText} className="h-7" alt="logotext" />
            <img src={Logo} alt="logo" />
          </Typography>
          <div className="absolute right-0 top-0 ">
            {auth?.user?.role === "partner" ? (
              <Menu className="mr-20">
                <div className="items-center flex gap-3">
                  <MenuHandler>
                    <button className="border-2 border-gray-500 rounded-full">
                      <img
                        alt="avatar"
                        className="rounded-full w-[50px] h-[50px] object-cover"
                        src={auth?.user?.image ? auth?.user?.image : DefaultIMG}
                      />
                    </button>
                  </MenuHandler>
                </div>
                <MenuList>
                  <MenuItem
                    className="flex items-center justify-between pr-12"
                    onClick={() => nav("/profile-partner")}
                  >
                    <img src={Profile} className="w-[30px]" alt="logout" />
                    Profile
                  </MenuItem>
                  <MenuItem
                    className="flex items-center justify-between pr-3"
                    onClick={() => nav("/add-product")}
                  >
                    <img className="w-[30px]" src={Product} alt="logout" />
                    Add Product
                  </MenuItem>
                  <hr className="my-2" />
                  <MenuItem
                    onClick={() => d(Logout())}
                    className="flex items-center justify-between pr-12"
                  >
                    <img className="w-[30px]" src={Log} alt="logout" />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : auth?.user?.role === "customer" ? (
              <>
                <Menu className="mr-20">
                  <div className="items-center flex gap-6">
                    <button className="relative" onClick={() => nav("/cart")}>
                      <img alt="cart" src={Cart} />
                      {order?.order?.length ? (
                        <p className="bg-[#F13F3F] text-white text-[10px] w-[13px] h-[13px] rounded-full absolute top-1 -right-1 ">
                          {order?.order?.length}
                        </p>
                      ) : (
                        <></>
                      )}
                    </button>
                    <MenuHandler>
                      <button className="border-2 border-gray-500 rounded-full">
                        <img
                          alt="avatar"
                          className="rounded-full w-[50px] h-[50px] object-cover"
                          src={auth?.user?.image ? auth?.user?.image : DefaultIMG}  
                        />
                      </button>
                    </MenuHandler>
                  </div>
                  <MenuList>
                    <MenuItem
                      className="flex items-center justify-between pr-12"
                      onClick={() => nav("/profile-user")}
                    >
                      <img src={Profile} className="w-[30px]" alt="logout" />
                      Profile
                    </MenuItem>
                    <hr className="my-2" />
                    <MenuItem
                      onClick={() => d(Logout())}
                      className="flex items-center justify-between pr-12"
                    >
                      <img className="w-[30px]" src={Log} alt="logout" />
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  className="mr-4 bg-secondary px-8"
                  onClick={handleOpenR}
                >
                  Register
                </Button>
                <Button
                  className="mr-4 bg-secondary px-10"
                  onClick={handleOpen}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </Navbar>
      <ModalLogin
        openL={openL}
        handleOpen={handleOpen}
        handleOpenR={handleOpenR}
      />
      <ModalRegister
        openR={openR}
        handleOpenR={handleOpenR}
        handleOpen={handleOpen}
      />
    </div>
  );
}
