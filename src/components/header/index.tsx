import { useMemo } from "react";
import { FiHeart, FiMoon, FiSun } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

import Dropdown from "../common/Dropdown";
import Input from "../common/Input";

import { ratingOptions, sortOptions } from "../../utils/constant";

import { useProductStore } from "../../store/productStore";

import styles from "./index.module.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    categories,

    search,
    category,
    rating,
    sort,
    theme,

    setSearch,
    setCategory,
    setRating,
    setSort,

    favoriteProducts,
    toggleTheme,
  } = useProductStore();

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
        <h1 className={styles.logo} onClick={() => navigate("/")}>
          Spry E-commerce
        </h1>

        <div className={styles.search}>
          <Input
            value={search}
            placeholder="Search products..."
            onChange={setSearch}
          />
        </div>

        <div className={styles.filters}>
          <Dropdown
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />

          <Dropdown
            value={rating}
            options={ratingOptions}
            onChange={setRating}
          />

          <Dropdown value={sort} options={sortOptions} onChange={setSort} />
        </div>

        <div className={styles.actions}>
          <button className={styles.iconButton} onClick={toggleTheme}>
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          <button
            className={`${styles.iconButton} ${
              location.pathname === "/favorites" ? styles.active : ""
            }`}
            onClick={() => navigate("/favorites")}
          >
            <FiHeart />

            {favoriteProducts.length > 0 && (
              <span className={styles.badge}>{favoriteProducts.length}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
