import { useNavigate } from 'react-router-dom';
import logo from '../assets/DocWise_Black.png';
import {jwtDecode} from 'jwt-decode';

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('/')}
              className="flex items-center gap-3 focus:outline-none"
            >
              <img className="h-10 w-10" src={logo} alt="Logo" />
              <p className="text-xl font-bold">DocWise</p>
            </button>
          </div>
          <div className="flex items-center gap-4">
            {isUserLoggedIn() ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavigate('/login')}
                  className="px-4 py-2 text-sm font-bold text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigate('/signup')}
                  className="px-4 py-2 text-sm font-bold text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
