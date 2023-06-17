import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { registerInitiate } from "@Config/redux/actions/authAction";

const ModalRegister = ({ openR, handleOpenR ,handleOpen}) => {
  const [dataLogin, setDataLogin] = useState();
  const d = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    d(registerInitiate(dataLogin));
    handleOpenR()
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          size="sm"
          open={openR}
          handler={handleOpenR}
          className="bg-transparent shadow-none"
        >
          <Card
            className={"mx-auto w-3/4  overflow-scroll no-scrollbar px-4 py-4"}
          >
            <form onSubmit={handleSubmit}>
              <h1 className="font-avenir text-4xl font-bold text-primary px-4 py-2">
                Register
              </h1>
              <CardBody className="flex flex-col gap-4">
                <input
                  id="email"
                  type="email"
                  className="bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, email: e.target.value })
                  }
                  placeholder="Email..."
                />
                <input
                  id="password"
                  type="password"
                  className="bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, password: e.target.value })
                  }
                  placeholder="Password ..."
                />
                <input
                  id="fullName"
                  type="text"
                  className="bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, fullName: e.target.value })
                  }
                  placeholder="Full Name ..."
                />
                <select
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, gender: e.target.value })
                  }
                  className="bg-[#d2d2d25b] py-2 rounded-md px-4  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  <option disabled selected value="" className="text-[#c2c2c2]">
                    Gender
                  </option>
                  <option value="Male" className="text-secondary">Male</option>
                  <option value="Female" className="text-secondary">Female</option>
                </select>
                <input
                  id="phone"
                  type="text"
                  className="bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, phone: e.target.value })
                  }
                  placeholder="Phone ..."
                />
                <select
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, role: e.target.value })
                  }
                  className="bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  <option disabled selected value="" className="text-[#d2d2d25b]">
                    As User
                  </option>
                  <option value="customer" className="text-secondary">Customer</option>
                  <option value="partner" className="text-secondary">Partner</option>
                </select>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  className="text-white bg-secondary"
                  type="submit"
                  fullWidth
                >
                  Register
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Have an Account? Click
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    className="ml-1 font-bold"
                    onClick={handleOpen}
                  >
                    Here
                  </Typography>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default ModalRegister;
