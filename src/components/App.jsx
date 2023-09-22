import {Section} from './Section/Section'
import { Header } from './Header/Header';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { FilterContacts } from './Filter/Filter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllContacts } from 'redux/operations';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);
  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
        <Header title="Contacts" />
        <FilterContacts />
        <ContactList />
      </Section>
    </>
  );
}

export default App;
