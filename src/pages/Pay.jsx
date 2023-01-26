import { useContext, useState, useEffect } from 'react'
import { Context } from '../context/Context';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../images/logo.jpg'
import wretch from "wretch";

function Pay() {
    const { user, dispatch } = useContext(Context);
    const KEY = 'pk_test_51MQsVDA4djL6B7leOUBr07SgHBFRSL8iDxdVTx4q0tpwnqds9FP1APh2Yipoe09CRVEO3cg4WyLiPM062k2hlKmz00NENUns4G';
    const authToken = user?.accessToken;

    const onToken = async (token) => {
        await wretch("https://udhamini-api.azurewebsites.net/api/checkout/payment")
            .post({
                amount: 2000,
                token,
            })
            .json().then((data) => { data?.id && upgradeTier(user) })
            .catch((error) => { console.log(error.message) })
    }

    const upgradeTier = async (user) => {
        await wretch(`https://udhamini-api.azurewebsites.net/api/users/update/${user._id}`)
            .headers({ token: `Bearer ${authToken}` })
            .put({
                premium_tier_available: true,
                "id": user._id
            })
            .json().then((data) => { dispatch({ type: 'LOGIN_SUCCESS', payload: data }) })
            .catch((error) => { console.log(error.message) })
    }

    return (
        <div className='flex justify-center'>
            <StripeCheckout
                name='udhamini'
                image={logo}
                billingAddress
                shippingAddress
                description='Your total pay is $20 for your premium tier'
                amount={2000}
                token={onToken}
                stripeKey={KEY}
            >
                <button className='btn btn-info btn-outline'>Pay $20 to upgrade to Premium Tier</button>
            </StripeCheckout>
        </div>
    )
}
// 4242 4242 4242 4242
export default Pay