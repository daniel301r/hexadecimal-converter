import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
    display: grid;
    place-content: center;
    grid-gap: 20px;
`;

function App() {

    const [decimal, setDecimal] = useState();
    const [hexadecimal, setHexadecimal] = useState();

    const handleClick = async () => {

            try {

                if(!isNaN(decimal) && decimal > 0){
                    const { data } = await axios.get(`http://localhost:4001/converter/${decimal}`);

                    setHexadecimal(data);
                }

            } catch (e) {
                // handle error
                console.log(e)
            }
    }

    return (
        <Wrapper>

            <h2>Convert decimal to hexadecimal</h2>

            <Input
                type="number"
                placeholder="Enter decimal"
                onChange={(e, data) => {
                    setHexadecimal(undefined);
                    setDecimal(parseInt(data.value));
                }}
            />

            {hexadecimal && <Message color='green'>{hexadecimal}</Message>}

            <Button
                primary
                onClick={() => handleClick()}
            >
                Convert decimal
            </Button>

        </Wrapper>
    );
};

export default App;