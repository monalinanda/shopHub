import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDeatil from "./components/ProductDeatil";
import {StateContext} from "./utils/StateContext";
import {Toaster} from "react-hot-toast";
import Success from "./components/Success";
import Cancel from "./components/Cancel";


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
     {
      path: "/product/:id",
      element: <ProductDeatil/>,
    },
    {
      path: "/cart",
      element: <Cart/>,
    },
    {
      path: "/success",
      element: <Success/>,
    },
    {
      path: "/cancel",
      element: <Cancel/>,
    }
  ]);
 

  return (
    <StateContext>
    <div className=" m-0 p-0 w-screen h-screen overflow-scroll">
    <Toaster/>
      <RouterProvider router={appRouter} />
    </div>
    </StateContext>
  );
}

export default App;
