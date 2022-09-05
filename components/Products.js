import { ProductStyle } from "../styles/ProductStyle"
import Link from "next/link"

export default function Products({product}){
    const {title, price, image, slug} = product.attributes

    return (
        <ProductStyle>
            <Link href={`product/${slug}`}>
                <div>
                    <img src={image.data.attributes.formats.small.url} alt={title}></img>
                </div>
            </Link>
                <h2>{title}</h2>
                <h3>${price}</h3>
            
            
        </ProductStyle>
    )
}
