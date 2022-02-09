import React from 'react'
import styles from './Modal.module.css'

function Modal({handleModalClick}) {
  const [error, setError] = React.useState(null)
  const ref = React.createRef()

  React.useEffect(() => {
    function handleModalClose({target}) {
      if (target === ref.current) {
        handleModalClick()
      }
    }
    window.addEventListener('click', handleModalClose)
    return () => {
      window.removeEventListener('click', handleModalClose)
    }
  }, [handleModalClick, ref])

  const [email, setEmail] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !messageContent) {
      setError('Fill the fields above')
    }
    try {
      await fetch('http://localhost:5000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          message: messageContent
        })
      }) 
      alert('Message sent successfully.')
      handleModalClick()
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className={styles.modalContainer} ref={ref}>
      <form className={`${styles.form} animeLeft`} autoComplete='off' onSubmit={handleSubmit}>
        <h1>Send a new message</h1>
        <label htmlFor='email'>
          Your email:
        </label>
        <input type='text' id='email' name='email' value={email} onChange={({target}) => {setEmail(target.value)}}/>
        <label htmlFor='messageContent'>
          Your message:
        </label>
        <input type='text' id='messageContent' name='messageContent' value={messageContent} onChange={({target}) => {setMessageContent(target.value)}}/>
        {error && <span className={styles.error}>{error}</span>}
        <button>Send</button>
      </form>
    </div>
  )
}

export default Modal