import { Button, Typography } from "@material-tailwind/react";
import Upload from "@Assets/images/upload.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "@Config/redux/actions/productAction";

export default function AddProduct({auth}) {
  const [dataProduct, setDataProduct] = useState([]);
  const d = useDispatch()

  const style =
    "bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set("title",dataProduct?.title)
        formData.set("image" ,dataProduct.image[0],dataProduct.image[0].name)
        formData.set("price",dataProduct?.price)
        d(addProducts(formData,auth?.token))
        setTimeout(() => {
            window.location.reload()
        },1000)
    }
  return (
    <>
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-16 gap-5">
            <Typography variant="h2" className="text-secondary font-avenir">
              Ini Add Product
            </Typography>
            <div className="flex flex-col lg:grid lg:grid-cols-8 gap-5">
              <input
                className={`${style} col-span-6`}
                type="text"
                onChange={(e) => {
                  setDataProduct((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
                placeholder="Title.."
                required
              />
              <div className=" relative w-full col-span-2">
                <input
                  className={`${style} w-full`}
                  type="file"
                  onChange={(e) => {
                    setDataProduct((prev) => ({
                      ...prev,
                      image: e.target.files,
                    }));
                  }}
                  required
                />
                <img src={Upload} className="absolute top-1 right-2 "  alt="upload"/>
              </div>
            </div>

            <input
              className={`${style} col-span-8`}
              type="number"
              onChange={(e) => {
                setDataProduct((prev) => ({ ...prev, price: e.target.value }));
              }}
              placeholder="Price.."
              required
            />
            <div className=" flex justify-end">
              <Button
                className="text-white bg-secondary w-full md:w-1/4 lg:w-1/5"
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
