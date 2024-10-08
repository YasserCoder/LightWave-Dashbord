import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Products from "./pages/Products";
import ProductDetails from "./features/products/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./features/orders/OrderDetails";
import Inbox from "./pages/Inbox";
import DisplayMessage from "./features/inbox/DisplayMessage";
import Users from "./pages/Users";
import UserDetails from "./features/users/UserDetails";
import Deals from "./pages/Deals";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-right"
            />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate replace to="home" />} />
                        <Route path="home" element={<Home />} />
                        <Route path="products/*" element={<Products />} />
                        <Route
                            path="products/product/:productId"
                            element={<ProductDetails />}
                        />
                        <Route path="orders" element={<Orders />} />
                        <Route
                            path="orders/order/:orderId"
                            element={<OrderDetails />}
                        />
                        <Route path="inbox" element={<Inbox />} />
                        <Route
                            path="inbox/message/:messageId"
                            element={<DisplayMessage />}
                        />
                        <Route path="users" element={<Users />} />
                        <Route
                            path="users/user/:userId"
                            element={<UserDetails />}
                        />
                        <Route path="profile" element={<Profile />} />
                        <Route path="deals" element={<Deals />} />
                        <Route path="categories" element={<Categories />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#fff",
                        color: "#374151",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
