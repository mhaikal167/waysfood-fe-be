import { Typography, CardBody, Card } from "@material-tailwind/react";
import { useState } from "react";

export default function HomePartner() {
  const [dataTable, setDataTable] = useState([]);
  const TABLE_ROWS = [
    "No",
    "Name",
    "Address",
    "Product Order",
    "Status",
    "Action",
  ];
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
                  <tr>
                    <td className="px-2 py-1 border border-secondary">
                      <Typography variant="p">1</Typography>
                    </td>
                    <td className="px-2 border border-secondary">
                      <Typography>Sugeng No pants</Typography>
                    </td>
                    <td className="px-2 border border-secondary">
                      <Typography>Cileungsi</Typography>
                    </td>
                    <td className="px-2 border border-secondary w-[200px]">
                      <div className="w-[160px]">
                        <Typography className="truncate">
                          Paket Geprek,paket kepulauan
                        </Typography>
                      </div>
                    </td>
                    <td className=" border border-secondary px-2 font-avenir">
                      <p className={`text-success`}>Success</p>
                    </td>
                    <td className="px-2 border border-secondary">F</td>
                  </tr>
                ) : (
                  <>
                  <p className="mx-6">
                  No data ...
                  </p>
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
