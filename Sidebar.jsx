import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

export default function Sidebar() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [canAdd, setCanAdd] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://student-portal-api",
            scope: "openid profile email",
          },
        });

        const decoded = jwtDecode(token);
        const permissions = decoded.permissions || [];
        setCanAdd(permissions.includes("add:scholarship"));
      } catch (err) {
        console.error("Error getting permissions:", err);
      }
    };

    checkPermission();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      {/* 🔮 SIDEBAR STYLES */}
      <style>{`
        .futuristic-sidebar {
          width: 240px;
          min-height: 100vh;
          background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
          padding: 20px;
          box-shadow: 4px 0 20px rgba(0,0,0,0.4);
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 30px;
          background: linear-gradient(90deg, #00f5ff, #7cffcb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          margin-bottom: 8px;
          border-radius: 10px;
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.4);
          transform: translateX(4px);
        }

        .sidebar-footer {
          margin-top: auto;
        }

        .btn-login {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          border: none;
          border-radius: 10px;
          color: #fff;
          padding: 8px;
        }

        .btn-logout {
          background: linear-gradient(135deg, #ff4b2b, #ff416c);
          border: none;
          border-radius: 10px;
          color: #fff;
          padding: 8px;
        }

        .btn-login:hover,
        .btn-logout:hover {
          opacity: 0.9;
        }
      `}</style>

      {/*  SIDEBAR */}
      <div className="futuristic-sidebar d-flex flex-column">
        <h3 className="sidebar-title">CCAS COLLEGE</h3>

        <ul className="nav flex-column">
          <li>
            <Link className="sidebar-link" to="/"> Dashboard</Link>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <Link className="sidebar-link" to="/add-student"> Add Student</Link>
              </li>
              <li>
                <Link className="sidebar-link" to="/student-papers"> Add Papers</Link>
              </li>
              <li>
                <Link className="sidebar-link" to="/view-papers"> View Papers</Link>
              </li>

              {canAdd && (
                <li>
                  <Link className="sidebar-link" to="/add-scholarship"> Add Scholarship</Link>
                </li>
              )}

              <li>
                <Link className="sidebar-link" to="/view-scholarship"> View Scholarship</Link>
              </li>
            </>
          )}
        </ul>

        <div className="sidebar-footer d-flex flex-column gap-2 mt-4">
          {!isAuthenticated ? (
            <button className="btn btn-login btn-sm" onClick={loginWithRedirect}>
               Login
            </button>
          ) : (
            <button
              className="btn btn-logout btn-sm"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
               Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
