import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "@/constants";
import AxiosApi from "@/api/axios";
import { ProductParams, ProductsRes } from "./type";

function useProductsQuery(params?: ProductParams) {
  const queryKey = [PRODUCTS_QUERY_KEY, params];

  const query = useQuery<ProductsRes, Error>({
    queryKey,
    queryFn: ({ signal }) =>
      AxiosApi.get(`/products`, { signal, params }).then((res) => res.data),
    placeholderData: keepPreviousData,
  });

  return query;
}

export default useProductsQuery;
