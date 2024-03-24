import "./SearchPage.css";
import Search from "../../components/Search/Search";
import FilterButton from "../../components/FilterButton/FilterButton";
import Sort from "../../components/Sort/Sort";
import RenderProducts from "../../components/RenderProducts/RenderProducts";
import Navbar from "../../components/Navbar/Navbar";
import FilterPopup from "../../components/FilterPopup/FilterPopup";
import {
  togglePopupContext,
  userInputContext,
  filteredDataContext,
  fetchProductsContext
} from "../../context/Context";
import { useContext, useEffect, useState } from "react";

const SearchPage = () => {
  // Import Context to Toggle Popup
  const { togglePopup } = useContext(togglePopupContext);

  // Import User Input from Global Context
  const { userInput } = useContext(userInputContext);
  // console.log(userInput);

  // Import filtered Data from Global Context
  const { filteredData, setFilteredData } = useContext(filteredDataContext);
  // console.log("filteredData: " + filteredData);

  // Import Global Product Fetch
  const { productsData } = useContext(fetchProductsContext);
  // console.log(productsData);

  // State for Categories Buttons
  const [catVal, setCatVal] = useState("");
  // console.log(catVal);

  // State for Price Buttons
  const [priceVal, setPriceVal] = useState("");
  // console.log(priceVal);

  // State for Brand Buttons
  const [brandsVal, setBrandsVal] = useState("");
  // console.log(brandsVal);

  // # State for No Results after Filtering in Popup
  const [noResult, setNoResult] = useState(false);
  // console.log(noResult);

  // filter all products
  useEffect(() => {
    let filter = productsData?.products?.filter((item) => {
      let finalPriceVal = "";

      if (priceVal === "20" && catVal === "" && brandsVal === "") {
        finalPriceVal = "20";
        return item.price > 0 && item.price <= finalPriceVal;
      } else if (priceVal === "50" && catVal === "" && brandsVal === "") {
        finalPriceVal = "50";
        return item.price > 20.01 && item.price <= finalPriceVal;
      } else if (priceVal === "100" && catVal === "" && brandsVal === "") {
        finalPriceVal = "100";
        return item.price > 50.01 && item.price <= finalPriceVal;
      } else if (priceVal === "100.01" && catVal === "" && brandsVal === "") {
        finalPriceVal = "100.01";
        return item.price > 100.01;
      } else if (
        catVal === item.category &&
        priceVal === "" &&
        brandsVal === ""
      ) {
        return item.category;
      } else if (brandsVal === item.brand && priceVal === "" && catVal === "") {
        return item.category;
      } else if (
        brandsVal === item.brand &&
        catVal === item.category &&
        priceVal === ""
      ) {
        return item.brand && item.category;
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "20"
      ) {
        finalPriceVal = "20";
        return item.category && item.price > 0 && item.price <= finalPriceVal;
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "50"
      ) {
        finalPriceVal = "50";
        return (
          item.category && item.price > 20.01 && item.price <= finalPriceVal
        );
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "100"
      ) {
        finalPriceVal = "100";
        return (
          item.category && item.price > 50.01 && item.price <= finalPriceVal
        );
      } else if (
        item.category === catVal &&
        brandsVal === "" &&
        priceVal === "100.01"
      ) {
        finalPriceVal = "100.01";
        return item.category && item.price > 100.01;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "20"
      ) {
        finalPriceVal = "20";
        return item.brand && item.price > 0 && item.price <= finalPriceVal;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "50"
      ) {
        finalPriceVal = "50";
        return item.brand && item.price > 20.01 && item.price <= finalPriceVal;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "100"
      ) {
        finalPriceVal = "100";
        return item.brand && item.price > 50.01 && item.price <= finalPriceVal;
      } else if (
        item.brand === brandsVal &&
        catVal === "" &&
        priceVal === "100.01"
      ) {
        finalPriceVal = "100.01";
        return item.brand && item.price > 100.01;
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "20"
      ) {
        finalPriceVal = "20";
        return (
          item.brand &&
          item.category &&
          item.price > 0 &&
          item.price <= finalPriceVal
        );
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "50"
      ) {
        finalPriceVal = "50";
        return (
          item.brand &&
          item.category &&
          item.price > 20.01 &&
          item.price <= finalPriceVal
        );
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "100"
      ) {
        finalPriceVal = "100";
        return (
          item.brand &&
          item.category &&
          item.price > 100.01 &&
          item.price <= finalPriceVal
        );
      } else if (
        item.brand === brandsVal &&
        catVal === item.category &&
        priceVal === "100.01"
      ) {
        finalPriceVal = "100.01";
        return item.brand && item.category && item.price > 100.01;
      }
    });

    if (filter.length === 0 && (catVal || priceVal || brandsVal)) {
      filter = ["noResult"];
    }

    // (catVall || priceVal || brandsVal) => Prüft, ob mindestens eine der Variablen einen Wert hat, der nicht gleich einem leeren String ist. Einen Wert erhalten sie, wenn sie im Popup ausgewählt werden und die API auch einen passenden Wert zurückgibt.

    setFilteredData(filter);
  }, [catVal, priceVal, brandsVal]);

  return (
    <>
      {togglePopup ? (
        <FilterPopup
          catVal={catVal}
          setCatVal={setCatVal}
          priceVal={priceVal}
          setPriceVal={setPriceVal}
          brandsVal={brandsVal}
          setBrandsVal={setBrandsVal}
          setNoResult={setNoResult}
        />
      ) : (
        <main>
          <h1>SearchPage</h1>
          <div className="search-filter">
            <Search />
            <FilterButton />
          </div>
          <Sort />
          <RenderProducts
            filteredData={filteredData}
            noResult={noResult}
            setNoResult={setNoResult}
          />
          <Navbar />
        </main>
      )}
    </>
  );
};

export default SearchPage;
