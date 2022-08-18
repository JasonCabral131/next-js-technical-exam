import React, { useContext, useEffect, useState } from "react";
import { TechTestContext } from "../../config/context";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import ProductCard from "../ProductCard";

const HeaderSearchBar = () => {
  const {
    product: { products },
  } = useContext(TechTestContext);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(true);
  const [currentActive, setCurrentActive] = useState(0);
 
  useEffect(() => {
    if (search) {
      setModal(true);
      setCurrentActive(0);
    } else {
      setModal(false);
    }
  }, [search]);
  const handleGetSearch = () => {
    //cant find api call with query of /product?search=${search}

    if (Array.isArray(products)) {
      const result = products.filter((data) => {
        const sr = search.toLowerCase();
        if (
          data?.fields?.Name.toString().toLowerCase().includes(sr) ||
          data?.fields?.Brand.toString().toLowerCase().includes(sr)
        )
          return data;
      });
      console.log("i am render here", products);
      return result;
    }
    console.log("i am render here xx");
    return [];
  };
  const currentSearch = () => {
    try {
      if (handleGetSearch().length) {
        return handleGetSearch()[currentActive];
      }
      return null;
    } catch (e) {
      return null;
    }
  };
  return (
    <React.Fragment>
      <div className="search-container">
        <input
          type={"search"}
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search) {
              setModal(true);
            }
          }}
        />
        <BiSearchAlt2 size={18} color="#fff" className="search-icons"  onClick={() => {
          if ( search) {
            setModal(true);
          }
        }}/>
      </div>
      {modal && (
        <div className="search-modal">
          <div className="search-container-modal">
            <IoCloseOutline
              size={25}
              className="modal-close pointer"
              onClick={() => setModal(false)}
            />

            {handleGetSearch().length ? (
              <React.Fragment>
                <div className="w-25 bg-grey modal-search-left-container">
                  {handleGetSearch().map((dt, key) => {
                    return (
                      <div
                        className={`link-view pointer ${
                          key === currentActive ? "active" : ""
                        }`}
                        key={key}
                        onClick={() => {
                          setCurrentActive(key);
                        }}
                      >
                        {dt.fields.Name}
                      </div>
                    );
                  })}
                </div>
                <div className="w-75 modal-search-right-container">
                  {currentSearch() && <ProductCard product={currentSearch()} />}
                </div>
              </React.Fragment>
            ) : (
              <div className="w-100">
                <h3 className="text-center w-100">Product Not Found !!</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HeaderSearchBar;
