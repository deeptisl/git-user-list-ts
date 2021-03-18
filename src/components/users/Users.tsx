import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { GitHubUserList, Owner } from '../../models/Type';

interface UserDetailsProps {
    details: GitHubUserList
}

const UsersPage: React.FC<UserDetailsProps> = ({ details }) => {
    const owner: Owner = details.owner;
    return (
        <Fragment>
            <Card style={{ width: '20rem', marginLeft: '5%' }}>
                <Card.Img variant="top" src={owner.avatar_url} />
                <Card.Body>
                    <Card.Title>{details.name}</Card.Title>
                    <Card.Text>
                        <p>forks : {details.forks}</p>
                        <p>forks count : {details.forks_count}</p>
                        <p>size : {details.size}</p>
                        <p>watchers : {details.forks}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
};

export default UsersPage;