const Banner = () => {
    return (
      <div className='bg-blue-500 text-white rounded-2xl p-10 flex items-center justify-between'>
        <div>
          <h1 className='text-5xl font-bold mb-4'>
            Đồ gia dụng thông minh
          </h1>
          <p className='text-lg'>Giảm giá đến 40%</p>
        </div>
  
        <img
          src='https://cdn.tgdd.vn/Products/Images/1942/315744/noi-com-dien-tu-sharp-ks-com18v-650x650.jpg'
          className='w-64 rounded-xl'
        />
      </div>
    )
  }
  
  export default Banner