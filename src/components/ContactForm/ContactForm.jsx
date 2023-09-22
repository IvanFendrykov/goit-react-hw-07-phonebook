import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

import { Formik } from 'formik';
import { BsFillTelephoneFill, BsPersonFill } from 'react-icons/bs';
import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
} from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };
  const handleSubmit = event => {
    event.preventDefault();

    const { name, number } = event.target.elements;
    const contValue = { name: name.value, phone: number.value };

    console.log('contValue: ', contValue.name);
    contacts.some(({ name }) => name === contValue.name)
      ? alert(`${contValue.name} is already in contacts`)
      : dispatch(addContact(contValue));
    setName('');
    setNumber('');
  };

  return (
    <Formik>
      <Form onSubmit={handleSubmit}>
        <FormField htmlFor="name">
          <LabelWrapper>
            <BsPersonFill />
            Name
          </LabelWrapper>
          <FieldFormik
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField htmlFor="number">
          <LabelWrapper>
            <BsFillTelephoneFill />
            Number
          </LabelWrapper>
          <FieldFormik
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
          <ErrorMessage name="number" component="span" />
        </FormField>

        <StyledButton type="submit">Add contact</StyledButton>
      </Form>
    </Formik>
  );
};
