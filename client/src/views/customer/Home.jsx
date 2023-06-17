import LogoHome from "@Assets/images/pizza.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { GroupRes,GroupNear } from "@Components";
import { getPartners } from "@Config/redux/actions/partnertAction";
function Home() {
 const d = useDispatch()
 useEffect(() => {
  d(getPartners())
 },[d])

 const partner = useSelector((state) => state.partner)
 const [dataPartner ,setDataPartner] = useState()

 useEffect(() => {
  setDataPartner(partner?.partner)
 },[partner?.partner])

 return ( 
    <>
      <div className=" bg-primary text-center text-secondary flex justify-center items-center gap-6 font-avenir py-5 ">
        <div className="w-1/2">
          <Typography variant="h2" className="">Are You Hungry?</Typography>
          <Typography variant="h2">Express Home Delivery</Typography>
          <div className="flex justify-center m-auto w-1/2">
          <div className="border-4 border-primary border-t-black h-2 w-full"></div>
            <div>
              <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                dolorem quae porro cum suscipit vitae beatae reiciendis dolor
                sint mollitia, sit corporis optio corrupti
              </p>
            </div>
          </div>
        </div>
        <img src={LogoHome} alt="logo" className="hidden lg:block" />
      </div>
      
      <GroupRes data={dataPartner}/>
      <GroupNear data={dataPartner} />
    </>
  );
}

export default Home;
