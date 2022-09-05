import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import {DetailsStyle, ProductInfo,Quantity, Buy} from "../../styles/ProductDetails"
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai"
import {useStateContext, onAdd} from "../../lib/context"
import toast from 'react-hot-toast'
import {useEffect, userEffect} from 'react'


export default function ProductDetails() {
    const {qty, increaseQty, decreaseQty, onAdd, setQty} = useStateContext()

    //Reset Qty
    useEffect(() => {
        setQty(1);
    }, []);

    //Fetch slug
    const { query } = useRouter();

    //Fetch Graphql data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: { slug: query.slug },
    });
    const { data, fetching, error } = results;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    //Extract Data
    console.log(data)
    const { title, description, image, slug } = data.products.data[0].attributes;
    const notify = () => {
        toast.success (`${title} added to your cart`, {duration: 1500});
    };
    return (
        <DetailsStyle>
            <img src={image.data.attributes.formats.medium.url} alt={title}/>
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button onClick={decreaseQty}><AiFillMinusCircle/></button>
                    <p>{qty}</p>
                    <button onClick={increaseQty}><AiFillPlusCircle/></button>
                </Quantity>
                <Buy onClick={()=>{
                    onAdd(data.products.data[0].attributes,qty);
                    notify();
                }}>Add to cart</Buy>
            </ProductInfo>
        

        </DetailsStyle>
    )
}