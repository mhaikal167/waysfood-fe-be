import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { distance } from "@turf/turf";
const GroupNear = ({ data }) => {
  const user = useSelector((state) => state.auth);
  const calculateDistance = (startLng, startLat, endLng, endLat) => {
    const startPoint = [startLng, startLat];
    const endPoint = [endLng, endLat];
    const option = { units: "kilometers" };
    const dist = distance(startPoint, endPoint, option);
    if(dist){
      return dist;
    }else{
      return 0 
    }
  };

  const locUser = user?.user?.location;
  // const calculatedDistance = calculateDistance(loc?.split(",")[1], loc?.split(",")[0],locPart?.split(",")[1], locPart?.split(",")[0],)
  return (
    <div className=" text-secondary my-12 mx-32">
      <Typography variant="h3">Restaurant Near You</Typography>
      <div className="flex  items-center gap-5 mt-10">
        {data?.length ? (
          <>
            {data
              ?.sort((a, b) => a.id - b.id)
              .map((item, idx) => {
                return (
                  <Link to={`/menu-list/${item.fullname}`}>
                    <Card key={idx} className="p-2 border border-gray-200">
                      <img
                        src={item.image}
                        alt="img"
                        className="w-[224px] h-[124px] object-cover"
                      />
                      <p className="font-avenir text-secondary font-bold text-lg py-2">
                        {item.fullname}
                      </p>
                      <p className="font-avenir text-secondary text-lg">
                        {item?.location
                          ? calculateDistance(
                              item?.location?.split(",")[1],
                              item?.location?.split(",")[0],
                              locUser?.split(",")[1],
                              locUser?.split(",")[0]
                            ).toFixed(2)
                          : "0"}
                        km
                      </p>
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
