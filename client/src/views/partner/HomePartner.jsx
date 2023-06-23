import { Typography, CardBody, Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetTransPartner } from "../../config/redux/actions/transactionAction";
import { useDispatch, useSelector } from "react-redux";

export default function HomePartner({ auth }) {
  const [dataTable, setDataTable] = useState([]);
  const trans = useSelector((state) => state.trans);
  const d = useDispatch();
  const TABLE_ROWS = [
    "No",
    "Name",
    "Total Price",
    "Product Order",
    "Status",
    "Action",
  ];
  useEffect(() => {
    d(GetTransPartner(auth?.token));
  }, []);

  useEffect(() => {
    setDataTable(trans?.transaction);
  }, [trans?.transaction]);
  return (
    <>
      <div className="p-20">
        <Typography variant="h2" className="text-secondary font-abhava">
          Income Transaction
        </Typography>
        <Card className="h-full w-full">
          <CardBody className="overflow-scroll px-0">
            <table className=" m-auto font-avenir w-full min-w-max table-auto text-left ">
              <thead>
                <tr>
                  {TABLE_ROWS.map((item, idx) => {
                    return (
                      <th
                        key={idx}
                        className="border border-secondary bg-[#8282826a] py-2 px-2"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {item}
                        </Typography>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {dataTable.length ? (
                  dataTable.map((item, idx) => {
                    return (
                      <>
                        <tr>
                          <td className="px-2 py-1 border border-secondary">
                            <Typography variant="p">{idx + 1}</Typography>
                          </td>
                          <td className="px-2 border border-secondary">
                            <Typography>{item?.buyer?.fullname}</Typography>
                          </td>
                          <td className="px-2 border border-secondary">
                            <Typography>Rp.{item?.totalPrice.toLocaleString("id-ID")}</Typography>
                          </td>
                          <td className="px-2 border border-secondary w-[200px]">
                            <div className="w-[160px]">
                              {item.carts.map((product, idx) => {
                                return (
                                  <>
                                    <Typography className="truncate" key={idx}>
                                      {product.product.title}
                                    </Typography>
                                  </>
                                );
                              })}
                            </div>
                          </td>
                          <td className=" border border-secondary px-2 font-avenir">
                            <p className={item?.status === "success" ? `text-success` : item?.status === "pending" ? `text-primary` : "text-cancel" }>{item?.status}</p>
                          </td>
                          <td className="px-2 border border-secondary">F</td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>
                    <p className="mx-6">No data ...</p>
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
