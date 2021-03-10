export type Maybe<T> = T | null;

export interface UserInputType {
  username?: Maybe<string>;

  email?: Maybe<string>;

  password?: Maybe<string>;
}

/** The `DateTime` scalar type represents a DateTime value as specified by [iso8601](https://en.wikipedia.org/wiki/ISO_8601). */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace UsersQuery {
  export type Variables = {
    search?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    users: Maybe<Users>;
  };

  export type Users = {
    __typename?: "UserTypeConnection";

    edges: (Maybe<Edges>)[];
  };

  export type Edges = {
    __typename?: "UserTypeEdge";

    node: Maybe<Node>;
  };

  export type Node = {
    __typename?: "UserType";

    id: string;

    username: string;

    bio: string;

    email: string;

    createdAt: DateTime;
  };
}

export namespace UserCreateMutation {
  export type Variables = {
    input: UserInputType;
  };

  export type Mutation = {
    __typename?: "Mutation";

    userCreate: Maybe<UserCreate>;
  };

  export type UserCreate = {
    __typename?: "UserCreate";

    user: Maybe<User>;
  };

  export type User = {
    __typename?: "UserType";

    username: string;

    email: string;

    password: string;
  };
}

export namespace UserDeleteMutation {
  export type Variables = {
    id?: Maybe<string>;
    email?: Maybe<string>;
    password?: Maybe<string>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    userDelete: Maybe<UserDelete>;
  };

  export type UserDelete = {
    __typename?: "UserDelete";

    ok: Maybe<boolean>;

    debug: Maybe<string>;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace UsersQuery {
  export const Document = gql`
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
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace UserCreateMutation {
  export const Document = gql`
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
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace UserDeleteMutation {
  export const Document = gql`
    mutation UserDeleteMutation($id: ID, $email: String, $password: String) {
      userDelete(id: $id, email: $email, password: $password) {
        ok
        debug
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
