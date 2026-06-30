import { useEffect, useMemo, useState } from "react";
import { FiHeart, FiMoon } from "react-icons/fi";

import Dropdown from "../common/Dropdown";
import Input from "../common/Input";

import { getProductCategories } from "../../services/productApi";
import { ratingOptions, sortOptions } from "../../utils/constant";

import styles from "./index.module.css";

const Header = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getProductCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

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
            value=""
            placeholder="Search products..."
            onChange={() => {}}
          />
        </div>

        <div className={styles.filters}>
          <Dropdown value="All" options={categoryOptions} onChange={() => {}} />

          <Dropdown value={0} options={ratingOptions} onChange={() => {}} />

          <Dropdown value="" options={sortOptions} onChange={() => {}} />
        </div>

        <div className={styles.actions}>
          <button className={styles.iconButton}>
            <FiMoon />
          </button>

          <button className={styles.iconButton}>
            <FiHeart />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
