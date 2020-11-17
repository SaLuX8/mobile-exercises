import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Tervetuloa löytöretkelle uusien yritysten maailmaan!</h3>
                <p>Tämä web-sovellus on luotu WEB-ohjelmointi -kurssin harjoitustyönä.
                Sovelluksella on mahdollista hakea päivämäärän ja rekisteröintikunnan perusteella Suomessa helmikuun 2014 jälkeen perustettuja osakeyhtiöitä ja osuuskuntia.
                </p>
                <p>Tiedot haetaan Patentti- ja rekisterihallituksen avoimesta datapalvelusta. </p>
            </div>
        )
    }
}
export default Home;