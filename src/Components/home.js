//
// Modification Log:
//
// 05-17 Project init.
// 05-18: Re-initialized the react project
// 05-19: Completed project. Implemented spawnPosts, loadPosts, and connected to OpenAI server.

// Import react and react elements
import React from 'react';
import {  useEffect } from 'react';

// MUI Component imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// MUI Theme Imports
import { styled } from '@mui/material/styles';

function Home ()
{
    const OpenAIConfig = require("../OpenAI.json");

    // Custom styles for Home page
    const styles = {
        InputContainer: {
            minHeight: '10vh',
            maxHeight: '10vh',
            minWidth: '80vh',
            maxWidth: '80vh',
        },
        InputItem: {
            minWidth: "75vh",
            maxWidth: "75vh"
        },
        SubmitButton: {
            margin: "1vh",
            marginLeft: "0vh"
        },
        Submission: {
            minHeight: '20vh',
            maxHeight: '20vh',
            minWidth: '80vh',
            maxWidth: '80vh',
        },
    };
    
    // Submission data
    let curInput;
    
    const [curPostData, setPostData] = React.useState(null);
	const [didPostsLoad, setDidPostsLoad] = React.useState(false);

    // Containers for grid, using the MUI Paper component
    const Item = styled(Paper)(({ theme }) => (
        {
        backgroundColor: theme.palette.mode === 'dark' ? '#474A52' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        }
    ));

    const onInputChange = (input) =>
	{
        curInput = input.target.value
	}

    // Upload prompts and responses to MySQL server for retrieving and loading prompts
    async function onPromptSubmission()
    {
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: OpenAIConfig.OPENAI_SECRET,
        });

        const openai = new OpenAIApi(configuration);

        // Fetch to openai 
        const aiResponse = await openai.createCompletion("text-curie-001", {
            prompt: curInput,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        });

        const aiData = await aiResponse;
        console.log(JSON.stringify(aiData.data.choices[0].text));

        const submissionData = 
        {
            prompt: curInput,
            response: aiData.data.choices[0].text
        }
    }

    let newPostArray = []

    // Load posts from MySQL server
    async function spawnPosts()
    {
        const devResponse = await fetch("/api/AIManager/loadPosts", {
            method: "get",
            headers: {'Accept': 'application/json', "Content-Type": "application/json"}
		});

        const resData = await devResponse.json();
        console.log(JSON.stringify(resData));

        newPostArray = resData.curSubmissions;

        setPostData(newPostArray);
    }

    // Array for handling all submissions
    let curSubmissions = []

    // Populates page by looping through curSubmissions and spawning new MUI cards
    function populatePage()
	{
		if(curPostData !== null)
		{
            for (let index = curPostData.length - 1; index >= 0; index--) {
                const item = curPostData[index];
                console.log(item);
                // initialize a new card MUI component
                const newCard = (
					<Box borderBottom={1}>
						<Card>
							<CardContent expandable={true}>
                                <h3>Prompt</h3>
								<p>{item.prompt}</p>
                                <h3>Response</h3>
								<p>{ item.response }</p>
							</CardContent>
						</Card> 
					</Box>
				)
				curSubmissions.push(newCard);
              }
			return curSubmissions;
		}
	}

    useEffect(() => {
		if(didPostsLoad === false)
		{
			spawnPosts(); // call API loadPosts
			populatePage(); // populate the page from spawnPosts
			setDidPostsLoad(true); // once populated, disable to sotp re-populating posts
		}
	});

	return (
	<div>
        <Grid   
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Box>
                <h1>Fun With AI</h1>
            </Box>
            <Box>
                <Item style={styles.InputContainer}>
                    <TextField 
                        id="outlined-basic" 
                        label="Enter Prompt Here" 
                        variant="outlined" 
                        style={styles.InputItem}
                        onChange={(e) => onInputChange(e)}
                    />
                </Item>
                <Button 
                    style={styles.SubmitButton} variant="contained" 
                    onClick={onPromptSubmission}
                >
                        Submit
                </Button>
            </Box>
            <Box>
                <div className='card-list'>
                    {/* Populate page with submissions */}
                    { populatePage() }
                </div>
            </Box>
        </Grid>
	</div>)
}

export default Home;