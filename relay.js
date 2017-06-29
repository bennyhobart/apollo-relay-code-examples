import React from 'react';
import { QueryRenderer, graphql } from 'relay';

function TodoList({ todos }) {
    return (
        <div>
            {todos.map(todo => <TodoItemContainer todo={todo} />)}
        </div>
    );
}

function TodoItem({ todo }) {
    return (
        <div>
            {JSON.stringify(todo)}
        </div>
    );
}
const TodoItemContainer = () =>
    createFragmentContainer(
        Component2,
        graphql`
            fragment TodoItem_todo on Todo {
                checked
            }
        `
    );

export default props =>
    <QueryRenderer
        environment={environment}
        variables={{
            numToShow: 5000 // replace with any logic you want
        }}
        query={graphql`
            query TodoListQuery($numToShow: Int) {
                todos(limit: $numToShow) {
                    text
                    isComplete
                    ...TodoItem_todo
                }
            }
        `}
        render={({ error, props }) => {
            if (error) {
                return <div>{error.message}</div>;
            } else if (props) {
                return <TodoList {...props} />;
            }
            return <div>Loading</div>;
        }}
    />;
