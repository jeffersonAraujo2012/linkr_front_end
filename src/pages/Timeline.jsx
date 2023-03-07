import styled from 'styled-components';
import PageTitle from '../components/PageTitle';

export default function Timeline(){
  return (
    <TimelineStyle>
      <main>
        <PageTitle title='timeline' />
      </main>
    </TimelineStyle>
  )
}

const TimelineStyle = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
  padding-top: 78px;
`