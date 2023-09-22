import { Btn, Item, List } from './ContactList.styled';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';

import { deleteContact } from 'redux/operations';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const onDelContact = contId => {
    dispatch(deleteContact(contId));
  };

  return (
    <List>
      {filteredContacts.length > 0 &&
        filteredContacts.map(({ id, name, phone }) => (
          <Item key={id}>
            {name}: <span> {phone}</span>
            <Btn onClick={() => onDelContact(id)}>Delete</Btn>
          </Item>
        ))}
    </List>
  );
};
