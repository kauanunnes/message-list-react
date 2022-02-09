import React from 'react'
import Loading from '../Loading/Loading'
import Modal from '../Modal/Modal'
import styles from './MessageList.module.css'
import MessageListItem from './MessageListItem'

function MessageList() {
  const [messages, setMessages] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [modal, setModal] = React.useState(false)

  function handleModalClick() {
    setModal(!modal)
  }

  React.useEffect(() => {
    setLoading(true)
    fetch('http://localhost:5000/message')
    .then(response => response.json())
    .then(json => {
      setMessages(json)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [modal])
  if (loading) return <Loading />
  return (
    <main className={styles.mainContainer}>
    <header className={styles.header}>
      <h1>Messages</h1>
      <button onClick={handleModalClick}>Add new message</button>
    </header>
    <section className={styles.messageList}>
      {messages.map(({id, email, message, created_at}) => <MessageListItem key={id} content={message} email={email} created_at={created_at} /> )}
    </section>
    {modal && <Modal handleModalClick={handleModalClick} /> }
    </main>
  )
}

export default MessageList