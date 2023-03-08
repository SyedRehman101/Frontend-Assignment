import React from 'react'
import { useState, useEffect } from 'react'
import Cards from './Components/Cards'
import { FetchNftData } from './Services/Network'
import logo from './assets/images/nft-logo.svg'
import Modal from 'react-modal/lib/components/Modal'
import { AiOutlineClose } from 'react-icons/ai';
import loader from './assets/images/loader.svg'


const App = () => {

  const [data, setData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [nftDetails, setNftDetails] = useState({
    name: "",
    image: "",
    price: 0,
    description: "",
    link: "",
    seller: ""
  });

  useEffect(() => {
    FetchNftData().then((response => {
      setData(response.data.orders)
    })).catch((err) => console.log(err));
  }, [])


  return (
    <div className='mx-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-violet-600'>


      {
        data.length > 0 ? (<>
          <div className='p-3 flex justify-center items-center linear-gradient(to right, rgb(107, 33, 168), rgb(76, 29, 149), rgb(107, 33, 168)) shadow-xl'>
            <img className='' src={logo} alt='img' />
          </div>
          <div className='container mx-auto grid grid-cols-5 gap-6 mt-11'>
            {

              data.map((value, i) => {
                return (
                  value.maker_asset_bundle?.assets[0].name && value.maker_asset_bundle?.assets[0].permalink ? (<>
                    <Cards
                      setIsOpen={setIsOpen}
                      setNftDetails={setNftDetails}
                      image={value.maker_asset_bundle?.assets[0].image_url}
                      name={value.maker_asset_bundle?.assets[0].name}
                      symbol={value.taker_asset_bundle?.assets[0].symbol}
                      price={Intl.NumberFormat('en-US', {
                        notation: "compact",
                        maximumFractionDigits: 1
                      }).format(value.current_price)}
                      description={value.maker_asset_bundle?.assets[0].description}
                      link={value.maker_asset_bundle?.assets[0].permalink}
                      seller={value.maker_asset_bundle?.assets[0].asset_contract.owner}
                    />

                  </>) : (<></>)
                )
              })
            }
            <Modal

              style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',

                },
                content: {
                  position: 'absolute',
                  top: '40px',
                  left: '300px',
                  right: '40px',
                  bottom: '40px',
                  width: "1000px",
                  border: '1px solid #ccc',
                  color: "white",
                  background: '#250328',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '20px',

                }
              }}
              isOpen={isOpen}
              shouldCloseOnOverlayClick={true}
              aria={{
                labelledby: "heading",
                describedby: "full_description"
              }}>
              <div className='flex justify-end'>
                <button className=' hover:animate-spin ' onClick={() => setIsOpen(false)}>
                  <AiOutlineClose className='text-xl' />
                </button>
              </div>
              <div id="full_description" className='flex justify-center flex-col gap-5'>
                <p className='text-[#AF44D4] font-bold'><span className='text-xl font-semibold text-white'>NFT : </span>{nftDetails.name}</p>
                <img className="rounded-xl w-[250px] h-[300px] mx-auto" alt='img' src={nftDetails.image} />
                <p><span className='text-xl font-semibold'>Description</span> : {nftDetails.description}</p>
                <div>
                  <p className='text-red-500'><span className='text-lg font-semibold text-white'>Price : </span> {(nftDetails.price)}</p>
                  <p className='text-blue-500'><span className='text-lg font-semibold text-white'>Owned by :</span> {(nftDetails.seller)}</p>
                </div>

                <a className='duration-100 bg-[#AF44D4] w-2/3 text-center text-white py-3 px-5 rounded-md text-sm mx-auto' target="_blank" href={nftDetails.link}>Buy NFT</a>
              </div>
            </Modal>

          </div>

        </>) : (<div className='flex justify-center items-center h-screen'>
          <img className='w-60 h-52 animate-pulse' alt='loader' src={loader} />
        </div>)
      }


    </div>
  )
}

export default App