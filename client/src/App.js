import { Route, Routes } from "react-router-dom";
import * as E from "@Views";
import * as C from "@Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckAuth } from "./config/redux/actions/authAction";
import { PrivateRoutePartner, PrivateRouteUser, PublicRoute } from "./config/routes/PrivateRoute";
function App() {
  const auth = useSelector((state) => state.auth);
  const d = useDispatch();

  useEffect(() => {
    if (auth?.token) {
      d(CheckAuth(auth.token));
    }
  }, [d, auth?.token]);
  return (
    <>
      <C.Navbar />
      <Routes>
        <Route element={<PublicRoute auth={auth} />}>
          <Route path="/" element={<E.Home />} />
          <Route path="/test" element={<E.Test />} />
          <Route path="/menu-list/:id" element={<E.ListMenu auth={auth}/>}/>
        </Route>
        <Route element={<PrivateRoutePartner auth={auth} />}>
          <Route path="/partner" element={<E.HomePartner auth={auth} />} />
          <Route path="/add-product" element={<E.AddProduct auth={auth}/>} />
          <Route path="/profile-partner" element={<E.ProfilePartner auth={auth}/>}/>
          <Route path="/edit-partner" element={<E.EditPartner auth={auth}/>}/>
        </Route>
        <Route element={<PrivateRouteUser auth={auth} />}>
          <Route path="/cart" element={<E.Cart auth={auth}/>} />
          <Route path="/profile-user" element={<E.ProfileUser auth={auth}/>}/>
          <Route path="/edit-profile" element={<E.EditPartner auth={auth}/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
