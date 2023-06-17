import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const GroupRes = ({data}) => {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <div className=" text-secondary my-12 mx-32">
      <Typography variant="h3">Popular Restaurant</Typography>
      <div className="flex flex-col md:flex-row items-center gap-5 mt-10">
      {data?.length ? (
          <>
            {data?.map((item, idx) => {
              return (
                <Card key={idx} className="p-4 border border-gray-200 h-[95px] w-[250px]">
                  <div className="flex flex-row items-center gap-5 mr-5">
                    <img src={item.image} alt="img" className="w-[64px] h-[65px] object-cover rounded-full"/>
                    <h1 className="font-avenir text-secondary font-bold text-2xl py-2 ml-5">{item.fullname}</h1>
                  </div>
                </Card>
              );
            })}
          </>
        ) : (
          <>
            <Typography>Loading....</Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupRes;
