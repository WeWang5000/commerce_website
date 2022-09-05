import {useRouter} from "next/router"
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
import {withPageAuthRequired, getSession} from "@auth0/nextjs-auth0"
import styled from 'styled-components'
import formatMoney from "../lib/formatMoney"

// ctx -- context which give us access of useRouter
// GetSession -- get user


//getting all the payment info that a specific customer made, from server
export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
        const session = getSession(ctx.req, ctx.res)
        const stripeID = session.user[`${process.env.BASE_URL}/stripe_customer_id`]
        const paymentIntents = await stripe.paymentIntents.list({
            customer: stripeID,
        })
        return {props:{orders: paymentIntents.data}}
    }
})


export default function Profile({user,orders}){
    const route = useRouter()
    console.log(orders)
    return (
        user && (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div>
                    {orders.map((order)=> (
                        <Order>
                            <h1>Order Number: {order.id}</h1>
                            <h2>Amount: {formatMoney(order.amount)}</h2>
                            <h2>Receipt Email: {user.email}</h2>
                        </Order>
                    ))}
                </div>
                <button onClick={() => route.push("/api/auth/logout")}>Logout</button>
            </div>
        )
    )
}

const Order = styled.div`
    background: white;
    margin: 2rem 0rem;
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    h1{
        font-size: 1rem
    }
`