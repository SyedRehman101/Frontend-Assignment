import React from 'react'

const Cards = ({ seller, name, image, price, symbol, description, setIsOpen, setNftDetails, link }) => {
  return (
    <div className="shadow-xl rounded-md bg-[#250328] p-1  flip-card origin-center">
      <div className='flip-card-inner'>
        <div className=' my-auto flip-card-front'>
          <img src={image} alt="img" className="rounded-xl w-[250px] h-[300px] mx-auto" />
        </div>

        <div className="p-4 flip-card-back">
          <p className='text-sm text-base-100 text-white'>@{"Bilal Rehman"}</p>
          <h2 className="card-title text-xl text-base-100 py-3 font-medium text-white">{name}</h2>
          <button className=' duration-100 bg-[#AF44D4] text-white py-3 px-5 rounded-md text-sm' onClick={() => {
            setIsOpen(true)
            setNftDetails({
              name: name,
              image: image,
              description: description,
              price: price,
              link: link,
              seller:seller
            })
          }}>Read more</button>
        </div>
      </div>


    </div>

  )
}

export default Cards