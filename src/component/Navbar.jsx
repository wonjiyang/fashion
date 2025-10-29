import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faShoppingBag,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuList = ['WOMEN', 'MEN', 'KIDS', 'HOME', 'SALE'];
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const search = (event) => {
    if (event.key === 'Enter') {
      let keyword = event.target.value;
      navigate(`/?q=${keyword}`);
      setIsSearchOpen(false); // Enter를 눌렀을 때 overlay 닫기
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
          width={50}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png"
          alt="logo"
        />
        <div className="menu-area">
          <ul className="menu-list">
            {menuList.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </div>
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

        <button className="icon-login" onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
        <button>
          <FontAwesomeIcon icon={faHeart} className="icon" />
        </button>
        <button className="icon-bag">
          <FontAwesomeIcon icon={faShoppingBag} className="icon" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
