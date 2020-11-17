import React from 'react';
import $ from 'jquery';
import { Table, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InfoModal from './InfoModal';
import Spinner from 'react-bootstrap/Spinner';


class Yritykset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],                                // tulokset json muodossa
      count: '0',                                 // yritysten lukumäärä
      loaded: false,                              // onko tulokset ladattu
      startDate: new Date(Date.now() - 86400000), // rekisteröintikuulutuksen hakuvälin alkupvm 
      endDate: new Date(Date.now() - 86400000),   // rekisteröintikuulutuksen hakuvälin loppupvm 
      isLoading: false,                           // lataako vielä
      modalshow: false,                           // näytetäänkö modal (eli yrityksen yksityiskohtainen inforuutu kartalla)
      activeItemData: '',                         // yksittäisen yrityksen data, käytetään handleSetModal:ssa
      citySearch: '',                             // yrityksen kotipaikka, jota etsitään
      getCompaniesFailed: false                   // epäonnistuiko yrityshaku prh:lta
    };
    this.searchClickHandler = this.searchClickHandler.bind(this);
    this.getCompanies = this.getCompanies.bind(this);
    this.handleSetModal = this.handleSetModal.bind(this);
  }

  render() {

    // Tämä osa näytetään, kun dataa EI OLE HAETTU
    if (!this.state.loaded) {
      return (
        <div className="container" >

          {/* Haku päivämäärällä. Datepicker + nappi. Spinner näkyvissä jos isLoading = true */}
          <p className="form-p">Anna rekisteröintikuulutuksen aikaväli</p>

          <div className="row" style={{ marginBottom: '20px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker className="form" selected={this.state.startDate} onChange={(date) => { this.setState({ startDate: date }) }} dateFormat="yyyy-MM-dd" style={{ margin: '10px' }} />
            <DatePicker className="form" selected={this.state.endDate} onChange={(date) => { this.setState({ endDate: date }) }} dateFormat="yyyy-MM-dd" />
          </div>
          <p className="form-p">Anna kotipaikka</p>
          <div className='row' style={{ marginBottom: '20px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <input className="form" placeholder="kunnan nimi" onChange={(e) => { this.setState({ citySearch: e.target.value }) }} /> {/* Asetetaan citysearch staten tilaksi hakusana */}
          </div>

          <div className='row' style={{ marginBottom: '20px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{ marginLeft: '5px', width: '140px' }} variant="primary" size="sm" disabled={this.state.isLoading} onClick={this.searchClickHandler}>
              {this.state.isLoading ?
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                : 'Hae yritykset'}
            </Button>
          </div>
        </div>
      );
    }

    // Tämä osa näytetään, kun dataa ON HAETTU
    return (

      <div className="container">

        <InfoModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          data={this.state.activeItemData}
        />

        <div className="container" >

          {/* Haku päivämäärällä. Datepicker + nappi. Spinner näkyvissä jos isLoading = true */}
          <p className="form-p">Anna rekisteröintikuulutuksen aikaväli</p>

          <div className="row" style={{ marginBottom: '20px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker className="form" selected={this.state.startDate} onChange={(date) => { this.setState({ startDate: date }) }} dateFormat="yyyy-MM-dd" style={{ margin: '10px' }} />
            <DatePicker className="form" selected={this.state.endDate} onChange={(date) => { this.setState({ endDate: date }) }} dateFormat="yyyy-MM-dd" />
          </div>
          <p className="form-p">Anna kotipaikka</p>
          <div className='row' style={{ marginBottom: '20px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <input className="form" placeholder="kunnan nimi" onChange={(e) => { this.setState({ citySearch: e.target.value }) }} /> {/* Asetetaan citysearch staten tilaksi hakusana */}
          </div>

          <div className='row' style={{ marginBottom: '20px', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{ marginLeft: '5px', width: '140px' }} variant="primary" size="sm" disabled={this.state.isLoading} onClick={this.searchClickHandler}>
              {this.state.isLoading ?
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                : 'Hae yritykset'}
            </Button>
          </div>
        </div>


        <p>Uusia yrityksiä {this.state.count} kpl</p>

        {this.state.count > 79 ?  // Alert box, jos hakutuloksia on yli 79 kpl
          <Alert variant="warning">
            <Alert.Heading>Huom!</Alert.Heading>
            <p>Sait haullesi {this.state.count} tulosta. Tuloksista näytetään vain 79 ensimmäistä!</p>
          </Alert> : ''}

        {this.state.getCompaniesFailed ?   // Alert box, jos haulla ei löytynyt yhtään hakutulosta
          <Alert variant="primary">
            <Alert.Heading>Oho!</Alert.Heading>
            <p>Hakuehdoillasi ei ilmeisesti löytynyt yhtään uutta yritystä.</p>
          </Alert> : ''}


        {/* Tulostetaan hakutulokset taulukkoon */}
        <Table striped bordered hover responsive="sm" size="sm">
          <thead>
            <tr>
              <th>Yrityksen nimi</th>
              <th>Kotipaikka</th>
              <th>Y-tunnus</th>
              <th>Rekisteröintitunnus</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.results.map((results, index) =>
                <tr key={results.businessId}>
                  <td onClick={this.handleSetModal.bind(this, results)} style={{ textAlign: 'left' }}>{results.name}</td>
                  <td>{results.registeredOffice}</td>
                  <td>{results.businessId}</td>
                  <td>{results.recordNumber}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }

  // taulukon yritystä painettaessa asetetaan näytetään Modal ja välitetään results -statessa oleva klikatun yrityksen tieto activeItemData -stateen.  
  handleSetModal(item) {
    this.setState({
      modalShow: true,
      activeItemData: item,
    });
    console.log("key: " + item.detailsUri);
  };

  // Button click handler. Tyhjätään aiemmin haettu data ja kutsutaan datan hakevaa metodia
  searchClickHandler() {
    this.setState({ results: [], count: '0', loaded: false, isLoading: true, getCompaniesFailed: false });
    this.getCompanies();
  };

  // Haetaan uudet yritykset annetulta päivämäärältä
  getCompanies() {
    let startDate = this.state.startDate.toISOString().split("T")[0].toString();
    let endDate = this.state.endDate.toISOString().split("T")[0].toString();
    let searchCity = encodeURIComponent(this.state.citySearch);
    console.log(startDate + ' - ' + endDate);
    console.log(searchCity);
    let searchString = 'https://avoindata.prh.fi/tr/v1/publicnotices?totalResults=true&maxResults=1000&registeredOffice=' + searchCity + '&noticeRegistrationFrom=' + startDate + '&noticeRegistrationTo=' + endDate + '&noticeRegistrationType=U'
    // console.log(searchString);
    $.ajax({
      url: searchString,
      cache: false,
      dataType: 'json'
    }).done((data) => {
      this.setState({ results: data.results, count: data.totalResults, loaded: true, isLoading: false });
    }).fail((jqXHR, textStatus, errorThrown) => {
      console.log(textStatus + ":" + errorThrown);
      this.setState({ loaded: true, isLoading: false, getCompaniesFailed: true })  // getComapniesFailed : true näyttää Alert boxin taulukon yläpuolella
    });
  }
}

export default Yritykset;
