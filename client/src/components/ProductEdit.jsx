import React, { Component } from "react";
import "./ProductEdit.css";
import { Redirect } from "react-router-dom";
import Layout from "./shared/Layout";
import { getProduct, updateProduct } from "../services/product";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "",
        description: "",
        imgURL: "",
        price: "",
        jType: "",
        jCollection: "",
      },
      updated: false,
    };
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const product = await getProduct(id);
    this.setState({ product });
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

  handleSubmit = async (event) => {
    event.preventDefault();
    let { id } = this.props.match.params;
    const updated = await updateProduct(id, this.state.product);
    this.setState({ updated });
  };

  render() {
    const { product, updated } = this.state;

    if (updated) {
      return <Redirect to={`/products/${this.props.match.params.id}`} />;
    }

    return (
      <Layout user={this.props.user}>
        <div className="product-edit">
          <div className="image-container">
            <img
              className="edit-product-image"
              src={product.imgURL}
              alt={product.name}
            />
            <form onSubmit={this.handleSubmit}>
              <input
                className="edit-input-image-link"
                placeholder="Image Link"
                value={product.imgURL}
                name="imgURL"
                required
                onChange={this.handleChange}
              />
            </form>
          </div>
          <form className="edit-form" onSubmit={this.handleSubmit}>
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
              cols={78}
              placeholder="Description"
              value={product.description}
              name="description"
              required
              onChange={this.handleChange}
            />
            <select
              className="jtype-dropdown"
              name="jType"
              required
              onChange={this.handleChange}
            >
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="earrings">Earrings</option>
            </select>
            <select
              className="jcollection-dropdown"
              name="jCollection"
              required
              onChange={this.handleChange}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="engagement">Engagement</option>
            </select>
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default ProductEdit;