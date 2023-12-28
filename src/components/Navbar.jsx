import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/slices/authSlice";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <header className="head">
      <ul className="nav">
        <li className="nav-list">
          <Link to="/">Product</Link>
        </li>
        {user && (
          <li className="nav-list">
            <Link to="/cart">
              Cart{" "}
              <span className="cart-num">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>
          </li>
        )}
        {user ? (
          <button onClick={handleSignout}>Signout</button>
        ) : (
          <li className="nav-list">
            <Link to="/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Navbar;
