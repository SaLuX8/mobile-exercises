import React from 'react';
import $ from 'jquery';
import { Table, Button, Modal } from 'react-bootstrap';
import Kartta from './Kartta';

class InfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: '',        // yksittäisen yrityksen data
            loaded: false,      // onko ladattu
            isLoading: false,   // lataako
            updated: true       // määrittäää osaltaan kutsutaanko getCompanyInfo metodia
        }
    }
    
    componentDidUpdate() {
        // jos tuloksessa on jotain dataa JA klikatun yrityksen datailUri EI ole sama kuin parent komponentin välittämässä properissa
        if (this.state.results !== '' && this.state.results[0].detailsUri !== this.props.data.detailsUri) {
            this.setState(
                { updated: true }
            )
        }
        if (this.state.updated) {
            this.getCompanyInfo();
        }
    }

    // get detailed info from chosen company and render it to a table inside Modal 
    getCompanyInfo() {
        this.setState(
            {
                updated: false,
                results: '',
                isLoading: true,
                loaded: false
            }
        )
        let searchString = this.props.data.detailsUri;
        if(searchString!== undefined){searchString = searchString.replace('http','https')};
        console.log(searchString);
        $.ajax({
            url: searchString,
            cache: false,
            dataType: 'json'
        }).done((data) => {
            this.setState({ results: data.results, loaded: true, isLoading: false });
            console.log("Data Loading Done");
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.log(textStatus + ":" + errorThrown);
            this.setState({ loaded: true, isLoading: false });
        })
    }

    render() {
        if (this.state.loaded && this.props.data.detailsUri!== undefined) {
            return (
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.results[0].name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <th>Y-tunnus</th>
                                    <td xs={6}>{this.state.results[0].businessId}</td>
                                </tr>
                                <tr>
                                    <th xs={12} md={8}>Viimeisin rekisteröinti </th>
                                    <td xs={6} md={4}>{this.state.results[0].registrationDate}</td>
                                </tr>
                                <tr>
                                    <th>Katuosoite </th>
                                    <td>{this.state.results[0].addresses[0].street}</td>
                                </tr>
                                <tr>
                                    <th>Postinumero ja -toimipaikka </th>
                                    <td>{this.state.results[0].addresses[0].postCode} {this.state.results[0].addresses[0].city}</td>
                                </tr>
                                <tr>
                                    <th>Viimeisin rekisteröintitoimisto </th>
                                    <td>{this.state.results[0].registeredOffices[0].registeredOffice}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <Kartta
                            address={this.state.results[0].addresses[0].street}
                            city={this.state.results[0].addresses[0].city}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Sulje</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
        else return '';
    }
}

export default InfoModal;