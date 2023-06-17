import { LoginInitiate } from "@Config/redux/actions/authAction";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function ModalLogin  ({ openL, handleOpen ,handleOpenR})  {
  const [dataLogin, setDataLogin] = useState([]);
  const [error ,setError] = useState("")
  const d = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    d(LoginInitiate({email:dataLogin?.email,password:dataLogin?.password}))
    handleOpen()
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          size="sm"
          open={openL}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card
            className={
              "mx-auto w-3/4  overflow-scroll no-scrollbar px-4 py-4"
            }
          >
            <form onSubmit={handleSubmit}>
              <h1 className="font-avenir text-4xl font-bold text-primary px-4 py-2">
                Login
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
                  className="bg-[#d2d2d256] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, password: e.target.value })
                  }
                  placeholder="Password ..."
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  className="text-white bg-secondary"
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Don&apos;t have an account? Click
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    className="ml-1 font-bold"
                    onClick={handleOpenR}
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

