import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = { product: [], loading: true };
  }



  componentDidMount() {
    this.populateWeatherData();
  }

  static renderproductTable(product) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Type</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {product.map(product =>
              <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_type}</td>
                  <td>{product.product_category}</td>
                  <td>{product.image}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderproductTable(this.state.product);

    return (
      <div>
        <h1 id="tabelLabel" >Run4It Database</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('api/Product');
    const data = await response.json();
    this.setState({ product: data, loading: false });
  }
}
