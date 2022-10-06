import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import LyricsInputModal from './LyricsInputModal/LyricsInputModal'
import { AiOutlineClose } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'

const SelectionContainer = () => {
  const [songList, setSongList] = useState(() => {
    const data = JSON.parse(localStorage.getItem('songList'))
    if (data) return data
    return []
  })
  const [isLyricsInputModalOpen, setIsLyricsModalOpen] = useState(false)
  const navigate = useNavigate()

  const addSong = (title, lyrics) => {
    const updatedLyrics = [[title], ...lyrics]
    setSongList([...songList, { title, lyrics: updatedLyrics, id: uuidv4() }])

    setIsLyricsModalOpen(false)
  }
  const removeSong = id => {
    const updatedSongList = [...songList].filter(song => song.id !== id)
    setSongList(updatedSongList)
  }

  useEffect(() => {
    localStorage.setItem('songList', JSON.stringify(songList))
  }, [songList])

  const startSlideshow = () => {
    navigate('/slideshow')
  }

  return (
    <div className='selection-container'>
      <div className='song-list'>
        {songList.map(el => {
          const handleDeleteClick = e => {
            e.stopPropagation()

            removeSong(el.id)
          }

          return (
            <button className='song-item' key={el.id}>
              <AiOutlineClose className='icon' onClick={handleDeleteClick} />
              <div className='title'>{el.title}</div>
              <div className='text'>{el.lyrics[1][0].substring(0, 100)}...</div>
            </button>
          )
        })}
      </div>
      <button
        className='add-song-btn'
        onClick={() => setIsLyricsModalOpen(true)}
      >
        Add Song
      </button>
      <button className='start-slideshow' onClick={startSlideshow}>
        Start Slideshow
      </button>

      {isLyricsInputModalOpen && (
        <LyricsInputModal
          onClose={() => setIsLyricsModalOpen(false)}
          addSong={addSong}
        />
      )}
    </div>
  )
}

export default SelectionContainer
