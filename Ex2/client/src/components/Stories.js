import React from 'react'
import Story from './Story'
import styled from 'styled-components'

const Stories = () => {
  return (
    <StoriesWrapper>
      <Story
        image="https://hips.hearstapps.com/hmg-prod/images/womanyellingcat-1573233850.jpg"
        profileSrc=""
        title="Cat meme"
      />
      <Story
        image="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F026%2F489%2Fcrying.jpg"
        profileSrc=""
        title="Cat meme"
      />
      <Story
        image="https://a.pinatafarm.com/312x296/ae7f8ccd22/sad-thumbs-up-cat.jpg/m/522x0"
        profileSrc=""
        title="Cat meme"
      />
    </StoriesWrapper>
  )
}

const StoriesWrapper = styled.div`
  display: flex;
`

export default Stories