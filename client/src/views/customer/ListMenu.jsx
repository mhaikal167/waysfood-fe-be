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
  useEffect(() => {
    d(getProductP(id));
  }, [d, id]);

  const product = useSelector((state) => state.product);
  useEffect(() => {
    setListMenu(product?.product);
  }, [product?.product]);

  return (
    <>
      <div className=" p-12 mx-16">
        <Typography variant="h2" className="text-secondary font-avenir">
          {product?.product[0]?.user.fullname},Menus
        </Typography>
        {product?.loading ? (
          <Typography>Loading ...</Typography>
        ) : (
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
                      Rp. {item.price}
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
                          d(AddOrder(data, auth?.token));
                          d(GetOrder(auth?.token));
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
        )}
      </div>
    </>
  );
}
