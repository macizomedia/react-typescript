import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { Form } from '../components/NameForm/NameForm'
import logo from '../assets/img/_A_Main Logo normal@2x.png'

export const Subscribe = () => {
    const [show, setShow] = useState(true)

    return (
        <header className="App-header">
            <div className="example-container"></div>
            <Layout
                container
                spacing="sm"
                alignItems="center"
                justifyContent="space-between"
                style={{ height: '100%' }}
            >
                {show ? (
                    <Layout item xs={1} sm={6} md={4} lg={3}>
                        <div>
                            <img src={logo} className="App-logo" alt="logo" />
                            <p className="App-lead">
                                We empower entrepreneurs where others see
                                refugees.
                            </p>
                            <button onClick={() => setShow(false)}>
                                Learn More
                            </button>
                        </div>
                    </Layout>
                ) : (
                    <Layout item xs={1} sm={6} md={4} lg={3}>
                        <Form variant={null} label="subscribe">
                            Welcome
                        </Form>
                    </Layout>
                )}
            </Layout>
        </header>
    )
}
