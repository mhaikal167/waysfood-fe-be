import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const GroupNear = ({ data }) => {

  return (
    <div className=" text-secondary my-12 mx-32">
      <Typography variant="h3">Restaurant Near You</Typography>
      <div className="flex  items-center gap-5 mt-10">
        {data?.length ? (
          <>
            {data?.map((item, idx) => {
              return (
                <Link to={`/menu-list/${item.id}`}>
                <Card key={idx} className="p-2 border border-gray-200">
                    <img src={item.image} alt="img" className="w-[224px] h-[124px] object-cover"/>
                    <p className="font-avenir text-secondary font-bold text-lg py-2">{item.fullname}</p>
                    <p className="font-avenir text-secondary text-lg">0.{item.id+2}km</p>
                </Card>
                </Link>
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

export default GroupNear;
