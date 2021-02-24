import React, { Component, Fragment } from "react"
import ChallengeAPI, { JWT_TOKEN } from "../../api/ChallengeAPI"
import { Button, Col, Form, FormControl, InputGroup, Dropdown, DropdownButton, DropdownMenu, DropdownToggle } from "react-bootstrap"
class Challenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickName: "",
            languages: [],
            selectedLanguage: "",
            description: "",
            program: "",
            preLoadedTaskId: "",
            compilerArgs: "",
            showSuccessMessage: false,
            hasSubmissionFailed: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.selectHandle = this.selectHandle.bind(this)
        this.submitChallenge = this.submitChallenge.bind(this)
        this.getAllLanguages = this.getAllLanguages.bind(this)
        this.getRandomTaskForPlayer = this.getRandomTaskForPlayer.bind(this)
    }

    selectHandle(event) {
        this.setState({ selectedLanguage: event.target.value })
        this.getRandomTaskForPlayer(event.target.value, this.state.nickName)
    }
    componentDidMount() {
        this.getAllLanguages()
    }

    async getAllLanguages() {
        console.log(sessionStorage.getItem(JWT_TOKEN))
        ChallengeAPI.getAllLanguagesAPI(sessionStorage.getItem(JWT_TOKEN))
            .then(response => {
                console.log(response.data)
                this.setState({ languages: response.data.languages })
            })
            .catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    handleChange(event) {
        this.setState(
            {
                ...this.state,
                [event.target.name]: event.target.value
            },
            () => {
                console.log(this.state)
            }
        )
    }

    getRandomTaskForPlayer(languageName, nickName) {
        ChallengeAPI.getRandomTaskForPlayerAPI(nickName, languageName, sessionStorage.getItem(JWT_TOKEN))
            .then(response => {
                console.log(response)
                this.setState({ description: response.data.preLoadedTask.description })
            })
            .catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasSubmissionFailed: true })
            })
    }
    submitChallenge() {
        ChallengeAPI.submitChallengeAPI(this.state.nickName, this.state.languageName, this.state.program, this.state.preLoadedTaskId, this.state.compilerArgs)
            .then(response => {
                console.log(response)
                this.setState({ showSuccessMessage: true })
                this.props.history.push(`/challenge`)
            })
            .catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasSubmissionFailed: true })
            })
    }

    render() {
        console.log(this.state.languages)

        return (
            <div className="container">
                {this.state.hasLoginFailed && <div className="alert alert-warning">Try After Sometime</div>}
                {this.state.showSuccessMessage && <div>Submitted Sucessful</div>}
                <Form onSubmit={this.submitChallenge}>
                    <Form.Row>
                        <Form.Group as={Col} md="10" controlId="validationCustom01"></Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                            <Form.Label>NICK NAME</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom03">
                            <Form.Control type="text" name="nickName" value={this.state.nickName} onChange={this.handleChange} placeholder="Nick Name " required />
                            <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                            <Form.Label>SELECT LANGUAGE</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom03">
                            <Form.Control as="select" name="selectedLanguage" value={this.state.selectedLanguage} onChange={this.selectHandle}>
                                {this.state.languages.map((e, key) => {
                                    return (
                                        <option key={key} value={e.name}>
                                            {e.name}
                                        </option>
                                    )
                                })}
                                ​
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                            <Form.Label>TASK DESCRIPTION</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom03">
                            <Form.Control readOnly type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Task Description" required />
                            <Form.Control.Feedback type="invalid">Please provide a valid Description.</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                            <Form.Label>SOLUTION CODE</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustom1">
                            <FormControl as="textarea" aria-label="With textarea" rows={8} name="program" value={this.state.program} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Challenge
