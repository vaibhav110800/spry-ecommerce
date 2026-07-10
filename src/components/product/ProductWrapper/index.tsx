import ProductGrid from "../ProductGrid";
import EmptyState from "../../common/EmptyState";
// import Pagination from "../../common/Pagination";
import ProductBanner from "../ProductBanner";
import { PRODUCTS_PER_PAGE } from "../../../utils/constant";
import { useEffect, useMemo } from "react";
import { filterProducts } from "../../../utils/filterProducts";
import { useProductStore } from "../../../store/productStore";
import { sortProducts } from "../../../utils/sortProducts";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import Wrapper from "../../common/Wrapper";

const ProductWrapper = () => {
  const products = useProductStore((state) => state.products);
  const search = useProductStore((state) => state.search);
  const category = useProductStore((state) => state.category);
  const rating = useProductStore((state) => state.rating);
  const sort = useProductStore((state) => state.sort);
  // const currentPage = useProductStore((state) => state.currentPage);
  // const setCurrentPage = useProductStore((state) => state.setCurrentPage);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts({
      products,
      search,
      category,
      rating,
    });

    return sortProducts({
      products: filtered,
      sort,
    });
  }, [products, search, category, rating, sort]);

  // const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // const paginatedProducts = filteredProducts.slice(
  //   (currentPage - 1) * PRODUCTS_PER_PAGE,
  //   currentPage * PRODUCTS_PER_PAGE,
  // );

  const { visibleCount, sentinelRef, hasMore } = useInfiniteScroll({
    totalItems: filteredProducts.length,
    batchSize: PRODUCTS_PER_PAGE,
    resetKey: `${search}-${category}-${rating}-${sort}`,
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <Wrapper>
      <ProductBanner
        products={products}
        filteredProducts={filteredProducts}
        paginatedProducts={visibleProducts}
      />
      {filteredProducts.length ? (
        <>
          <ProductGrid
            products={visibleProducts}
            sentinelRef={sentinelRef}
            hasMore={hasMore}
          />
          {/* <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
        </>
      ) : (
        <EmptyState
          title="No products found"
          description="Try changing your search, filters or refresh the page."
        />
      )}
    </Wrapper>
  );
};

export default ProductWrapper;
