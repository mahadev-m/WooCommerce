import "tailwindcss/tailwind.css";
import React, { useContext } from "react";
import { ShopContext } from "../context/shop";

export default function Home({ posts }) {
  const contextData = useContext(ShopContext);

  console.log({ posts });
  return (
    <div>
      {posts.products.nodes.map((post) => {
        return (
          <div className=" w-full  md:flex md:flex-wrap md:p-2 ">
            <div
              className="lg:w-1/4 md:w-1/2 w-5/6 lg:h-1/4 m-auto mb-6 border-2
          lg:m-10 sm:w-3/4 text-center border-gray-100 overflow-hidden shadow-xl
          hover:shadow-md "
            >
              <ul>
                <li>{post.name}</li>
                <img src={post.image.sourceUrl} alt="product image" />
                <h3>{post.price}</h3>

                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => {
                    contextData.addProductToCart(post);
                  }}
                >
                  Add To Cart
                </button>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://ecart.local/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
  query MyQuery {
  products(first: 10) {
    nodes {
      id
      link
      image {
        sourceUrl
      }
      description
      slug
      ... on VariableProduct {
        id
        name
        price
      }
      ... on ExternalProduct {
        id
        name
        price
      }
      ... on GroupProduct {
        id
        name
        
      }
      ... on SimpleProduct {
        id
        name
        price
      }
    }
  }
}


`,
    }),
  });

  const json = await res.json();

  return {
    props: {
      posts: json.data,
    },
  };
}
