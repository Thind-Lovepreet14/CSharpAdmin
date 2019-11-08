import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../constants';

class RegistrationForm extends React.Component {
    state = {
        id: 0,
        product_name: '',
        product_type: '',
        product_category: '',
        image: ''
    }
    componentDidMount() {
        if (this.props.user) {
            const { id, product_name, product_type, product_category, image } = this.props.user
            this.setState({ id, product_name, product_type, product_category, image});
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: this.state.product_name,
                product_type: this.state.product_type,
                product_category: this.state.product_category,
                image: this.state.image
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                product_name: this.state.product_name,
                product_type: this.state.product_type,
                product_category: this.state.product_category,
                image: this.state.image
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="product_name">Product:</Label>
                <Input type="text" name="product_name" onChange={this.onChange} value={this.state.product_name === '' ? '' : this.state.product_name} />
            </FormGroup>
            <FormGroup>
                <Label for="product_type">Type:</Label>
                <Input type="text" name="product_type" onChange={this.onChange} value={this.state.product_type === null ? '' : this.state.product_type} />
            </FormGroup>
            <FormGroup>
                <Label for="product_category">Category:</Label>
                <Input type="text" name="product_category" onChange={this.onChange} value={this.state.product_category === null ? '' : this.state.product_category} />
            </FormGroup>
            <FormGroup>
                <Label for="image">Image:</Label>
                <Input type="text" name="image" onChange={this.onChange} value={this.state.image === null ? '' : this.state.image}
                    placeholder="./image/" />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default RegistrationForm;