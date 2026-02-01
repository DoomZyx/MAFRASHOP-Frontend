import { useAuth } from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrders";
import { useOrdersPage } from "../../hooks/useOrdersPage";
import Nav from "../../components/nav/nav";
import HeroBg from "../../components/shop/herobg/heroBg";
import Loader from "../../components/loader/loader";
import Footer from "../../components/footer/footer";
import OrdersContent from "../../components/orders/OrdersContent/OrdersContent";
import "./orders.scss";

function Orders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, isLoading, error } = useOrders();
  const {
    downloadingInvoice,
    getStatusLabel,
    getStatusClass,
    getDeliveryStatusLabel,
    getDeliveryStatusClass,
    toggleOrderExpanded,
    isOrderExpanded,
    formatDate,
    formatPrice,
    handleDownloadInvoice,
  } = useOrdersPage();

  if (authLoading) {
    return (
      <div className="orders-loading">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <HeroBg />
        <Nav />
        <div className="no-authenticated-container">
          <h2 className="no-authenticated-msg">
            Vous ne pouvez pas accéder à cette page sans être connecté
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeroBg />
      <Nav />
      <div className="orders-page">
        <OrdersContent
          orders={orders}
          isLoading={isLoading}
          error={error}
          downloadingInvoice={downloadingInvoice}
          formatDate={formatDate}
          formatPrice={formatPrice}
          getStatusLabel={getStatusLabel}
          getStatusClass={getStatusClass}
          getDeliveryStatusLabel={getDeliveryStatusLabel}
          getDeliveryStatusClass={getDeliveryStatusClass}
          isOrderExpanded={isOrderExpanded}
          onToggleExpand={toggleOrderExpanded}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>
      <Footer />
    </>
  );
}

export default Orders;

