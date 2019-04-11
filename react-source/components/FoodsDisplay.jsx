import React, { Component } from "react";
import * as herosService from "../services/herosService";

class FoodsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      id: 0,
      hero_name: "",
      first_name: "",
      last_name: "",
      favorite_food: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterdHeros = this.filterdHeros.bind(this);
  }
  componentDidMount() {
    herosService
      .getHeros()
      .then(this.onSuccess)
      .catch(this.onError);
  }
  onSuccess = resp => {
    debugger;
    let foods = resp.data;
    this.setState({ foods: foods });
    this.filterdHeros();
    console.log("service call", this.state.foods);
  };
  onError = resp => {
    console.log(resp);
  };

  readForm(e, name) {
    e.preventDefault();
    this.setState({ [name]: e.target.value });
  }
  handleSubmit(e) {
    debugger;
    e.preventDefault();
    let newHero = {
      id: this.state.foods.length + 1,
      hero_name: this.state.hero_name,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      favorite_food: this.state.favorite_food
    };
    this.state.foods.push(newHero);
    //console.log(this.state.foods);
    herosService
      .postHero(newHero)
      .then(this.postSuccessful)
      .catch(this.onError);
  }
  postSuccessful = () => {
    herosService
      .getHeros()
      .then(this.onSuccess)
      .catch(this.onError);
  };
  deleteHero(e, id) {
    e.preventDefault();
    console.log("delete", id);
    herosService
      .deleteHero({ id: id })
      .then(this.postSuccessful)
      .catch(this.onError);
  }
  filterdHeros() {
    if (this.state.foods) {
      let filtedHeros = [];
      let i = 0;
      // while (i < this.state.foods.length) {
      //   let item = this.state.foods[i]
      //   if (filtedHeros.indexOf(item.hero_name) != -1) {
      //     filtedHeros.push(item.hero_name);
      //   }
      //   i++;
      // }
      let newFoods =
        this.state.foods != undefined
          ? this.state.foods.filter((item, index) => {
              console.log(filtedHeros, item.hero_name);
              if (filtedHeros.indexOf(item.hero_name) != -1) {
                return true;
              } else {
                return false;
              }
            })
          : [];
      this.setState({
        foods: newFoods
      });
      console.log("filter", newFoods);
    }
  }
  render() {
    debugger;
    let foodsData = this.state.foods.length > 0 ? this.state.foods : [];
    //console.log(foodsData);

    return (
      <div className="container">
        <div>
          <div className="card card-body">
            <h2>Add Hero</h2>
            <form>
              <div className="form-group">
                <label>Hero name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="hero_name"
                  aria-describedby="emailHelp"
                  placeholder="Enter hero name"
                  value={this.state.hero_name}
                  name="hero_name"
                  onChange={e => {
                    this.readForm(e, "hero_name");
                  }}
                />
              </div>
              <div className="form-group">
                <label>First name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  placeholder="Enter first name "
                  value={this.state.first_name}
                  onChange={e => {
                    this.readForm(e, "first_name");
                  }}
                />
              </div>
              <div className="form-group">
                <label>Last name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  placeholder="Enter last name "
                  value={this.state.last_name}
                  onChange={e => {
                    this.readForm(e, "last_name");
                  }}
                />
              </div>
              <div className="form-group">
                <label>Favorite food: </label>
                <input
                  type="text"
                  className="form-control"
                  id="favorite_food"
                  placeholder="Enter favorite food "
                  value={this.state.favorite_food}
                  onChange={e => {
                    this.readForm(e, "favorite_food");
                  }}
                />
              </div>
              <button
                type="submit"
                value="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="list-group ">
          {foodsData.map(data => (
            <div
              className="border rounded d-flex w-100 justify-content-between"
              key={data.id}
            >
              <h5 className="mb-1">{data.hero_name}</h5>
              <p className="mb-1">First name: {data.first_name}</p>
              <p className="mb-1">Last name: {data.last_name}</p>
              <p className="mb-1">Favorite food: {data.favorite_food}</p>
              <button
                className="btn btn-danger"
                onClick={e => {
                  this.deleteHero(e, data.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FoodsDisplay;
