import React from 'react';
import { graphql } from 'apollo-client';
import gql from 'graphql-tag';

function TodoList(data) {
    if (!data.todos) {
        return null;
    }

    return (
        <div>
            {data.todos.map(todo => <TodoItem todo={todo} />)}
        </div>
    );
}

function TodoItem(todo) {
    return (
        <div>
            {JSON.stringify(todo)}
        </div>
    );
}

const TodoItemFragment = gql`
    fragment TodoItemFragment on Todo {
        checked
    }
`;

const TodoListQuery = gql`
    query TodoListQuery($numToShow: Int) {
        todos(limit: $numToShow) {
            text
            isComplete
            ...TodoItemFragment
        }
    }
    ${TodoItemFragment}
`;

export default graphql(TodoListQuery, {
    options: props => ({
        variables: {
            numToShow: 5000 // replace with any logic you want
        }
    })
})(TodoList);
