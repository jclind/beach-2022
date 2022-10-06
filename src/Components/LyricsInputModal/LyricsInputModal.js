import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../util/useClickOutside'
import './LyricsInputModal.scss'

const LyricsInputModal = ({ onClose, addSong }) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const [title, setTitle] = useState('')
  const [lyricText, setLyricsText] = useState('')

  const [formattedText, setFormattedText] = useState([])

  const handleLyricPaste = e => {
    const newValue = e.target.value

    if (newValue.length <= 0) {
      setFormattedText([])
    } else {
      const paragraphs = newValue.split('\n\n')
      const sentences = []
      setFormattedText(
        newValue.split('\n\n').map(el => {
          return el.split('\n')
        })
      )
    }

    setLyricsText(newValue)
  }

  return ReactDom.createPortal(
    <>
      <div className='add-lyrics-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Add Song Lyrics</div>
          <input
            type='text'
            placeholder='Title'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            rows='18'
            onChange={handleLyricPaste}
            value={lyricText}
            placeholder='Lyrics'
          ></textarea>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button
              className='confirm-btn'
              disabled={formattedText.length === 0}
              onClick={() => addSong(title, formattedText)}
            >
              Add Song
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default LyricsInputModal
