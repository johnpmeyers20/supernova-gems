import React, { Component } from "react";
import "./ProductCreate.css";
import Layout from "./shared/Layout";
import { Redirect } from "react-router-dom";
import { createProduct } from "../services/product";

class ProductCreate extends Component {
  constructor() {
    super();
    this.state = {
      product: {
        name: "",
        description: "",
        imgURL: "",
        price: "",
        jType: "",
        jCollection: "",
        featured: false,
      },
      created: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      product: {
        ...this.state.product,
        [name]: value,
      },
    });
  };

  handleFeaturedChange = (event) => {
    const value = event.target.value;
    let pulledState = { ...this.state };
    if (value == "true") {
      pulledState.product.featured = true;
    } else if (value == "false") {
      pulledState.product.featured = false;
    }
    this.setState({ product: pulledState.product });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const created = await createProduct(this.state.product);
    this.setState({ created });
  };

  render() {
    const { product, created } = this.state;

    if (created) {
      return <Redirect to={`/products`} />;
    }
    return (
      <Layout user={this.props.user}>
        <form className="create-form" onSubmit={this.handleSubmit}>
          <input
            className="input-name"
            placeholder="Name"
            value={product.name}
            name="name"
            required
            autoFocus
            onChange={this.handleChange}
          />
          <input
            className="input-price"
            placeholder="Price"
            value={product.price}
            name="price"
            required
            onChange={this.handleChange}
          />
          <textarea
            className="textarea-description"
            rows={10}
            placeholder="Description"
            value={product.description}
            name="description"
            required
            onChange={this.handleChange}
          />
          <input
            className="input-image-link"
            placeholder="Image Link"
            value={product.imgURL}
            name="imgURL"
            required
            onChange={this.handleChange}
          />
          <select
            className="jtype-dropdown"
            name="jType"
            required
            onChange={this.handleChange}
          >
            <option value="" disabled defaultValue>
              Type
            </option>
            <option value="ring">Ring</option>
            <option value="necklace">Necklace</option>
            <option value="earrings">Earrings</option>
            <option value="cufflinks">Cufflinks</option>
            <option value="bracelet">Bracelet</option>
          </select>
          <select
            className="jcollection-dropdown"
            name="jCollection"
            required
            onChange={this.handleChange}
          >
            <option value="" disabled defaultValue>
              Collection
            </option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="engagement">Engagement</option>
          </select>
          <select
            className="featured-dropdown"
            name="featured"
            required
            onChange={this.handleFeaturedChange}
          >
            <option defaultValue value="false">
              Not Featured
            </option>
            <option value="true">Featured</option>
          </select>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </Layout>
    );
  }
}

export default ProductCreate;
