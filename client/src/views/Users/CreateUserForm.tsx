import { Button, Form, Input, Row } from 'antd';
import * as React from 'react';
import { compose, withApollo } from 'react-apollo';
import { UserCreateMutation } from '../../generatedModels';

interface ICreateUserFormState {
    username: string;
    email: string;
    password: string;
}

interface ICreateUserFormProps {
    createUser: UserCreateMutation.MutationFn;
    onSuccess: () => any;
}

class CreateUserForm extends React.Component<ICreateUserFormProps, ICreateUserFormState> {
    public state: ICreateUserFormState = {
        email: '',
        password: '',
        username: ''
    }

    public render() {
        const { username, email, password} = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Form.Item>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={this.handleUsernameChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={this.handleEmailChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChange={this.handlePasswordChange}
                        />
                    </Form.Item>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        );
    }

    private handleUsernameChange = (event: any) => {
        this.setState({ username: event.target.value });
    };

    private handleEmailChange = (event: any) => {
        this.setState({ email: event.target.value });
    };

    private handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    };


    private handleSubmit = (event: any) => {
        event.preventDefault();
        const { username, email, password } = this.state;
        const { createUser, onSuccess } = this.props;

        return createUser({ variables: { input: { username, email, password } } })
            .then(() => {
                this.setState({ username: '', email: '', password: '' });
                return onSuccess();
            });
    }
}

export default compose(
    withApollo,
    UserCreateMutation.HOC({
        props: ({ mutate }) => ({
            createUser: mutate
        })
    }),
)(CreateUserForm);