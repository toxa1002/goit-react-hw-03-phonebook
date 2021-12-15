import { Component } from 'react';
import ContactsList from './components/ContactsList';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

componentDidMount() {
    if (localStorage.getItem("contacts") !== null) {
      const contacts = JSON.parse(localStorage.getItem("contacts"));
      this.setState({ contacts: contacts });
    }
  }

componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

    handleSubmitForm = newContact => {
        this.setState(({ contacts }) => ({
            contacts: [...contacts, newContact],
        }));
    };

    handleUniceContact = name => {
        const { contacts } = this.state;
        const isContactThere = contacts.find(contact => contact.name === name);
        if (isContactThere) {
            alert('Contact is exist');
            return;
        }
        return !isContactThere;
    };
    handleRemoveContact = id =>
        this.setState(({ contacts }) => ({
            contacts: contacts.filter(contact => contact.id !== id),
        }));

    handleFilterSearch = filter => this.setState({ filter });

    filterContacts = () => {
        const { contacts, filter } = this.state;
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    render() {
        const { filter } = this.state;
        const filteredContacts = this.filterContacts();
        return (
            <>
                <h2>Phonebook</h2>
                <ContactForm
                    onSubmit={this.handleSubmitForm}
                    onChekunike={this.handleUniceContact}
                />
                <h2>Contacts</h2>
                <h3>Find contacts by name</h3>
                <Filter filter={filter} onChange={this.handleFilterSearch} />
                <ContactsList
                    contacts={filteredContacts}
                    onRemove={this.handleRemoveContact}
                />
            </>
        );
    }
}

export default App;