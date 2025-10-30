import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faShoppingBag,
  faXmark,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ authenticate, setAuthenticate }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuList = ['WOMEN', 'MEN', 'KIDS', 'HOME', 'SALE'];
  const navigate = useNavigate();

  const toggleLogin = () => {
    if (authenticate) {
      setAuthenticate(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isSearchOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen, isMenuOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const search = (event) => {
    if (event.key === 'Enter') {
      let keyword = event.target.value;
      navigate(`/?q=${keyword}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="navbar">
      <div className="sec-1">
        <div className="logo" onClick={goToHome}>
          <img
            width={50}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png"
            alt="logo"
          />
        </div>

        <div className="menu-area">
          <ul className="menu-list">
            {menuList.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div className="nav-sec">
        <button className="icon-search icon" onClick={toggleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {isSearchOpen && (
          <>
            <div className="overlay" onClick={toggleSearch}></div>
            <div className="search-open">
              <div className="input-search">
                <div className="search-area">
                  <button className="icon-search-open icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input
                    type="text"
                    className={`search-input ${isSearchOpen ? 'slide-in' : ''}`}
                    placeholder="Search..."
                    autoFocus
                    onKeyPress={search}
                  />
                </div>
                <button className="icon" onClick={toggleSearch}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          </>
        )}

        <button className="icon-login" onClick={toggleLogin}>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
        <button>
          <FontAwesomeIcon icon={faHeart} className="icon" />
        </button>
        <button className="icon-bag">
          <FontAwesomeIcon icon={faShoppingBag} className="icon" />
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div className="overlay" onClick={toggleMenu}></div>
          <div className={`side-menu ${isMenuOpen ? 'slide-in' : ''}`}>
            <button className="close-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <ul>
              {menuList.map((menu) => (
                <li key={menu}>{menu}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
