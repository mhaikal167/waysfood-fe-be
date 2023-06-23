import IconMap from "@Assets/images/map.png";
import TrashCan from "@Assets/images/trash.png";
import MapModal from "@Components/Map";
import { Button, Card, Dialog, Typography } from "@material-tailwind/react";
import { distance } from "@turf/turf";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API, APILOC } from "../../config/api/api";
import {
  AddOrder,
  DeleteAllOrder,
  DeleteOrder,
  GetOrder,
} from "../../config/redux/actions/orderAction";

export default function Cart({ auth }) {
  const order = useSelector((state) => state.order);
  const d = useDispatch();
  const nav = useNavigate();
  const total = order.order.map((item) => {
    return item.qty * item.product.price;
  });
  const subtotal = total.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const totalQty = order.order.map((item) => {
    return item.qty;
  });
  const subtotalQty = totalQty.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // const mapCenter = { lat: -6.17511, lng: 106.865036 };
  const [openMap, setOpenMap] = useState(false);
  const [dataLocation, setDataLocation] = useState();
  const [dataDir, setDataDir] = useState(auth?.user.location);
  const getLocation = async (lats, lngs) => {
    await APILOC.get(`/reverse?format=json&lat=${lats}&lon=${lngs}`).then(
      (response) => {
        console.log(response, "ini response");
        setDataLocation(response?.data?.display_name);
      }
    );
  };
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    let location = `${lat},${lng}`;
    setDataDir(location);
  };
  console.log(dataDir, "inidatar");
  const handleOpenMap = () => {
    setOpenMap((prev) => !prev);
  };

  useEffect(() => {
    if (dataDir) {
      getLocation(parseFloat(dataDir?.split(",")[0]),parseFloat(dataDir?.split(",")[1]));
      d(DeleteAllOrder(auth?.token));
    }
  }, [dataDir]);
  const calculateDistance = (startLng, startLat, endLng, endLat) => {
    const startPoint = [startLng, startLat];
    const endPoint = [endLng, endLat];
    const option = { units: "kilometers" };
    const dist = distance(startPoint, endPoint, option);
    return dist;
  };

  const locPart = order?.order[0]?.seller?.location;
  const calculatedDistance = calculateDistance(
    dataDir?.split(",")[1],
    dataDir?.split(",")[0],
    locPart?.split(",")[1],
    locPart?.split(",")[0]
  );
  const distances = calculatedDistance?.toFixed(2);
  const ongkir = 4000;
  const totalOngkir = distances * ongkir;
  const totalOrder = subtotal + totalOngkir;

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  const handlePay = async () => {
    if (totalOrder === NaN) {
      Swal.fire("please entry your location");
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      };
      const dataOrder = {
        totalPrice: totalOrder,
        seller_id: order?.order[0]?.seller_id,
      };
      const body = JSON.stringify(dataOrder);
      const response = await API.post("/transaction", body, config);
      console.log(response);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          d(DeleteAllOrder(auth?.token));
          Swal.fire("Paid Success", result, "success");
          setTimeout(() => {
            nav("/");
          }, 1000);
        },
        onPending: function (result) {
          d(DeleteAllOrder(auth?.token));
          Swal.fire("Paid Success", result, "success");
          setTimeout(() => {
            nav("/");
          }, 1000);
        },
        onError: function (result) {
          Swal.fire("Cancelled", result, "error");
        },
        onClose: function () {
          Swal.fire("Cancelled", "Your Book has been canceled :)", "error");
        },
      });
      d(DeleteAllOrder(auth?.token));
    }
  };

  const handleOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "To purchase this order?",
      icon: "info",
      showCancelButton: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handlePay();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Pay has Cancelled :)", "error");
      }
    });
  };

  const MapModals = () => {
    return (
      <Fragment>
        <Dialog
          size="sm"
          open={openMap}
          handler={handleOpenMap}
          className="bg-transparent shadow-none"
        >
          <Card>
            <MapModal
              selectedLat={dataDir?.split(",")[0]}
              selectedLng={dataDir?.split(",")[1]}
              handleMapClick={handleMapClick}
            />
          </Card>
        </Dialog>
      </Fragment>
    );
  };

  return (
    <>
      <MapModals />
      <div className="p-20">
        <Typography
          className="text-black font-abhava font-extrabold text-4xl"
          variant="h1"
        >
          {order?.order[0]?.seller?.fullname}{" "}
        </Typography>
        <Typography className="text-coklat font-avenir text-lg mt-5">
          Delivery Location
        </Typography>
        <div className="grid grid-cols-12 gap-4">
          <input
            className={`py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 col-span-10`}
            type="text"
            value={dataLocation ? dataLocation : "Please Select the Map"}
            placeholder="Location"
          />
          <Button
            className="text-white bg-secondary col-span-2 flex items-center justify-center gap-5"
            onClick={handleOpenMap}
          >
            Select On Map
            <img src={IconMap} alt="iconmap" />
          </Button>
        </div>
        <Typography className="text-coklat font-avenir text-lg mt-5 mb-2">
          Review Your Order
        </Typography>
        <div className="grid grid-cols-12 justify-between">
          <div id="left-content" className=" w-full col-span-8 ">
            {order.order.length === 0 ? (
              <>
                <p className="font-avenir text-coklat">No order ...</p>
              </>
            ) : (
              <>
                {order.order
                  .sort((a, b) => a.id - b.id)
                  .map((item, idx) => {
                    const isLast = idx === order.order.length - 1;
                    const classes = isLast
                      ? "border-b-2 border-t-2 py-6 border-secondary"
                      : "border-t-2 py-6 border-secondary";
                    return (
                      <>
                        <div className={classes}>
                          <div className="flex ">
                            <img
                              src={item.product.image}
                              alt="products"
                              className="w-24 h-24 object-cover"
                            />
                            <div className="flex gap-5 justify-between items-center mx-4  w-full">
                              <div>
                                <p className="font-abhava font-extrabold text-base">
                                  {item.product.title}
                                </p>
                                <div className="flex item-center gap-3 mt-2">
                                  <button
                                    onClick={() => {
                                      if (item?.qty > 1) {
                                        let data = {
                                          qty: item.qty - 1,
                                          buyer_id: item.buyer_id,
                                          seller_id: item?.seller_id,
                                          product_id: item?.product_id,
                                        };
                                        d(AddOrder(data, auth?.token));
                                        setTimeout(() => {
                                          d(GetOrder(auth?.token));
                                        }, 500);
                                      }
                                    }}
                                    className="px-4"
                                  >
                                    <p className=" text-center text-2xl font-light ">
                                      -
                                    </p>
                                  </button>

                                  <p className="bg-[#F6E6DA] px-4 rounded mt-2">
                                    {item?.qty}
                                  </p>
                                  <button
                                    onClick={() => {
                                      let data = {
                                        qty: item?.qty + 1,
                                        buyer_id: item?.buyer_id,
                                        seller_id: item?.seller_id,
                                        product_id: item?.product_id,
                                      };
                                      d(AddOrder(data, auth?.token));
                                      setTimeout(() => {
                                        d(GetOrder(auth?.token));
                                      }, 500);
                                    }}
                                    className="px-4"
                                  >
                                    <p className=" text-center text-2xl font-light">
                                      {" "}
                                      +{" "}
                                    </p>
                                  </button>
                                </div>
                              </div>

                              <div className=" flex flex-col">
                                <p className="font-abhava font-medium text-base text-red-400">
                                  Rp.{" "}
                                  {(
                                    item.product.price * item.qty
                                  ).toLocaleString("id-ID")}
                                </p>
                                <button
                                  className=" items-end m-auto mt-2"
                                  onClick={() => {
                                    d(DeleteOrder(item.id, auth?.token));
                                    setTimeout(() => {
                                      d(GetOrder(auth?.token));
                                    }, 1000);
                                  }}
                                >
                                  <img
                                    src={TrashCan}
                                    alt="products"
                                    className="w-6 h-6 object-fill "
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            )}
            <div></div>
          </div>
          <div id="right-content" className="col-span-4">
            <div className=" border-t-2 border-b-2 py-3 border-secondary mx-4">
              <div className=" flex justify-between mb-4">
                <p className="font-avenir">SubTotal</p>
                <p className="font-avenir text-red-400">
                  {" "}
                  Rp. {subtotal ? subtotal.toLocaleString("id-ID") : 0}
                </p>
              </div>
              <div className=" flex justify-between mb-4">
                <p className="font-avenir">Qty</p>
                <p className="font-avenir"> {subtotalQty ? subtotalQty : 0}</p>
              </div>
              <div className=" flex justify-between mb-3">
                <p className="font-avenir">Ongkir</p>
                <p className="font-avenir text-red-400">
                  Rp.{totalOngkir.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className=" py-6 border-secondary mx-4">
              <div className=" flex justify-between mb-3">
                <p className="font-avenir text-red-400 font-bold">Total</p>
                <p className="font-avenir text-red-400">
                  Rp. {totalOrder ? totalOrder?.toLocaleString("id-ID") : 0}
                </p>
              </div>
            </div>
            <Button
              className="text-white bg-secondary col-span-2 w-full flex items-center justify-center gap-5"
              type="submit"
              onClick={handleOrder}
            >
              Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
