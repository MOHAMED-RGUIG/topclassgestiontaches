import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-56 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`} // Changed w-72 to w-56 for smaller width
    >
      <div className="relative">
        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          ripple={false}
          className="absolute left-0 top-0 grid xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <ArrowLeftIcon strokeWidth={2.5} className="h-5 w-5 text-blue-gray-500" /> {/* Slide back icon */}
        </IconButton>

        <Link to="https://topclass.ma/" className="py-6 px-8 text-center mt-6">
          {/* Replace brandName text with an image */}
          <img
            src={brandImg}
            alt="Brand Logo"
            className="mx-auto h-12 w-auto"
            style={{ width: "80px", height: "auto" }} // Adjusted logo size for smaller sidebar
          />
        </Link>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-2 px-3 capitalize" // Reduced padding and gap for smaller buttons
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize text-sm" // Made the text smaller
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo_footer.png", // Default image path
  brandName: "TopClass", // Default brand name if no image is provided
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
