import React from 'react'
import styles from './MessageListItem.module.css'

function MessageListItem({email, content, created_at}) {
  return (
    <div className={styles.message}>
      <header className={styles.messageHeader}>
        <h3>by: {email}</h3>
        <span>{ new Date(created_at).toLocaleDateString() }</span>
      </header>
      <p>{content}</p>

    </div>
  )
}

export default MessageListItem