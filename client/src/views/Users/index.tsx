import { Card, Col, Divider, Icon, Input, Row, Spin } from 'antd';
import * as queryString from 'query-string';
import * as React from 'react';
import { compose, withApollo } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserDeleteMutation, UsersQuery } from '../../generatedModels';
import CreateUserForm from './CreateUserForm';

interface IUsersState {
    searchQuery?: string;
}

interface IUsersBaseProps {
    deleteUser: UserDeleteMutation.MutationFn;
}

type IUsersProps = UsersQuery.Props<IUsersBaseProps> & RouteComponentProps;

class Users extends React.Component<IUsersProps, IUsersState> {
    constructor(props: IUsersProps) {
        super(props);
        const query = queryString.parse(props.location.search);
        this.state = {
            searchQuery: query && query.search
                ? query.search.toString()
                : undefined
        };
    }

    public render() {
        const { searchQuery } = this.state;
        const { data } = this.props;

        return (
            <Row>
                <Col span={12} offset={6}>
                    <Divider>Create User</Divider>
                    <CreateUserForm
                        onSuccess={this.handleCreateUserFormSuccess}
                    />
                    <Divider>Users</Divider>
                    <Input.Search
                        placeholder="Search..."
                        enterButton="Search"
                        defaultValue={searchQuery}
                        onChange={this.handleSearchQueryChange}
                        onSearch={this.handleSearch}
                    />
                    {data!.loading ? (
                        <Spin style={{ marginTop: 16, display: 'block' }} />
                    ) : (
                        <div>
                            {data!.users!.edges.map(edge => (
                                <Card
                                    key={edge!.node!.id}
                                    style={{ marginTop: 16 }}
                                    actions={[
                                        <Icon
                                            type="delete"
                                            key={edge!.node!.id}
                                            onClick={() => this.handleDeleteUser(edge!.node!.id)}
                                        />
                                    ]}
                                >
                                    <Card.Meta
                                        title={edge!.node!.username}
                                        description={edge!.node!.email}
                                    />
                                </Card>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        );
    }

    private handleSearchQueryChange = (event: any) => {
        this.setState({
            searchQuery: event.target.value || undefined
        });
    };

    private handleSearch = () => {
        const { searchQuery } = this.state;
        const { history, location } = this.props;

        history.push({
            pathname: location.pathname,
            search: queryString.stringify({
                search: searchQuery
            })
        });
    };

    private handleCreateUserFormSuccess = () => {
        const { data } = this.props;
        return data!.refetch();
    };

    private handleDeleteUser = (id: string) => {
        const { data, deleteUser } = this.props;
        return deleteUser({ variables: { id } })
            .then(() => data!.refetch());
    };
}

export default compose(
    withApollo,
    withRouter,
    UsersQuery.HOC({
        options: (props: IUsersProps) => ({
            variables: queryString.parse(props.location.search)
        })
    }),
    UserDeleteMutation.HOC({
        props: ({ mutate }) => ({
            deleteUser: mutate
        })
    })
)(Users);
