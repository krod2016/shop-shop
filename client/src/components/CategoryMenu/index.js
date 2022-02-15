import React, { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/globalstate";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY, UPDATE_PRODUCTS } from '../../utils/actions';

function CategoryMenu({ setCategory }) {
  const [state, dispatch] = useStoreContext();
const { id } = useParams();

const [currentProduct, setCurrentProduct] = useState({})

const { loading, data } = useQuery(QUERY_PRODUCTS);

const { products } = state;

useEffect(() => {
  if (products.length) {
    setCurrentProduct(products.find(product => product._id === id));
  } else if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products
    });
  }
}, [products, data, dispatch, id]);

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );  
}

export default CategoryMenu;
