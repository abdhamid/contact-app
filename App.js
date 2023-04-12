import { AppBar } from '@react-native-material/core';
import { Button, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import ContactList from './src/components/ContactList';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormModal from './src/components/FormModal';
import DeleteModal from './src/components/DeleteModal';
import { FAB } from 'react-native-paper';
import theme from './src/styles/theme.style'
const BASE_URL = "https://contact.herokuapp.com/contact"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [edit, setEdit] = useState(false)

  const openFormModal = () => {
    setShowFormModal(true)
  }

  const openEditModal = (item) => {
    setEdit(true)
    openFormModal()
    setSelectedContact(item)
  }

  const openAddModal = () => {
    setEdit(false)
    openFormModal()
  }

  const closeFormModal = () => {
    setShowFormModal(false)
    setEdit(false)
    setSelectedContact(null)
  }

  const openDeleteModal = (item) => {
    setShowDeleteModal(true)
    setSelectedContact(item)
  }
  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setEdit(false)
    setSelectedContact(null)
  }

  const handleSubmit = async (item) => {
    if (edit) {
      console.log(`${BASE_URL}/${item.id}`)
      await axios.put(`${BASE_URL}/${item.id}`, {
        firstName: item.firstName,
        lastName: item.lastName,
        age: item.age,
        photo: item.photo
      })
        .then(() => {
          closeFormModal()
          fetchData()
        })
        .catch(error => {
          console.log(error.response)
        })
    } else {
      await axios.post(BASE_URL, {
        firstName: item.firstName,
        lastName: item.lastName,
        age: item.age,
        photo: item.photo
      })
        .then(() => {
          closeFormModal()
          fetchData()
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }

  const handleDelete = async (item) => {
    var config = {
      headers: {
          'Accept':'application/json',
      }
  };
    console.log(`${BASE_URL}/${item.id}`)
    await axios.delete(`${BASE_URL}/${item.id}`, config)
      .then((res) => {
        console.log(res)
        console.log('here')
        closeDeleteModal()
        fetchData()
      })
      .catch(error => {
        console.log(error.response)
        closeDeleteModal()
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await axios.get(BASE_URL)
      .then(res => {
        var response = res.data
        setContacts(response.data)
      })
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar backgroundColor={theme.BACKGROUND} barStyle={theme.ON_BACKGROUND_TEXT}/>
      <AppBar title="Contact App"  color={theme.BACKGROUND} elevation={0}/>
      <View style={styles.listContainer}>
        <ContactList contacts={contacts} handleEdit={openEditModal} handleDelete={openDeleteModal} />
      </View>
      {showFormModal && (
        <FormModal isVisible={showFormModal} onDismissModal={closeFormModal} item={selectedContact} editForm={edit} onSubmit={handleSubmit} />
      )}
      {showDeleteModal && (
        <DeleteModal isVisible={showFormModal} onDismissModal={closeDeleteModal} item={selectedContact} onDelete={handleDelete} />
      )}
      <FAB
      style={styles.fab}
        icon='plus'
        label='Add new'
        color={theme.ON_PRIMARY_TEXT}
        onPress={openAddModal}
        mode='flat'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: theme.BACKGROUND,
  },
  listContainer: {
    flex: 1,
  },  
  fab: {
    backgroundColor: theme.PRIMARY,
    position: 'absolute',
    margin: 16,
    right:0,
    bottom:0
  }
});
