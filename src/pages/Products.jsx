import Item from "../components/Item";
import { products } from "../data/products";

function Products() {
  return (
    <div className="products">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
