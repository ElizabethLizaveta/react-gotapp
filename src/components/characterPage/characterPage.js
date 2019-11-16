import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';
export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: 100,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                getData={this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        )

        const charDetails = (
            <CharDetails getData={this.gotService.getCharacter} itemId={this.state.selectedChar}>
                <Field field="gender" label="Gender"></Field>
                <Field field="born" label="Born"></Field>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}