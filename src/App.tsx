import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components";
import { AccountPage } from "./pages/AccountPage";
import { AfterSalesPage } from "./pages/AfterSalesPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { GeoMapPage } from "./pages/GeoMapPage";
import { HomePage } from "./pages/HomePage";
import { KnowledgePage } from "./pages/KnowledgePage";
import { KnowledgeTopicPage } from "./pages/KnowledgeTopicPage";
import { LoginPage } from "./pages/LoginPage";
import { MembershipPage } from "./pages/MembershipPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { OrdersPage } from "./pages/OrdersPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProfileDashboardPage } from "./pages/ProfileDashboardPage";
import { ProjectHostPage } from "./pages/ProjectHostPage";
import { ReportArchivePage } from "./pages/ReportArchivePage";
import { ReportDetailPage } from "./pages/ReportDetailPage";
import { ReportsPage } from "./pages/ReportsPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ShopPage } from "./pages/ShopPage";
import { ThemeShopPage } from "./pages/ThemeShopPage";
import { VirtualShopPage } from "./pages/VirtualShopPage";

export default function App() {
  return (
    <Routes>
      <Route element={<ProjectHostPage />} path="/services/:serviceId/live" />
      <Route element={<AppShell />}>
        <Route element={<HomePage />} index />
        <Route element={<ServicesPage />} path="/services" />
        <Route element={<ServiceDetailPage />} path="/services/:serviceId" />
        <Route element={<KnowledgePage />} path="/knowledge" />
        <Route
          element={<KnowledgeTopicPage topic="religions" />}
          path="/knowledge/religions"
        />
        <Route
          element={<KnowledgeTopicPage topic="eastern" />}
          path="/knowledge/eastern"
        />
        <Route
          element={<KnowledgeTopicPage topic="western" />}
          path="/knowledge/western"
        />
        <Route
          element={<KnowledgeTopicPage topic="hongkong" />}
          path="/knowledge/hongkong-folk"
        />
        <Route element={<GeoMapPage />} path="/knowledge/geo-map" />
        <Route element={<ShopPage />} path="/shop" />
        <Route element={<VirtualShopPage />} path="/shop/virtual" />
        <Route element={<CartPage />} path="/shop/cart" />
        <Route element={<CheckoutPage />} path="/shop/checkout" />
        <Route element={<PaymentPage />} path="/shop/payment" />
        <Route element={<OrderDetailPage />} path="/shop/order/:orderId" />
        <Route
          element={<ProductDetailPage />}
          path="/shop/product/:productId"
        />
        <Route element={<ThemeShopPage />} path="/shop/:slug" />
        <Route element={<ReportsPage />} path="/reports" />
        <Route element={<ReportDetailPage />} path="/reports/detail" />
        <Route element={<ReportArchivePage />} path="/reports/archive" />
        <Route element={<AccountPage />} path="/account" />
        <Route
          element={<ProfileDashboardPage />}
          path="/account/dashboard"
        />
        <Route element={<OrdersPage />} path="/account/orders" />
        <Route element={<AfterSalesPage />} path="/account/after-sales" />
        <Route element={<MembershipPage />} path="/account/membership" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Navigate replace to="/" />} path="/home" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}
