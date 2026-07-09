import { useEffect, useMemo, useState } from "react";
import { FiHeart, FiMoon, FiShoppingBag, FiSun } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

import Dropdown from "../common/Dropdown";
import Input from "../common/Input";

import { ratingOptions, sortOptions } from "../../utils/constant";

import { useProductStore } from "../../store/productStore";

import styles from "./index.module.css";
import useDebounce from "../../hooks/useDebounce";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useProductStore((state) => state.categories);
  const search = useProductStore((state) => state.search);
  const category = useProductStore((state) => state.category);
  const rating = useProductStore((state) => state.rating);
  const sort = useProductStore((state) => state.sort);
  const theme = useProductStore((state) => state.theme);
  const setSearch = useProductStore((state) => state.setSearch);
  const setCategory = useProductStore((state) => state.setCategory);
  const setRating = useProductStore((state) => state.setRating);
  const setSort = useProductStore((state) => state.setSort);
  const favoriteProductsCount = useProductStore(
    (state) => state.favoriteProducts.length,
  );
  const toggleTheme = useProductStore((state) => state.toggleTheme);
  const [searchValue, setSearchValue] = useState(search);

  const debouncedSearch = useDebounce(searchValue, 400);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category,
        value: category,
      })),
    [categories],
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <button
            className={styles.logoButton}
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go to home page"
          >
            <span className={styles.logoIcon} aria-hidden>
              <FiShoppingBag />
            </span>
            Spry E-commerce
          </button>
        </h1>

        <div className={styles.search}>
          <Input
            value={searchValue}
            label="Search products"
            placeholder="Search products..."
            onChange={setSearchValue}
          />
        </div>

        <div className={styles.filters}>
          <Dropdown
            value={category}
            label="Filter by category"
            options={categoryOptions}
            onChange={setCategory}
          />

          <Dropdown
            value={rating}
            label="Filter by rating"
            options={ratingOptions}
            onChange={setRating}
          />

          <Dropdown
            value={sort}
            label="Sort products"
            options={sortOptions}
            onChange={setSort}
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={toggleTheme}
          >
            {theme === "light" ? <FiMoon aria-hidden /> : <FiSun aria-hidden />}
          </button>

          <button
            className={`${styles.iconButton} ${
              location.pathname === "/favorites" ? styles.active : ""
            }`}
            type="button"
            aria-label={`View favorites${
              favoriteProductsCount ? `, ${favoriteProductsCount} saved` : ""
            }`}
            aria-current={
              location.pathname === "/favorites" ? "page" : undefined
            }
            onClick={() => navigate("/favorites")}
          >
            <FiHeart aria-hidden />

            {favoriteProductsCount > 0 && (
              <span className={styles.badge} aria-hidden>
                {favoriteProductsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
