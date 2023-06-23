import { Button, Typography, Dialog, Card } from "@material-tailwind/react";
import Upload from "@Assets/images/upload.png";
import { useEffect, useState, Fragment } from "react";
import IconMap from "@Assets/images/map.png";
import { useDispatch } from "react-redux";
import { updateUserInitiate } from "../../config/redux/actions/authAction";
import MapModal from "@Components/Map";
import { APILOC } from "../../config/api/api";

export default function EditProfile({ auth }) {
  const [dataProfile, setDataProfile] = useState([]);
  const [dataLocation, setDataLocation] = useState();
  const d = useDispatch();
  const style =
    "bg-[#d2d2d25b] py-2 rounded-md px-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  useEffect(() => {
    setDataProfile(auth?.user);
  }, []);

  const getLocation = (lats, lngs) => {
    APILOC.get(`/reverse?format=json&lat=${lats}&lon=${lngs}`).then(
      (response) => {
        console.log(response, "ini response");
        setDataLocation(response?.data?.display_name);
      }
    );
  };
  const [openMap, setOpenMap] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLat(lat);
    setLng(lng);
  };

  const handleOpenMap = () => {
    setOpenMap(true);
  };
  const handleCloseMap = () => {
    setOpenMap(false);
  };
console.log(auth?.user.location.split(",")[0],"lat");
const latUser = auth?.user.location.split(",")[0]
const lngUser = auth?.user.location.split(",")[1]
  useEffect(() => {
    if (lat && lng) {
      getLocation(lat, lng);
      console.log("engga ini yg terender");
    } else if(latUser && lngUser){
      getLocation(
        parseFloat(latUser),
        parseFloat(lngUser)
      );
      console.log("ini terrednder");
    }
  }, [lat, lng, auth?.user]);

  const loc = `${lat}, ${lng}`;
  console.log(loc,"ini loxxc");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fullname", dataProfile?.fullname);
    formData.set("email", dataProfile?.email);
    formData.set("phone", dataProfile?.phone);
    if (dataProfile?.image[0].name) {
      formData.set("image", dataProfile?.image[0], dataProfile?.image[0].name);
    } else {
      formData.set("image", "");
    }
    formData.set("location", loc);
    d(updateUserInitiate(auth?.user?.id, formData, auth?.token));
  };

  const MapModals = () => {
    return (
      <Fragment>
        <Dialog
          size="sm"
          open={openMap}
          handler={handleCloseMap}
          className="bg-transparent shadow-none"
        >
          <Card>
            <MapModal
              selectedLat={lat}
              selectedLng={lng}
              handleMapClick={handleMapClick}
            />
          </Card>
        </Dialog>
      </Fragment>
    );
  };
  return (
    <>
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-16 gap-5">
            <Typography variant="h2" className="text-secondary font-avenir">
              Ini Edit Profile
            </Typography>
            <div className="flex flex-col lg:grid lg:grid-cols-8 gap-5">
              <input
                className={`${style} col-span-6`}
                type="text"
                onChange={(e) => {
                  setDataProfile((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }));
                }}
                value={dataProfile?.fullname}
                placeholder="Nama Partner ..."
              />
              <div className=" relative w-full col-span-2">
                <input
                  className={`${style} w-full`}
                  type="file"
                  onChange={(e) => {
                    setDataProfile((prev) => ({
                      ...prev,
                      image: e.target.files,
                    }));
                  }}
                />
                <img
                  src={Upload}
                  className="absolute top-1 right-2 "
                  alt="upload"
                />
              </div>
            </div>

            <input
              className={`${style}`}
              type="email"
              onChange={(e) => {
                setDataProfile((prev) => ({ ...prev, email: e.target.value }));
              }}
              placeholder="Email"
              value={dataProfile?.email}
            />
            <input
              className={`${style}`}
              type="text"
              onChange={(e) => {
                setDataProfile((prev) => ({ ...prev, phone: e.target.value }));
              }}
              placeholder="Phone"
              value={dataProfile?.phone}
            />
            <div className="grid grid-cols-12 gap-4">
              <input
                className={`${style} col-span-10`}
                type="text"
                onChange={(e) => {
                  setDataProfile((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }));
                }}
                value={dataLocation}
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
      <MapModals />
    </>
  );
}
