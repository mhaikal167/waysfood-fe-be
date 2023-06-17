import { Button, Card, CardBody, Typography ,Chip} from "@material-tailwind/react";
import DefaultIMG from "@Assets/images/default.png";
import Logo from "@Assets/images/logocard.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfilePartner({ auth }) {
    const nav = useNavigate()
    const dateConvert = (params) => {
    var params = new Date();
    var options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    var formattedDate = params.toLocaleDateString("en-US", options);
    return formattedDate
  }
  const [dataOrder,setDataOrder] = useState()
  return (
    <>
      <div className="flex flex-col lg:flex-row  justify-between mt-10 mx-12 md:mx-40 ">
        <div id="left-content" className="">
          <Typography variant="h2" className="text-secondary font-avenir">
            Profile Partner
          </Typography>
          <div className="flex gap-5">
            <img
              src={auth?.user?.image ? auth?.user?.image :DefaultIMG}
              alt="default"
              className="w-[180px] h-[221px] object-cover"
            />
            <div className="">
              <p className="text-secondary font-avenir font-bold">Full Name</p>
              <p className="mb-4 font-avenir">{auth?.user.fullname}</p>
              <p className="text-secondary font-avenir font-bold">Email</p>
              <p className="mb-4 font-avenir">{auth?.user.email}</p>
              <p className="text-secondary font-avenir font-bold">Phone</p>
              <p className="mb-4 font-avenir">{auth?.user.phone}</p>
            </div>
          </div>
          <Button
            className="text-white bg-secondary w-3/4  lg:w-1/2 mt-3"
            onClick={() => {nav("/edit-partner")}}
          >
            Edit Profile
          </Button>
        </div>
        <div id="right-content">
          <Typography variant="h2" className="text-secondary font-avenir">
            History Order
          </Typography>
          {dataOrder?.length ? (
    <Card className="bg-white border border-gray-300 w-[419px] mb-10">
    <CardBody className="flex justify-between">
      <div>
        <p className="font-avenir text-base text-black">Andi</p>
        <p className="font-avenir text-black">{dateConvert("2023-15-06")}</p>
        <p className="font-avenir text-[#974A4A]">Total 45.000</p>
      </div>
      <div>
        <img src={Logo} alt="logo" />
        <Chip
          size="sm"
          variant="ghost"
          value={"success"}
          color={"success" ? "green" : "pending" ? "amber" : "red"}
          className="text-center mt-2"
        />
      </div>
    </CardBody>
  </Card>
          ) : (
            <>
            <h1>No order ....</h1>
            </>
          )}
      
    
        </div>
      </div>
    </>
  );
}
