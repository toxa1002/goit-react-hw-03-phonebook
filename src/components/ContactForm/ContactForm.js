import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

export default class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleInputChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };

    handleSubmitForm = e => {
        e.preventDefault();
        const { name, number } = this.state;
        const isValidForm = this.validateForm();
        if (isValidForm) {
            this.props.onSubmit({ id: nanoid(), name, number });
        } else return;
        this.reset();
    };
    validateForm = () => {
        const { name, number } = this.state;
        const { onChekunike } = this.props;
        if (!name || !number) {
            alert('Empty field! Please fill');
            return false;
        }
        return onChekunike(name);
    };
    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    };

    render() {
        const { name, number } = this.state;
        return (
            <form className={s.form} onSubmit={this.handleSubmitForm}>
                <h3>Name</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={this.handleInputChange}
                ></input>

                <h3>Number</h3>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    placeholder="123-45-67"
                    value={number}
                    onChange={this.handleInputChange}
                ></input>
                <button className={s.buttonForm} type="submit">
                    Add contact
                </button>
            </form>
        );
    }
}
