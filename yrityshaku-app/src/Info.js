import React from 'react';
import { Row, Container, Card } from 'react-bootstrap';

class Info extends React.Component {
  render() {
    return (
      <Container>

        <Row>
          <p>Kuulutustiedot sisältävät tietoa esim. tänään rekisteröidyistä uusista yrityksistä tai jonkin kunnan alueelle rekisteröidyistä uusista yrityksistä.
          Tietoja on saatavilla seuraavista yrityksistä ja yhteisöistä:
        <i>osakeyhtiö, julkinen osakeyhtiö, asunto-osakeyhtiö, osuuskunta, vakuutusyhtiö ja julkinen vakuutusyhtiö. </i>
        Aineisto päivitetään kerran vuorokaudessa</p>
        </Row>

        <Row style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Card className='card-header' style={{ width: '18rem', marginBottom: '2rem' }}>
            <Card.Body>
              <Card.Title >Rekisterinpitäjä</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"> Patentti- ja rekisterihallitus</Card.Subtitle>
              <Card.Text>
                Arkadiankatu 6 A,
                00100 Helsinki
              </Card.Text>
              <Card.Link href="https://www.prh.fi">prh.fi</Card.Link>
              <Card.Link href="https://avoindata.prh.fi/">avoindata.prh.fi</Card.Link>
            </Card.Body>
          </Card>
        </Row>

      </Container>
    );
  }
}

export default Info;
