import styled from "styled-components"

const Widget = () => {
  return (
    <WidgetWrapper>
      <iframe 
        src=''
        width="340"
        height="1500"
        style={{border: "none", overflow: "hidden"}}
        scrolling="no"
        frameboder="0"
        allow="encrypted-media"
        title="Facebook widget"
      >
      </iframe>
    </WidgetWrapper>
  )
}

const WidgetWrapper = styled.div``

export default Widget