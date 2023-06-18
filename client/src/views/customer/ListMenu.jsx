import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductP } from "../../config/redux/actions/productAction";
import { Button, Card, Typography } from "@material-tailwind/react";
import { AddOrder, GetOrder } from "../../config/redux/actions/orderAction";
import Swal from "sweetalert2";

export default function ListMenu({ auth }) {
  const { id } = useParams();
  const d = useDispatch();
  const [listMenu, setListMenu] = useState();

  const product = useSelector((state) => state.product);
  useEffect(() => {
    setListMenu(product?.product);
  }, [product?.product]);
  const partner = useSelector((state) => state.partner);

  const partnerID = partner?.partner.find((item) => item.fullname === id);
  useEffect(() => {
    d(getProductP(partnerID.id));
  }, [d]);
 
  return (
    <>
      <div className=" p-12 mx-16">
        <Typography variant="h2" className="text-secondary font-avenir">
          {partnerID?.fullname
            ? partnerID?.fullname + ",Menus"
            : "merchant tidak ditemukan"}
        </Typography>
        {product?.loading ? (
          <Typography>Loading ...</Typography>
        ) : listMenu?.length > 0 ? (
          <div className="flex mt-6 gap-16 flex-wrap">
            {listMenu?.map((item, idx) => {
              return (
                <>
                  <Card
                    key={idx}
                    className="p-2 border border-gray-200 rounded-none"
                  >
                    <img
                      src={item.image}
                      alt="product-image"
                      className="w-[224px] h-[134px] object-fill"
                    />
                    <p className="font-abhava font-medium text-base">
                      {item.title}
                    </p>
                    <p className="font-abhava font-medium text-base text-red-400">
                     Rp. {item.price.toLocaleString("id-ID")}
                    </p>
                    <Button
                      className="py-1 mt-4 bg-primary text-black rounded-sm"
                      onClick={() => {
                        if (auth?.user) {
                          let data = {
                            qty: 1,
                            buyer_id: auth?.user.id,
                            seller_id: item.user.id,
                            product_id: item.id,
                          };
                          d(AddOrder(data, auth?.token))
                          setTimeout(() => {
                            d(GetOrder(auth?.token));
                          },2000)
                        } else {
                          Swal.fire("Please Login");
                        }
                      }}
                    >
                      Order
                    </Button>
                  </Card>
                </>
              );
            })}
          </div>
        ) : (
          <>
            <Typography
              className="mt-10 font-avenir text-secondary"
              variant="h2"
            >
              No Product ....
            </Typography>
          </>
        )}
      </div>
    </>
  );
}
