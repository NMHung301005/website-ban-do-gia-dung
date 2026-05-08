const Cart = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Giỏ hàng của bạn</h2>
      <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
        <p>Giỏ hàng đang trống.</p>
        {/* Sau này chúng ta sẽ map dữ liệu từ cartService ra đây */}
      </div>
    </div>
  );
};

export default Cart;