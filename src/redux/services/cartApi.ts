import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Pagination} from "./types/ProductInterface.tsx";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL +"/cart",
      prepareHeaders: (headers) => {
          const token =localStorage.getItem("access");
          if (token) {
              headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
      },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    /** Get all carts */
    getAllCarts: builder.query<Pagination<{id:string,product:number,quantity:number}>, any>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: ["Cart"]
    }),
    /** Add carts */
   addCart: builder.mutation<any, {product:number}>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body
      }),
      invalidatesTags: ["Cart"]
    }),
  }),
});

export const { useGetAllCartsQuery ,useAddCartMutation} = cartApi;
