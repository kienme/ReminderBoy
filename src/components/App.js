import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {addReminder, deleteReminder, completeReminder} from '../actions';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    addReminder() {
        if(this.state.text !== '')
            this.props.addReminder(this.state.text);
        
        //clear input field
        document.getElementById('inputField').value='';
        this.setState({text: ''});
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    completeReminder(id, completed) {
        this.props.completeReminder(id, completed);
    }

    renderList() {
        const {reminders} = this.props;
        return (
            <ListGroup>
            {
                //<div id='deleteIcon'>&#9746;</div>
                reminders.map(r =>
                    <ListGroupItem key={r.id}>
                        <div className='listItem'>
                            <div className={(r.completed?'completedText':'') + ' listItemText'}>{r.text}</div>
                            <Button bsStyle='success' onClick={()=>this.completeReminder(r.id, !r.completed)}>Completed</Button>
                            <Button bsStyle='danger' id='deleteButton' onClick={()=>this.deleteReminder(r.id)}>
                                <Glyphicon glyph='trash' />
                            </Button>
                        </div>
                     </ListGroupItem>
                )
            }
            </ListGroup>
        );
    }

    render() {
        return (
            <div className='App'>
                <div className='title'>
                    <h2>ReminderBoy</h2>
                </div>
                <div className='body'>
                    <Form inline className='form' onSubmit={() => this.addReminder()} action='#'>
                        <FormGroup className='formGroup'>
                            <FormControl type='text' placeholder='I have to...' id='inputField'
                                onChange={event => this.setState({text: event.target.value})} />
                        
                            <Button id='inputButton' bsStyle='primary' type='submit'>
                                Add Reminder
                            </Button>
                        </FormGroup>
                    </Form>                     
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addReminder, deleteReminder, completeReminder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
