import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { GitHubUserList } from '../../Models/Type';
import Users from '../users/Users';


const SearchPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gitUserList, setGitUserList] = useState<Array<GitHubUserList>>([]);
    const [isUserDetails, setIsUserDetails] = useState<boolean>(false);
    const [details, setDetails] = useState<GitHubUserList | undefined>();

    useEffect(() => {
        setGitUserList([]);
        setIsUserDetails(false);
    }, [username])


    function handleSearch(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setIsUserDetails(false);
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setGitUserList(data);
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false);
                }
            })
    }

    function renderUserList(users: GitHubUserList) {
        return (
            <Card key={users.id} className='all-card' onClick={() => getDetails(users.name)}>
                <Card.Body>{users.name}</Card.Body>
            </Card>
        )
    }

    function getDetails(name: string) {
        fetch(`https://api.github.com/repos/${username}/${name}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setIsUserDetails(true);
                    setDetails(data);
                }
            }).catch(() => {
                setIsUserDetails(false);
            })
    }

    return (
        <Fragment>
            <Form className='searchField'>
                <Form.Group as={Row} controlId="search-user">
                    <Col sm={6}>
                        <Form.Control type="text" placeholder="User Search" value={username} onChange={e => setUsername(e.target.value)} />
                    </Col>
                    <Col sm={4}>
                        <Button type="button" onClick={handleSearch}>{isLoading ? 'Searching...' : 'Search'}</Button>
                    </Col>
                </Form.Group>
                {
                    (gitUserList.length && !isUserDetails) > 0 && (
                        <Card style={{ width: '50rem', padding: '10px' }} >
                            <Card.Body>Total Number of Repository:- {gitUserList.length} </Card.Body>
                        </Card>
                    )
                }
                {
                    (gitUserList.length > 0 && !isUserDetails) && (
                        gitUserList.map(renderUserList)
                    )
                }
            </Form>
            {
                (isUserDetails && details) && (<Users details={details} />)
            }
        </Fragment>
    )
};

export default SearchPage;