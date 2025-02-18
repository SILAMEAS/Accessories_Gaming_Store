
### Accessories_Gaming_Store

---
- Reinstall Dependencies from Scratch

        rm -rf node_modules package-lock.json
        npm cache clean --force
        npm install


  
### Config vite router in vercel

---
- <vite.config.ts>
          export default defineConfig({
          plugins: [react()],
          server:{
            port:3003
          },
          base:"/"
        })

- create file <vercel.json>
          {
          "rewrites": [
            {
              "source": "/(.*)",
              "destination": "/index.html"
            }
          ]
        }
### Best Configuration Protected Route
---
        const PublicRoute = () => {
        const role=useAppSelector(state=>state.application.role)
        const {resultRefreshToken,resultUserDetail}=useProtectedRoute();
        /** When refresh token and user detail is loading or fetching it will log in main loading **/
        if(resultRefreshToken.isLoading||resultUserDetail.isLoading||resultUserDetail.isFetching){
            return <MainLoading/>
        }
        /** if data of refresh token and get user detail is finish it will check depend on role of user login **/
        if(resultUserDetail.currentData){
            /** if you are public it will show public layout */
            if(role===EnumRole.PUBLIC)
                return <AppProvider> <PublicLayout/></AppProvider>
            /** else if user is not public it will redirect to url of role that user login
                example : if you log in as user  it will redirect to /user  routes
                          if you log in as admin it will redirect to /admin routes
             */
            else
                /** navigate to url user log in  **/
                return <Navigate to={RedirectUrlByRole[role as EnumRole]} replace/>
        }else {
            /** if your user detail is null or undefined it will return route of public */
            return <AppProvider> <PublicLayout/></AppProvider>
        }
    };

    export default PublicRoute;

---

## Router Configuration
---
        import {Route} from "./constants/Route.ts";
    import NotFound404 from "./NotFound404.tsx";
    import App from "./App.tsx";
    import {createBrowserRouter, Navigate} from "react-router-dom";
    import {Navigator} from "./utils/common/Navigator.tsx";
    import {
    AdminCartPage,
    AdminCategoryPage,
    AdminHome,
    AdminOrdersPage,
    AdminRatingPage,
    HomePublic,
    Login,
    ProductDetail,
    SignUp,
    UserHome,
    LayoutProduct,
    PublicRoute,
    EndUserRoute,
    AdminRoute
    } from "./routerLazy.ts"
    
    
    export const routesConfig = [
    {
    element: <PublicRoute/>,
    children: [
    {
    index: true,
    element: (
    <Navigate
    to={`${Navigator(Route.public.PRODUCT).pathname}`}
    replace
    />
    ),
    },
    {
    path: Route.public.LOGIN,
    element: <Login />,
    },
    {
    path: Route.public.PRODUCT,
    element:<LayoutProduct/>,
    },
    {
    path: Route.public.PRODUCT_ID,
    element: <ProductDetail/>,
    },
    {
    path: Route.public.SIGN_UP,
    element: <SignUp/>,
    },
    {
    path: Route.public.HOME,
    element: <HomePublic/>,
    },
    {
    path: Route.public.ABOUT,
    element: <>ABOUT PUBLIC</>,
    },
    ]
    },
    {
    path: "*",
    element: <NotFound404 />,
    },
    {
    path: Route.ROOT,
    element: <App />,
    errorElement: <NotFound404 />,
    children: [
    /** End user-Route */
    {
    path: "/",
    element: <EndUserRoute/>,
    children: [
    {
    index: true,
    element: (
    <Navigate
    to={`${Navigator(Route.endUser.HOME).pathname}`}
    replace
    />
    ),
    },
    {
    path: Route.endUser.HOME,
    element:  <UserHome />,
    },
    {
    path: Route.endUser.PRODUCT,
    element: <LayoutProduct />,
    },
    {
    path: Route.endUser.PRODUCT_ID,
    element: <ProductDetail />,
    },
    ],
    },
    /** Admin-Route */
    {
    path: "/",
    element: <AdminRoute/>,
    children: [
    {
    index: true,
    element: <Navigate to={`${Navigator(Route.admin.HOME).pathname}`} replace />,
    },
    {
    path: Route.admin.HOME,
    element: <AdminHome />,
    },
    {
    path: Route.admin.PRODUCT,
    element: <LayoutProduct />,
    },
    {
    path: Route.admin.PRODUCT_ID,
    element: <ProductDetail />,
    },
    {
    path: Route.admin.CART,
    element: <AdminCartPage/>
    },
    {
    path: Route.admin.ORDER,
    element: <AdminOrdersPage/>
    },
    {
    path: Route.admin.CATEGORY,
    element: <AdminCategoryPage/>
    },
    {
    path: Route.admin.RATE,
    element: <AdminRatingPage/>
    },
    ],
    },
    ],
    },
    ];
    
    export const router = createBrowserRouter(routesConfig);
---