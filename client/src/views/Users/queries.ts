import gql from 'graphql-tag';

export const USERS_QUERY = gql`
    query UsersQuery($search: String) {
        users(search: $search) {
            edges {
                node {
                    id 
                    username 
                    bio
                    email 
                    createdAt
                }
            }
        }
    }
`;

export const USER_CREATE_MUTATION = gql`
    mutation UserCreateMutation($input: UserInputType!) {
        userCreate(input: $input) {
            user {
                username 
                email 
                password
            }
        }
    }
`;

export const USER_DELETE_MUTATION = gql`
    mutation UserDeleteMutation($id: ID, $email: String, $password: String) {
        userDelete(id: $id, email: $email, password: $password) {
            ok
            debug
        }
    }
`;
