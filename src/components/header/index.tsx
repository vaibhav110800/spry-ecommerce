import { useMemo } from "react";
import { FiHeart, FiMoon } from "react-icons/fi";

import Dropdown from "../common/Dropdown";
import Input from "../common/Input";

import { ratingOptions, sortOptions } from "../../utils/constant";

import { useProductStore } from "../../store/productStore";

import styles from "./index.module.css";

const Header = () => {
  const {
    categories,

    search,
    category,
    rating,
    sort,

    setSearch,
    setCategory,
    setRating,
    setSort,

    favoriteIds,
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
        <h1 className={styles.logo}>ShopEase</h1>

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
            <FiMoon />
          </button>

          <button className={styles.iconButton}>
            <FiHeart />

            {favoriteIds.length > 0 && (
              <span className={styles.badge}>{favoriteIds.length}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
