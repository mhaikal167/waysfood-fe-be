import { Typography, Card, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import IconMap from "@Assets/images/map.png";
import TrashCan from "@Assets/images/trash.png";
import {
  AddOrder,
  DeleteOrder,
  GetOrder,
} from "../../config/redux/actions/orderAction";

export default function Cart({ auth }) {
  const order = useSelector((state) => state.order);
  console.log(auth?.user?.id);
  const d = useDispatch();
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
  // const calculateOngkir = (order.order.)

  return (
    <>
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
        <div className="grid grid-cols-12 gap-4 mt-2 mb-5">
          <input
            className="bg-white py-1 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 col-span-10"
            type="text"
            placeholder="Location"
          />
          <Button
            className="text-white bg-secondary col-span-2 w-full flex items-center justify-center gap-5"
            type="submit"
          >
            Select On Map
            <img src={IconMap} alt="iconmap" className="hidden md:block" />
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
                                        }, 1000);
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
                                      }, 1000);
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
                                <button className=" items-end m-auto mt-2" onClick={() => {
                                  d(DeleteOrder(item.id,auth?.token))
                                  setTimeout(() => {
                                    d(GetOrder(auth?.token))
                                  },1000)
                                   }}>
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
                   FREE
                </p>
              </div>
            </div>
            <div className=" py-6 border-secondary mx-4">
              <div className=" flex justify-between mb-3">
                <p className="font-avenir text-red-400 font-bold">Total</p>
                <p className="font-avenir text-red-400">
                  Rp. {subtotal ? subtotal.toLocaleString("id-ID") : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
