import axios from 'axios'

export const FetchNftData = () => {

    const options = { method: 'GET', headers: { accept: 'application/json' } };

    return axios.get('https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=40', options)

}

