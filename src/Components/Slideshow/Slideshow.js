import React, { useState, useEffect, useRef } from 'react'
import './Slideshow.scss'

const Slideshow = () => {
  const [songList, setSongList] = useState([])

  const [songIndex, _setSongIndex] = useState(0)
  const [lyricIndex, _setLyricIndex] = useState(0)

  const songIndexRef = useRef(songIndex)
  const setSongIndex = data => {
    songIndexRef.current = data
    _setSongIndex(data)
  }
  const lyricIndexRef = useRef(lyricIndex)
  const setLyricIndex = data => {
    lyricIndexRef.current = data
    _setLyricIndex(data)
  }

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'ArrowRight') {
        const currLyricIndex = lyricIndexRef.current
        const isSongOver =
          currLyricIndex >= songList[songIndex].lyrics.length - 1

        console.log(currLyricIndex)
        if (isSongOver && songList.length - 1 <= songIndex) {
          return
        } else if (isSongOver) {
          setSongIndex(songIndexRef.current + 1)
          setLyricIndex(0)
        } else {
          setLyricIndex(currLyricIndex + 1)
        }
      } else if (e.key === 'ArrowLeft') {
        const currLyricIndex = lyricIndexRef.current
        console.log(songIndex, currLyricIndex)
        if (currLyricIndex === 0 && songIndexRef > 0) {
          setLyricIndex(songList[currLyricIndex - 1].lyrics.length - 1)
          setSongIndex(songIndexRef.current - 1)
        } else if (currLyricIndex > 0) {
          setLyricIndex(currLyricIndex - 1)
        }
        // else if (currLyricIndex > 0) {
        // setLyricIndex(lyricIndex - 1)
        // }
        // setLyricIndex(prev => {
        //   if (prev - 1 >= 0) {
        //     return prev - 1
        //   }
        //   return 0
        // })
      }
    }
    const songList = JSON.parse(localStorage.getItem('songList'))
    setSongList(songList)

    window.addEventListener('keydown', handleKeyPress)
  }, [])
  useEffect(() => {
    console.log(songList)
    if (songList.length > 0) {
      console.log(songList[songIndex].lyrics[lyricIndex])
    }
  }, [songList])
  return (
    <div className='slideshow-page page'>
      <div className='lyrics'>
        {songList.length &&
          songList[songIndex].lyrics[lyricIndex].map(text => {
            let title = lyricIndex === 0
            let prevLyrics =
              songList[songIndexRef.current].lyrics[
                lyricIndexRef.current - 1
              ] ?? false
            let nextLyrics =
              songList[songIndexRef.current].lyrics[
                lyricIndexRef.current + 1
              ] ?? false
            return (
              <>
                <p className='prev-lyrics'>
                  {prevLyrics ? `${nextLyrics[0]}...` : ''}
                </p>
                <p className={title && 'title-page'}>{text}</p>
                <p className='next-lyrics'>
                  {nextLyrics ? `${nextLyrics[0]}...` : ''}
                </p>
              </>
            )
          })}
      </div>
    </div>
  )
}

export default Slideshow
